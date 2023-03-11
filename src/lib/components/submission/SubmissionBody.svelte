<script lang="ts">
	import type { SubmissionData } from 'jsrwrap';
	import { purify } from '$lib/utils/purify';
	import { replaceHtml } from '$lib/utils/replaceHtml';
	import relativeTime from '$lib/utils/relativeTime';
	import Icon from '../icon/Icon.svelte';

	export let submission: SubmissionData;
</script>

<div class="flex flex-col gap-4">
	<div>
		<p class="font-bold text-xl">{submission.title}</p>
		<a href="/r/{submission.subreddit}" class="text-sm font-bold">r/{submission.subreddit}</a>

		<div class="flex items-center gap-2">
			<p class="author text-lg">
				{submission.author}
			</p>

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

	<div class="reddit-md max-w-4xl">
		{@html purify(replaceHtml(submission.selftext))}
	</div>

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