<script lang="ts">
	import { onMount } from 'svelte';

	export let rawHTML: string;
	export let commentHidden: boolean;
	let commentContainer: HTMLDivElement;

	const addClass = (event: Event) => {
		const element = event.target as HTMLSpanElement;
		element.classList.add('revealed');
	};

	onMount(() => {
		const spoilerTextElements = commentContainer.querySelectorAll('.md-spoiler-text');
		spoilerTextElements.forEach((element) => {
			element.addEventListener('click', addClass);
		});

		return () => {
			spoilerTextElements.forEach((element) => {
				element.removeEventListener('click', addClass);
			});
		};
	});
</script>

<div class="reddit-md max-w-4xl {commentHidden ? 'hidden' : ''}" bind:this={commentContainer}>
	{@html rawHTML}
</div>
