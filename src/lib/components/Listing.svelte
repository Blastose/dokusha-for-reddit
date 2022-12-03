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
					? 'bg-gray-300 dark:bg-orange-800'
					: 'bg-gray-100 dark:bg-[#252525] hover:bg-gray-300 dark:hover:bg-[#ffffff1c]'}"
				href={listing === 'hot' ? `/r/${subreddit}` : `/r/${subreddit}/${listing}`}
				data-sveltekit-preload-data
			>
				{listing}
			</a>
		{/each}
	</nav>

	{#if currentListing === 'controversial' || currentListing === 'top'}
		<div class="flex items-center">
			<span>links from: </span>
			<div class="dropdown">
				<button class="px-2">{formatTimeFilter(currentTimeFilter)}▾</button>
				<nav class="dropdown-items flex flex-col bg-gray-100 dark:bg-[#252525]">
					{#each times as time}
						<a
							class="p-2 hover:bg-gray-300 dark:hover:bg-[#ffffff1c] duration-150"
							href="/r/{subreddit}/{currentListing}?t={time}"
							data-sveltekit-preload-data
						>
							{formatTimeFilter(time)}
						</a>
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
