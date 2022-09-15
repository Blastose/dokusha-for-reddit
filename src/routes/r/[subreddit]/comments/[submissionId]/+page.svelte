<script lang="ts">
	import Comment from '$lib/components/Comment.svelte';
	import type Snoowrap from 'snoowrap';
	import type { PageData } from './$types';

	export let data: { submission: Snoowrap.Submission };
</script>

<main class="container mx-auto px-4">
	<div class="flex flex-col gap-2">
		<div>
			<span class="font-bold text-2xl">{@html data.submission.title}</span>
			{@html data.submission.selftext_html ?? ''}
		</div>

		<div class="flex flex-col gap-2">
			{#each data.submission.comments as comment}
				<Comment {comment} />
			{/each}
		</div>
	</div>
</main>
