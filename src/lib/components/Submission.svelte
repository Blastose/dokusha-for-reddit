<script lang="ts">
	import { page } from '$app/stores';
	import type Snoowrap from 'snoowrap';
	export let submission: Snoowrap.Submission;
	console.log(submission);
</script>

<!-- <div class="flex gap-2">
	<span>{submission.ups}</span>
	<a
		class={submission.stickied ? 'text-green-700' : 'text-blue-700'}
		href={`${$page.url.pathname}/comments/${submission.id}`}
	>
		<span>{submission.title}</span>
	</a>
	<span>{submission.num_comments} comments</span>
</div> -->

<div class="card">
	<div class="flex items-center justify-center">
		{submission.score}
	</div>

	{#if submission.thumbnail !== 'self' && submission.thumbnail !== 'spoiler' && submission.thumbnail !== 'nsfw'}
		<div class="w-[70px] h-[70px]">
			<img
				src={submission.thumbnail}
				alt="thumbnail"
				width={submission.thumbnail_width}
				height={submission.thumbnail_height}
			/>
		</div>
	{:else}
		<div class="w-[70px] h-[70px]" />
	{/if}

	<div class="flex flex-col gap-1 rounded">
		<a
			class={submission.stickied ? 'text-green-700' : 'text-blue-700'}
			href={`/r/${submission.subreddit}/comments/${submission.id}`}
		>
			<span class="font-medium">{submission.title}</span>
		</a>

		<div class="text-sm">
			<p>
				submitted {new Date(submission.created_utc * 1000).toLocaleString()} by
				<span class="text-blue-700">{submission.author}</span>
			</p>
			<a href={`/r/${submission.subreddit}/comments/${submission.id}`}>
				<span>{submission.num_comments} comments</span>
			</a>
		</div>
	</div>
</div>

<style>
	.card {
		display: grid;
		background-color: rgb(199, 199, 199);
		border-radius: 0.375rem;
		padding: 0.25rem;
		column-gap: 0.5rem;
		grid-template-areas: 'score thumbnail main';
		grid-template-columns: 50px 70px 1fr;
	}
</style>
