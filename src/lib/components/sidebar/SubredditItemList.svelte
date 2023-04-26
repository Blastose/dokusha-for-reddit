<script lang="ts">
	import SubredditItem from './SubredditItem.svelte';
	import { preferencesStore } from '$lib/stores/preferencesStore';

	export let savedSubreddits: { displayedName: string; subreddit: string }[];
	export let focusable: boolean;
	export let drag: boolean;

	let listContainer: HTMLDivElement;
	let listItemHover: HTMLAnchorElement;
	let listItemHoverIndex: number;
	let listItemDragIndex: number;

	let divContainerClientY: number;

	function poggers(node: HTMLDivElement) {
		function a(e: DragEvent) {
			console.log('div container drag over');
			divContainerClientY = e.clientY;
		}
		node.addEventListener('dragend', moveItem);

		return {
			destroy: () => {
				node.removeEventListener('dragover', a);
				node.removeEventListener('dragend', moveItem);
			}
		};
	}

	function moveItem() {
		const movedItem = savedSubreddits.splice(listItemDragIndex, 1);
		savedSubreddits.splice(listItemHoverIndex, 0, movedItem[0]);
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

{listItemHoverIndex}
<div bind:this={listContainer} use:poggers>
	{#each savedSubreddits as savedSubreddit, i}
		<SubredditItem
			bind:dragging={drag}
			bind:currentHover={listItemHover}
			bind:currentHoverIndex={listItemHoverIndex}
			bind:currentDragIndex={listItemDragIndex}
			parentClientY={divContainerClientY}
			arrayIndex={i}
			displayName={savedSubreddit.displayedName}
			subreddit={savedSubreddit.subreddit}
			{focusable}
		/>
	{/each}
</div>
