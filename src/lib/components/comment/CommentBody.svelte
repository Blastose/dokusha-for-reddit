<script lang="ts">
	export let commentHtml: string;
</script>

<div class="comment-body-container">
	<div class="reddit-md max-w-4xl">
		{@html commentHtml}
	</div>
</div>

<style>
	.comment-body-container {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
	}
</style>
