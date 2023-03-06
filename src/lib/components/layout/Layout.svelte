<script lang="ts">
	import Drawer from './Drawer.svelte';
	import Header from './Header.svelte';
</script>

<Drawer />

<div>
	<Header />

	<div>
		<slot />
	</div>
</div>

<style>
</style>
