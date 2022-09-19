<script lang="ts">
	import Listing from '$lib/components/Listing.svelte';
	import Submission from '$lib/components/Submission.svelte';
	import type Snoowrap from 'snoowrap';

	export let subreddit: string;
	export let submissions: Snoowrap.Submission[];
</script>

<div class="flex flex-col gap-2">
	<span class="font-bold text-2xl">{subreddit}</span>
	<Listing {subreddit} />
	{#each submissions as submission}
		<Submission {submission} />
	{/each}
</div>
