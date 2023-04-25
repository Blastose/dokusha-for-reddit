<script lang="ts">
	import { drawerStore } from '$lib/stores/drawerStore';
	import { themeStore } from '$lib/stores/themeStore';
	import Icon from '../icon/Icon.svelte';
	import { browser } from '$app/environment';
	import { sidebarStore } from '$lib/stores/sidebarStore';

	function toggleTheme() {
		if ($themeStore === 'dark') {
			themeStore.set('light');
		} else {
			themeStore.set('dark');
		}
		if (browser) {
			localStorage.setItem('theme', $themeStore);
			if ($themeStore === 'dark') {
				document.documentElement.classList.add('dark');
			} else if ($themeStore === 'light') {
				document.documentElement.classList.remove('dark');
			}
		}
	}

	function openSidebar() {
		if (window.matchMedia('(min-width: 1024px)').matches) {
			sidebarStore.set(!$sidebarStore);
		} else {
			drawerStore.set(true);
		}
	}
</script>

<header
	class="header flex px-4 py-4 gap-4 justify-between items-center border-b border-[#4b4b4b15] dark:border-[#ffffff1a]"
>
	<div class="flex gap-2">
		<button aria-label="open sidebar" on:click={openSidebar}
			><Icon height="24" width="24" name="menu" /></button
		>
		<p class="font-bold text-2xl">Dokusha</p>
	</div>

	<div class="flex gap-2">
		<button on:click={toggleTheme}>Theme</button>
	</div>
</header>

<style>
	.header {
		background-color: rgb(255, 255, 255);
	}

	:global(.dark) .header {
		background-color: #212324;
	}
</style>
