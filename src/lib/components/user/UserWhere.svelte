<script lang="ts">
	import UserTime from './UserTime.svelte';
	import UserSort from './UserSort.svelte';
	import { page } from '$app/stores';
	// TODO this is a copy of SortPosts.svelte so we can refactor both into one component

	const whereOptions = ['overview', 'comments', 'submitted', 'gilded'];

	$: currentUsername = $page.params.username;
	$: currentWhere = $page.params.userWhere ?? 'overview';
	$: currentSort = $page.url.searchParams.get('sort');
</script>

<div class="sort-posts-container">
	{#each whereOptions as whereOption}
		{@const whereOptionLink = whereOption === 'overview' ? '' : whereOption}
		<div class="text-sm font-bold sort-post">
			<a class:current={whereOption === currentWhere} href="/u/{currentUsername}/{whereOptionLink}"
				>{whereOption}</a
			>
		</div>
	{/each}

	<div class="grow flex gap-4">
		{#if currentWhere !== 'gilded'}
			<UserSort />
		{/if}
		{#if currentSort === 'top' || currentSort === 'controversial'}
			<div class="grow">
				<UserTime />
			</div>
		{/if}
	</div>
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
