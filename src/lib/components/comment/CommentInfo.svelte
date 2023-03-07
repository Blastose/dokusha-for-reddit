<script lang="ts">
	import type { Comment } from 'jsrwrap';
	import relativeTime from '$lib/utils/relativeTime';

	export let comment: Comment;
	export let commentHidden: boolean;
	export let toggleCommentVisibility: () => void;
</script>

<div class="info-container" class:italic={commentHidden}>
	<p class="author">
		{comment.author}
	</p>

	{#if comment.is_submitter}
		<span class="submitter author">OP</span>
	{/if}

	<p class="time">|</p>

	<p class="time">
		<span title={new Date(comment.created * 1000).toString()}
			>{relativeTime(comment.created_utc)}</span
		>
		{#if typeof comment.edited === 'number'}
			<span title={new Date(comment.edited * 1000).toString()}
				>* (edited {relativeTime(comment.edited)})</span
			>
		{/if}
	</p>

	{#if commentHidden}
		<button class="expand-button" aria-label="expand comment" on:click={toggleCommentVisibility}
			>[+]</button
		>
	{/if}
</div>

<style>
	.info-container {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}

	.author {
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 700;
		color: #a8681f;
	}

	:global(.dark) .author {
		color: #c2ab8c;
	}

	.time {
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 600;
		color: #717677;
	}

	:global(.dark) .time {
		color: #878b8c;
	}

	.author.submitter {
		color: rgb(99, 145, 214);
	}

	.expand-button:hover {
		text-decoration: underline;
	}
</style>
