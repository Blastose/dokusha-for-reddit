<script lang="ts">
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Drawer from './Drawer.svelte';
	import Header from './Header.svelte';
	import { drawerStore } from '$lib/stores/drawerStore';
	import { sidebarStore } from '$lib/stores/sidebarStore';
</script>

<Drawer />

<div class="layout-container">
	<div class="header">
		<Header />
	</div>
	<div class="filler" />

	<div
		class="sidebar"
		class:hide-sidebar={!$sidebarStore}
		class:show-drawer={$drawerStore}
		aria-hidden={!($sidebarStore || $drawerStore)}
	>
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
			'filler header header'
			'filler sidebar content';
		grid-template-rows: min-content 1fr;
		grid-template-columns: 0px min-content 1fr;
	}

	.header {
		grid-area: header;
		position: sticky;
		z-index: 1;
		top: 0;
		height: 65px;
	}

	.sidebar {
		grid-area: sidebar;
		margin-left: -16rem;
		transition-duration: 450ms;
		transition-timing-function: cubic-bezier(0.17, 0.67, 0.23, 1.02);
		margin-top: -65px;
		scrollbar-color: #bec4d160 rgb(230, 233, 245);
	}

	:global(.dark) .sidebar {
		scrollbar-color: #ffffff50 transparent;
	}

	.sidebar.hide-sidebar {
		margin-left: -16rem;
	}

	.sidebar.show-drawer {
		margin-left: 0;
	}

	@media (min-width: 1024px) {
		.sidebar {
			margin-left: 0;
		}
	}

	.content-container {
		grid-area: content;
		overflow: hidden;
	}

	.filler {
		grid-area: filler;
		height: 100vh;
	}
</style>
