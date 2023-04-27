<script lang="ts">
	import SubredditItem from './SubredditItem.svelte';
	import { preferencesStore } from '$lib/stores/preferencesStore';

	export let savedSubreddits: { displayedName: string; subreddit: string }[];
	export let focusable: boolean;
	export let drag: boolean;
	export let hoveringOverTrashIcon: boolean;

	let listContainer: HTMLDivElement;
	let listItemHover: HTMLAnchorElement;
	let listItemHoverIndex: number;
	let listItemDragIndex: number;
	let yStart: number;
	let yCurrent: number;

	let direction: boolean;

	let divContainerClientY: number;

	function poggers(node: HTMLDivElement) {
		function dragOver(e: DragEvent) {
			console.log('div container drag over');
			yCurrent = e.clientY;
			direction = yCurrent > yStart;
		}
		node.addEventListener('dragend', moveItem);
		node.addEventListener('dragstart', (e) => {
			yStart = e.clientY;
		});
		node.addEventListener('dragover', dragOver);

		return {
			destroy: () => {
				node.removeEventListener('dragover', dragOver);
				node.removeEventListener('dragend', moveItem);
			}
		};
	}

	function moveItem() {
		if (hoveringOverTrashIcon) {
			hoveringOverTrashIcon = false;
			return;
		}

		let newIndex = listItemHoverIndex;
		// direction false = up; true = down;
		if (!direction) {
			newIndex = newIndex + 1;
		}
		console.log(newIndex);

		const movedItem = savedSubreddits.splice(listItemDragIndex, 1);
		savedSubreddits.splice(newIndex, 0, movedItem[0]);
		savedSubreddits = savedSubreddits;
		preferencesStore.update((prev) => {
			prev.savedSubreddits = savedSubreddits;
			return prev;
		});
		console.log(savedSubreddits);
	}

	$: console.log(`hoverIndex: ${listItemHoverIndex}`);
	$: console.log(`dragIndex: ${listItemDragIndex}`);
</script>

<p>direction: {direction}</p>
<p>hoverIndex: {listItemHoverIndex}</p>
<p>yStart: {yStart}</p>
<p>yCurr: {yCurrent}</p>
<div bind:this={listContainer} use:poggers>
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
			parentClientY={divContainerClientY}
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
