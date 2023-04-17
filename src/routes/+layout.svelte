<script lang="ts">
	import '../app.css';
	import Layout from '$lib/components/layout/Layout.svelte';
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/themeStore';
	import type { PageData } from './$types';
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
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

		if (navigation.delta && navigation.delta >= 0) return;

		const navigatingTo = navigation.to?.url.href.toLowerCase();
		if (!navigatingTo) return;

		// We only want to load posts from subreddit (TODO also user pages when that gets implemented) pages
		if (!navigatingTo.match(/^\/r\/[A-z_0-9]+(?!\/comments\/)$/)) return;
		console.log('hi');
		console.log(getSubredditStore(subredditStore, navigatingTo));
		if (getSubredditStore(subredditStore, navigatingTo)) {
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
