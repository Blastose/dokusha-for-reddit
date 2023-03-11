<script lang="ts">
	import type { SubmissionData } from 'jsrwrap';
	import Flair from './Flair.svelte';
	import PostTag from './PostTag.svelte';
	import { submissionStore } from '$lib/stores/submissionStore';

	export let post: SubmissionData;

	function setSubmissionStore() {
		submissionStore.set(post);
	}
</script>

<div>
	{#if post.link_flair_text}
		<Flair {post} />
	{/if}
	<a href={post.permalink} class="title-text font-bold" on:click={setSubmissionStore}>
		{post.title}
	</a>
	<PostTag {post} />
</div>

<style>
	div > :global(*) {
		vertical-align: text-top;
	}

	.title-text {
		line-height: 1.25rem;
	}
</style>
