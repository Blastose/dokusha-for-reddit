<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';

	export let post: SubmissionData;
</script>

{#if post.post_hint && post.post_hint === 'image' && post.preview.enabled}
	{@const imageObject = post.preview.images[post.preview.images.length - 1].source}

	{#if !post.is_gallery}
		<div class="preview-image">
			<img
				class="h-full w-full"
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
		<div class="preview-image">
			<img
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
	}

	@media (min-width: 600px) {
		.preview-image > img {
			max-width: 512px;
		}
	}
</style>
