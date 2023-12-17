<script lang="ts">
	import type { WidgetMenu } from 'jsrwrap/types';

	export let widget: WidgetMenu;
</script>

<div>
	<p>Menu</p>
	<div class="flex flex-col gap-2">
		{#each widget.data as menuItem}
			{#if menuItem.url}
				<p class="text-center rounded-2xl p-2 bg-gray-600">
					<a href={menuItem.url}>{menuItem.text}</a>
				</p>
			{:else if menuItem.children}
				<p>{menuItem.text}^</p>
			{/if}
		{/each}
	</div>
</div>
