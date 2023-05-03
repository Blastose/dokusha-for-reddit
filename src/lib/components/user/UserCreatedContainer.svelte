<script lang="ts">
	import type { Comment, SubmissionData } from 'jsrwrap/types';
	import SubredditClassic from '$lib/components/subreddit/SubredditClassic.svelte';
	import UserComment from '$lib/components/user/UserComment.svelte';

	export let created: ((SubmissionData & { type: 'post' }) | (Comment & { type: 'comment' }))[];
</script>

<div class="flex flex-col gap-4">
	{#each created as creation}
		{#if creation.type === 'post'}
			<SubredditClassic post={creation} />
		{:else}
			<UserComment comment={creation} />
		{/if}
	{/each}
</div>
