<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';

	type AuthorFlair = Pick<
		SubmissionData,
		| 'author_flair_background_color'
		| 'author'
		| 'author_flair_css_class'
		| 'author_flair_richtext'
		| 'author_flair_type'
		| 'author_flair_text'
		| 'author_flair_text_color'
		| 'author_flair_template_id'
	>;

	export let author: AuthorFlair;
</script>

{#if (author.author_flair_richtext && author.author_flair_richtext.length > 0) || author.author_flair_text}
	<div class="flair-container">
		{#if author.author_flair_type === 'text' && author.author_flair_text}
			<p class="text-xs font-bold">{author.author_flair_text}</p>
		{:else if author.author_flair_type === 'richtext'}
			{#each author.author_flair_richtext as richtext}
				{#if richtext.e === 'text' && richtext.t}
					<span class="text-xs font-bold">{richtext.t}</span>
				{:else if richtext.e === 'emoji'}
					<div title={richtext.a} class="h-4 w-4" style:background-image="url({richtext.u})" />
				{/if}
			{/each}
		{/if}
	</div>
{/if}

<style>
	.flair-container {
		display: inline-flex;
		align-items: center;
		color: rgb(91, 90, 95);
		vertical-align: text-bottom;
	}

	:global(.dark) .flair-container {
		color: rgb(208, 209, 211);
	}

	p {
		display: inline-block;
	}

	div {
		display: inline-block;
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
