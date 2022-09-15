<script lang="ts">
	import type Snoowrap from 'snoowrap';
	export let comment: Snoowrap.Comment;
</script>

<div class="flex flex-col gap-2">
	<div class="bg-gray-200 p-2 rounded-md">
		<div class="flex gap-2">
			<span class="text-blue-800 font-semibold">{comment.author}</span>
			<span class="font-semibold">{comment.score} points</span>
			<span>{new Date(comment.created_utc * 1000)}</span>
		</div>
		<div class="max-w-4xl">
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
