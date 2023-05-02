<script lang="ts">
	import type { Comment } from 'jsrwrap/types';
	import { submissionStore } from '$lib/stores/submissionStore';
	import { markdownToHtml } from '$lib/utils/markdownToHtml';
	import RedditHtml from '$lib/components/reddit-html/RedditHtml.svelte';
	import RelativeTime from '$lib/components/time/RelativeTime.svelte';

	export let comment: Comment;

	function buildFullCommentsLink(commentPermalink: string) {
		// We need to remove the first 3 characters since id starts with t3_
		const splitPaths = commentPermalink.split('/');
		// The first 6 elements of the splitpath array form the base url for
		// the new comment permalink
		const newUrl = splitPaths.splice(0, 6).join('/');
		return newUrl;
	}

	function clearSubmissionStore() {
		submissionStore.set(null);
	}
</script>

<div class="flex flex-col gap-1 px-6 py-2 rounded-md bg-[#2d2e2e]">
	<span class="text-sm font-bold"
		><a
			href={buildFullCommentsLink(comment.permalink)}
			on:click={clearSubmissionStore}
			class="text-base">{comment.link_title}</a
		>
		by
		<a class="author" href="/u/{comment.link_author}">u/{comment.link_author}</a>
		in
		<a class="author" href={comment.subreddit_name_prefixed}>r/{comment.subreddit}</a></span
	>

	<div>
		<div class="uwu text-sm font-bold flex items-end gap-1">
			<p class="author">
				{comment.author}
				{#if comment.distinguished === 'moderator'}
					<span class="mod author">MOD</span>
				{:else if comment.is_submitter}
					<span class="submitter author">OP</span>
				{/if}
			</p>
			<p>{comment.score} points</p>
			<RelativeTime
				postedTimeSeconds={comment.created_utc}
				editedTimeSeconds={comment.edited}
				fontSize="small"
			/>
		</div>
		<RedditHtml rawHTML={markdownToHtml(comment.body)} />
		<div class="text-gray-500 flex gap-2 text-sm font-semibold">
			<a href={buildFullCommentsLink(comment.permalink)}>{comment.num_comments} comments</a>
			<span>source</span>
			<a href={comment.permalink} on:click={clearSubmissionStore}>permalink</a>
			<a href="{comment.permalink}?context=3" on:click={clearSubmissionStore}>context</a>
		</div>
	</div>
</div>

<style>
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
