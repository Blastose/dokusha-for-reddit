<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';

	export let post: SubmissionData;
</script>

{#if post.post_hint && post.post_hint === 'image' && post.preview.enabled}
	{@const imageObject = post.preview.images[post.preview.images.length - 1].source}

	{#if !post.is_gallery}
		<div
			class="preview-image background-filter"
			style:background-image="linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url({imageObject.url})"
		>
			<img
				class="h-full w-full z-10"
				width={imageObject.width}
				height={imageObject.height}
				src={imageObject.url}
				alt="Img"
			/>
		</div>
	{/if}
{:else if post.is_gallery && post.media_metadata}
	{@const galleryFirst = post.media_metadata[post.gallery_data?.items[0].media_id ?? '']}
	{#if galleryFirst.e === 'Image'}
		{@const galleryFirstImage = galleryFirst.s}
		<div
			class="preview-image background-filter"
			style:background-image="linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url({galleryFirstImage.u})"
		>
			<img
				class="h-full w-full z-10"
				width={galleryFirstImage.x}
				height={galleryFirstImage.y}
				src={galleryFirstImage.u}
				alt=""
			/>
		</div>
	{/if}
{/if}

<style>
	.preview-image {
		display: grid;
		justify-content: center;
		border-radius: 0.5rem;
		overflow: hidden;
	}

	.background-filter::after {
		backdrop-filter: blur(16px);
		content: '';
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
	}

	.background-filter {
		position: relative;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}

	@media (min-width: 600px) {
		.preview-image > img {
			max-height: 512px;
		}
	}
</style>
