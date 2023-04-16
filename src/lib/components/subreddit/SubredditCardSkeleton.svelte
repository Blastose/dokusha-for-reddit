<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
</script>

<div class="card-container">
	<div class="animate-pulse">
		<div class="skeleton rounded h-4 w-[128px] md:w-[20%]" />
	</div>

	<div class="animate-pulse">
		<div class="skeleton rounded h-6 w-[50%]" />
	</div>

	<div class="animate-pulse">
		<div class="skeleton rounded h-[128px] w-[100%] md:w-[75%]" />
	</div>

	<div class="actions">
		<div class="votes-container">
			<button aria-label="upvote">
				<Icon height="24" width="24" name="arrowUpOutline" />
			</button>

			<p class="font-bold text-center w-11 font-mono">•</p>

			<button aria-label="downvote">
				<Icon height="24" width="24" name="arrowDownOutline" />
			</button>
		</div>
		<div class="animate-pulse">
			<div class="skeleton rounded h-6 w-[96px]" />
		</div>
	</div>
</div>

<style>
	.card-container {
		padding: 1rem;
		border-radius: 0.375rem;
		background-color: #edeef6;
		display: grid;
		grid-auto-flow: row;
		gap: 0.5rem;
	}

	:global(.dark) .card-container {
		background-color: #2d2e2e;
	}

	.votes-container {
		display: flex;
		gap: 0.125rem;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
	}
</style>
