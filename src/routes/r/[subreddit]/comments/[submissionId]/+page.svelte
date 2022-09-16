<script lang="ts">
	import Comment from '$lib/components/Comment.svelte';
	import type Snoowrap from 'snoowrap';
	import type { PageData } from './$types';

	export let data: { submission: Snoowrap.Submission };
</script>

<main class="container mx-auto px-4">
	<div class="flex flex-col gap-2">
		<div class="flex flex-col gap-2">
			<div>
				<p class="font-bold text-2xl">{@html data.submission.title}</p>
				<p>
					submitted {new Date(data.submission.created_utc * 1000).toLocaleString()} by
					<span class="text-blue-500">{data.submission.author}</span>
				</p>
			</div>
			{#if data.submission.selftext_html}
				<div class="reddit-md max-w-4xl bg-gray-200 p-4 rounded-md">
					{@html data.submission.selftext_html}
				</div>
			{/if}
		</div>

		<div class="flex flex-col gap-2 px-4 py-2 bg-gray-300 rounded-md">
			{#each data.submission.comments as comment}
				<Comment {comment} />
			{/each}
		</div>
	</div>
</main>
