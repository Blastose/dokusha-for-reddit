<script lang="ts">
	import type { Comment, SubmissionData } from 'jsrwrap/types';
	import SubredditClassic from '$lib/components/subreddit/SubredditClassic.svelte';
	import UserComment from '$lib/components/user/UserComment.svelte';
	import UserCreatedSkeleton from './UserCreatedSkeleton.svelte';
	import Pagination from './Pagination.svelte';
	import { browser } from '$app/environment';

	type CreatedType = ((SubmissionData & { type: 'post' }) | (Comment & { type: 'comment' }))[];

	export let created: CreatedType | Promise<CreatedType>;
	export let type: 'post' | 'comment' | undefined = undefined;

	// We can ignore the below TS error since we pass in the type in the +page.svelte
	// depending on what the param `userWhere` is
	// Not sure if there is a better way to do this

	let before: string | undefined;
	let after: string | undefined;

	$: {
		if (browser) {
			(async () => {
				const posts = await created;
				if (posts.length > 0) {
					before = posts[0].name;
					after = posts[posts.length - 1].name;
				} else {
					before = undefined;
					after = undefined;
				}
			})();
		}
	}
</script>

<div class="flex flex-col gap-6">
	<div class="flex flex-col gap-4">
		{#await created}
			{#each { length: 15 } as _}
				<UserCreatedSkeleton />
			{/each}
		{:then awaitedCreated}
			{#each awaitedCreated as creation (creation.id)}
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

	<Pagination {before} {after} />
</div>
