<script lang="ts">
	import type { SubmissionData, SubredditData } from 'jsrwrap/types';
	import { subredditViewStore } from '$lib/stores/subredditViewStore';
	import { subredditStore } from '$lib/stores/subredditStore';
	import SubredditCard from './SubredditCard.svelte';
	import SubredditClassic from './SubredditClassic.svelte';
	import SubredditClassicSkeleton from './SubredditClassicSkeleton.svelte';
	import SortPosts from '$lib/components/sort/SortPosts.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import SubredditCardSkeleton from './SubredditCardSkeleton.svelte';

	export let posts: Promise<SubmissionData[]> | SubmissionData[];
	export let about: SubredditData;

	function toggleView() {
		if ($subredditViewStore === 'card') {
			subredditViewStore.set('classic');
		} else {
			subredditViewStore.set('card');
		}
	}

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
			morePosts = true;
			lastPostId = '';
			const postsAwaited = await posts;
			if (postsAwaited.length > 0) {
				subredditStore.setSubredditPosts($page.url.href.toLowerCase(), postsAwaited);
				lastPostId = postsAwaited[postsAwaited.length - 1].id;
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

	$: bannerUrl = about.banner_background_image || about.banner_img;
	$: icon = about.community_icon || about.icon_img;
</script>

<section class="flex flex-col">
	<div
		class:highlight={bannerUrl === ''}
		class:banner-image={bannerUrl !== ''}
		class="banner"
		style={bannerUrl
			? `background-image: linear-gradient(rgba(27, 27, 27, 0.1), rgba(33, 34, 36, 1)), url(${bannerUrl});`
			: ''}
	>
		<div class="blur-image">
			<div />

			<div class="text-dark-mode banner-text container mx-auto">
				{#if icon}
					<img height="64" width="64" class="icon-image" src={icon} alt="" />
				{/if}
				<p class="font-bold text-3xl">{about.title}</p>
				<a href="/{about.display_name_prefixed}" class="font-bold text-sm w-fit">
					{about.display_name_prefixed}
				</a>
			</div>
		</div>
	</div>

	<div class="container mx-auto px-4 pt-4 pb-16 flex flex-col gap-4">
		<SortPosts />

		<button class="outline outline-1 rounded-sm px-2 py-1 w-fit" on:click={toggleView}>
			Switch view - Current view: {$subredditViewStore}
		</button>

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
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.banner-text {
		display: flex;
		flex-direction: column;
		align-self: flex-end;
		padding: 1rem;
	}

	.icon-image {
		border-radius: 9999px;
	}

	.banner {
		min-height: 10rem;
		display: flex;
	}

	.banner-image {
		overflow: hidden;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center center;
	}

	.highlight:not(.banner-image) {
		background: rgb(88, 97, 158);
	}

	:global(.dark) .highlight:not(.banner-image) {
		background: rgb(67, 75, 124);
	}

	.blur-image {
		width: 100%;
		backdrop-filter: blur(0px);
		display: grid;
		grid-template-rows: 1fr 3fr;
	}
</style>
