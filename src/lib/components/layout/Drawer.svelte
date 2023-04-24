<script lang="ts">
	import { browser } from '$app/environment';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import { drawerStore } from '$lib/stores/drawerStore';
	import { fade, fly } from 'svelte/transition';

	let screenWidth = false;
	$: {
		$drawerStore;
		if (browser && !screenWidth) {
			const windowQuery = window.matchMedia('(min-width: 1024px)');
			screenWidth = windowQuery.matches;
			if (windowQuery.matches) {
				console.log('poggers');
			}
		}
		console.log(screenWidth);
	}
</script>

{#if $drawerStore && !screenWidth}
	<div class="sidebar" in:fly={{ x: -256, opacity: 0.75, duration: 300 }} out:fly={{ x: -256 }}>
		<Sidebar />
	</div>

	<button
		class="overlay"
		aria-label="close sidebar"
		type="button"
		on:click={() => {
			drawerStore.set(false);
		}}
		transition:fade={{ duration: 150 }}
	/>
{/if}

<style>
	.sidebar {
		z-index: 100;
		position: fixed;
		background-color: #ffffff;
		overflow-x: auto;
		width: 16rem;
		height: 100vh;
	}

	:global(.dark) .sidebar {
		background-color: #212224;
	}

	.overlay {
		z-index: 99;
		width: 100%;
		height: 100vh;
		position: fixed;
		-webkit-tap-highlight-color: transparent;
		background-color: rgba(0, 0, 0, 0.473);
	}
</style>
