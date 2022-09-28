<script lang="ts">
	import relativeTime from '$lib/relativeTime';
	import type Snoowrap from 'snoowrap';

	export let showSubredditName = false;
	export let submission: Snoowrap.Submission;
	// console.log(submission);

	// default is for link's w/o thumbnails?
	const nonThumbnailSrcs = ['self', 'spoiler', 'default', 'nsfw', ''];
</script>

<div class="container bg-[#d6dbe0]">
	<div class="flex items-center justify-center">
		{submission.score}
	</div>

	{#if !nonThumbnailSrcs.includes(submission.thumbnail)}
		<div class="w-[70px] h-[70px]">
			<img
				src={submission.thumbnail}
				alt="thumbnail"
				width={submission.thumbnail_width}
				height={submission.thumbnail_height}
			/>
		</div>
	{:else}
		<div class="w-[70px] h-[70px] flex items-center justify-center">
			{submission.thumbnail}
		</div>
	{/if}

	<div class="flex flex-col gap-1 rounded">
		<p>
			<a
				class={submission.stickied ? 'text-green-700' : 'text-blue-700'}
				href={submission.is_self
					? `/r/${submission.subreddit}/comments/${submission.id}`
					: submission.url}
				data-sveltekit-prefetch
			>
				<span class="font-medium">{submission.title}</span>
			</a>
			<span class="text-gray-700 text-sm">({submission.domain})</span>
		</p>

		<div class="text-sm">
			<p>
				submitted
				<span title={new Date(submission.created_utc * 1000).toString()}>
					{relativeTime(submission.created_utc)}
				</span>
				by
				<span class="text-blue-700">{submission.author}</span>
				{#if showSubredditName}
					to
					<span>
						<a href={`/r/${submission.subreddit}`} class="text-blue-700"
							>/r/{submission.subreddit}</a
						>
					</span>
				{/if}
			</p>
			<a href={`/r/${submission.subreddit}/comments/${submission.id}`} data-sveltekit-prefetch>
				<span>{submission.num_comments} comments</span>
			</a>
		</div>
	</div>
</div>

<style>
	.container {
		display: grid;
		border-radius: 0.375rem;
		padding: 0.25rem;
		column-gap: 0.5rem;
		grid-template-areas: 'score thumbnail main';
		grid-template-columns: 50px 70px 1fr;
	}
</style>
