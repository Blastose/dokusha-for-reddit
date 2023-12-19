<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import RedditHtml from '$lib/components/reddit-html/RedditHtml.svelte';
	import PostInfo from './PostInfo.svelte';
	import { markdownToHtml } from '$lib/utils/markdownToHtml';
	import { submissionStore } from '$lib/stores/submissionStore';
	import Icon from '$lib/components/icon/Icon.svelte';
	import CardImage from './CardImage.svelte';
	import CommentBox from './CommentBox.svelte';
	import PostTag from './PostTag.svelte';
	import Flair from './Flair.svelte';
	import Thumbnail from './Thumbnail.svelte';

	const formatter = Intl.NumberFormat('en', { notation: 'compact' });

	function stripTrailingSlashFromRedditPermalink(s: string) {
		// All reddit permalink from their API response end with a `/`
		// We need to remove this for the `:visited` selector since we redirect
		// trailing backslashes to non-trailing backslashes links
		return s.substring(0, s.length - 1);
	}

	const nonThumbnailSrcs = ['self', 'spoiler', 'default', 'nsfw', 'image', ''];
	$: postHasThumbnail = !nonThumbnailSrcs.includes(post.thumbnail);

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
		<PostInfo {post} includePostedByText={false} />
	</div>
	<!-- TODO add stylign from PostTitle.svelte or something -->
	<div class="flex flex-col gap-1">
		{#if post.link_flair_text}
			<div class="flex flex-wrap gap-2">
				<Flair linkFlair={post} />
				<PostTag postTag={post} />
			</div>
		{/if}
		<div class="flex justify-between gap-4">
			<div>
				<div class="max-w-4xl">
					<a
						href={stripTrailingSlashFromRedditPermalink(post.permalink)}
						on:click={setSubmissionStore}
						class="font-bold">{post.title}</a
					>
				</div>
				{#if !post.is_self && post.url}
					<div class="reddit-md">
						<a href={post.url} target="_blank" rel="noopener noreferrer"
							>{post.url}<Icon
								class="inline text-blue-400"
								height="20"
								width="20"
								name="externalLink"
							/></a
						>
					</div>
				{/if}
			</div>

			<!-- TODO hide thumbnail if we show the post contents below -->
			{#if post.thumbnail && !post.is_self && post.url}
				<div class="max-w-[100px] rounded-md overflow-hidden">
					<a href={post.url}>
						<Thumbnail hasThumbnail={postHasThumbnail} {post} />
					</a>
				</div>
			{/if}
		</div>
	</div>

	{#if post.is_self && post.selftext && !post.spoiler}
		<div class="selftext">
			<div class="card-selftext text-neutral-400">
				<RedditHtml
					rawHTML={markdownToHtml(post.selftext, { media_metadata: post.media_metadata })}
					fixedSize={false}
				/>
			</div>
		</div>
	{/if}

	<CardImage {post} />

	<div class="actions">
		<div class="votes-container">
			<button aria-label="upvote">
				<Icon height="24" width="24" name="arrowUpOutline" />
			</button>

			<p class="font-bold text-center w-11">
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
		/* background-color: #edeef6; */
		display: grid;
		grid-auto-flow: row;
		gap: 0.5rem;
	}

	:global(.dark) .card-container:hover {
		background-color: #303237;
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

	:global(.dark) .card-container:hover .selftext::after {
		background-image: linear-gradient(to top, #303237, #ffffff00);
	}

	:global(.dark) .selftext::after {
		background-image: linear-gradient(to top, #292b2f, #ffffff00);
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
