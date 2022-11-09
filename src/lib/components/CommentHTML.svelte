<script lang="ts">
	export let rawHTML: string;
	export let commentHidden: boolean;

	const addClass = (event: Event) => {
		const element = event.target as HTMLSpanElement;
		element.classList.add('revealed');
	};

	const addEventListeners = (node: HTMLElement) => {
		const spoilerTextElements = node.querySelectorAll('.md-spoiler-text');
		spoilerTextElements.forEach((element) => {
			element.addEventListener('click', addClass);
		});

		return {
			destroy() {
				spoilerTextElements.forEach((element) => {
					element.removeEventListener('click', addClass);
				});
			}
		};
	};
</script>

<div class="reddit-md max-w-4xl {commentHidden ? 'hidden' : ''}" use:addEventListeners>
	{@html rawHTML}
</div>
