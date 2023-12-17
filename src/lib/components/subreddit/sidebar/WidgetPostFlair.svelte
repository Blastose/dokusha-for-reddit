<script lang="ts">
	import type { WidgetPostFlair } from 'jsrwrap/types';

	export let widget: WidgetPostFlair;
</script>

<div>
	<p>{widget.shortName}</p>
	<div class="flex flex-wrap gap-2 text-sm">
		{#each Object.entries(widget.templates) as [_, flair]}
			<span
				class="rounded-md px-2 text-sm {flair.textColor === 'light' ? 'text-white' : 'text-black'}"
				style:background-color={flair.backgroundColor}>{flair.text}</span
			>
		{/each}
	</div>
</div>
