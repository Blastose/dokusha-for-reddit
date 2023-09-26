<script lang="ts">
	import type { Submission } from 'jsrwrap';
	import type { CommentFull, Sort } from 'jsrwrap/types';
	import { markdownToHtml } from '$lib/utils/markdownToHtml';
	import { page } from '$app/stores';
	import CommentBar from './CommentBar.svelte';
	import CommentInfo from './CommentInfo.svelte';
	import CommentBody from './CommentBody.svelte';
	import CommentActions from './CommentActions.svelte';
	import { tick } from 'svelte';

	export let comment: CommentFull;
	export let submissionId: string;
	export let suggestedSort: Sort = 'confidence';
	export let updateReplies: ((moreId: string, children: CommentFull[]) => void) | null = null;

	$: highlightCommentId = $page.params.commentId;

	function addReplies(moreId: string, children: CommentFull[]) {
		if (comment.type === 'comment') {
			const moreIndex = comment.replies.findIndex((value) => value.id === moreId);
			comment.replies.splice(moreIndex, 1);
			comment.replies = comment.replies.concat(children);
		}
	}

	async function getMoreChildren() {
		if (comment.type === 'more' && comment.id !== '_') {
			const sort = $page.url.searchParams.get('sort') ?? suggestedSort ?? 'confidence';
			const res = await fetch(`/api/morechildren`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					submissionId,
					children: comment.children.join(','),
					sort: sort
				})
			});

			const children = (await res.json()) as Awaited<ReturnType<Submission['getMoreChildren']>>;

			if (updateReplies) updateReplies(comment.id, children);
		}
	}

	async function toggleCommentVisibility() {
		if (comment.type === 'comment') {
			comment.collapsed = !comment.collapsed;
			currentCommentHidden = comment.collapsed;

			if (comment.collapsed) {
				await tick();
				const rect = commentContainer.getBoundingClientRect();
				if (rect.top < 65) {
					// 65px is the height of the fixed header
					commentContainer.scrollIntoView();
				}
			}
		}
	}

	function toggleSourceVisibility() {
		sourceHidden = !sourceHidden;
	}

	function countNewLinesInSource(source: string) {
		return (source.match(/\n/g) || []).length;
	}

	function buildPermalink(id: string) {
		// We need to remove the first 3 characters since id starts with t3_
		const splitPaths = $page.url.pathname.split('/');
		// The first 6 elements of the splitpath array form the base url for
		// the new comment permalink
		const baseUrl = splitPaths.splice(0, 6).join('/');

		const newUrl = `${baseUrl}/${id.slice(3)}`;
		return newUrl;
	}

	// When a comment is updated (from loading new comments), we want to keep
	// the last state it was in so it will still be hidden or showed
	// If it is undefined, then its state has not changed from the api response
	let currentCommentHidden: boolean | undefined;

	$: commentBody = comment.type === 'comment' ? comment.body : '';
	$: commentMediaMetadata = comment.type === 'comment' ? comment.media_metadata : undefined;
	$: commentHtml = markdownToHtml(commentBody, { media_metadata: commentMediaMetadata });

	let loadingMoreReplies = false;
	$: commentHidden =
		comment.type === 'comment'
			? currentCommentHidden !== undefined
				? currentCommentHidden
				: comment.collapsed
			: false;

	let sourceHidden = true;

	let commentContainer: HTMLDivElement;
</script>

{#if comment.type === 'comment'}
	<div bind:this={commentContainer} class="comment-container">
		<CommentBar {commentHidden} {toggleCommentVisibility} />

		<div class="flex flex-col gap-2">
			<div class:highlight={highlightCommentId === comment.id}>
				<CommentInfo {comment} {commentHidden} {toggleCommentVisibility} />
				<div class:hidden={commentHidden}>
					<CommentBody {commentHtml} />

					<div class:hidden={sourceHidden}>
						<textarea
							disabled
							name=""
							id=""
							rows={countNewLinesInSource(comment.body) + 2}
							value={comment.body}
						/>
					</div>

					<CommentActions {comment} {sourceHidden} {toggleSourceVisibility} />
				</div>
			</div>

			{#if comment.replies.length > 0}
				<div class="flex flex-col gap-4" class:hidden={commentHidden}>
					{#each comment.replies as reply (reply.id)}
						<svelte:self
							comment={reply}
							{submissionId}
							updateReplies={addReplies}
							{suggestedSort}
						/>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{:else if comment.type === 'more'}
	{#if comment.id === '_'}
		<a class="load-more-comments" href={buildPermalink(comment.parent_id)} rel="noreferrer"
			>Continue this thread</a
		>
	{:else}
		<button
			class="load-more-comments text-left"
			disabled={loadingMoreReplies}
			on:click={async () => {
				loadingMoreReplies = true;
				await getMoreChildren();
			}}>{loadingMoreReplies ? 'Loading...' : `Load ${comment.count} more comments`}</button
		>
	{/if}
{/if}

<style>
	.comment-container {
		display: grid;
		grid-template-columns: 22px 1fr;
		scroll-margin-top: 65px;
	}

	.highlight {
		background-color: rgba(158, 170, 197, 0.199);
		border-radius: 0.375rem;
		padding: 0.125rem 0.5rem;
	}

	:global(.dark) .highlight {
		background-color: rgba(73, 71, 82, 0.411);
	}

	.load-more-comments {
		color: #0079d3;
		width: fit-content;
	}

	:global(.dark) .load-more-comments {
		color: #5aade0;
	}

	textarea {
		resize: both;
		padding: 0.5rem;
		border-radius: 0.375rem;
		background-color: rgb(238, 242, 248);
		width: 100%;
	}

	:global(.dark) textarea {
		background-color: rgb(54, 54, 58);
	}

	textarea:focus {
		outline: none;
	}
</style>
