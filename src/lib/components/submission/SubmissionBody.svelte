<script lang="ts">
	import RedditHtml from '$lib/components/reddit-html/RedditHtml.svelte';
	import Flair from '$lib/components/subreddit/Flair.svelte';
	import PostTag from '$lib/components/subreddit/PostTag.svelte';
	import PostInfo from '$lib/components/subreddit/PostInfo.svelte';
	import type { SubmissionData } from 'jsrwrap/types';
	import { markdownToHtml } from '$lib/utils/markdownToHtml';
	import Icon from '../icon/Icon.svelte';
	import RedditImage from '../reddit-image/RedditImage.svelte';
	import RedditGallery from '../reddit-image/RedditGallery.svelte';
	import RedditVideo from '../reddit-image/RedditVideo.svelte';
	import { getRedditImageUrlPreview } from '$lib/utils/redditImagePreview';
	import SubmissionActions from './SubmissionActions.svelte';

	export let submission: SubmissionData;
	let sourceHidden = true;

	function toggleSourceVisibility() {
		sourceHidden = !sourceHidden;
	}

	function countNewLinesInSource(source: string) {
		return (source.match(/\n/g) || []).length;
	}
</script>

<div class="flex flex-col gap-4">
	<div>
		<div>
			{#if submission.link_flair_text}
				<Flair linkFlair={submission} />
			{/if}
			<div class="max-w-4xl">
				<span class="font-bold text-2xl">{submission.title}</span>
				<PostTag postTag={submission} />
			</div>
		</div>

		<div class="text-sm font-semibold">
			<PostInfo post={submission} />
		</div>

		{#if submission.removed_by_category}
			<div class="my-2 px-2 py-1 w-fit border border-red-600 rounded-md">
				{#if submission.removed_by_category === 'moderator'}
					<p>Sorry, this post has been removed by the moderators of r/{submission.subreddit}.</p>
				{:else if submission.removed_by_category === 'deleted'}
					<p>Sorry, this post was deleted by the person who originally posted it.</p>
				{:else if submission.removed_by_category === 'reddit'}
					<p>Sorry, this post was removed by Reddit's spam filters.</p>
				{/if}
			</div>
		{/if}

		{#if !submission.is_self && submission.url}
			<div class="reddit-md">
				<a href={submission.url} target="_blank" rel="noopener noreferrer"
					>{submission.url}<Icon
						class="inline text-blue-400"
						height="20"
						width="20"
						name="externalLink"
					/></a
				>
			</div>
		{/if}
		{#if submission.thumbnail}
			<div>
				{#if !submission.is_gallery && !submission.is_video && submission.post_hint === 'image'}
					<RedditImage imageUrl={getRedditImageUrlPreview(submission) ?? ''} />
				{:else if submission.is_gallery}
					<RedditGallery post={submission} />
				{:else if submission.is_video}
					<RedditVideo post={submission} />
				{/if}
			</div>
		{/if}
	</div>

	<RedditHtml
		rawHTML={markdownToHtml(submission.selftext, { media_metadata: submission.media_metadata })}
	/>

	{#if !sourceHidden && submission.selftext}
		<div class="w-full">
			<textarea
				disabled
				name=""
				id=""
				rows={countNewLinesInSource(submission.selftext) + 2}
				value={submission.selftext}
			/>
		</div>
	{/if}

	<div class="flex flex-col gap-1">
		<p class="flex gap-4">
			<span class="font-bold text-[#5b74aa]">{submission.score} points</span>
			<span class="font-bold text-[#9693bb]">{submission.num_comments} comments</span>
		</p>
		<SubmissionActions {submission} {sourceHidden} {toggleSourceVisibility} />
	</div>
</div>

<style>
	textarea {
		resize: both;
		padding: 0.5rem;
		border-radius: 0.375rem;
		background-color: rgb(238, 242, 248);
		width: 100%;
	}

	:global(.dark) textarea {
		background-color: rgb(54, 54, 58);
	}

	textarea:focus {
		outline: none;
	}
</style>
