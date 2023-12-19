<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import type { WidgetMenu } from 'jsrwrap/types';
	import Icon from '$lib/components/icon/Icon.svelte';

	export let menuItem: WidgetMenu['data'][number];

	const {
		elements: { trigger, menu, item, separator, arrow },
		states: { open }
	} = createDropdownMenu({
		forceVisible: true,
		loop: true
	});
</script>

<button
	type="button"
	use:melt={$trigger}
	class="flex items-center justify-center text-center rounded-2xl px-2 py-1 bg-gray-600"
>
	{menuItem.text}
	<Icon name="chevronDown" height="16" width="16" />
</button>

{#if menuItem.children}
	{#if $open}
		<div class="text-sm" use:melt={$menu} transition:fly={{ duration: 150, y: -10 }}>
			{#each menuItem.children as child}
				<a
					target="_blank"
					rel="noreferrer"
					class="block px-4 py-2 bg-gray-700 hover:bg-gray-800 duration-300"
					use:melt={$item}
					href={child.url}>{child.text}</a
				>
			{/each}
		</div>
	{/if}
{/if}
