<script lang="ts">
	import type { SubmissionData } from 'jsrwrap';
	import PostInfo from './PostInfo.svelte';
	import PostTitle from './PostTitle.svelte';
	import { purify } from '$lib/utils/purify';
	import { submissionStore } from '$lib/stores/submissionStore';
	import Icon from '$lib/components/icon/Icon.svelte';
	import CardImage from './CardImage.svelte';

	const formatter = Intl.NumberFormat('en', { notation: 'compact' });

	function setSubmissionStore() {
		submissionStore.set(post);
	}

	function formatNumber(n: number) {
		return formatter.format(n);
	}

	export let post: SubmissionData;
</script>

<div class="card-container">
	<div>
		<PostInfo {post} />
	</div>
	<div class="text-lg">
		<PostTitle {post} />
	</div>

	{#if post.is_self && !post.spoiler}
		<div class="selftext">
			<div class="card-selftext reddit-md">
				{@html purify(post.selftext)}
			</div>
		</div>
	{/if}

	<CardImage {post} />

	<div class="actions">
		<div class="votes-container">
			<button aria-label="upvote">
				<Icon height="24" width="24" name="arrowUpOutline" />
			</button>

			<p class="font-bold text-center w-11 font-mono">
				{post.hide_score ? '•' : `${formatNumber(post.score)}`}
			</p>

			<button aria-label="downvote">
				<Icon height="24" width="24" name="arrowDownOutline" />
			</button>
		</div>

		<a
			class="text-sm outline outline-1 focus-visible:outline-2 rounded-sm px-2 py-1 flex gap-1 items-center w-fit"
			href={post.permalink}
			on:click={setSubmissionStore}
		>
			<Icon height="20" width="20" name="comment" /><span>{post.num_comments} comments</span>
		</a>
	</div>
</div>

<style>
	.card-container {
		padding: 1rem;
		border-radius: 0.375rem;
		background-color: #edeef6;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	:global(.dark) .card-container {
		background-color: #2d2e2e;
	}

	.selftext {
		position: relative;
		overflow: hidden;
	}

	.selftext::after {
		content: '';
		width: 100%;
		height: 2.5rem;
		position: absolute;
		left: 0;
		bottom: 0;
		background-image: linear-gradient(to top, #edeef6, #ffffff00);
	}

	:global(.dark) .selftext::after {
		background-image: linear-gradient(to top, #2d2e2e, #ffffff00);
	}

	.card-selftext {
		max-height: 8rem;
	}

	.votes-container {
		display: flex;
		gap: 0.125rem;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}
</style>
