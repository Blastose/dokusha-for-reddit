<script lang="ts">
	import type { Comment } from 'jsrwrap/types';
	import { submissionStore } from '$lib/stores/submissionStore';
	import { markdownToHtml } from '$lib/utils/markdownToHtml';
	import RedditHtml from '$lib/components/reddit-html/RedditHtml.svelte';
	import RelativeTime from '$lib/components/time/RelativeTime.svelte';

	export let comment: Comment;

	function buildFullCommentsLink(commentPermalink: string) {
		const splitPaths = commentPermalink.split('/');
		const newUrl = splitPaths.splice(0, 6).join('/');
		return newUrl;
	}

	function clearSubmissionStore() {
		submissionStore.set(null);
	}
</script>

<div class="comment-container">
	<span class="text-sm font-bold"
		><a
			href={buildFullCommentsLink(comment.permalink)}
			on:click={clearSubmissionStore}
			class="text-base">{comment.link_title}</a
		>
		by
		<a class="author" href="/u/{comment.link_author}">u/{comment.link_author}</a>
		in
		<a class="author" href="/{comment.subreddit_name_prefixed}">r/{comment.subreddit}</a></span
	>

	<div>
		<p class="author-info text-sm font-bold">
			<span class="author">
				<a href="/u/{comment.author}">{comment.author}</a>
				{#if comment.distinguished === 'moderator'}
					<span class="mod author">MOD</span>
				{:else if comment.is_submitter}
					<span class="submitter author">OP</span>
				{/if}
			</span>
			<span class="text-xs">{comment.score} points</span>
			<RelativeTime
				postedTimeSeconds={comment.created_utc}
				editedTimeSeconds={comment.edited}
				fontSize="small"
			/>
		</p>
		<RedditHtml rawHTML={markdownToHtml(comment.body)} />
		<div class="actions-container text-sm font-semibold">
			<a href={buildFullCommentsLink(comment.permalink)} on:click={clearSubmissionStore}
				>{comment.num_comments} comments</a
			>
			<span>source</span>
			<a href={comment.permalink} on:click={clearSubmissionStore}>permalink</a>
			<a href="{comment.permalink}?context=3" on:click={clearSubmissionStore}>context</a>
		</div>
	</div>
</div>

<style>
	.comment-container {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0.75rem 1.5rem;
		border-radius: 0.375rem;
		background-color: #edeef6;
	}

	:global(.dark) .comment-container {
		background-color: #2d2e2e;
	}

	.actions-container {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
		color: #717677;
		fill: #717677;
	}

	:global(.dark) .actions-container {
		color: #878b8c;
		fill: #878b8c;
	}

	.author-info > * {
		vertical-align: middle;
	}

	.author {
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 700;
		color: #444075;
	}

	:global(.dark) .author {
		color: #aeaedd;
	}

	.submitter,
	:global(.dark) .submitter {
		color: rgb(99, 145, 214);
	}

	.mod {
		color: #3a853c;
	}

	:global(.dark) .mod {
		color: #57a858;
	}
</style>
