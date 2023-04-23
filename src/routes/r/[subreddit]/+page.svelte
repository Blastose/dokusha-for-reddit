<script lang="ts">
	import type { PageData } from './$types';
	import Subreddit from '$lib/components/subreddit/Subreddit.svelte';
	import { subredditStore, getSubredditStore } from '$lib/stores/subredditStore';
	import { page } from '$app/stores';

	export let data: PageData;

	$: posts = getSubredditStore(subredditStore, $page.url.href.toLowerCase()) ?? data.streamed.posts;
</script>

<svelte:head><title>{data.about.title}</title></svelte:head>

<main>
	<Subreddit about={data.about} {posts} />
</main>
