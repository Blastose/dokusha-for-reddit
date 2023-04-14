<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import RedditHtml from '$lib/components/reddit-html/RedditHtml.svelte';
	import PostInfo from './PostInfo.svelte';
	import PostTitle from './PostTitle.svelte';
	import { markdownToHtml } from '$lib/utils/markdownToHtml';
	import { submissionStore } from '$lib/stores/submissionStore';
	import Icon from '$lib/components/icon/Icon.svelte';
	import CardImage from './CardImage.svelte';
	import CommentBox from './CommentBox.svelte';

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
	<div class="text-sm font-semibold">
		<PostInfo {post} />
	</div>
	<div class="text-lg">
		<PostTitle {post} />
	</div>

	{#if post.is_self && post.selftext && !post.spoiler}
		<div class="selftext">
			<div class="card-selftext">
				<RedditHtml rawHTML={markdownToHtml(post.selftext)} fixedSize={false} />
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

		<CommentBox {post} {setSubmissionStore} />
	</div>
</div>

<style>
	.card-container {
		padding: 1rem;
		border-radius: 0.375rem;
		background-color: #edeef6;
		display: grid;
		grid-auto-flow: row;
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
		gap: 0.75rem;
		flex-wrap: wrap;
	}
</style>
