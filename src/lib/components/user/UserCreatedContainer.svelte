<script lang="ts">
	import type { Comment, SubmissionData } from 'jsrwrap/types';
	import SubredditClassic from '$lib/components/subreddit/SubredditClassic.svelte';
	import UserComment from '$lib/components/user/UserComment.svelte';
	import UserCreatedSkeleton from './UserCreatedSkeleton.svelte';

	type CreatedType = ((SubmissionData & { type: 'post' }) | (Comment & { type: 'comment' }))[];

	export let created: CreatedType | Promise<CreatedType>;
	export let type: 'post' | 'comment' | undefined = undefined;

	// We can ignore the below TS error since we pass in the type in the +page.svelte
	// depending on what the param `userWhere` is
	// Not sure if there is a better way to do this
</script>

<div class="flex flex-col gap-4">
	{#await created}
		{#each { length: 10 } as _}
			<UserCreatedSkeleton />
		{/each}
	{:then awaitedCreated}
		{#each awaitedCreated as creation}
			{#if type === 'post'}
				<SubredditClassic post={creation} />
			{:else if type === 'comment'}
				<UserComment comment={creation} />
			{:else if creation.type === 'post'}
				<SubredditClassic post={creation} />
			{:else}
				<UserComment comment={creation} />
			{/if}
		{/each}
	{/await}
</div>
