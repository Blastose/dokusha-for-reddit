<script lang="ts">
	import SubmissionCommentContainer from '$lib/components/submission/SubmissionCommentContainer.svelte';
	import SubmissionBody from '$lib/components/submission/SubmissionBody.svelte';
	import { submissionStore } from '$lib/stores/submissionStore';
	import type { SubmissionReturnType } from '$lib/types/types';
	import { onMount } from 'svelte';

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

		{#await submission}
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
			<SubmissionCommentContainer comments={value.comments} {submissionId} />
		{/await}
	{:else}
		{#await submission}
			<p>Loading...</p>
			<p>Loading...</p>
		{:then value}
			<SubmissionBody submission={value} />

			<SubmissionCommentContainer comments={value.comments} {submissionId} />
		{/await}
	{/if}
</section>
