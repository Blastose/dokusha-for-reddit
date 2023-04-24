<script lang="ts">
	import { drawerStore } from '$lib/stores/drawerStore';
	import { afterNavigate } from '$app/navigation';

	afterNavigate(() => {
		drawerStore.set(false);
	});
</script>

<div class="flex flex-col gap-2 px-6 py-4">
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
</div>

<style>
	a {
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
