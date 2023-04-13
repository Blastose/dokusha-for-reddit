<script lang="ts">
	import TimeOption from './TimeOption.svelte';
	import { page } from '$app/stores';

	const sortOptions = ['hot', 'new', 'top', 'rising', 'controversial'];

	$: currentSubreddit = $page.params.subreddit;
	$: currentSort = $page.params.sort ?? 'hot';
</script>

<div class="sort-posts-container">
	{#each sortOptions as sortOption}
		<div class="text-sm font-bold sort-post">
			<a class:current={sortOption === currentSort} href="/r/{currentSubreddit}/{sortOption}"
				>{sortOption}</a
			>
		</div>
	{/each}

	{#if currentSort === 'controversial' || currentSort === 'top'}
		<TimeOption />
	{/if}
</div>

<style>
	.sort-posts-container {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}

	.sort-post > a {
		text-transform: capitalize;
		border-radius: 0.375rem;
		padding: 0.125rem 0.66rem;
		background-color: rgb(112, 120, 197);
		transition-duration: 300ms;
		color: white;
	}

	.sort-post > a:hover {
		background-color: rgb(70, 69, 131);
	}

	:global(.dark) .sort-post > a {
		background-color: rgb(93, 102, 179);
	}

	:global(.dark) .sort-post > a:hover {
		background-color: rgb(61, 68, 112);
	}

	.sort-post > a.current,
	.sort-post > a.current:hover {
		background-color: rgb(208, 219, 255);
		color: rgb(27, 47, 136);
	}
</style>
