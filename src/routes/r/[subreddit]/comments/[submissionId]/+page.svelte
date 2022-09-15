<script lang="ts">
	import Comment from '$lib/components/Comment.svelte';
	import type { PageData } from './$types';
	import type Snoowrap from 'snoowrap';

	export let data: any;
	let { submission }: { submission: Snoowrap.Submission } = data;
	// console.log(submission);
</script>

<main class="container mx-auto px-4">
	<div class="flex flex-col gap-2">
		<div>
			<span class="font-bold text-2xl">{@html submission.title}</span>
			{@html submission.selftext_html ?? ''}
		</div>

		<div class="flex flex-col gap-2">
			{#each submission.comments as comment}
				<Comment {comment} />
			{/each}
		</div>
	</div>
</main>
