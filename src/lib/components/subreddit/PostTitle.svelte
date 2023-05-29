<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import Flair from './Flair.svelte';
	import PostTag from './PostTag.svelte';
	import { submissionStore } from '$lib/stores/submissionStore';

	export let post: SubmissionData;

	function setSubmissionStore() {
		submissionStore.set(post);
	}

	function stripTrailingSlashFromRedditPermalink(s: string) {
		// All reddit permalink from their API response end with a `/`
		// We need to remove this for the `:visited` selector since we redirect
		// trailing backslashes to non-trailing backslashes links
		return s.substring(0, s.length - 1);
	}
</script>

<div>
	{#if post.link_flair_text}
		<Flair linkFlair={post} />
	{/if}
	<a
		href={stripTrailingSlashFromRedditPermalink(post.permalink)}
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

	:global(.dark) a.title-text:visited {
		color: #777b86;
	}

	a.title-text:visited {
		color: #989dc4;
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

	a.title-text.stickied:visited {
		color: #97c591;
	}

	:global(.dark) .stickied {
		color: #6cce6e;
	}

	:global(.dark) a.title-text.stickied:visited {
		color: #3d833e;
	}
</style>
