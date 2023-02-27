<script lang="ts">
	import type { PageData } from './$types';
	import Comment from '$lib/components/Comment.svelte';
	import { submissionStore } from '$lib/stores/submissionStore';
	import { marked } from 'marked';
	import DOMPurify from 'isomorphic-dompurify';

	export let data: PageData;

	// We can ts-ignore the following lines since we know that when the page is ssr'd
	// the promise for submission is resolved and .title/.subreddit exist
	// @ts-ignore
	const title = `${$submissionStore?.title ?? data.streamed.submission.title}: ${
		// @ts-ignore
		$submissionStore?.subreddit ?? data.streamed.submission.subreddit
	}`;

	function purify(text: string) {
		return DOMPurify.sanitize(marked.parse(text));
	}
</script>

<svelte:head><title>{title}</title></svelte:head>

<main class="container mx-auto px-4 py-2 flex flex-col gap-4">
	{#if $submissionStore}
		<p class="font-bold text-xl">{$submissionStore.title}</p>

		<div>
			{@html purify($submissionStore.selftext)}
		</div>

		{#await data.streamed.submission}
			<div class="animate-pulse">
				<div class="flex-1 space-y-6 py-1">
					<div class="h-6 bg-slate-500 rounded" />
					<div class="space-y-3">
						<div class="grid grid-cols-3 gap-4">
							<div class="h-6 bg-slate-500 rounded col-span-2" />
							<div class="h-6 bg-slate-500 rounded col-span-1" />
							<div class="h-6 bg-slate-500 rounded col-span-1" />
							<div class="h-6 bg-slate-500 rounded col-span-1" />
							<div class="h-6 bg-slate-500 rounded col-span-1" />
							<div class="h-6 bg-slate-500 rounded col-span-1" />
							<div class="h-6 bg-slate-500 rounded col-span-1" />
						</div>
						<div class="h-6 bg-slate-500 rounded" />
					</div>
				</div>
			</div>
		{:then value}
			<div class="h-2 w-full bg-black" />

			<div class="flex flex-col gap-2">
				<p class="text-lg font-semibold">Comments</p>
				<div class="flex flex-col gap-6">
					{#each value.comments as comment}
						<Comment {comment} />
					{/each}
				</div>
			</div>
		{/await}
	{:else}
		{#await data.streamed.submission}
			<p>Loading...</p>
			<p>Loading...</p>
		{:then value}
			<p class="font-bold text-xl">{value.title}</p>

			<div>
				{@html purify(value.selftext)}
			</div>

			<div class="h-2 w-full bg-black" />

			<div class="flex flex-col gap-2">
				<p class="text-lg font-semibold">Comments</p>
				<div class="flex flex-col gap-6">
					{#each value.comments as comment}
						<Comment {comment} />
					{/each}
				</div>
			</div>
		{/await}
	{/if}
</main>
