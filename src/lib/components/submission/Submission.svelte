<script lang="ts">
	import SubmissionCommentContainer from '$lib/components/submission/SubmissionCommentContainer.svelte';
	import SubmissionBody from '$lib/components/submission/SubmissionBody.svelte';
	import { submissionStore } from '$lib/stores/submissionStore';
	import type { SubmissionReturnType } from '$lib/types/types';
	import CommentSkeleton from '$lib/components/comment/CommentSkeleton.svelte';
	import SubmissionBodySkeleton from './SubmissionBodySkeleton.svelte';
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

		<hr />

		{#await submission}
			{#each { length: 4 } as _}
				<CommentSkeleton />
			{/each}
		{:then value}
			<SubmissionCommentContainer comments={value.comments} {submissionId} />
		{/await}
	{:else}
		{#await submission}
			<SubmissionBodySkeleton />
			<hr />
			{#each { length: 4 } as _}
				<CommentSkeleton />
			{/each}
		{:then value}
			<SubmissionBody submission={value} />

			<hr />

			<SubmissionCommentContainer comments={value.comments} {submissionId} />
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
