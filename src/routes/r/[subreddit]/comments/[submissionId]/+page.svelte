<script lang="ts">
	import Comment from '$lib/components/Comment.svelte';
	import type Snoowrap from 'snoowrap';
	import relativeTime from '$lib/relativeTime';

	export let data: { submission: Snoowrap.Submission };
	console.log(data.submission);
</script>

<svelte:head><title>{data.submission.title} : {data.submission.subreddit}</title></svelte:head>

<main class="container mx-auto px-4">
	<div class="flex flex-col gap-2">
		<div class="flex flex-col gap-2">
			<div>
				<p class="font-bold text-2xl">
					{#if data.submission.is_self}
						{data.submission.title}
					{:else}
						<a href={data.submission.url} data-sveltekit-prefetch>
							{data.submission.title}
						</a>
					{/if}
					<span class="text-gray-700 font-normal text-xl">({data.submission.domain})</span>
				</p>
				<p>
					submitted
					<span title={new Date(data.submission.created_utc * 1000).toString()}>
						{relativeTime(data.submission.created_utc)}
					</span>
					by
					<span class="text-blue-500">{data.submission.author}</span>
				</p>
				<p>
					{data.submission.score} points ({Math.round(data.submission.upvote_ratio * 100)}% upvoted)
				</p>
			</div>
			{#if data.submission.selftext_html}
				<div class="reddit-md max-w-4xl bg-gray-200 p-4 rounded-md">
					{@html data.submission.selftext_html}
				</div>
			{/if}
		</div>

		<span>{data.submission.num_comments} comments</span>
		<div class="flex flex-col gap-2 px-4 py-2 bg-gray-200 rounded-md">
			{#if data.submission.num_comments > 0}
				{#each data.submission.comments as comment}
					<Comment {comment} />
				{/each}
			{:else}
				<p>No comments</p>
			{/if}
		</div>
	</div>
</main>
