<script lang="ts">
	import SubmissionBody from '$lib/components/submission/SubmissionBody.svelte';
	import { submissionStore } from '$lib/stores/submissionStore';
	import { onMount } from 'svelte';
	import type { SubmissionData } from 'jsrwrap/types';
	import Fly from '$lib/components/layout/Fly.svelte';
	import { page } from '$app/stores';

	export let data;

	$: key = $page.params.submissionId?.toLowerCase();
	$: submission = data.streamed.submission;

	// This line below is only to prevent a TS error in the :else branch below
	// We know that if the request is SSR'd, then we don't need to await the submission
	$: submissionAwaited = submission as SubmissionData;

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
</script>

<svelte:head><title>{title}</title></svelte:head>

<Fly {key}>
	<main class="container mx-auto">
		<section class="flex flex-col gap-4">
			{#if $submissionStore}
				<SubmissionBody submission={$submissionStore} />
				<hr />
				<slot />
			{:else}
				<SubmissionBody submission={submissionAwaited} />
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
