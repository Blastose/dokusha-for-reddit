<script lang="ts">
	import Drawer from './Drawer.svelte';
	import Header from './Header.svelte';
</script>

<Drawer />

<div>
	<Header />

	<div class="content-container">
		<slot />
	</div>
</div>

<style>
	.content-container {
		overflow: hidden;
	}
</style>
