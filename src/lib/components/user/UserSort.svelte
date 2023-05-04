<script lang="ts">
	import { page } from '$app/stores';
	import Dropdown from '$lib/components/dropdown/Dropdown.svelte';

	const sortOptions = [
		{
			display: 'New',
			value: 'new'
		},
		{
			display: 'Top',
			value: 'top'
		},
		{
			display: 'Hot',
			value: 'hot'
		},
		{
			display: 'Controversial',
			value: 'controversial'
		}
	];

	function getCurrentTimeSort(_url: URL) {
		const currentSortFromSearchParams = $page.url.searchParams.get('sort');
		if (currentSortFromSearchParams) {
			// Capitalize the sort from searchParams since it is not in capitals
			return `${currentSortFromSearchParams
				.charAt(0)
				.toUpperCase()}${currentSortFromSearchParams.slice(1)}`;
		}

		if ($page.params.userWhere === 'overview' || !$page.params.userWhere) {
			return 'New';
		} else if ($page.params.userWhere === 'comments') {
			return 'New';
		} else if ($page.params.userWhere === 'submitted') {
			return 'Hot';
		}
		return '';
	}

	$: currentTimeSort = getCurrentTimeSort($page.url);

	$: display = currentTimeSort;

	function isActive(currentOption: string, _url: URL) {
		return currentOption.toLowerCase() === currentTimeSort.toLowerCase();
	}
</script>

<Dropdown initialDropdownText={display} options={sortOptions} searchParam="sort" {isActive} />
