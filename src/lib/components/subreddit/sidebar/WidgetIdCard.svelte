<script lang="ts">
	import type { WidgetIdCard, SubredditData } from 'jsrwrap/types';

	const formatter = Intl.NumberFormat('en', { notation: 'compact' });

	function formatNumber(n: number) {
		return formatter.format(n);
	}

	export let widget: WidgetIdCard;
	export let about: SubredditData;
</script>

<section>
	<h2 class="font-bold">{about.title}</h2>
	<p class="opacity-70">{widget.description}</p>

	<div>
		<p>
			<span>{formatNumber(widget.subscribersCount)}</span>
			<span>{widget.subscribersText || 'members'}</span>
		</p>
		<p>
			<span>{formatNumber(widget.currentlyViewingCount)}</span>
			<span>{widget.currentlyViewingText || 'online'}</span>
		</p>
	</div>
</section>
