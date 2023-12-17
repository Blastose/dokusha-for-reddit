<script lang="ts">
	import type { WidgetImage } from 'jsrwrap/types';

	export let widget: WidgetImage;

	$: randomIndex = Math.floor(Math.random() * widget.data.length);
</script>

<div>
	<p>{widget.shortName}</p>
	<div class="flex flex-col gap-2">
		<a href={widget.data[randomIndex].linkUrl}>
			<img src={widget.data[randomIndex].url} alt="" />
		</a>
	</div>
</div>
