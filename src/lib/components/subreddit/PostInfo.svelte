<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import Icon from '$lib/components/icon/Icon.svelte';
	import UserFlair from './UserFlair.svelte';
	import RelativeTime from '$lib/components/time/RelativeTime.svelte';
	import { page } from '$app/stores';

	export let post: SubmissionData;
	export let includePostedByText: boolean = true;

	const iconDimension = '18';
</script>

<div class="info-container">
	<span
		>{includePostedByText ? 'Posted by' : ''}
		<a class="author" href="/u/{post.author}">{post.author}</a></span
	>
	<UserFlair author={post} />

	<RelativeTime
		postedTimeSeconds={post.created_utc}
		editedTimeSeconds={post.edited}
		fontSize="normal"
	/>

	{#if $page.params.subreddit?.toLowerCase() !== post.subreddit.toLowerCase()}
		<span>in <a href="/r/{post.subreddit}" class="author">r/{post.subreddit}</a></span>
	{/if}

	{#if post.distinguished === 'moderator'}<span role="img" aria-label="mod post" class="moderator"
			><Icon class="inline" height={iconDimension} width={iconDimension} name="shield" /></span
		>
	{/if}
	{#if post.distinguished === 'admin'}<span role="img" aria-label="admin post" class="admin"
			><Icon class="inline" height={iconDimension} width={iconDimension} name="reddit" /></span
		>
	{/if}
	{#if post.archived}<span role="img" aria-label="archived" class="archived"
			><Icon
				class="inline"
				height={iconDimension}
				width={iconDimension}
				name="treasureChest"
			/></span
		>
	{/if}
	{#if post.stickied || post.pinned}<span role="img" aria-label="stickied" class="pin"
			><Icon
				class="inline rotate-45"
				height={iconDimension}
				width={iconDimension}
				name="pin"
			/></span
		>
	{/if}
	{#if post.locked}<span role="img" aria-label="locked" class="lock"
			><Icon class="inline" height={iconDimension} width={iconDimension} name="lock" /></span
		>
	{/if}
</div>

<style>
	.info-container {
		color: #717677;
	}

	:global(.dark) .info-container {
		color: #878b8c;
	}

	.author {
		font-weight: 700;
		color: #444075;
	}

	:global(.dark) .author {
		color: #aeaedd;
	}

	div > :global(*) {
		vertical-align: middle;
	}

	.moderator,
	.admin,
	.archived,
	.lock,
	.pin {
		display: inline-block;
	}

	.pin {
		fill: #58ad5a;
	}

	:global(.dark) .pin {
		fill: #75d377;
	}

	.lock {
		fill: #e7c129;
	}

	.archived {
		fill: #ffd635;
	}

	:global(.dark) .archived {
		fill: #f3d766;
	}

	.admin {
		fill: rgb(255, 88, 91);
	}

	:global(.dark) .admin {
		fill: rgb(255, 88, 91);
	}

	.moderator {
		fill: #4b9c4c;
	}

	:global(.dark) .moderator {
		fill: #57a858;
	}
</style>
