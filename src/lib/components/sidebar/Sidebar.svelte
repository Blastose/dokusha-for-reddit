<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { drawerStore } from '$lib/stores/drawerStore';
	import { sidebarStore } from '$lib/stores/sidebarStore';
	import { preferencesStore } from '$lib/stores/preferencesStore';
	import { onMount } from 'svelte';
	import AddSubreddit from './AddSubreddit.svelte';
	import SubredditItemList from './SubredditItemList.svelte';
	import Icon from '$lib/components/icon/Icon.svelte';

	afterNavigate(() => {
		drawerStore.set(false);
	});

	let savedSubreddits:
		| {
				subreddit: string;
				displayedName: string;
		  }[]
		| undefined = undefined;
	let drag: boolean;
	let hoveringOverTrashIcon: boolean;
	let showAdd = false;

	function addToStore(subreddit: string, displayName: string) {
		preferencesStore.update((prev) => {
			prev.savedSubreddits = [...prev.savedSubreddits, { displayedName: displayName, subreddit }];
			return prev;
		});
		savedSubreddits = $preferencesStore.savedSubreddits;
	}

	function hideAdd() {
		showAdd = false;
	}

	function onDrop(e: DragEvent) {
		e.preventDefault();
		const arrayIndexToRemove = e.dataTransfer?.getData('arrayIndex');
		preferencesStore.update((prev) => {
			prev.savedSubreddits.splice(Number(arrayIndexToRemove), 1);
			return prev;
		});
		savedSubreddits = $preferencesStore.savedSubreddits;
		drag = false;
	}

	$: sidebarFocusable = $sidebarStore || $drawerStore;

	onMount(() => {
		savedSubreddits = $preferencesStore.savedSubreddits;
	});
</script>

<div class="px-6 py-4 sidebar">
	<nav class="flex flex-col">
		<div class="flex {drag ? 'justify-between' : 'justify-center'}">
			<button
				on:click={() => {
					showAdd = true;
				}}
				aria-label={'add subreddit'}
			>
				<Icon height="24" width="24" name="pencilPlus" />
			</button>
			{#if drag}
				<div
					on:drop={onDrop}
					on:dragover={(e) => {
						e.preventDefault();
					}}
					on:dragenter={() => {
						hoveringOverTrashIcon = true;
					}}
					on:dragleave={() => {
						hoveringOverTrashIcon = false;
					}}
					aria-label="delete subreddit"
				>
					{#if hoveringOverTrashIcon}
						<Icon height="24" width="24" name="deleteEmpty" class="pointer-events-none" />
					{:else}
						<Icon height="24" width="24" name="delete" class="pointer-events-none" />
					{/if}
				</div>
			{/if}
		</div>
		<AddSubreddit show={showAdd} hide={hideAdd} add={addToStore} />
		<p class="font-bold text-lg">Saved Subreddits</p>

		{#if savedSubreddits}
			<SubredditItemList
				bind:hoveringOverTrashIcon
				bind:drag
				focusable={sidebarFocusable}
				bind:savedSubreddits
			/>
		{:else}
			<p>Loading...</p>
		{/if}
	</nav>
</div>

<style>
	.sidebar {
		width: 16rem;
		height: 100vh;
		position: fixed;
		z-index: 3;
		overflow-x: auto;
		background-color: rgb(238, 241, 250);
		scrollbar-width: thin;
	}

	:global(.dark) .sidebar {
		background-color: #303237;
	}

	@media (min-width: 1024px) {
		.sidebar {
			position: sticky;
			height: calc(100vh - 65px);
			top: 65px;
		}
	}
</style>
