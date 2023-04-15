<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
</script>

<div class="classic-container">
	<div class="score">
		<button>
			<Icon height="24" width="24" name="arrowUpOutline" />
		</button>

		<p>•</p>

		<button>
			<Icon height="24" width="24" name="arrowDownOutline" />
		</button>
	</div>

	<div class="thumbnail animate-pulse">
		<div class="h-[70px] w-[70px] rounded skeleton" />
	</div>

	<div class="animate-pulse">
		<div class="h-6 w-[50%] skeleton rounded" />
	</div>

	<div class="animate-pulse flex gap-2">
		<div class="h-6 w-[33%] skeleton rounded" />
	</div>

	<div class="animate-pulse flex gap-2">
		<div class="h-6 w-[4%] skeleton rounded" />
		<div class="h-6 w-[10%] skeleton rounded" />
		<div class="h-6 w-[4%] skeleton rounded" />
	</div>
</div>

<style>
	.classic-container {
		display: grid;
		border-radius: 0.375rem;
		transition: box-shadow 150ms;
		padding: 0.75rem 1rem;
		background-color: #edeef6;

		grid-template-columns: 2rem 70px 1fr;
		grid-template-rows: min-content min-content min-content min-content;

		grid-template-areas:
			's thumbnail title'
			's thumbnail post-info'
			's thumbnail actions';

		column-gap: 0.5rem;
		row-gap: 0.5rem;
	}

	:global(.dark) .classic-container {
		background-color: #2d2e2e;
	}

	.thumbnail {
		grid-area: thumbnail;
	}

	.score {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		grid-area: s;
	}
</style>
