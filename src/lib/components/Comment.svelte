<script lang="ts">
	import type Snoowrap from 'snoowrap';
	export let comment: Snoowrap.Comment;
	// console.log(comment);

	let childCommentHidden = false;
	const toggleChildComments = () => {
		childCommentHidden = !childCommentHidden;
	};
</script>

<div
	class="flex flex-col gap-2 
  {comment.replies.length > 0 ? 'border-l' : ''} border-gray-200 rounded-tl-md"
>
	<div class="bg-gray-200 p-2 rounded-md">
		<div class="flex gap-2 text-sm">
			<p>
				<span
					class="
					text-blue-800
					{comment.is_submitter ? 'text-white bg-blue-500 rounded-sm px-1 py-[0.075rem]' : ''} 
					{comment.stickied ? 'text-white bg-green-600 rounded-sm px-1 py-[0.075rem]' : ''}	
					font-semibold"
				>
					{comment.author}
				</span>
			</p>
			<span class="font-semibold">{comment.score} points</span>
			<span>{new Date(comment.created_utc * 1000).toLocaleString()}</span>
			{#if comment.stickied}
				<span class="text-green-700"> - stickied comment</span>
			{/if}
		</div>
		<div class="reddit-md max-w-4xl">
			{@html comment.body_html}
		</div>

		{#if comment.replies.length > 0}
			<button on:click={toggleChildComments}>
				<span class="text-gray-600 text-xs"
					>{childCommentHidden ? 'show child comments' : 'hide child comments'}</span
				>
			</button>
		{/if}
	</div>

	{#if comment.replies.length > 0}
		<div class="flex flex-col gap-2 pl-8 {childCommentHidden ? 'hidden' : ''}">
			{#each comment.replies as reply}
				<svelte:self comment={reply} />
			{/each}
		</div>
	{/if}
</div>
