<script lang="ts">
	import formatNumber from '$lib/formatNumber';
	import relativeTime from '$lib/relativeTime';
	import type Snoowrap from 'snoowrap';

	export let showSubredditName = false;
	export let submission: Snoowrap.Submission;
	// console.log(submission);

	// default is for link's w/o thumbnails?
	const nonThumbnailSrcs = ['self', 'spoiler', 'default', 'nsfw', ''];
</script>

<div class="post-container {submission.thumbnail === '' ? 'post-container-no-thumbs' : ''}">
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
			{#if submission.thumbnail === 'default'}
				<svg style="width:24px;height:24px" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z"
					/>
				</svg>
			{:else}
				{submission.thumbnail}
			{/if}
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

		<div class="text-sm flex flex-col gap-1">
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
				<span
					class="text-orange-700
				dark:text-[#d68a67] font-bold">{submission.author}</span
				>
				{#if showSubredditName}
					to
					<span>
						<a href={`/r/${submission.subreddit}`} class="text-blue-700 dark:text-blue-400"
							>/r/{submission.subreddit}</a
						>
					</span>
				{/if}
			</p>
			<div class="flex gap-2">
				<div class="flex gap-2 justify-center items-center">
					<svg style="width:12px;height:12px" viewBox="0 0 24 24">
						<path fill="currentColor" d="M1,21H23L12,2" />
					</svg>
					<span class="font-semibold">{formatNumber(submission.score)}</span>
					<svg transform="scale(1,-1)" style="width:12px;height:12px" viewBox="0 0 24 24">
						<path fill="currentColor" d="M1,21H23L12,2" />
					</svg>
				</div>
				<a href={`/r/${submission.subreddit}/comments/${submission.id}`} data-sveltekit-prefetch>
					<div class="flex gap-1">
						<svg style="width:20px;height:20px" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10M6,7H18V9H6V7M6,11H15V13H6V11Z"
							/>
						</svg>
						<span class="font-semibold">{submission.num_comments} comments</span>
					</div>
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	.post-container {
		display: grid;
		border-radius: 0.375rem;
		padding: 0.25rem;
		column-gap: 0.5rem;
		grid-template-areas: 'thumbnail main';
		grid-template-columns: 70px 1fr;
	}

	.post-container-no-thumbs {
		grid-template-columns: 0px 1fr;
	}
</style>
