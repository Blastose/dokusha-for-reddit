<script lang="ts">
	import type { WidgetCommunityList } from 'jsrwrap/types';

	export let widget: WidgetCommunityList;
</script>

<div>
	<p>{widget.shortName}</p>

	<div class="reddit-md flex flex-col gap-2">
		{#each widget.data as sub}
			<div class="reddit-md flex flex-col">
				<a href="/{sub.prefixedName}">{sub.prefixedName}</a>
				<span>{sub.subscribers.toLocaleString()} members</span>
			</div>
		{/each}
	</div>
</div>
