<script lang="ts">
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

		node.addEventListener('dragstart', dragStart);
		node.addEventListener('dragend', dragEnd);

		node.addEventListener('dragover', (e: DragEvent) => {
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
		});

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
