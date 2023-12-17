<script lang="ts">
	import RedditHtml from '$lib/components/reddit-html/RedditHtml.svelte';
	import { markdownToHtml } from '$lib/utils/markdownToHtml';
	import type { WidgetTextarea } from 'jsrwrap/types';

	export let widget: WidgetTextarea;
</script>

<div>
	<p>{widget.shortName}</p>

	<div class="reddit-md flex flex-col gap-2">
		<RedditHtml rawHTML={markdownToHtml(widget.text)} />
	</div>
</div>
