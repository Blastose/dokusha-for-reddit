<script lang="ts">
	export let rawHTML: string;
	export let fixedSize = true;

	const addRevealedClass = (event: Event) => {
		const element = event.target as HTMLSpanElement;
		element.classList.add('revealed');
	};

	const addEventListeners = (node: HTMLElement) => {
		const spoilerTextElements = node.querySelectorAll('.spoiler');
		spoilerTextElements.forEach((element) => {
			element.addEventListener('click', addRevealedClass);
		});
		return {
			destroy() {
				spoilerTextElements.forEach((element) => {
					element.removeEventListener('click', addRevealedClass);
				});
			}
		};
	};
</script>

<div class="reddit-md {fixedSize ? 'max-w-4xl' : ''}" use:addEventListeners>
	{@html rawHTML}
</div>
