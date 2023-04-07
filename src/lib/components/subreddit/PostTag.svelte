<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';

	type PostTag = Pick<SubmissionData, 'spoiler' | 'over_18'>;

	export let postTag: PostTag;
</script>

{#if postTag.spoiler}
	<p class="post-tags spoiler">Spoiler</p>
{/if}
{#if postTag.over_18}
	<p class="post-tags nsfw">NSFW</p>
{/if}

<style>
	.post-tags {
		display: inline-block;
		padding: 0rem 0.375rem;
		border-radius: 0.125rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 600;
		border: 1px solid;
	}

	.spoiler {
		color: #717677;
	}

	:global(.dark) .spoiler {
		color: #878b8c;
	}

	.nsfw {
		color: rgb(255, 88, 91);
	}

	:global(.dark) .nsfw {
		color: rgb(255, 88, 91);
	}
</style>
