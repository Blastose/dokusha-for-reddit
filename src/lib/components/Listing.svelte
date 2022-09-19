<script lang="ts">
	import { page } from '$app/stores';
	const listings = ['hot', 'new', 'rising', 'controversial', 'top'];

	let currentListing: string | undefined = undefined;
	$: currentListing = $page.url.pathname.split('/')[3];

	export let subreddit: string;
</script>

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
