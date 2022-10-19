<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme';
	import { get } from 'svelte/store';

	let hideHeader = false;

	onMount(() => {
		let prevScrollPos = window.scrollY;
		const changeHeaderVisibilityStatus = () => {
			let currentScrollPos = window.scrollY;
			if (prevScrollPos > currentScrollPos) {
				hideHeader = false;
			} else {
				hideHeader = true;
			}
			prevScrollPos = currentScrollPos;
		};

		window.addEventListener('scroll', changeHeaderVisibilityStatus);

		return () => {
			window.removeEventListener('scoll', changeHeaderVisibilityStatus);
		};
	});

	const toggleTheme = () => {
		const themeType = get(theme);
		let newTheme: string;

		if (themeType === 'dark') {
			newTheme = 'light';
		} else {
			newTheme = 'dark';
		}

		theme.set(newTheme);
		localStorage.setItem('theme', newTheme);
	};
</script>

<header class="sticky top-0 z-50 shadow-sm bg-white duration-150 {hideHeader ? `-top-[60px]` : ''}">
	<div class="container mx-auto p-4 flex justify-between items-center">
		<a href="/" class="text-xl font-bold"> Dokusha for Reddit </a>
		<div class="flex gap-2">
			<button on:click={toggleTheme}>switch mode</button>
			<button>Login</button>
		</div>
	</div>
</header>
