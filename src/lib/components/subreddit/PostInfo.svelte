<script lang="ts">
	import type { SubmissionData } from 'jsrwrap';
	import relativeTime from '$lib/utils/relativeTime';
	import Icon from '$lib/components/icon/Icon.svelte';
	import UserFlair from './UserFlair.svelte';

	export let post: SubmissionData;

	const iconDimension = '18';
</script>

<p>
	Posted by <span>{post.author}</span>
	<UserFlair author={post} />
	<span title={new Date(post.created_utc * 1000).toString()}>{relativeTime(post.created_utc)}</span>
	{#if typeof post.edited === 'number'}
		<span title={new Date(post.edited * 1000).toString()}
			>* (edited {relativeTime(post.edited)})</span
		>
	{/if}

	{#if post.distinguished === 'moderator'}<span aria-label="mod post" class="moderator"
			><Icon class="inline" height={iconDimension} width={iconDimension} name="shield" /></span
		>
	{/if}
	{#if post.distinguished === 'admin'}<span aria-label="admin post" class="admin"
			><Icon class="inline" height={iconDimension} width={iconDimension} name="reddit" /></span
		>
	{/if}
	{#if post.archived}<span aria-label="archived" class="archived"
			><Icon
				class="inline"
				height={iconDimension}
				width={iconDimension}
				name="treasureChest"
			/></span
		>
	{/if}
	{#if post.stickied}<span aria-label="stickied" class="pin"
			><Icon
				class="inline rotate-45"
				height={iconDimension}
				width={iconDimension}
				name="pin"
			/></span
		>
	{/if}
	{#if post.locked}<span aria-label="locked" class="lock"
			><Icon class="inline" height={iconDimension} width={iconDimension} name="lock" /></span
		>
	{/if}
</p>

<style>
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
