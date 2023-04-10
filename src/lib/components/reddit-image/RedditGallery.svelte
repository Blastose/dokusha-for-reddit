<script lang="ts">
	import { getGalleryData } from '$lib/utils/redditImagePreview';
	import type { SubmissionData } from 'jsrwrap/types';
	import RedditImage from './RedditImage.svelte';
	import Icon from '$lib/components/icon/Icon.svelte';

	export let post: SubmissionData;

	const galleryData = getGalleryData(post) ?? [];
	let currentImageIndex = 0;
	let totalImagesInGallery = galleryData.length;

	$: currentImage = galleryData[currentImageIndex].url;

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

<div>
	<span>{currentImageIndex + 1}/{totalImagesInGallery}</span>

	<div>
		<button on:click={decrementCurrentImageIndex}>Left</button>
		<button on:click={incrementCurrentImageIndex}>Right</button>
	</div>

	<RedditImage {post} imageUrl={currentImage} />
	{#if galleryData[currentImageIndex].caption}
		<div class="reddit-md">
			<p>{galleryData[currentImageIndex].caption}</p>
		</div>
	{/if}
	{#if galleryData[currentImageIndex].outboundUrl}
		<div class="reddit-md">
			<a href={galleryData[currentImageIndex].outboundUrl} target="_blank" rel="noreferrer"
				>{galleryData[currentImageIndex].outboundUrl}</a
			>
		</div>
	{/if}
</div>
