<script lang="ts">
	import relativeTime from '$lib/relativeTime';
	import type Snoowrap from 'snoowrap';
	export let comment: Snoowrap.Comment;

	let childCommentHidden = false;
	const toggleChildComments = () => {
		childCommentHidden = !childCommentHidden;
	};

	let commentHidden = false;
	const toggleCommentVisibility = () => {
		commentHidden = !commentHidden;
	};
</script>

<div class="grid grid-cols-[1.5rem,_1fr]">
	{#if !commentHidden}
		<button class="flex justify-center group" on:click={toggleCommentVisibility}>
			<div class="w-0.5 my-2 bg-gray-400 group-hover:bg-orange-600 duration-150" />
		</button>
	{:else}
		<button class="text-2xl text-gray-400 hover:text-orange-600" on:click={toggleCommentVisibility}
			><svg style="width:24px;height:24px" viewBox="0 0 24 24">
				<path
					fill="currentColor"
					d="M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z"
				/>
			</svg></button
		>
	{/if}

	<div class="flex flex-col">
		<div class="p-2">
			<p class="text-sm {commentHidden ? 'italic' : ''}">
				<span
					class="
					text-blue-800
					{comment.is_submitter ? 'text-white bg-blue-500 rounded-sm px-1 py-[0.075rem]' : ''} 
					{comment.stickied ? 'text-white bg-green-600 rounded-sm px-1 py-[0.075rem]' : ''}	
					{comment.distinguished === 'moderator'
						? 'text-white bg-green-600 rounded-sm px-1 py-[0.075rem]'
						: ''}	
					font-semibold"
				>
					{comment.author}
				</span>
				<span class="font-semibold">
					{comment.score_hidden ? '[score hidden]' : `${comment.score} points`}
				</span>
				<span title={new Date(comment.created_utc * 1000).toString()}>
					{relativeTime(comment.created_utc)}
				</span>
				{#if typeof comment.edited === 'number'}
					<span title={new Date(comment.edited * 1000).toString()}>
						* (last edited {relativeTime(comment.edited)})
					</span>
				{/if}
				<span />
				{#if comment.stickied}
					<span class="text-green-700"> - stickied comment</span>
				{/if}
			</p>

			{#if !commentHidden}
				<div class="reddit-md max-w-4xl">
					{@html comment.body_html}
				</div>
			{/if}

			{#if comment.replies.length > 0 && !commentHidden}
				<button on:click={toggleChildComments}>
					<span class="text-gray-600 text-xs"
						>{childCommentHidden ? 'show child comments' : 'hide child comments'}</span
					>
				</button>
			{/if}
		</div>

		{#if comment.replies.length > 0}
			<div class="flex flex-col gap-2 pl-2 {childCommentHidden || commentHidden ? 'hidden' : ''}">
				{#each comment.replies as reply}
					<svelte:self comment={reply} />
				{/each}
			</div>
		{/if}
	</div>
</div>
