<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { browser } from '$app/environment';
	import { theme } from '$lib/stores/theme';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { navigating } from '$app/stores';

	NProgress.configure({
		trickleSpeed: 150,
		showSpinner: false,
		minimum: 0.16
	});

	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}
	$: {
		if (browser) {
			if ($theme === 'dark') {
				document.documentElement.classList.add('dark');
				document.documentElement.classList.add('_dark');
			} else if ($theme === 'light') {
				document.documentElement.classList.remove('dark');
				document.documentElement.classList.remove('_dark');
			}
		}
	}
</script>

<svelte:head>
	<script>
		if (!('theme' in localStorage)) {
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				document.documentElement.classList.add('dark');
				document.documentElement.classList.add('_dark');
				localStorage.setItem('theme', 'dark');
			} else {
				localStorage.setItem('theme', 'light');
			}
		} else {
			if (localStorage.getItem('theme') === 'dark') {
				document.documentElement.classList.add('dark');
				document.documentElement.classList.add('_dark');
			}
		}
	</script>
</svelte:head>

<div class="layout">
	<Header />
	<slot />
</div>

<style>
	.layout {
		display: grid;
		grid-template-areas:
			'header'
			'content';
		grid-template-rows: min-content 1fr;
		row-gap: 0.5rem;
		padding-bottom: 1.5rem;
	}
</style>
