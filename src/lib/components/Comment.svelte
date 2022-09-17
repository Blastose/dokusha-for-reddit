<script lang="ts">
	import type Snoowrap from 'snoowrap';
	export let comment: Snoowrap.Comment;
</script>

<div
	class="flex flex-col gap-2 
  {comment.replies.length > 0 ? 'border-l' : ''} border-gray-200 rounded-tl-md"
>
	<div class="bg-gray-200 p-2 rounded-md">
		<div class="flex gap-2 text-sm">
			<p>
				<span
					class="{comment.is_submitter
						? 'text-white bg-blue-500 rounded-sm px-1 py-[0.075rem]'
						: 'text-blue-800'} font-semibold"
				>
					{comment.author}
				</span>
			</p>
			<span class="font-semibold">{comment.score} points</span>
			<span>{new Date(comment.created_utc * 1000).toLocaleString()}</span>
		</div>
		<div class="reddit-md max-w-4xl">
			{@html comment.body_html}
		</div>
	</div>

	<div class="pl-8">
		{#if comment.replies}
			{#each comment.replies as reply}
				<svelte:self comment={reply} />
			{/each}
		{/if}
	</div>
</div>
