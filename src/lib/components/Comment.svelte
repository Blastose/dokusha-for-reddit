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
		<button
			class="flex justify-center group"
			on:click={toggleCommentVisibility}
			aria-label="collapse comment"
		>
			<div
				class="w-0.5 my-2 bg-gray-400 dark:bg-[#616161] group-hover:bg-orange-600 dark:group-hover:bg-orange-800 duration-150"
			/>
		</button>
	{:else}
		<button
			class="text-2xl text-gray-400 dark:text-[#616161] hover:text-orange-600 dark:hover:text-orange-800"
			on:click={toggleCommentVisibility}
			aria-label="expand comment"
			><svg aria-hidden="true" style="width:24px;height:24px" viewBox="0 0 24 24">
				<path
					fill="currentColor"
					d="M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z"
				/>
			</svg></button
		>
	{/if}

	<div class="flex flex-col overflow-x-hidden">
		<div class="p-1" id={comment.id}>
			<p class="text-sm {commentHidden ? 'italic' : ''}">
				<span
					class="
					text-orange-700
					dark:text-[#d68a67] font-bold
					{comment.is_submitter ? 'text-blue-600 dark:text-blue-400' : ''} 
					{comment.stickied ? 'text-green-700 dark:text-green-400' : ''}	
					{comment.distinguished === 'moderator' ? 'text-green-700 dark:text-green-400' : ''}	
					"
				>
					{comment.author}
				</span>
				|
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
					<span class="text-green-700 dark:text-green-400"> - stickied comment</span>
				{/if}
			</p>

			{#if !commentHidden}
				<div class="reddit-md max-w-4xl">
					{@html comment.body_html}
				</div>
			{/if}

			<div class="flex gap-2">
				{#if comment.replies.length > 0 && !commentHidden}
					<button on:click={toggleChildComments}>
						<span class="text-gray-600 dark:text-[#ffffff81] text-xs">
							{childCommentHidden ? 'show child comments' : 'hide child comments'}
						</span>
					</button>
				{/if}
				{#if comment.parent_id && comment.parent_id.startsWith('t1_')}
					<a href="#{comment.parent_id.replace('t1_', '')}" rel="nofollow">
						<span class="text-gray-600 dark:text-[#ffffff81] text-xs"> parent </span>
					</a>
				{/if}
			</div>
		</div>

		{#if comment.replies.length > 0}
			<div class="flex flex-col {childCommentHidden || commentHidden ? 'hidden' : ''}">
				{#each comment.replies as reply}
					<svelte:self comment={reply} />
				{/each}
			</div>
		{/if}
	</div>
</div>
