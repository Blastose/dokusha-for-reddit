<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { drawerStore } from '$lib/stores/drawerStore';
	import { sidebarStore } from '$lib/stores/sidebarStore';

	afterNavigate(() => {
		drawerStore.set(false);
	});

	$: sidebarFocusable = $sidebarStore || $drawerStore;
</script>

<div class="px-6 py-4 sidebar">
	<nav class="flex flex-col">
		<p class="font-bold text-lg">Saved Subreddits</p>

		<a href="/r/programming" tabindex={sidebarFocusable ? 0 : -1}>Programming</a>
		<a href="/r/genshin_impact" tabindex={sidebarFocusable ? 0 : -1}>Genshin</a>
		<a href="/r/learnprogramming" tabindex={sidebarFocusable ? 0 : -1}>Learn Programming</a>
		<a href="/r/learnjavascript" tabindex={sidebarFocusable ? 0 : -1}>Learn Javascript</a>
		<a href="/r/learnpython" tabindex={sidebarFocusable ? 0 : -1}>Learn Python</a>
		<a href="/r/javascript" tabindex={sidebarFocusable ? 0 : -1}>JavaScript</a>
		<a href="/r/TypeScript" tabindex={sidebarFocusable ? 0 : -1}>TypeScript</a>
		<a href="/r/webdev" tabindex={sidebarFocusable ? 0 : -1}>Webdev</a>
		<a href="/r/python" tabindex={sidebarFocusable ? 0 : -1}>Python</a>
		<a href="/r/node" tabindex={sidebarFocusable ? 0 : -1}>Node</a>
		<a href="/r/deno" tabindex={sidebarFocusable ? 0 : -1}>Deno</a>
		<a href="/r/rust" tabindex={sidebarFocusable ? 0 : -1}>Rust</a>
		<a href="/r/sveltejs" tabindex={sidebarFocusable ? 0 : -1}>Svelte</a>
		<a href="/r/leagueoflegends" tabindex={sidebarFocusable ? 0 : -1}>League of Legends</a>
		<a href="/r/askreddit" tabindex={sidebarFocusable ? 0 : -1}>Askreddit</a>
	</nav>
</div>

<style>
	a {
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: block;
		padding: 0.25rem 0.75rem;
		border-radius: 0.375rem;
		transition-duration: 150ms;
	}

	a:hover {
		background-color: rgb(216, 222, 240);
	}

	:global(.dark) a:hover {
		background-color: rgb(48, 50, 53);
	}

	.sidebar {
		width: 16rem;
		height: 100vh;
		position: fixed;
		z-index: 3;
		overflow-x: auto;
		background-color: rgb(238, 241, 250);
	}

	:global(.dark) .sidebar {
		background-color: #28292b;
	}

	@media (min-width: 1024px) {
		.sidebar {
			position: sticky;
			height: calc(100vh - 65px);
			top: 65px;
		}
	}
</style>
