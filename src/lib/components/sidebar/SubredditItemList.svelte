<script lang="ts">
	import SubredditItem from './SubredditItem.svelte';
	import { preferencesStore } from '$lib/stores/preferencesStore';

	export let savedSubreddits: { displayedName: string; subreddit: string }[];
	export let focusable: boolean;
	export let drag: boolean;
	export let hoveringOverTrashIcon: boolean;

	let listItemHover: HTMLAnchorElement;
	let listItemHoverIndex: number;
	let listItemDragIndex: number;
	let yStart: number;
	let yCurrent: number;
	let direction: boolean; // direction false = up; true = down;

	function setupEventListeners(node: HTMLDivElement) {
		function dragOver(e: DragEvent) {
			yCurrent = e.clientY;
			direction = yCurrent > yStart;
		}

		function dragStart(e: DragEvent) {
			yStart = e.clientY;
		}

		function reorderItem() {
			if (hoveringOverTrashIcon) {
				hoveringOverTrashIcon = false;
				return;
			}

			let newIndex = listItemHoverIndex;
			if (!direction) {
				// When we are reordering so the item has a higher index, we need to
				// increase the index to it goes to the right place
				newIndex = newIndex + 1;
			}

			const movedItem = savedSubreddits.splice(listItemDragIndex, 1);
			savedSubreddits.splice(newIndex, 0, movedItem[0]);
			savedSubreddits = savedSubreddits;
			preferencesStore.update((prev) => {
				prev.savedSubreddits = savedSubreddits;
				return prev;
			});
		}

		node.addEventListener('dragend', reorderItem);
		node.addEventListener('dragstart', dragStart);
		node.addEventListener('dragover', dragOver);

		return {
			destroy: () => {
				node.removeEventListener('dragover', dragOver);
				node.removeEventListener('dragstart', dragStart);
				node.removeEventListener('dragend', reorderItem);
			}
		};
	}
</script>

<div use:setupEventListeners>
	<div
		class="h-[1px] w-full rounded-full duration-75"
		class:bg-slate-400={drag && !direction && listItemHoverIndex === -1 && !hoveringOverTrashIcon}
	/>
	{#each savedSubreddits as savedSubreddit, i}
		<SubredditItem
			bind:dragging={drag}
			bind:currentHover={listItemHover}
			bind:currentHoverIndex={listItemHoverIndex}
			bind:currentDragIndex={listItemDragIndex}
			{direction}
			arrayIndex={i}
			displayName={savedSubreddit.displayedName}
			subreddit={savedSubreddit.subreddit}
			{focusable}
		/>
		<div
			class="h-[1px] w-full rounded-full duration-75"
			class:bg-slate-400={drag && listItemHoverIndex === i && !hoveringOverTrashIcon}
		/>
	{/each}
</div>
