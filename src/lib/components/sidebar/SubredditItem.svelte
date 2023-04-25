<script lang="ts">
	export let subreddit: string;
	export let displayName: string;
	export let focusable: boolean;

	let showContextMenu: boolean;

	function hover(node: HTMLDivElement) {
		function a() {
			console.log('a');
		}
		node.addEventListener('mou', a);
	}
</script>

<div use:hover>
	<a href="/r/{subreddit}" tabindex={focusable ? 0 : -1}>{displayName}</a>
</div>

<style>
	a {
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: block;
		padding: 0.25rem 0.75rem;
		border-radius: 0.375rem;
		transition-duration: 150ms;
	}

	a:hover {
		background-color: rgb(216, 222, 240);
	}

	:global(.dark) a:hover {
		background-color: rgb(48, 50, 53);
	}
</style>
