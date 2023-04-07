<script lang="ts">
	import Icon from '$lib/components/icon/Icon.svelte';
	import type { SubmissionData } from 'jsrwrap/types';

	export let hasThumbnail: boolean;
	export let post: SubmissionData;
</script>

{#if hasThumbnail}
	<div class="thumbnail-image">
		<img src={post.thumbnail} alt="" />
	</div>
{:else if post.thumbnail !== ''}
	<div class="thumbnail">
		{#if post.thumbnail === 'self'}
			<div class="thumbnail-svg">
				<Icon height="24" width="24" name="selftext" />
			</div>
		{:else if post.thumbnail === 'default'}
			<div class="thumbnail-svg">
				<Icon height="24" width="24" name="linkVariant" />
			</div>
		{:else}
			<p class="thumbnail-background">{post.thumbnail}</p>
		{/if}
	</div>
{/if}

<style>
	.thumbnail-image,
	.thumbnail {
		grid-area: thumbnail;
	}

	img {
		border-radius: 0.125rem;
	}

	.thumbnail {
		display: flex;
	}

	.thumbnail-svg {
		height: 70px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.thumbnail-background {
		height: 70px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgb(111, 120, 150);
		border-radius: 0.5rem;
		color: white;
	}
</style>
