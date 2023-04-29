<script lang="ts">
	import SubmissionCommentContainer from '$lib/components/submission/SubmissionCommentContainer.svelte';
	import SubmissionBody from '$lib/components/submission/SubmissionBody.svelte';
	import { submissionStore } from '$lib/stores/submissionStore';
	import type { SubmissionReturnType } from '$lib/types/types';
	import CommentSkeleton from '$lib/components/comment/CommentSkeleton.svelte';
	import SubmissionSort from './SubmissionSort.svelte';
	import SubmissionBodySkeleton from './SubmissionBodySkeleton.svelte';
	import { onMount } from 'svelte';
	import type { Sort } from 'jsrwrap/types';

	export let submission: SubmissionReturnType | Promise<SubmissionReturnType>;

	// We can ts-ignore the following lines since we know that when the page is ssr'd
	// the promise for submission is resolved
	// Unfortunately, there is no type hints for data.streamed
	// @ts-ignore
	const title = `${$submissionStore?.title ?? submission.title}: ${
		// @ts-ignore
		$submissionStore?.subreddit ?? submission.subreddit
	}`;

	const submissionId =
		// @ts-ignore
		`${$submissionStore?.id ?? submission.id}`;

	const suggestedSort = ($submissionStore?.suggested_sort ??
		// @ts-ignore
		submission.suggested_sort ??
		'confidence') as Sort;

	onMount(async () => {
		if (!$submissionStore) {
			submissionStore.set(await submission);
		}
	});
</script>

<svelte:head><title>{title}</title></svelte:head>

<section class="flex flex-col gap-4">
	{#if $submissionStore}
		<SubmissionBody submission={$submissionStore} />

		<hr />

		<div class="flex flex-col gap-2">
			<p class="text-lg font-semibold">Comments</p>
			<SubmissionSort {suggestedSort} />
			{#await submission}
				{#each { length: 5 } as _}
					<CommentSkeleton />
				{/each}
			{:then value}
				<SubmissionCommentContainer comments={value.comments} {submissionId} {suggestedSort} />
			{/await}
		</div>
	{:else}
		{#await submission}
			<SubmissionBodySkeleton />
			<hr />
			{#each { length: 5 } as _}
				<CommentSkeleton />
			{/each}
		{:then value}
			<SubmissionBody submission={value} />

			<hr />

			<div class="flex flex-col gap-2">
				<p class="text-lg font-semibold">Comments</p>
				<SubmissionSort {suggestedSort} />
				<SubmissionCommentContainer comments={value.comments} {submissionId} {suggestedSort} />
			</div>
		{/await}
	{/if}
</section>

<style>
	hr {
		align-self: center;
		width: 95%;
	}

	:global(.dark) hr {
		border-color: rgba(88, 88, 88, 0.452);
	}
</style>
