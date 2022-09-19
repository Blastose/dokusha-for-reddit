<script lang="ts">
	import { page } from '$app/stores';
	const listings = ['hot', 'new', 'rising', 'controversial', 'top'];
	const times = ['all', 'hour', 'day', 'week', 'month', 'year'];

	let currentListing: string | undefined = undefined;
	$: currentListing = $page.url.pathname.split('/')[3];

	$: currentTimeFilter = $page.url.searchParams.get('t');

	export let subreddit: string;

	const formatTimeFilter = (time: string | null) => {
		if (time === null) {
			time = 'day';
		}
		return `${time !== 'all' ? 'past' : ''} ${time} ${time === 'all' ? 'time' : ''}`;
	};
</script>

<div class="flex gap-2 items-center flex-wrap">
	<nav class="flex">
		{#each listings as listing}
			<a
				class="capitalize py-1 px-2 duration-150
      {currentListing === listing || (currentListing === undefined && listing === 'hot')
					? 'bg-gray-500 text-white'
					: 'bg-gray-300 hover:bg-gray-400'}"
				href={listing === 'hot' ? `/r/${subreddit}` : `/r/${subreddit}/${listing}`}
			>
				{listing}
			</a>
		{/each}
	</nav>

	{#if currentListing === 'controversial' || currentListing === 'top'}
		<div class="flex items-center">
			<span>links from: </span>
			<div class="dropdown">
				<button class="p-2">{formatTimeFilter(currentTimeFilter)}▾</button>
				<nav class="dropdown-items flex flex-col bg-gray-300">
					{#each times as time}
						<a
							class="p-2 hover:bg-gray-400 duration-150"
							href="/r/{subreddit}/{currentListing}?t={time}">{formatTimeFilter(time)}</a
						>
					{/each}
				</nav>
			</div>
		</div>
	{/if}
</div>

<style>
	.dropdown {
		position: relative;
	}

	.dropdown-items {
		display: none;
		width: max-content;
		position: absolute;
	}

	.dropdown:focus-within .dropdown-items {
		display: flex;
	}
</style>
