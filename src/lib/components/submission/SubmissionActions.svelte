<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';

	export let submission: SubmissionData;
	export let sourceHidden: boolean;
	export let toggleSourceVisibility: () => void;
</script>

<div class="actions-container text-sm font-bold">
	{#if submission.selftext}
		<button on:click={toggleSourceVisibility}>{sourceHidden ? 'show source' : 'hide source'}</button
		>
	{/if}

	<a href={`https://www.reddit.com${submission.permalink}`} target="_blank" rel="noreferrer"
		>view in reddit</a
	>
</div>

<style>
	.actions-container {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;

		color: #7c7c92;
	}

	:global(.dark) .actions-container {
		color: #b3b3c2;
	}
</style>
