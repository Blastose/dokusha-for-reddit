<script lang="ts">
	import RedditHtml from '$lib/components/reddit-html/RedditHtml.svelte';
	import UserFlair from '$lib/components/subreddit/UserFlair.svelte';
	import Flair from '$lib/components/subreddit/Flair.svelte';
	import PostTag from '$lib/components/subreddit/PostTag.svelte';
	import PostInfo from '$lib/components/subreddit/PostInfo.svelte';
	import type { SubmissionData } from 'jsrwrap/types';
	import { markdownToHtml } from '$lib/utils/markdownToHtml';
	import relativeTime from '$lib/utils/relativeTime';
	import Icon from '../icon/Icon.svelte';

	export let submission: SubmissionData;
</script>

<div class="flex flex-col gap-4">
	<div>
		<div>
			{#if submission.link_flair_text}
				<Flair linkFlair={submission} />
			{/if}
			<p class="font-bold text-xl">{submission.title}</p>
			<PostTag postTag={submission} />
		</div>
		<a href="/r/{submission.subreddit}" class="text-sm font-bold">r/{submission.subreddit}</a>
		<PostInfo post={submission} />

		<div class="flex items-center gap-2">
			<p class="author text-lg">
				{submission.author}
			</p>

			<UserFlair author={submission} />

			<p class="time">|</p>

			<p class="time">
				<span title={new Date(submission.created_utc * 1000).toString()}
					>{relativeTime(submission.created_utc)}</span
				>
				{#if typeof submission.edited === 'number'}
					<span title={new Date(submission.edited * 1000).toString()}
						>* (edited {relativeTime(submission.edited)})</span
					>
				{/if}
			</p>
		</div>

		{#if !submission.is_self}
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
	</div>

	<RedditHtml rawHTML={markdownToHtml(submission.selftext)} />

	<div>
		<p class="flex gap-1">
			<span class="font-mono font-bold text-teal-500">{submission.score} points</span><span
				class="font-mono font-bold">|</span
			><span class="font-mono font-bold text-teal-400">{submission.num_comments} comments</span>
		</p>
	</div>
</div>

<style>
	.author {
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 700;
		color: #a8681f;
	}

	:global(.dark) .author {
		color: #c2ab8c;
	}

	.time {
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 600;
		color: #717677;
	}

	:global(.dark) .time {
		color: #878b8c;
	}
</style>
