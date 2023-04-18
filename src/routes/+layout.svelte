<script lang="ts">
	import '../app.css';
	import Layout from '$lib/components/layout/Layout.svelte';
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/themeStore';
	import type { PageData } from './$types';
	import { beforeNavigate } from '$app/navigation';
	import { get } from 'svelte/store';
	import { subredditStore, getSubredditStore } from '$lib/stores/subredditStore';

	export let data: PageData;

	onMount(() => {
		if (!('theme' in localStorage)) {
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				themeStore.set('dark');
			} else {
				themeStore.set('light');
			}
		} else {
			if (localStorage.getItem('theme') === 'dark') {
				themeStore.set('dark');
			} else if (localStorage.getItem('theme') === 'light') {
				themeStore.set('light');
			}
		}
	});

	beforeNavigate((navigation) => {
		// We want to cache posts loaded from infinite scrolling so the user does not have
		// to scroll back down when they return to the subreddit page after clicking on a post
		// We keep a store of stored posts keyed by the pathname (TODO change to full url for searchparams)
		// On back navigation, we check if we have posts in the store, and if so,
		// we set a cookie to let the server know not to fetch posts again (TODO also store about data and skip any fetch calls?) and load
		// the posts from the store in the Subreddit.svelte component
		console.log(navigation.to?.url.href);
		document.cookie =
			'name=oeschger; SameSite=None; Secure; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';

		// We want to clear cached posts when the user is on a subreddit page (/r/[subreddit])
		// and navigates to a different subreddit page (/r/[subreddit])

		console.log(navigation);

		const navigatingFrom = navigation.from;
		const navigatingTo = navigation.to;

		if (!navigatingTo || !navigatingFrom) return;
		console.log('hi');

		// We want to delete all cached subreddits posts when we navigate to a different subreddit
		if (navigation.type === 'link') {
			// TODO better detection of if user is leaving the subreddit for a different subreddit
			if (
				navigatingTo.params?.subreddit.toLowerCase() !==
				navigatingFrom.params?.subreddit.toLowerCase()
			) {
				const subredditStoreObject = get(subredditStore);
				for (const key of Object.keys(subredditStoreObject)) {
					delete subredditStoreObject[key];
					console.log(`deleting cached: ${key}`);
				}
				return;
			}
		}

		if (navigation.delta && navigation.delta >= 0) return;

		const navigatingToHref = navigatingTo.url.href.toLowerCase();
		// We only want to load posts from subreddit (TODO also user pages when that gets implemented) pages
		if (
			!navigatingToHref.match(
				/^https?:\/\/[A-z0-9:.-]+\/r\/[A-z_0-9]+(?!\/comments\/)(?:\/[A-z?=&]+)?$/
			)
		)
			return;
		console.log('hi');
		console.log(getSubredditStore(subredditStore, navigatingToHref));

		const a = get(subredditStore);
		console.log(a);
		for (const b of Object.keys(a)) {
			console.log(`cached: ${b}`);
		}

		const subredditStoreCurrentPath = getSubredditStore(subredditStore, navigatingToHref);

		if (subredditStoreCurrentPath) {
			console.log('hi2');
			// TODO change cookie name value
			document.cookie = 'name=oeschger; SameSite=None; Secure; path=/';
			console.log(document.cookie);
		}
	});
</script>

<svelte:head>
	<script>
		if (!('theme' in localStorage)) {
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				document.documentElement.classList.add('dark');
			}
		} else {
			if (localStorage.getItem('theme') === 'dark') {
				document.documentElement.classList.add('dark');
			}
		}
	</script>
</svelte:head>

<Layout pathname={data.pathname}>
	<slot />
</Layout>
