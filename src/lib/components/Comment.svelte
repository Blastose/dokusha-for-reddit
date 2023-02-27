<script lang="ts">
	import type { CommentFull } from 'jsrwrap';
	import { marked } from 'marked';
	import DOMPurify from 'isomorphic-dompurify';
	export let comment: CommentFull;

	const commentBody = comment && comment.type === 'comment' ? comment.body : '';
	const commentHTML = DOMPurify.sanitize(marked.parse(commentBody));
</script>

{#if comment && comment.type === 'comment'}
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
					<svelte:self comment={reply} />
				{/each}
			</div>
		{/if}
	</div>
{:else if comment.type === 'more'}
	<div class="text-blue-400">Load {comment.count} more comments</div>
{/if}
