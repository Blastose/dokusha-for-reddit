<script lang="ts">
	import '../app.css';
	import Layout from '$lib/components/layout/Layout.svelte';
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/themeStore';
	import type { PageData } from './$types';

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
