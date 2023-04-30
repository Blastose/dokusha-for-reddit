<script lang="ts">
	import type { Sort } from 'jsrwrap/types';
	import { onMount } from 'svelte';
	import { submissionStore } from '$lib/stores/submissionStore';
	import SubmissionCommentContainer from '$lib/components/submission/SubmissionCommentContainer.svelte';
	import SubmissionSort from '$lib/components/submission/SubmissionSort.svelte';
	import CommentSkeleton from '$lib/components/comment/CommentSkeleton.svelte';
	import type { SubmissionReturnType } from '$lib/types/types';
	import Fly from '$lib/components/layout/Fly.svelte';

	export let submission: SubmissionReturnType | Promise<SubmissionReturnType>;
	export let flyKey: string | null = null;

	$: submissionId =
		// @ts-ignore
		`${$submissionStore?.id ?? submission.id}`;

	$: suggestedSort = ($submissionStore?.suggested_sort ??
		// @ts-ignore
		submission.suggested_sort ??
		'confidence') as Sort;

	let isSingleComment = false;

	onMount(async () => {
		submissionStore.set(await submission);
	});
</script>

<div class="flex flex-col gap-2">
	<p class="text-lg font-semibold">Comments</p>
	<SubmissionSort {suggestedSort} />
	{#if isSingleComment}
		<p>You are viewing a single comment's thread</p>
	{/if}

	<Fly key={flyKey}>
		{#await submission}
			<div class="flex flex-col gap-8">
				{#each { length: 5 } as _}
					<CommentSkeleton />
				{/each}
			</div>
		{:then value}
			<SubmissionCommentContainer comments={value.comments} {submissionId} {suggestedSort} />
		{/await}
	</Fly>
</div>
