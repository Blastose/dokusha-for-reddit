<script lang="ts">
	import Dropdown from '$lib/components/dropdown/Dropdown.svelte';
	import { page } from '$app/stores';
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

	$: dropdownDisplayText = `Sort By: ${sortMap[currentSort]} ${
		showSuggestedText(paramSort) ? '(Suggested)' : ''
	}`;

	function isActive(currentOption: string) {
		return currentOption === currentSort;
	}
</script>

<Dropdown
	options={sortOptions}
	searchParam={'sort'}
	initialDropdownText={dropdownDisplayText}
	{isActive}
/>
