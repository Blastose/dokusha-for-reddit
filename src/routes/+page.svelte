<script lang="ts">
	import Submission from '$lib/components/Submission.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head><title>Dokusha for Reddit</title></svelte:head>

<main class="w-full sm:max-w-5xl mx-auto px-4">
	<div class="flex flex-col gap-2">
		<span class="font-bold text-2xl">The Front Page of Reddit</span>
		{#each data.posts as submission}
			<Submission {submission} showSubredditName={true} />
		{/each}
	</div>
</main>
