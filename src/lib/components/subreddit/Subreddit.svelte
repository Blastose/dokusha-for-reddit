<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import { subredditViewStore } from '$lib/stores/subredditViewStore';
	import { subredditStore } from '$lib/stores/subredditStore';
	import { browser } from '$app/environment';
	import SubredditCard from './SubredditCard.svelte';
	import SubredditClassic from './SubredditClassic.svelte';
	import SubredditClassicSkeleton from './SubredditClassicSkeleton.svelte';

	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import SubredditCardSkeleton from './SubredditCardSkeleton.svelte';

	export let posts: Promise<SubmissionData[]> | SubmissionData[];

	let loadingElement: HTMLDivElement;
	let morePosts = true;
	let lastPostId = '';
	$: {
		// This reactive statement is needed so the variables related to the post are updated
		// when the page's searchparams change.
		// We need a reactive statement because changing the searchparams do not unmount/remount the page,
		// none of the statements in the onMount function run
		$page;
		(async () => {
			if (browser) {
				morePosts = true;
				lastPostId = '';
				const postsAwaited = await posts;
				if (postsAwaited.length > 0) {
					subredditStore.setSubredditPosts($page.url.href.toLowerCase(), postsAwaited);
					lastPostId = postsAwaited[postsAwaited.length - 1].id;
				}
			}
		})();
	}

	onMount(async () => {
		posts = await posts;
		lastPostId = posts[posts.length - 1].id;

		const interactionObserver = new IntersectionObserver(async (entries) => {
			if (entries[0].intersectionRatio <= 0) return;

			const subreddit = $page.params.subreddit ?? '';
			const sort = $page.params.sort ?? 'hot';
			const t = $page.url.searchParams.get('t') ?? 'day';
			let count = (posts as SubmissionData[]).length;
			if (sort === 'hot' || !sort) {
				// If the sort is hot or the default (which is also hot), then we needed to subtract the two stickied posts
				count = count - 2;
			}
			const res = await fetch(
				`/api/${subreddit}?sort=${sort}&after=t3_${lastPostId}&t=${t}&count=${count}`
			);
			const newPosts = (await res.json()) as SubmissionData[];
			if (!(newPosts.length > 0)) {
				morePosts = false;
				return;
			}
			lastPostId = newPosts[newPosts.length - 1].id;
			posts = await posts;
			posts = [...posts, ...newPosts];
			subredditStore.setSubredditPosts($page.url.href.toLowerCase(), posts);
		});

		interactionObserver.observe(loadingElement);

		return () => {
			interactionObserver.unobserve(loadingElement);
		};
	});
</script>

<div class="flex flex-col gap-3">
	{#await posts}
		{#each { length: 25 } as _}
			{#if morePosts && $subredditViewStore === 'classic'}
				<SubredditClassicSkeleton />
			{:else if morePosts && $subredditViewStore === 'card'}
				<SubredditCardSkeleton />
			{/if}
		{/each}
	{:then awaitedPosts}
		{#each awaitedPosts as post}
			{#if $subredditViewStore === 'card'}
				<SubredditCard {post} />
			{:else}
				<SubredditClassic {post} />
			{/if}
		{/each}
	{/await}
	<div>
		<div id="more" bind:this={loadingElement} class={morePosts && lastPostId ? '' : 'hidden'} />
		{#if morePosts && lastPostId && $subredditViewStore === 'classic'}
			<SubredditClassicSkeleton />
		{:else if morePosts && lastPostId && $subredditViewStore === 'card'}
			<SubredditCardSkeleton />
		{:else}
			<p>No more posts</p>
		{/if}
	</div>
</div>
