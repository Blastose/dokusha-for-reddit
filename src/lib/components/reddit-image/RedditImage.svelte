<script lang="ts">
	import type { SubmissionData } from 'jsrwrap/types';
	import { getRedditImageUrlPreview } from '$lib/utils/redditImagePreview';

	export let post: SubmissionData;
	export let imageUrl: string =
		getRedditImageUrlPreview(post) ??
		'https://preview.redd.it/evz1esrtpisa1.jpg?auto=webp&v=enabled&s=9c6788efa1cb29167a79ac06ce13b7b3cc40345b';

	export let width = 512;
	console.log(post);

	function resize(node: HTMLElement) {
		console.log(window.innerWidth);

		let pointerStartX: number;
		let pointerCurrentX: number;

		let pointerStartY: number;
		let pointerCurrentY: number;

		let shiftKeyPressed = false;
		let styleX = 0;
		let styleY = 0;

		let moving = false;

		const handleShiftKeyPressed = (e: KeyboardEvent) => {
			if (e.key === 'Shift') {
				shiftKeyPressed = true;
			}
		};

		const handleShiftKeyReleased = (e: KeyboardEvent) => {
			if (e.key === 'Shift') {
				shiftKeyPressed = false;
			}
		};

		const pointerStart = (e: PointerEvent) => {
			pointerStartX = e.x;
			pointerStartY = e.y;
			const transformRegex = /translate\((?:(-?\d+)px, +(-?\d+)px)\)/;
			let matched = node.style.transform.match(transformRegex);
			if (!matched) {
				matched = ['0', '0', '0'];
			}

			styleX = parseInt(matched[1]);
			styleY = parseInt(matched[2]);

			moving = true;
		};

		const pointerEnd = (e: PointerEvent) => {
			if (moving) {
				pointerStartX = e.x;
				pointerStartY = e.y;
				moving = false;

				if (shiftKeyPressed) {
					pointerStartX = pointerCurrentX;
					pointerStartY = pointerCurrentY;
				}
			}
		};

		const pointerMove = (e: PointerEvent) => {
			if (!moving) return;

			if (!shiftKeyPressed) {
				pointerCurrentX = e.x;
				pointerCurrentY = e.y;
				const factor = 1;
				const moveX = (e.x - pointerStartX) / factor;
				const moveY = (e.y - pointerStartY) / factor;

				const { width, height } = node.getBoundingClientRect();

				const dist = Math.sqrt(moveX * moveX + moveY * moveY * 0.5) * Math.sign(moveX);
				const newWidth = Math.max(width + dist, 16);
				node.style.width = `${newWidth}px`;

				pointerStartX = pointerCurrentX;
				pointerStartY = pointerCurrentY;
			} else {
				pointerCurrentX = e.x;
				pointerCurrentY = e.y;
				const moveX = e.x - pointerStartX;
				const moveY = e.y - pointerStartY;
				node.style.transform = `translate(${styleX + moveX}px, ${styleY + moveY}px)`;
			}
		};
		node.addEventListener('pointerdown', pointerStart);
		window.addEventListener('keydown', handleShiftKeyPressed);
		window.addEventListener('keyup', handleShiftKeyReleased);
		window.addEventListener('pointerup', pointerEnd);
		window.addEventListener('pointermove', pointerMove);
		return {
			destroy() {
				node.removeEventListener('pointerdown', pointerStart);
				window.removeEventListener('keydown', handleShiftKeyPressed);
				window.removeEventListener('keyup', handleShiftKeyReleased);
				window.removeEventListener('pointerup', pointerEnd);
				window.removeEventListener('pointermove', pointerMove);
			}
		};
	}
</script>

<div class="w-0 mt-2">
	<div class="resize" use:resize style="width: {width}px">
		<img src={imageUrl} alt="" referrerpolicy="no-referrer" draggable="false" />
	</div>
</div>

<style>
	.resize {
		user-select: none;
	}

	.resize:hover {
		cursor: pointer;
	}

	img {
		user-select: none;
	}
</style>
