<script lang="ts">
	import Subreddit from '$lib/components/subreddit/Subreddit.svelte';

	export let data;
</script>

<svelte:head><title>{data.about.title}</title></svelte:head>

<main>
	<Subreddit about={data.about} posts={data.posts} />
</main>
