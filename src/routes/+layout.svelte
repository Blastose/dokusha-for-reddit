<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
</script>

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
