<script lang="ts">
	import type { SubmissionData } from 'jsrwrap';

	export let post: SubmissionData;

	$: styleTag = `background-color: ${
		post.link_flair_background_color || 'rgb(168, 220, 232);color: black'
	};`;
</script>

<div
	class="flair text-sm"
	class:text-black={post.link_flair_text_color === 'dark'}
	class:text-white={post.link_flair_text_color === 'light'}
	style={styleTag}
	style:color={post.link_flair_text_color ? '' : 'black'}
>
	{#if post.link_flair_type === 'richtext'}
		{#each post.link_flair_richtext as richtext}
			{#if richtext.e === 'text'}
				{richtext.t}
			{:else if richtext.e === 'emoji'}
				<img class="h-5" src={richtext.u} alt="" />
			{/if}
		{/each}
	{:else if post.link_flair_type === 'text'}
		{post.link_flair_text}
	{/if}
</div>

<style>
	.flair {
		display: inline-block;
		padding: 0rem 0.375rem;
		border-radius: 0.25rem;
		font-weight: 600;
	}
</style>
