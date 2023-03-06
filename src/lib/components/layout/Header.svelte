<script lang="ts">
	import { drawerStore } from '$lib/stores/drawerStore';
	import { themeStore } from '$lib/stores/themeStore';
	import Icon from '../icon/Icon.svelte';
	import { browser } from '$app/environment';

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
</script>

<header
	class="header flex px-6 py-4 gap-4 justify-between items-center border-b border-[#4b4b4b15] dark:border-[#ffffff1a]"
>
	<div class="flex gap-2">
		<button
			aria-label="open sidebar"
			on:click={() => {
				drawerStore.set(!$drawerStore);
			}}><Icon height="24" width="24" name="menu" /></button
		>
		<p class="font-bold text-2xl">Dokusha</p>
	</div>

	<div class="flex gap-2">
		<button on:click={toggleTheme}>Theme</button>
		<p>Login</p>
	</div>
</header>

<style>
	.header {
		position: sticky;
		background-color: rgb(111, 158, 111);
		top: 0;
	}

	:global(.dark) .header {
		background-color: rgb(37, 39, 37);
	}
</style>
