<script lang="ts">
	import type { LayoutData } from './$types';
	import Subreddit from '$lib/components/subreddit/Subreddit.svelte';
	import { subredditStore, getSubredditStore } from '$lib/stores/subredditStore';
	import { page } from '$app/stores';
	import Fly from '$lib/components/layout/Fly.svelte';

	export let data: LayoutData;

	$: key = $page.params.sort?.toLowerCase();
	$: posts = getSubredditStore(subredditStore, $page.url.href.toLowerCase()) ?? data.streamed.posts;
</script>

<svelte:head><title>{data.about?.title}</title></svelte:head>

<Fly {key}>
	<main>
		<Subreddit {posts} />
	</main>
</Fly>

<!-- This slot does not display any content, but is needed to silence a SK warning -->
<slot />
