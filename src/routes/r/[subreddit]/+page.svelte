<script lang="ts">
	import type { PageData } from './$types';
	import Subreddit from '$lib/components/subreddit/Subreddit.svelte';

	export let data: PageData;
</script>

<svelte:head><title>{data.about.title}</title></svelte:head>

<main>
	<Subreddit about={data.about} posts={data.posts} />
</main>
