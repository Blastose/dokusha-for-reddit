<script lang="ts">
	import Comment from '$lib/components/Comment.svelte';
	import type Snoowrap from 'snoowrap';
	import relativeTime from '$lib/relativeTime';

	export let data: { submission: Snoowrap.Submission };
	// console.log(data.submission);
</script>

<svelte:head><title>{data.submission.title} : {data.submission.subreddit}</title></svelte:head>

<main class="w-full sm:max-w-5xl mx-auto overflow-x-hidden">
	<div class="flex flex-col gap-2">
		<div class="flex flex-col px-4 gap-2">
			<div>
				<p class="font-bold text-2xl">
					{#if data.submission.is_self}
						{data.submission.title}
					{:else}
						<a href={data.submission.url} data-sveltekit-preload-data>
							{data.submission.title}
						</a>
					{/if}
					<span class="text-gray-700 dark:text-gray-400 font-normal text-xl"
						>({data.submission.domain})</span
					>
				</p>
				<p>
					submitted
					<span title={new Date(data.submission.created_utc * 1000).toString()}>
						{relativeTime(data.submission.created_utc)}
					</span>
					{#if typeof data.submission.edited === 'number'}
						<span title={new Date(data.submission.edited * 1000).toString()}>
							* (last edited {relativeTime(data.submission.edited)})
						</span>
					{/if}by
					<span class="font-bold text-blue-600 dark:text-blue-400">{data.submission.author}</span>
				</p>
				<p>
					{data.submission.score} points ({Math.round(data.submission.upvote_ratio * 100)}% upvoted)
				</p>
			</div>
			{#if data.submission.selftext_html}
				<div class="reddit-md max-w-4xl p-2">
					{@html data.submission.selftext_html}
				</div>
			{/if}
		</div>

		<div class="flex flex-col gap-4">
			<p class="px-4">{data.submission.num_comments} comments</p>
			<div class="flex flex-col px-1 sm:px-4 gap-8">
				{#if data.submission.num_comments > 0}
					{#each data.submission.comments as comment}
						<Comment {comment} />
					{/each}
				{:else}
					<p>No comments</p>
				{/if}
			</div>
		</div>
	</div>
</main>
