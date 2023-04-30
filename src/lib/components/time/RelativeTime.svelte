<script lang="ts">
	import relativeTime from '$lib/utils/relativeTime';
	import { nowStore } from '$lib/stores/nowStore';

	export let postedTimeSeconds: number;
	export let editedTimeSeconds: number | boolean = false;
	export let fontSize: 'small' | 'normal';

	$: currentTime = $nowStore ?? new Date();
</script>

<span
	class="time"
	class:small={fontSize === 'small'}
	title={new Date(postedTimeSeconds * 1000).toString()}
	>{relativeTime(currentTime, postedTimeSeconds)}</span
>
{#if typeof editedTimeSeconds === 'number'}
	<span
		class="time"
		class:small={fontSize === 'small'}
		title={new Date(editedTimeSeconds * 1000).toString()}
		>* (edited {relativeTime(currentTime, editedTimeSeconds)})</span
	>
{/if}

<style>
	.time {
		color: #717677;
		vertical-align: middle;
		font-weight: 600;
		font-size: 0.875rem;
		line-height: 1.25rem;
	}

	:global(.dark) .time {
		color: #878b8c;
	}

	.small {
		font-size: 0.75rem;
		line-height: 1rem;
	}
</style>
