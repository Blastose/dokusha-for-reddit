<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
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
		<Flair linkFlair={post} />
	{/if}
	<a
		href={post.permalink}
		class="title-text font-bold"
		class:stickied={post.stickied || post.pinned}
		on:click={setSubmissionStore}
	>
		{post.title}
	</a>
	<PostTag postTag={post} />
	<span class="title-text text-sm font-semibold domain">
		({post.domain})
	</span>
</div>

<style>
	div > :global(*) {
		vertical-align: text-top;
	}

	.title-text {
		line-height: 1.25rem;
	}

	.domain {
		color: #717677;
	}

	:global(.dark) .domain {
		color: #878b8c;
	}

	.stickied {
		color: #3d8a3e;
	}

	:global(.dark) .stickied {
		color: #6cce6e;
	}
</style>
