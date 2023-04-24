<script lang="ts">
	import { drawerStore } from '$lib/stores/drawerStore';
	import { largeScreenStore } from '$lib/stores/largeScreenStore';
	import { fade } from 'svelte/transition';
</script>

{#if $drawerStore && !$largeScreenStore}
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
	.overlay {
		z-index: 2;
		width: 100%;
		height: 100vh;
		position: fixed;
		-webkit-tap-highlight-color: transparent;
		background-color: rgba(0, 0, 0, 0.473);
	}
</style>
