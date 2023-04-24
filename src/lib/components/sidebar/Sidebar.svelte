<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { drawerStore } from '$lib/stores/drawerStore';

	afterNavigate(() => {
		drawerStore.set(false);
	});
</script>

<div class="px-6 py-4 sidebar">
	<nav class="flex flex-col gap-2">
		<p class="font-bold text-lg">Saved Subreddits</p>

		<a href="/r/programming">Programming</a>
		<a href="/r/genshin_impact">Genshin</a>
		<a href="/r/learnprogramming">Learn Programming</a>
		<a href="/r/learnjavascript">Learn Javascript</a>
		<a href="/r/learnpython">Learn Python</a>
		<a href="/r/javascript">JavaScript</a>
		<a href="/r/TypeScript">TypeScript</a>
		<a href="/r/webdev">Webdev</a>
		<a href="/r/python">Python</a>
		<a href="/r/node">Node</a>
		<a href="/r/deno">Deno</a>
		<a href="/r/rust">Rust</a>
		<a href="/r/sveltejs">Svelte</a>
		<a href="/r/leagueoflegends">League of Legends</a>
		<a href="/r/askreddit">Askreddit</a>
	</nav>
</div>

<style>
	a {
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: block;
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
