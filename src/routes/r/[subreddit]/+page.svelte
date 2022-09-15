<script lang="ts">
	import type { PageData } from './$types';
	import type Snoowrap from 'snoowrap';
	import { page } from '$app/stores';

	export let data: PageData;
	let { posts }: { posts: Snoowrap.Submission[] } = data;
</script>

<svelte:head>
	<title>{posts[0]?.subreddit}</title>
</svelte:head>

<main class="container mx-auto px-4">
	<div class="flex flex-col gap-2">
		<span class="font-bold text-2xl">{posts[0]?.subreddit}</span>
		{#each posts as post}
			<div class="flex gap-2">
				<span>{post.ups}</span>
				<a class="text-blue-700" href={`${$page.url.pathname}/comments/${post.id}`}>
					<span>{post.title}</span>
				</a>
				<span>{post.num_comments} comments</span>
				<!-- {#each post.comments as comment}
				<span>{comment.body_html}</span>
			{/each} -->
			</div>
		{/each}
	</div>
</main>
