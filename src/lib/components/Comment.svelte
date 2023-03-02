<script lang="ts">
	import type { CommentFull, Submission } from 'jsrwrap';
	import { marked } from 'marked';
	import DOMPurify from 'isomorphic-dompurify';

	export let comment: CommentFull;
	export let submissionId: string;
	export let updateReplies: ((moreId: string, children: CommentFull[]) => void) | null = null;

	function replaceHtml(text: string) {
		let replaced = text.replace(/&gt;/g, '>');
		replaced = replaced.replace(/&lt;/g, '<');
		replaced = replaced.replace(/&quot;/g, '"');
		replaced = replaced.replace(/&apos;/g, "'");
		replaced = replaced.replace(/&amp;/g, '&');
		return replaced;
	}

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

	$: commentBody = comment.type === 'comment' ? comment.body : '';
	$: commentHTML = DOMPurify.sanitize(marked.parse(replaceHtml(commentBody)));
	let loadingMoreReplies = false;
</script>

{#if comment.type === 'comment'}
	<div class={comment.depth > 0 ? 'ml-8' : ''}>
		<p>{comment.author}</p>

		<div class="reddit-md">
			{@html commentHTML}
		</div>

		<button
			on:click={() => {
				if (comment && comment.type === 'comment') {
					comment.replies = [];
				}
			}}>Remove replies</button
		>

		{#if comment.replies.length > 0}
			<div>
				{#each comment.replies as reply}
					<svelte:self comment={reply} {submissionId} updateReplies={addReplies} />
				{/each}
			</div>
		{/if}
	</div>
{:else if comment.type === 'more'}
	{#if comment.id === '_'}
		<div class="text-blue-400">Continue this thread</div>
	{:else}
		<button
			class="text-blue-400"
			disabled={loadingMoreReplies}
			on:click={async () => {
				loadingMoreReplies = true;
				await getMoreChildren();
			}}>Load {comment.count} more comments</button
		>
	{/if}
{/if}
