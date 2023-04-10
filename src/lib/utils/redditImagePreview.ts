import type { SubmissionData } from 'jsrwrap/types';

export function getRedditImageUrlPreview(post: SubmissionData): string | null {
	if (!post.post_hint || post.post_hint !== 'image') {
		return null;
	}

	const source = post.preview.images[0].source;
	source.width;
	source.height;

	return post.url;
}

export function getGalleryData(
	post: SubmissionData
): { url: string; width: number; height: number; outboundUrl?: string; caption?: string }[] | null {
	if (!post.is_gallery || !post.gallery_data || !post.media_metadata) {
		return null;
	}

	if (!post.media_metadata) return null;

	const res: { url: string; width: number; height: number }[] = [];

	for (const item of post.gallery_data.items) {
		const galleryItem = post.media_metadata[item.media_id];
		if (galleryItem.e !== 'Image') {
			continue;
		}

		res.push({
			url: galleryItem.s.u,
			width: galleryItem.s.x,
			height: galleryItem.s.y,
			outboundUrl: item.outbound_url,
			caption: item.caption
		});
	}

	if (res.length < 1) {
		return null;
	}

	return res;
}

export function getVideoData(post: SubmissionData): string | null {
	if (!post.is_video || !post.media || !post.media.reddit_video) return null;

	return post.media.reddit_video.fallback_url;
}
