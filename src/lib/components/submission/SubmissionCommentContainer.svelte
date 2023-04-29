<script lang="ts">
	import Comment from '$lib/components/comment/Comment.svelte';
	import type { CommentFull, Sort } from 'jsrwrap/types';

	export let comments: CommentFull[];
	export let submissionId: string;
	export let suggestedSort: Sort;
</script>

<div class="flex flex-col gap-8">
	{#each comments as comment, index}
		{#if comment.type === 'comment'}
			<Comment {comment} {submissionId} {suggestedSort} />
		{:else}
			<Comment
				{comment}
				{submissionId}
				{suggestedSort}
				updateReplies={(moreId, children) => {
					// This needs to be in an anonymous function since we need
					// value.comments to be reactive and update it
					const moreIndex = comments.findIndex((value) => value.id === moreId);
					comments.splice(moreIndex, 1);

					comments = comments.concat(children);
				}}
			/>
		{/if}
		{#if index !== comments.length - 1}
			<hr />
		{/if}
	{/each}
</div>

<style>
	hr {
		align-self: center;
		width: 66%;
	}

	:global(.dark) hr {
		border-color: rgba(88, 88, 88, 0.452);
	}
</style>
