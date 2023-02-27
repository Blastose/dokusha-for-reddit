<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { submissionStore } from '$lib/stores/submissionStore';
	import type { SubmissionData } from 'jsrwrap';

	export let data: PageData;

	function setSubmissionStore(submission: SubmissionData) {
		submissionStore.set(submission);
	}
</script>

<svelte:head><title>{data.posts[0]?.subreddit}</title></svelte:head>

<main class="container mx-auto px-4 py-2">
	<h1 class="text-xl font-bold">{$page.params.subreddit}</h1>
	{#each data.posts as post}
		<div>
			<a
				href="/r/{post.subreddit}/comments/{post.id}"
				on:click={() => {
					setSubmissionStore(post);
				}}>{post.title} - {post.num_comments} comments</a
			>
		</div>
	{/each}
</main>
