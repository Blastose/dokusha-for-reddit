<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
	import type { SubmissionData } from 'jsrwrap/types';

	export let post: SubmissionData;
	export let setSubmissionStore: () => void;
</script>

<a class="text-sm font-bold comment-box" href={post.permalink} on:click={setSubmissionStore}>
	<Icon height="20" width="20" name="comment" /><span>{post.num_comments} comments</span>
</a>

<style>
	.comment-box {
		display: flex;
		gap: 0.25rem;
		padding: 0.25rem 0.5rem;
		align-items: center;
		width: fit-content;
		border-radius: 0.375rem;
		transition-duration: 300ms;
		color: rgb(97, 92, 156);
		fill: rgb(97, 92, 156);
	}

	.comment-box:hover {
		background-color: rgba(198, 198, 211, 0.459);
	}

	:global(.dark) .comment-box {
		color: rgb(196, 194, 219);
		fill: rgb(196, 194, 219);
	}

	:global(.dark) .comment-box:hover {
		background-color: rgba(146, 146, 155, 0.212);
	}
</style>
