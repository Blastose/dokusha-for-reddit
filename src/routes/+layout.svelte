<script lang="ts">
	import '../app.css';
	import Layout from '$lib/components/layout/Layout.svelte';
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/themeStore';
	import { beforeNavigate } from '$app/navigation';
	import { get } from 'svelte/store';
	import { subredditStore, getSubredditStore } from '$lib/stores/subredditStore';
	import { largeScreenStore } from '$lib/stores/largeScreenStore';
	import { drawerStore } from '$lib/stores/drawerStore';
	import { articleStore } from '$lib/stores/articleStore';

	const monitorScreenSize = (node: Window) => {
		const windowQuery = node.matchMedia('(min-width: 1024px)');
		const match = (e: MediaQueryListEvent) => {
			if (e.matches) {
				largeScreenStore.set(true);
				drawerStore.set(false);
			} else {
				largeScreenStore.set(false);
			}
		};
		if (!windowQuery.matches) {
			largeScreenStore.set(false);
		}
		windowQuery.addEventListener('change', match);
		return {
			destroy() {
				windowQuery.removeEventListener('change', match);
			}
		};
	};

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
		// We keep a store of stored posts keyed by the pathname
		// On back navigation, we check if we have posts in the store, and if so,
		// we set a cookie to let the server know not to fetch posts again (TODO also store about data and skip any fetch calls?) and load
		// the posts from the store in the Subreddit.svelte component

		document.cookie =
			'name=skip; SameSite=None; Secure; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';

		// We want to clear cached posts when the user is on a subreddit page (/r/[subreddit])
		// and navigates to a different subreddit page (/r/[subreddit])

		const navigatingFrom = navigation.from;
		const navigatingTo = navigation.to;

		if (!navigatingTo || !navigatingFrom) return;

		// We want to delete all cached subreddits posts when we navigate to a different subreddit
		if (navigation.type === 'link') {
			// TODO better detection of if user is leaving the subreddit for a different subreddit
			if (
				navigatingTo.params?.subreddit?.toLowerCase() !==
				navigatingFrom.params?.subreddit?.toLowerCase()
			) {
				const subredditStoreObject = get(subredditStore);
				for (const key of Object.keys(subredditStoreObject)) {
					delete subredditStoreObject[key];
				}
				return;
			}
		}
		const navigatingToHref = navigatingTo.url.href.toLowerCase();

		// article store
		if (
			navigatingToHref.match(
				/^https?:\/\/[A-z0-9:.-]+\/r\/[A-z_0-9]+\/comments\/\w+(?:\/\w+\/?)?(?:\?\w+=\w+)?$/
			)
		) {
			if (navigation.type === 'popstate') {
				if (!$articleStore) return;
				if ($articleStore.url === navigatingToHref) {
					$articleStore.loadFromStore = true;
				} else {
					$articleStore.loadFromStore = false;
				}
				return;
			} else {
				if ($articleStore) {
					$articleStore.loadFromStore = false;
				}
				return;
			}
		}

		if (navigation.delta && navigation.delta >= 0) {
			return;
		}

		// We only want to load posts from subreddit (TODO also user pages when that gets implemented) pages
		if (
			!navigatingToHref.match(
				/^https?:\/\/[A-z0-9:.-]+\/r\/[A-z_0-9]+(?!\/comments\/)(?:\/[A-z?=&]+)?$/
			)
		) {
			return;
		}
		const subredditStoreCurrentPath = getSubredditStore(subredditStore, navigatingToHref);

		if (subredditStoreCurrentPath) {
			document.cookie = 'name=skip; SameSite=None; Secure; path=/';
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

<svelte:window use:monitorScreenSize />

<Layout>
	<slot />
</Layout>
