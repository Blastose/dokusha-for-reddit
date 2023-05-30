<div class="card-container">
	<div class="animate-pulse">
		<div class="skeleton rounded h-6 w-[70%]" />
	</div>
	<div class="animate-pulse">
		<div class="skeleton rounded h-6 w-[30%]" />
	</div>

	<div class="animate-pulse">
		<div class="skeleton rounded h-[64px] w-[100%] md:w-[75%]" />
	</div>
	<div class="animate-pulse flex gap-1">
		<div class="skeleton rounded h-6 w-24" />
		<div class="skeleton rounded h-6 w-24" />
		<div class="skeleton rounded h-6 w-24" />
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
		background-color: #303237;
	}
</style>
