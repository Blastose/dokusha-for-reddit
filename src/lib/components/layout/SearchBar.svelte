<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/icon/Icon.svelte';

	let searchTerm: string;
	let inputNode: HTMLInputElement;

	function useSlashJumpToSearchBar(_node: HTMLFormElement) {
		function jumpTosearch(e: KeyboardEvent) {
			if (e.key === '/') {
				if (document.activeElement !== inputNode) {
					e.preventDefault();
					inputNode.focus();
				}
			}
		}

		addEventListener('keydown', jumpTosearch);

		return {
			destroy() {
				removeEventListener('keydown', jumpTosearch);
			}
		};
	}
</script>

<form
	use:useSlashJumpToSearchBar
	class="con"
	on:submit={async (e) => {
		e.preventDefault();
		if (!searchTerm) {
			return;
		}
		await goto(`/r/${searchTerm}`);
	}}
>
	<button aria-label="search icon">
		<Icon height="24" width="24" name="magnify" />
	</button>
	<input
		bind:this={inputNode}
		bind:value={searchTerm}
		class="focus:ring-2 focus:ring-[#9b9fb9] focus:outline-none"
		type="text"
		placeholder="subreddit"
	/>
</form>

<style>
	button {
		position: relative;
		left: 2.25rem;
	}

	.con {
		flex-grow: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.25rem;
	}

	input {
		max-width: 25rem;
		width: 100%;
		border-radius: 0.75rem;
		padding: 0.25rem 2.25rem;
		background-color: rgba(177, 192, 211, 0.377);
	}

	:global(.dark) input {
		background-color: rgba(104, 103, 110, 0.377);
	}
</style>
