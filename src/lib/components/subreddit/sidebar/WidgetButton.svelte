<script lang="ts">
	import RedditHtml from '$lib/components/reddit-html/RedditHtml.svelte';
	import { markdownToHtml } from '$lib/utils/markdownToHtml';
	import type { WidgetButton } from 'jsrwrap/types';

	export let widget: WidgetButton;
</script>

<div>
	<p>{widget.shortName}</p>

	<RedditHtml rawHTML={markdownToHtml(widget.description)} />
	<div class="flex flex-col gap-2">
		{#each widget.buttons as button}
			{#if button.kind === 'text'}
				<a class="w-full text-center p-2 rounded-2xl bg-gray-600" href={button.url}>{button.text}</a
				>
			{/if}
		{/each}
	</div>
</div>
