<script lang="ts">
	export let show: boolean;
	export let hide: () => void;
	export let add: (subreddit: string, displayName: string) => void;

	let subredditInput: string;
	let displayInput: string;
	let form: HTMLFormElement;
</script>

{#if show}
	<form
		class="flex flex-col gap-2"
		bind:this={form}
		on:submit={(e) => {
			e.preventDefault();
			console.log(subredditInput);
			console.log(displayInput);
			if (!subredditInput || !displayInput) {
				return;
			}

			add(subredditInput, displayInput);
			hide();
			subredditInput = '';
			displayInput = '';
		}}
	>
		<div class="flex flex-col gap-1">
			<label>
				<span>Subreddit</span>
				<input
					class="focus:ring-2 focus:ring-[#9b9fb9] focus:outline-none"
					type="text"
					placeholder="subreddit (no /r/)"
					bind:value={subredditInput}
				/>
			</label>

			<label>
				<span>Display name</span>
				<input
					class="focus:ring-2 focus:ring-[#9b9fb9] focus:outline-none"
					type="text"
					placeholder="display name"
					bind:value={displayInput}
				/>
			</label>
		</div>

		<div class="grid grid-cols-2 gap-1">
			<button on:click={hide} class="cancel" type="button">Cancel</button>
			<button type="submit" class="confirm">Add</button>
		</div>
	</form>
{/if}

<style>
	label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	input {
		border-radius: 0.375rem;
		padding: 0.125rem 0.5rem;
		background-color: rgb(215, 218, 226);
	}

	:global(.dark) input {
		background-color: rgb(66, 68, 73);
	}

	.confirm {
		color: white;
		border-radius: 0.375rem;
		background-color: rgb(151, 148, 201);
		transition-duration: 300ms;
	}

	.confirm:hover {
		background-color: rgb(121, 118, 172);
	}

	:global(.dark) .confirm {
		background-color: rgb(95, 99, 155);
	}

	:global(.dark) .confirm:hover {
		background-color: rgb(73, 77, 126);
	}

	.cancel {
		border-radius: 0.375rem;
		transition-duration: 300ms;
	}

	.cancel:hover {
		background-color: rgb(207, 213, 223);
	}

	:global(.dark) .cancel:hover {
		background-color: rgb(74, 78, 87);
	}
</style>
