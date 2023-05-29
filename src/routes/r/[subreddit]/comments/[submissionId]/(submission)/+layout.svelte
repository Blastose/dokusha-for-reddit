<script lang="ts">
	import SubmissionBody from '$lib/components/submission/SubmissionBody.svelte';
	import { submissionStore } from '$lib/stores/submissionStore';
	import { onMount } from 'svelte';
	import Fly from '$lib/components/layout/Fly.svelte';
	import { page } from '$app/stores';
	import SubmissionBodySkeleton from '$lib/components/submission/SubmissionBodySkeleton.svelte';
	import type { SubmissionData } from 'jsrwrap/types';
	import { browser } from '$app/environment';
	import { commentCountStore } from '$lib/stores/commentCountStore.js';
	import { subredditStore } from '$lib/stores/subredditStore.js';

	export let data;

	$: key = $page.params.submissionId?.toLowerCase();
	$: submission = data.streamed.submission;

	// This is only used to prevent TS error below when we know the
	// streamed data is SSR'd and will not be a promise
	$: awaitedSubmission = data.streamed.submission as SubmissionData;

	// We can ts-ignore the following lines since we know that when the page is ssr'd
	// the promise for submission is resolved
	// Unfortunately, there is no type hints for data.streamed
	// @ts-ignore
	$: title = `${$submissionStore?.title ?? submission.title}: ${
		// @ts-ignore
		$submissionStore?.subreddit ?? submission.subreddit
	}`;

	onMount(async () => {
		if (!$submissionStore) {
			submissionStore.set(await submission);
		}
	});

	// We need the inital num comments from the store to display the (`#` new) in the body
	// since we update it when the submission store changes
	const initialNumComments = $commentCountStore[$page.params.submissionId] as number | undefined;

	$: if (browser && $submissionStore) {
		commentCountStore.update((v) => {
			v[$submissionStore!.id] = $submissionStore!.num_comments;
			return v;
		});

		// We want to iterate over the cached subreddit posts and update the number of comments
		for (const key of Object.keys($subredditStore)) {
			const foundSubmission = $subredditStore[key]?.find((v) => {
				return v.id === $page.params.submissionId;
			});
			if (foundSubmission) {
				foundSubmission.num_comments = $submissionStore.num_comments;
			}
		}
	}
</script>

<svelte:head><title>{title}</title></svelte:head>

<Fly {key}>
	<main class="container mx-auto">
		<section class="flex flex-col gap-4">
			{#if $submissionStore}
				<SubmissionBody submission={$submissionStore} {initialNumComments} />
				<hr />
				<slot />
			{:else}
				{#if data.isDataRequestSubmissionId}
					<SubmissionBodySkeleton />
				{:else}
					<SubmissionBody submission={awaitedSubmission} {initialNumComments} />
				{/if}
				<hr />
				<slot />
			{/if}
		</section>
	</main>
</Fly>

<style>
	hr {
		align-self: center;
		width: 95%;
	}

	:global(.dark) hr {
		border-color: rgba(88, 88, 88, 0.452);
	}
</style>
