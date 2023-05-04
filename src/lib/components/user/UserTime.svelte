<script lang="ts">
	import { page } from '$app/stores';
	import Dropdown from '$lib/components/dropdown/Dropdown.svelte';

	type Time = {
		display: string;
		value: string;
	};

	const timeMap = {
		hour: 'Now',
		day: 'Today',
		week: 'This Week',
		month: 'This Month',
		year: 'This Year',
		all: 'All Time'
	};

	const timeOptions: Time[] = [
		{
			display: 'Now',
			value: 'hour'
		},
		{
			display: 'Today',
			value: 'day'
		},
		{
			display: 'This Week',
			value: 'week'
		},
		{
			display: 'This Month',
			value: 'month'
		},
		{
			display: 'This Year',
			value: 'year'
		},
		{
			display: 'All Time',
			value: 'all'
		}
	];

	$: currentTimeSort = ($page.url.searchParams.get('t') ?? 'all') as keyof typeof timeMap;

	$: display = `${timeMap[currentTimeSort]}`;

	function isActive(currentOption: string) {
		return currentOption === currentTimeSort;
	}
</script>

<Dropdown initialDropdownText={display} options={timeOptions} searchParam="t" {isActive} />
