<script lang="ts">
	import type Snoowrap from 'snoowrap';

	export let submission: Snoowrap.Submission;

	let backgroundColor = submission.link_flair_background_color;
	if (backgroundColor === '') {
		backgroundColor = '#ffcc8b';
	}
</script>

<span
	class="inline-flex align-bottom px-1 gap-1 items-center justify-center rounded-sm {submission.link_flair_text_color ===
	'light'
		? 'text-white'
		: 'text-black'}"
	style="background-color: {backgroundColor}"
>
	{#if submission.link_flair_type === 'richtext'}
		{#each submission.link_flair_richtext as richtext}
			{#if richtext.e === 'text'}
				<span>{richtext.t}</span>
			{:else if richtext.e === 'emoji'}
				<img class="h-5" src={richtext.u} alt="emoji" />
			{/if}
		{/each}
	{:else if submission.link_flair_type === 'text'}
		<span>{submission.link_flair_text}</span>
	{/if}
</span>
