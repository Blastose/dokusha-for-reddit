<script lang="ts">
	import type { Comment } from 'jsrwrap/types';
	import UserFlair from '$lib/components/subreddit/UserFlair.svelte';
	import RelativeTime from '$lib/components/time/RelativeTime.svelte';
	import Icon from '$lib/components/icon/Icon.svelte';

	export let comment: Comment;
	export let commentHidden: boolean;
	export let toggleCommentVisibility: () => void;
</script>

<div class:italic={commentHidden}>
	<a class="author" href="/u/{comment.author}">{comment.author}</a>
	<UserFlair author={comment} />
	{#if comment.distinguished === 'moderator'}
		<span class="mod author">MOD</span>
	{:else if comment.is_submitter}
		<span class="submitter author">OP</span>
	{/if}

	{#if comment.stickied}
		<span class="text-sm align-middle font-semibold mod">*stickied comment*</span>
	{/if}

	{#if comment.locked}
		<span role="img" aria-label="locked" class="lock"
			><Icon class="inline" height={'12'} width={'12'} name="lock" /></span
		>
	{/if}

	<RelativeTime
		postedTimeSeconds={comment.created_utc}
		editedTimeSeconds={comment.edited}
		fontSize="small"
	/>

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

	.lock {
		display: inline-flex;
		vertical-align: middle;
		fill: #e7c129;
	}
</style>
