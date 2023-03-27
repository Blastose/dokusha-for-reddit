<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import Icon from '$lib/components/icon/Icon.svelte';
	import { submissionStore } from '$lib/stores/submissionStore';
	import Thumbnail from './Thumbnail.svelte';
	import PostTitle from './PostTitle.svelte';
	import PostInfo from './PostInfo.svelte';

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
		<button aria-label="expand post">
			<Icon class="rotate-90" height="24" width="24" name="arrowExpand" />
		</button>

		<a
			class="outline outline-1 focus-visible:outline-2 rounded-sm px-2 py-1 flex gap-1 items-center w-fit"
			href={post.permalink}
			on:click={setSubmissionStore}
		>
			<Icon height="20" width="20" name="comment" /><span>{post.num_comments} comments</span>
		</a>
	</div>
</div>

<style>
	.classic-container {
		display: grid;
		border-radius: 0.375rem;
		transition: box-shadow 150ms;
		padding: 0.75rem 1rem;
		background-color: #edeef6;

		grid-template-columns: 2rem 1fr;
		grid-template-rows: min-content min-content min-content;

		grid-template-areas:
			'score title'
			'score post-info'
			'score actions';

		column-gap: 1rem;
	}

	:global(.dark) .classic-container {
		background-color: #2d2e2e;
	}

	.classic-container.thumbnail {
		grid-template-columns: 2rem 70px 1fr;
		grid-template-rows: min-content min-content min-content;

		grid-template-areas:
			'score thumbnail title'
			'score thumbnail post-info'
			'score thumbnail actions';

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
		gap: 0.5rem;
		margin-top: 0.5rem;
	}
</style>
