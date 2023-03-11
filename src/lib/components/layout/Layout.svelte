<script lang="ts">
	import Drawer from './Drawer.svelte';
	import Header from './Header.svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { beforeNavigate } from '$app/navigation';

	export let pathname: string;

	beforeNavigate((beforeNavigate) => {
		if (beforeNavigate.delta && beforeNavigate.delta < 0) {
			flyDirection = -1;
		} else {
			flyDirection = 1;
		}
	});

	let flyDirection = 1;
	$: flyXOffset = 20;
</script>

<Drawer />

<div>
	<Header />

	<div class="content-container">
		{#key pathname}
			<div in:fly={{ x: flyXOffset * flyDirection, duration: 250, easing: cubicOut }}>
				<slot />
			</div>
		{/key}
	</div>
</div>

<style>
	.content-container {
		overflow: hidden;
	}
</style>
