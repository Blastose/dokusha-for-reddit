<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '$lib/components/icon/Icon.svelte';

	export let initialDropdownText: string;
	export let options: { display: string; value: string }[];
	export let searchParam: string;
	export let isActive: (current: string, _url: URL) => boolean;

	function createLinkUrl(url: URL, newSearchParamValue: string) {
		const urlClone = new URL(url);
		urlClone.searchParams.set(searchParam, newSearchParamValue);
		return urlClone.toString();
	}
</script>

<div class="text-sm font-bold dropdown">
	<button class="current-sort">
		{initialDropdownText}
		<Icon height="20" width="20" name="chevronDown" /></button
	>
	<div class="dropdown-items">
		{#each options as option}
			<a
				data-sveltekit-noscroll
				data-sveltekit-replacestate
				class="dropdown-item"
				class:active={isActive(option.value, $page.url)}
				href={createLinkUrl($page.url, option.value)}>{option.display}</a
			>
		{/each}
	</div>
</div>

<style>
	.dropdown {
		position: relative;
	}

	.current-sort {
		border-radius: 0.375rem;
		display: flex;
		align-items: center;
	}

	.dropdown:focus-within > .current-sort {
		border-radius: 0.375rem 0.375rem 0 0;
	}

	.dropdown-items {
		display: none;
		position: absolute;
		left: 4px;
		background-color: rgb(237, 237, 245);
		border-radius: 0.375rem;
		color: rgb(72, 72, 80);
		border: 1px solid rgb(223, 223, 236);
	}

	:global(.dark) .dropdown-items {
		background-color: #3c3e3f;
		color: rgb(213, 213, 228);
		border: 1px solid rgb(93, 93, 100);
	}

	.dropdown:focus-within .dropdown-items {
		display: flex;
		flex-direction: column;
	}

	.dropdown-item {
		padding: 0.25rem 0.75rem;
		transition-duration: 300ms;
	}

	.dropdown-item:hover {
		background-color: rgb(217, 217, 231);
	}

	:global(.dark) .dropdown-item:hover {
		background-color: #5a5c5e;
	}

	.active {
		color: rgb(101, 108, 184);
	}

	:global(.dark) .active {
		color: rgb(149, 157, 241);
	}
</style>
