<script lang="ts">
	export let subreddit: string;
	export let displayName: string;
	export let focusable: boolean;
	export let arrayIndex: number;
	export let dragging: boolean;

	function drag(node: HTMLAnchorElement) {
		function dragStart(e: DragEvent) {
			dragging = true;
			console.log('b');
			e.dataTransfer?.setData('arrayIndex', arrayIndex.toString());
		}

		function dragEnd() {
			dragging = false;
		}

		node.addEventListener('dragstart', dragStart);
		node.addEventListener('dragend', dragEnd);

		return {
			destroy() {
				node.removeEventListener('dragstart', dragStart);
				node.removeEventListener('dragend', dragEnd);
			}
		};
	}
</script>

<div>
	<a use:drag href="/r/{subreddit}" tabindex={focusable ? 0 : -1}>{displayName}</a>
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
