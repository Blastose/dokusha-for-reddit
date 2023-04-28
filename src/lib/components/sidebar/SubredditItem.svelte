<script lang="ts">
	import { page } from '$app/stores';

	export let subreddit: string;
	export let displayName: string;
	export let focusable: boolean;
	export let arrayIndex: number;
	export let dragging: boolean;
	export let currentHover: HTMLAnchorElement;
	export let currentHoverIndex: number;
	export let currentDragIndex: number;
	export let direction: boolean;

	function drag(node: HTMLAnchorElement) {
		function dragStart(e: DragEvent) {
			dragging = true;
			e.dataTransfer?.setData('arrayIndex', arrayIndex.toString());
			currentDragIndex = arrayIndex;
			currentHoverIndex = arrayIndex;
		}

		function dragEnd() {
			dragging = false;
		}

		function dragOver(e: DragEvent) {
			currentHover = e.currentTarget as HTMLAnchorElement;
			const current = e.clientY - currentHover.getBoundingClientRect().top;
			const half = currentHover.offsetHeight / 2;
			if (current > half) {
				currentHoverIndex = arrayIndex;
			} else {
				if (currentHoverIndex > 0 || !direction) {
					currentHoverIndex = arrayIndex - 1;
				}
			}
		}

		node.addEventListener('dragstart', dragStart);
		node.addEventListener('dragend', dragEnd);
		node.addEventListener('dragover', dragOver);

		return {
			destroy() {
				node.removeEventListener('dragstart', dragStart);
				node.removeEventListener('dragend', dragEnd);
				node.removeEventListener('dragover', dragOver);
			}
		};
	}

	$: current = $page.params.subreddit?.toLowerCase() === subreddit.toLowerCase();
</script>

<div>
	<a class:highlight={current} use:drag href="/r/{subreddit}" tabindex={focusable ? 0 : -1}
		>{displayName}</a
	>
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

	.highlight,
	.highlight:hover {
		color: white;
		background-color: rgb(116, 124, 184);
	}

	:global(.dark) .highlight,
	:global(.dark) .highlight:hover {
		background-color: rgb(80, 86, 133);
	}
</style>
