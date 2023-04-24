<script lang="ts">
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Drawer from './Drawer.svelte';
	import Header from './Header.svelte';
	import { drawerStore } from '$lib/stores/drawerStore';
</script>

<Drawer />

<div class="layout-container" class:hide-sidebar={$drawerStore}>
	<div class="header">
		<Header />
	</div>

	<div class="sidebar" class:hide-sidebar={$drawerStore}>
		<Sidebar />
	</div>

	<div class="content-container">
		<slot />
	</div>
</div>

<style>
	.layout-container {
		display: grid;
		grid-template-areas:
			'header'
			'content';
		grid-template-rows: min-content 1fr;
		grid-template-columns: 1fr;
	}

	.header {
		grid-area: header;
		position: sticky;
		z-index: 1;
		top: 0;
		height: 65px;
	}

	.sidebar {
		display: none;
	}

	:global(.dark) .sidebar {
		background-color: #28292b;
	}

	.content-container {
		grid-area: content;
		overflow: hidden;
	}

	@media (min-width: 1024px) {
		.layout-container {
			grid-template-areas:
				'header header'
				'sidebar content';
			grid-template-rows: min-content 1fr;
			grid-template-columns: 16rem 1fr;
		}

		.layout-container.hide-sidebar {
			grid-template-areas:
				'header'
				'content';
			grid-template-rows: min-content 1fr;
			grid-template-columns: 1fr;
		}

		.sidebar {
			display: block;
			grid-area: sidebar;
			width: 16rem;
			height: 100vh;
			position: fixed;
			z-index: 1;
			top: 65px;
			overflow-x: auto;
			background-color: #f0f4fc;
		}

		.sidebar.hide-sidebar {
			display: none;
		}
	}
</style>
