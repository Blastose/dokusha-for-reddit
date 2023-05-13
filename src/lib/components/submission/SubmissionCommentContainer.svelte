<script lang="ts">
	import Comment from '$lib/components/comment/Comment.svelte';
	import type { CommentFull, Sort } from 'jsrwrap/types';
	import type { SubmissionReturnType } from '$lib/types/types';
	import { page } from '$app/stores';
	import Icon from '$lib/components/icon/Icon.svelte';

	export let comments: CommentFull[];
	export let submissionId: string;
	export let suggestedSort: Sort;
	export let showRefreshCommentsButtons: boolean = true;

	let intervalId: ReturnType<typeof setInterval>;
	let loadingComments = false;
	async function refreshComments() {
		loadingComments = true;
		let fetchUrl = `/api/subreddit/comments/${submissionId}`;
		const sort = $page.url.searchParams.get('sort') ?? suggestedSort;
		fetchUrl = fetchUrl + `?sort=${sort}`;
		const res = await fetch(fetchUrl);
		const newComments = (await res.json()) as SubmissionReturnType['comments'];

		comments = newComments;
		loadingComments = false;
	}

	let autoRefreshTimeLeft = 10;

	function setAutoRefreshCommentsTimer() {
		autoRefreshTimeLeft = 10;
		intervalId = setInterval(async () => {
			if (autoRefreshTimeLeft > 0) {
				autoRefreshTimeLeft--;
			}
			if (autoRefreshTimeLeft === 0) {
				if (loadingComments) {
					return;
				}
				await refreshComments();
				autoRefreshTimeLeft = 10;
			}
		}, 1000);
	}

	function clearRefreshCommentsTimer() {
		clearInterval(intervalId);
	}

	let autoRefresh: boolean;

	$: {
		if (autoRefresh) {
			setAutoRefreshCommentsTimer();
		} else {
			clearRefreshCommentsTimer();
		}
	}
</script>

{#if showRefreshCommentsButtons}
	<div class="text-sm font-bold">
		<div class="flex gap-2">
			<button class="w-fit" on:click={refreshComments} disabled={loadingComments}
				>Refresh comments</button
			>
			{#if loadingComments && !autoRefresh}
				<Icon class="animate-spin" height="20" width="20" name="loading" />
			{/if}
		</div>
		<div class="flex gap-1">
			<input
				class="accent-[#747CB8] hidden"
				id="refresh-comments"
				type="checkbox"
				bind:checked={autoRefresh}
			/>
			<label for="refresh-comments" class="cursor-pointer">
				<span class="select-none">Auto refresh comments</span>
			</label>
			{#if autoRefresh}
				{autoRefreshTimeLeft}
			{/if}
			{#if loadingComments && autoRefresh}
				<Icon class="animate-spin" height="20" width="20" name="loading" />
			{/if}
		</div>
	</div>
{/if}

<div class="flex flex-col gap-8">
	{#each comments as comment, index}
		{#if comment.type === 'comment'}
			<Comment {comment} {submissionId} {suggestedSort} />
		{:else}
			<Comment
				{comment}
				{submissionId}
				{suggestedSort}
				updateReplies={(moreId, children) => {
					// This needs to be in an anonymous function since we need
					// value.comments to be reactive and update it
					const moreIndex = comments.findIndex((value) => value.id === moreId);
					comments.splice(moreIndex, 1);

					comments = comments.concat(children);
				}}
			/>
		{/if}
		{#if index !== comments.length - 1}
			<hr />
		{/if}
	{/each}
</div>

<style>
	hr {
		align-self: center;
		width: 66%;
	}

	:global(.dark) hr {
		border-color: rgba(88, 88, 88, 0.452);
	}
</style>
