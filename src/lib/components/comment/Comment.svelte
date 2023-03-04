<script lang="ts">
	import type { CommentFull, Submission } from 'jsrwrap';
	import Icon from '$lib/components/icon/Icon.svelte';
	import relativeTime from '$lib/utils/relativeTime';
	import { replaceHtml } from '$lib/utils/replaceHtml';
	import { marked } from 'marked';
	import DOMPurify from 'isomorphic-dompurify';

	export let comment: CommentFull;
	export let submissionId: string;
	export let updateReplies: ((moreId: string, children: CommentFull[]) => void) | null = null;

	function addReplies(moreId: string, children: CommentFull[]) {
		if (comment.type === 'comment') {
			const moreIndex = comment.replies.findIndex((value) => value.id === moreId);
			comment.replies.splice(moreIndex, 1);
			comment.replies = comment.replies.concat(children);
		}
	}

	async function getMoreChildren() {
		if (comment.type === 'more' && comment.id !== '_') {
			const res = await fetch(
				`/api/morechildren?submissionId=${submissionId}&children=${comment.children.join(',')}`
			);

			const children = (await res.json()) as Awaited<ReturnType<Submission['getMoreChildren']>>;

			if (updateReplies) updateReplies(comment.id, children);
		}
	}

	function toggleCommentVisibility() {
		commentHidden = !commentHidden;
	}

	function toggleChildCommentsVisibility() {
		childCommentsHidden = !childCommentsHidden;
	}

	$: commentBody = comment.type === 'comment' ? comment.body : '';
	$: commentHTML = DOMPurify.sanitize(marked.parse(replaceHtml(commentBody)));

	let loadingMoreReplies = false;
	let commentHidden = comment.type === 'comment' ? comment.collapsed : false;

	let childCommentsHidden = false;
</script>

{#if comment.type === 'comment'}
	<div class="grid grid-cols-[22px,_1fr]">
		<button
			class="flex justify-center group h-full"
			on:click={toggleCommentVisibility}
			aria-label={commentHidden ? 'Show comment' : 'Hide comment'}
		>
			<span class="block duration-[400ms] bg-gray-400 group-hover:bg-gray-800 w-[2px] h-full" />
		</button>

		<div class="flex flex-col gap-2">
			<div>
				<p
					class="{comment.is_submitter ? 'text-blue-500' : 'text-rose-600'} text-sm font-bold"
					class:italic={commentHidden}
				>
					{comment.author} |
					<span
						title={new Date(comment.created * 1000).toString()}
						class="text-gray-500 font-semibold">{relativeTime(comment.created_utc)}</span
					>
				</p>

				<div class:hidden={commentHidden}>
					<div class="reddit-md max-w-4xl">
						{@html commentHTML}
					</div>

					<div class="flex gap-2">
						<div class="flex gap-1">
							<button class="fill-gray-400"
								><Icon height="24" width="24" name="arrowUpOutline" /></button
							>
							<p class="font-mono font-bold text-green-700">
								{comment.score_hidden ? '•' : comment.score}
							</p>
							<button class="fill-gray-400"
								><Icon height="24" width="24" name="arrowDownOutline" /></button
							>
						</div>

						<button
							class="text-sm text-gray-500 font-semibold"
							class:hidden={comment.replies.length <= 0}
							on:click={toggleChildCommentsVisibility}
							>{childCommentsHidden ? 'show child comments' : 'hide child comments'}</button
						>
					</div>
				</div>
			</div>

			{#if comment.replies.length > 0}
				<div class="flex flex-col gap-4" class:hidden={commentHidden || childCommentsHidden}>
					{#each comment.replies as reply}
						<svelte:self comment={reply} {submissionId} updateReplies={addReplies} />
					{/each}
				</div>
			{/if}
		</div>
	</div>
{:else if comment.type === 'more'}
	{#if comment.id === '_'}
		<div class="text-blue-400">Continue this thread</div>
	{:else}
		<button
			class="text-blue-400 text-left"
			disabled={loadingMoreReplies}
			on:click={async () => {
				loadingMoreReplies = true;
				await getMoreChildren();
			}}>{loadingMoreReplies ? 'Loading...' : `Load ${comment.count} more comments`}</button
		>
	{/if}
{/if}
