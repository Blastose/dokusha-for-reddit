<script lang="ts">
	import relativeTime from '$lib/relativeTime';
	import type Snoowrap from 'snoowrap';

	export let showSubredditName = false;
	export let submission: Snoowrap.Submission;
	// console.log(submission);

	// default is for link's w/o thumbnails?
	const nonThumbnailSrcs = ['self', 'spoiler', 'default', 'nsfw', ''];
</script>

<div class="post-container {submission.thumbnail === '' ? 'post-container-no-thumbs' : ''}">
	<div class="flex items-center justify-center">
		{submission.score}
	</div>

	{#if !nonThumbnailSrcs.includes(submission.thumbnail)}
		<div class="w-[70px] h-[70px]">
			<img
				class="rounded-sm"
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

	<div class="flex flex-col">
		<p>
			<a
				class={submission.stickied
					? 'text-green-700 dark:text-green-400'
					: 'text-blue-700 dark:text-[#e2e2e2]'}
				href={submission.is_self
					? `/r/${submission.subreddit}/comments/${submission.id}`
					: submission.url}
				data-sveltekit-prefetch
			>
				<span class="font-bold">{submission.title}</span>
			</a>
			<span class="text-gray-700 dark:text-gray-400 text-sm">({submission.domain})</span>
		</p>

		<div class="text-sm">
			<p>
				submitted
				<span title={new Date(submission.created_utc * 1000).toString()}>
					{relativeTime(submission.created_utc)}
				</span>
				{#if typeof submission.edited === 'number'}
					<span title={new Date(submission.edited * 1000).toString()}>
						* (last edited {relativeTime(submission.edited)})
					</span>
				{/if}by
				<span class="text-blue-700 dark:text-[#e2e2e2] font-bold">{submission.author}</span>
				{#if showSubredditName}
					to
					<span>
						<a href={`/r/${submission.subreddit}`} class="text-blue-700 dark:text-blue-400"
							>/r/{submission.subreddit}</a
						>
					</span>
				{/if}
			</p>
			<a href={`/r/${submission.subreddit}/comments/${submission.id}`} data-sveltekit-prefetch>
				<span class="font-semibold">{submission.num_comments} comments</span>
			</a>
		</div>
	</div>
</div>

<style>
	.post-container {
		display: grid;
		border-radius: 0.375rem;
		padding: 0.25rem;
		column-gap: 0.5rem;
		grid-template-areas: 'score thumbnail main';
		grid-template-columns: 50px 70px 1fr;
	}

	.post-container-no-thumbs {
		grid-template-columns: 50px 0px 1fr;
	}
</style>
