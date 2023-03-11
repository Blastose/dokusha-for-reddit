<script lang="ts">
	export let toggleCommentVisibility: () => void;
	export let commentHidden: boolean;
</script>

<button
	class="bar-button"
	on:click={toggleCommentVisibility}
	aria-label={commentHidden ? 'expand comment' : 'hide comment'}
>
	<span class="line" />
</button>

<style>
	.bar-button {
		display: flex;
		justify-content: center;
		height: 100%;
	}

	.line {
		display: block;
		transition-duration: 400ms;
		background-color: rgb(194, 204, 211);
		height: 100%;
		width: 2px;
	}

	:global(.dark) .line {
		background-color: #434b4d;
	}

	.bar-button:hover .line {
		background-color: #62ada6;
	}

	:global(.dark) .bar-button:hover .line {
		background-color: #ffffffb2;
	}
</style>
