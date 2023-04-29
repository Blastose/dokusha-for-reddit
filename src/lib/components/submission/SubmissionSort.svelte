<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '$lib/components/icon/Icon.svelte';
	import type { Sort } from 'jsrwrap/types';

	export let suggestedSort: Sort;
	$: paramSort = $page.url.searchParams.get('sort') as Sort | undefined;
	$: currentSort = paramSort ?? suggestedSort;

	const sortMap = {
		confidence: 'Best',
		top: 'Top',
		new: 'New',
		controversial: 'Controversial',
		old: 'Old',
		qa: 'Q&a',
		random: 'Random'
	};

	const sortOptions = [
		{
			display: 'Best',
			value: 'confidence'
		},
		{
			display: 'Top',
			value: 'top'
		},
		{
			display: 'New',
			value: 'new'
		},
		{
			display: 'Controversial',
			value: 'controversial'
		},
		{
			display: 'Old',
			value: 'old'
		},
		{
			display: 'Q&a',
			value: 'qa'
		}
	];

	function createNewSortUrl(url: URL, newTime: string) {
		const timeUrl = new URL(url);
		timeUrl.searchParams.set('sort', newTime);
		return timeUrl.toString();
	}

	function showSuggestedText(paramSortParameter: Sort | undefined) {
		// We want to show suggested text only if:
		// 1. The url is `/` (no sort?) and the suggested_sort key is not confidence
		// 2. The sort? param is equal to the suggested_sort key and the suggested_sort key is not confidence
		if (suggestedSort !== 'confidence') {
			if (!paramSortParameter) {
				return true;
			}
			if (paramSortParameter === suggestedSort) {
				return true;
			}
		}
		return false;
	}
</script>

<div class="text-sm font-bold dropdown">
	<button class="current-sort"
		>Sort By: {sortMap[currentSort]}
		{showSuggestedText(paramSort) ? '(Suggested)' : ''}<Icon
			height="20"
			width="20"
			name="chevronDown"
		/></button
	>
	<div class="dropdown-items">
		{#each sortOptions as sortOption}
			<a
				data-sveltekit-noscroll
				class="dropdown-item"
				class:active={sortOption.value === currentSort}
				href={createNewSortUrl($page.url, sortOption.value)}>{sortOption.display}</a
			>
		{/each}
	</div>
</div>

<style>
	.dropdown {
		position: relative;
	}

	.current-sort {
		border-radius: 0.375rem;
		display: flex;
		align-items: center;
	}

	.dropdown:focus-within > .current-sort {
		border-radius: 0.375rem 0.375rem 0 0;
	}

	.dropdown-items {
		display: none;
		position: absolute;
		left: 4px;
		background-color: rgb(237, 237, 245);
		border-radius: 0.375rem;
		color: rgb(72, 72, 80);
		border: 1px solid rgb(223, 223, 236);
	}

	:global(.dark) .dropdown-items {
		background-color: #3c3e3f;
		color: rgb(213, 213, 228);
		border: 1px solid rgb(93, 93, 100);
	}

	.dropdown:focus-within .dropdown-items {
		display: flex;
		flex-direction: column;
	}

	.dropdown-item {
		padding: 0.25rem 0.75rem;
		transition-duration: 300ms;
	}

	.dropdown-item:hover {
		background-color: rgb(217, 217, 231);
	}

	:global(.dark) .dropdown-item:hover {
		background-color: #5a5c5e;
	}

	.active {
		color: rgb(101, 108, 184);
	}

	:global(.dark) .active {
		color: rgb(149, 157, 241);
	}
</style>
