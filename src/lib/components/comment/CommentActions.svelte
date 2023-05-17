<script lang="ts">
	import Icon from '../icon/Icon.svelte';
	import type { Comment } from 'jsrwrap/types';

	export let comment: Comment;
	export let sourceHidden: boolean;
	export let toggleSourceVisibility: () => void;
</script>

<div class="actions-container">
	<div class="votes-container">
		<button aria-label="upvote">
			<Icon height="24" width="24" name="arrowUpOutline" />
		</button>

		<p class="score font-mono">
			{comment.score_hidden ? '•' : comment.score}
		</p>

		<button aria-label="downvote">
			<Icon height="24" width="24" name="arrowDownOutline" />
		</button>
	</div>

	<button class="text-sm font-semibold" on:click={toggleSourceVisibility}
		>{sourceHidden ? 'show source' : 'hide source'}</button
	>

	<a
		class="text-sm font-semibold"
		href={`https://www.reddit.com${comment.permalink}`}
		target="_blank"
		rel="noreferrer">view in reddit</a
	>

	<a class="text-sm font-semibold" href={comment.permalink}>permalink</a>
</div>

<style>
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

	.votes-container {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.score {
		font-weight: 700;
		color: #7e8485;
	}

	:global(.dark) .score {
		color: #a1a5a7;
	}
</style>
