<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '$lib/components/icon/Icon.svelte';

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

	// While we could use Object.keys of timeMap, Svelte does not support TS
	// in its templates so we cannot use as keyof type and we get a TS error
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

	$: currentTimeSort = ($page.url.searchParams.get('t') ?? 'day') as keyof typeof timeMap;

	function createNewTimeUrl(url: URL, newTime: string) {
		const timeUrl = new URL(url);
		timeUrl.searchParams.set('t', newTime);
		return timeUrl.toString();
	}
</script>

<div class="text-sm font-bold dropdown">
	<button class="current-time"
		>{timeMap[currentTimeSort]}<Icon height="20" width="20" name="chevronDown" /></button
	>
	<div class="dropdown-items">
		{#each timeOptions as timeOption}
			<a class="dropdown-item" href={createNewTimeUrl($page.url, timeOption.value)}
				>{timeOption.display}</a
			>
		{/each}
	</div>
</div>

<style>
	.dropdown {
		position: relative;
	}

	.current-time {
		background-color: rgb(236, 237, 255);
		color: rgb(27, 47, 136);
		fill: rgb(27, 47, 136);
		padding: 0rem 0.5rem;
		border-radius: 0.375rem;
		display: flex;
		align-items: center;
	}

	:global(.dark) .current-time {
		background-color: rgb(202, 207, 238);
	}

	.dropdown:focus-within > .current-time {
		border-radius: 0.375rem 0.375rem 0 0;
	}

	.dropdown-items {
		display: none;
		width: 100px;
		position: absolute;
	}

	.dropdown:focus-within .dropdown-items {
		display: flex;
		flex-direction: column;
	}

	.dropdown-item {
		padding: 0.25rem 0.5rem;
		background-color: rgb(236, 237, 255);
		color: rgb(27, 47, 136);
		transition-duration: 300ms;
	}

	.dropdown-item:hover {
		background-color: rgb(164, 169, 192);
	}

	:global(.dark) .dropdown-item {
		background-color: rgb(202, 207, 238);
	}

	:global(.dark) .dropdown-item:hover {
		background-color: rgb(175, 181, 218);
	}
</style>
