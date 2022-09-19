<script lang="ts">
	import Subreddit from '$lib/components/Subreddit.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let subreddit = data.posts[0]?.subreddit as unknown as string;
</script>

<svelte:head>
	<title>{subreddit}</title>
</svelte:head>

<main class="container mx-auto px-4">
	<Subreddit {subreddit} submissions={data.posts} />
</main>
