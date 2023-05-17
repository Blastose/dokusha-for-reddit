<script lang="ts">
	import type { Sort } from 'jsrwrap/types';
	import { onMount } from 'svelte';
	import { submissionStore } from '$lib/stores/submissionStore';
	import SubmissionCommentContainer from '$lib/components/submission/SubmissionCommentContainer.svelte';
	import SubmissionSort from '$lib/components/submission/SubmissionSort.svelte';
	import CommentSkeleton from '$lib/components/comment/CommentSkeleton.svelte';
	import type { SubmissionReturnType } from '$lib/types/types';
	import Fly from '$lib/components/layout/Fly.svelte';
	import { page } from '$app/stores';
	import { articleStore } from '$lib/stores/articleStore';

	export let submission: SubmissionReturnType | Promise<SubmissionReturnType>;
	export let flyKey: string | null = 'skip';
	export let isSingleComment = false;

	$: submissionId =
		// @ts-ignore
		`${$submissionStore?.id ?? submission.id}`;

	$: suggestedSort = ($submissionStore?.suggested_sort ??
		// @ts-ignore
		submission.suggested_sort ??
		'confidence') as Sort;

	onMount(async () => {
		submissionStore.set(await submission);

		if (isSingleComment) {
			return;
		}

		if (!$articleStore) {
			articleStore.set({
				url: $page.url.href.toLowerCase(),
				loadFromStore: false,
				article: await submission
			});
		} else {
			if ($page.url.href.toLowerCase() !== $articleStore.url) {
				articleStore.set({
					url: $page.url.href.toLowerCase(),
					loadFromStore: false,
					article: await submission
				});
			}
		}
	});

	// If articleStore is defined and loadFromStore is true, we use the articlesStore for the comments;
	// otherwise, we use the submission prop
	$: article = $articleStore && $articleStore.loadFromStore ? $articleStore.article : submission;

	function buildShowParentCommentsLink(id: string) {
		// We need to remove the first 3 characters since id starts with t3_
		const splitPaths = $page.url.pathname.split('/');
		// The first 6 elements of the splitpath array form the base url for
		// the new comment permalink
		const baseUrl = splitPaths.splice(0, 6).join('/');

		const newUrl = `${baseUrl}/${id}?context=8&depth=9`;
		return newUrl;
	}
</script>

<div class="flex flex-col gap-2">
	<p class="text-lg font-semibold">Comments</p>
	<SubmissionSort {suggestedSort} />
	{#if isSingleComment}
		{#await submission then value}
			<div class="reddit-md flex flex-col w-fit">
				<a href={$submissionStore?.permalink ?? value.permalink}>View all comments</a>
				{#if value.comments.length > 0 && value.comments[0].parent_id.slice(0, 3) !== 't3_'}
					<a href={buildShowParentCommentsLink(value.comments[0].id)}>Show parent comments</a>
				{/if}
			</div>
		{/await}
	{/if}

	<Fly key={flyKey}>
		{#await article}
			<div class="flex flex-col gap-8">
				{#each { length: 5 } as _}
					<CommentSkeleton />
				{/each}
			</div>
		{:then value}
			<SubmissionCommentContainer
				comments={value.comments}
				cacheArticleComments={!isSingleComment}
				{submissionId}
				{suggestedSort}
				showRefreshCommentsButtons={!isSingleComment}
			/>
		{/await}
	</Fly>
</div>
