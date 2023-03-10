<script lang="ts">
	import type { SubmissionData } from 'jsrwrap';
	import Icon from '$lib/components/icon/Icon.svelte';
	import { submissionStore } from '$lib/stores/submissionStore';
	import relativeTime from '$lib/utils/relativeTime';
	import Thumbnail from './Thumbnail.svelte';
	import PostTitle from './PostTitle.svelte';

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
		<p>
			Posted by {post.author}
			<span title={new Date(post.created_utc * 1000).toString()}
				>{relativeTime(post.created_utc)}</span
			>{#if typeof post.edited === 'number'}
				<span title={new Date(post.edited * 1000).toString()}
					>* (edited {relativeTime(post.edited)})</span
				>
			{/if}{#if post.stickied}<span aria-label="stickied" class="pin"
					><Icon class="inline rotate-45" height="24" width="24" name="pin" /></span
				>{/if}{#if post.locked}<span aria-label="locked" class="lock"
					><Icon class="inline" height="24" width="24" name="lock" /></span
				>{/if}
		</p>
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
	.lock,
	.pin {
		display: inline-block;
		margin: 0 0.25rem;
	}

	.pin {
		fill: #55a756;
	}

	:global(.dark) .pin {
		fill: #75d377;
	}

	.lock {
		fill: #e7c129;
	}

	.post-tags {
		display: inline-block;
		margin: 0 0.25rem;
		padding: 0rem 0.375rem;
		border-radius: 0.125rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 600;
		border: 1px solid;
	}

	.spoiler {
		color: #717677;
	}

	:global(.dark) .spoiler {
		color: #878b8c;
	}

	.nsfw {
		color: rgb(255, 88, 91);
	}

	:global(.dark) .nsfw {
		color: rgb(255, 88, 91);
	}

	.title-text {
		line-height: 1.25rem;
	}

	.classic-container {
		display: grid;
		border-radius: 0.375rem;
		transition: box-shadow 150ms;
		padding: 0.25rem 1rem;

		grid-template-columns: 2rem 1fr;
		grid-template-rows: min-content min-content min-content;

		grid-template-areas:
			'score title'
			'score post-info'
			'score actions';

		column-gap: 1rem;
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
		color: #717677;
	}

	:global(.dark) .post-info {
		color: #878b8c;
	}

	.actions {
		grid-area: actions;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}
</style>
