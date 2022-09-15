<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.posts[0]?.subreddit}</title>
</svelte:head>

<main class="container mx-auto px-4">
	<div class="flex flex-col gap-2">
		<span class="font-bold text-2xl">{data.posts[0]?.subreddit}</span>
		<div class="flex gap-2">
			<a
				class="py-1 px-2 rounded-sm bg-gray-300 hover:bg-gray-400"
				href="/r/{data.posts[0]?.subreddit}">Hot</a
			>
			<a
				class="py-1 px-2 rounded-sm bg-gray-300 hover:bg-gray-400"
				href="/r/{data.posts[0]?.subreddit}/new">New</a
			>
			<a
				class="py-1 px-2 rounded-sm bg-gray-300 hover:bg-gray-400"
				href="/r/{data.posts[0]?.subreddit}/rising">Rising</a
			>
			<a
				class="py-1 px-2 rounded-sm bg-gray-300 hover:bg-gray-400"
				href="/r/{data.posts[0]?.subreddit}/controversial">Controversial</a
			>
			<a
				class="py-1 px-2 rounded-sm bg-gray-300 hover:bg-gray-400"
				href="/r/{data.posts[0]?.subreddit}/top">Top</a
			>
		</div>
		{#each data.posts as post}
			<div class="flex gap-2">
				<span>{post.ups}</span>
				<a class="text-blue-700" href={`/r/${data.posts[0]?.subreddit}/comments/${post.id}`}>
					<span>{post.title}</span>
				</a>
				<span>{post.num_comments} comments</span>
			</div>
		{/each}
	</div>
</main>
