<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import Icon from '$lib/components/icon/Icon.svelte';
	import { submissionStore } from '$lib/stores/submissionStore';
	import Thumbnail from './Thumbnail.svelte';
	import PostTitle from './PostTitle.svelte';
	import PostInfo from './PostInfo.svelte';
	import CommentBox from './CommentBox.svelte';
	import RedditHtml from '$lib/components/reddit-html/RedditHtml.svelte';
	import { markdownToHtml } from '$lib/utils/markdownToHtml';
	import RedditImage from '../reddit-image/RedditImage.svelte';
	import RedditGallery from '../reddit-image/RedditGallery.svelte';

	export let post: SubmissionData;

	const formatter = Intl.NumberFormat('en', { notation: 'compact' });

	function setSubmissionStore() {
		submissionStore.set(post);
	}

	function formatNumber(n: number) {
		return formatter.format(n);
	}

	const nonThumbnailSrcs = ['self', 'spoiler', 'default', 'nsfw', 'image', ''];
	$: postHasThumbnail = !nonThumbnailSrcs.includes(post.thumbnail);

	let expandPost = false;

	function toggleExpand() {
		expandPost = !expandPost;
	}
</script>

<div class={`classic-container ${post.thumbnail !== '' ? 'thumbnail' : ''}`}>
	<div class="score">
		<button aria-label="upvote">
			<Icon height="24" width="24" name="arrowUpOutline" />
		</button>

		<p class="score-number">
			{formatNumber(post.score)}
		</p>

		<button aria-label="downvote">
			<Icon height="24" width="24" name="arrowDownOutline" />
		</button>
	</div>

	<Thumbnail hasThumbnail={postHasThumbnail} {post} />

	<div class="title">
		<PostTitle {post} />
	</div>

	<div class="post-info text-sm font-semibold">
		<PostInfo {post} />
	</div>

	<div class="actions text-sm font-semibold">
		<button class="expand-btn" aria-label="expand post" on:click={toggleExpand}>
			{#if !expandPost}
				<Icon class="rotate-90" height="24" width="24" name="arrowExpand" />
			{:else}
				<Icon class="rotate-90" height="24" width="24" name="arrowCollapse" />
			{/if}
		</button>

		<CommentBox {post} {setSubmissionStore} />
	</div>

	{#if expandPost && post.is_self && post.selftext}
		<div class="selftext">
			<RedditHtml rawHTML={markdownToHtml(post.selftext)} fixedSize={false} />
		</div>
	{:else if expandPost && post.thumbnail}
		{#if !post.is_gallery && !post.is_video}
			<div class="selftext">
				<RedditImage {post} />
				{#if post.selftext}
					<RedditHtml rawHTML={markdownToHtml(post.selftext)} fixedSize={false} />
				{/if}
			</div>
		{:else if post.is_gallery}
			<RedditGallery {post} />
		{/if}
	{/if}
</div>

<style>
	.classic-container {
		display: grid;
		border-radius: 0.375rem;
		transition: box-shadow 150ms;
		padding: 0.75rem 1rem;
		background-color: #edeef6;

		grid-template-columns: 2rem 1fr;
		grid-template-rows: min-content min-content min-content min-content;

		grid-template-areas:
			'score title'
			'score post-info'
			'score actions'
			'score selftext';

		column-gap: 1rem;
	}

	:global(.dark) .classic-container {
		background-color: #2d2e2e;
	}

	.classic-container.thumbnail {
		grid-template-columns: 2rem 70px 1fr;
		grid-template-rows: min-content min-content min-content min-content;

		grid-template-areas:
			'score thumbnail title'
			'score thumbnail post-info'
			'score thumbnail actions'
			'score thumbnail selftext';

		column-gap: 0.5rem;
	}

	.score {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		grid-area: score;
	}

	.score-number {
		/* font-size: 0.875rem;
		line-height: 1.25rem; */
		font-weight: 600;
	}

	.title {
		grid-area: title;
	}

	.post-info {
		grid-area: post-info;
		color: #4e4d55;
	}

	:global(.dark) .post-info {
		color: #d8d9dd;
	}

	.actions {
		grid-area: actions;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		margin-top: 0.25rem;
	}

	.selftext {
		grid-area: selftext;
		max-width: 100%;
	}

	.expand-btn {
		padding: 0.125rem;
		border-radius: 0.375rem;
		transition-duration: 300ms;
	}

	.expand-btn:hover {
		background-color: rgba(198, 198, 211, 0.459);
	}

	:global(.dark) .expand-btn:hover {
		background-color: rgba(146, 146, 155, 0.212);
	}
</style>
