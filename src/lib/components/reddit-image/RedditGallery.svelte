<script lang="ts">
	import { getGalleryData, getImgurGalleryData } from '$lib/utils/redditImagePreview';
	import type { SubmissionData } from 'jsrwrap/types';
	import RedditImage from './RedditImage.svelte';
	import Icon from '$lib/components/icon/Icon.svelte';
	import { onMount } from 'svelte';

	export let post: SubmissionData;
	export let isImgur: boolean;

	let galleryData = !isImgur ? getGalleryData(post) ?? [] : [];
	let currentImageIndex = 0;
	let totalImagesInGallery = galleryData.length;

	$: currentImage = galleryData.at(currentImageIndex)?.url ?? '';

	onMount(async () => {
		if (isImgur) {
			const match = post.url.match(/^https?:\/\/imgur\.com\/a\/([a-zA-Z0-9]*)\/?.*/);
			if (!match) return;
			console.log(post.url);
			galleryData = await getImgurGalleryData(match[1]);
		}
	});

	function incrementCurrentImageIndex() {
		currentImageIndex = (currentImageIndex + 1) % totalImagesInGallery;
	}

	function decrementCurrentImageIndex() {
		currentImageIndex = currentImageIndex - 1;
		if (currentImageIndex < 0) {
			currentImageIndex = totalImagesInGallery - 1;
		}
	}
</script>

<div class="flex flex-col gap-1">
	<span class="text-xs current-post">{currentImageIndex + 1}/{totalImagesInGallery}</span>

	<div class="flex items-center">
		<button
			class="chevron-button"
			on:click={decrementCurrentImageIndex}
			aria-label="gallery image previous"
		>
			<Icon height="24" width="24" name="chevronLeft" />
		</button>
		<button
			class="chevron-button"
			on:click={incrementCurrentImageIndex}
			aria-label="gallery image next"
		>
			<Icon height="24" width="24" name="chevronRight" />
		</button>
	</div>

	<RedditImage imageUrl={currentImage} />
	{#if galleryData.at(currentImageIndex)?.caption}
		<div class="reddit-md">
			<p>{galleryData.at(currentImageIndex)?.caption}</p>
		</div>
	{/if}
	{#if galleryData.at(currentImageIndex)?.outboundUrl}
		<div class="reddit-md">
			<a href={galleryData.at(currentImageIndex)?.outboundUrl} target="_blank" rel="noreferrer"
				>{galleryData.at(currentImageIndex)?.outboundUrl}</a
			>
		</div>
	{/if}
</div>

<style>
	.current-post {
		background-color: rgb(59, 60, 68);
		width: fit-content;
		padding: 0.125rem 0.5rem;
		border-radius: 1rem;
		color: white;
	}

	:global(.dark) .current-post {
		background-color: rgb(88, 87, 94);
	}

	.chevron-button {
		transition-duration: 300ms;
		border-radius: 9999px;
	}

	.chevron-button:hover {
		background-color: rgb(200, 200, 211);
	}

	:global(.dark) .chevron-button:hover {
		background-color: rgb(98, 98, 105);
	}
</style>
