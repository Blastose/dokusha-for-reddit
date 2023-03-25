<script lang="ts">
	export let commentHtml: string;
	import RedditHtml from '$lib/components/reddit-html/RedditHtml.svelte';
</script>

<div class="comment-body-container">
	<RedditHtml rawHTML={commentHtml} />
</div>

<style>
	.comment-body-container {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
	}
</style>
