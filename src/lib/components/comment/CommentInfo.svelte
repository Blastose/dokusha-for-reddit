<script lang="ts">
	import type { Comment } from 'jsrwrap/types';
	import relativeTime from '$lib/utils/relativeTime';
	import UserFlair from '$lib/components/subreddit/UserFlair.svelte';
	import { nowStore } from '$lib/stores/nowStore';

	export let comment: Comment;
	export let commentHidden: boolean;
	export let toggleCommentVisibility: () => void;
</script>

<div class:italic={commentHidden}>
	<span class="author">{comment.author}</span>
	<UserFlair author={comment} />
	{#if comment.distinguished === 'moderator'}
		<span class="mod author">MOD</span>
	{:else if comment.is_submitter}
		<span class="submitter author">OP</span>
	{/if}

	{#if comment.stickied}
		<span class="text-sm align-middle font-semibold mod">*stickied comment*</span>
	{/if}

	<span class="time" title={new Date(comment.created_utc * 1000).toString()}
		>{relativeTime($nowStore, comment.created_utc)}</span
	>
	{#if typeof comment.edited === 'number'}
		<span class="time" title={new Date(comment.edited * 1000).toString()}
			>* (edited {relativeTime($nowStore, comment.edited)})</span
		>
	{/if}

	{#if commentHidden}
		<button class="expand-button" aria-label="expand comment" on:click={toggleCommentVisibility}
			>[+]</button
		>
	{/if}
</div>

<style>
	.author {
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 700;
		color: #444075;
		vertical-align: middle;
	}

	:global(.dark) .author {
		color: #aeaedd;
	}

	.time {
		font-size: 0.75rem;
		line-height: 1rem;
		font-weight: 600;
		color: #717677;
		vertical-align: middle;
	}

	:global(.dark) .time {
		color: #878b8c;
	}

	.submitter,
	:global(.dark) .submitter {
		color: rgb(99, 145, 214);
	}

	.mod {
		color: #3a853c;
	}

	:global(.dark) .mod {
		color: #57a858;
	}

	.expand-button:hover {
		text-decoration: underline;
	}
</style>
