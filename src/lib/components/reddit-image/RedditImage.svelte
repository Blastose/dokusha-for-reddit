<script lang="ts">
	export let imageUrl: string =
		'https://preview.redd.it/evz1esrtpisa1.jpg?auto=webp&v=enabled&s=9c6788efa1cb29167a79ac06ce13b7b3cc40345b';

	export let width = 512;

	function resize(node: HTMLElement, type: 'resizeOnly' | 'both') {
		let mouseStartX: number;
		let mouseCurrentX: number;

		let mouseStartY: number;
		let mouseCurrentY: number;

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

		const mouseDown = (e: MouseEvent) => {
			mouseStartX = e.x;
			mouseStartY = e.y;
			const transformRegex = /translate\((?:(-?\d+)px, +(-?\d+)px)\)/;
			let matched = node.style.transform.match(transformRegex);
			if (!matched) {
				matched = ['0', '0', '0'];
			}

			styleX = parseInt(matched[1]);
			styleY = parseInt(matched[2]);

			moving = true;
		};

		const mouseUp = (e: MouseEvent) => {
			if (moving) {
				mouseStartX = e.x;
				mouseStartY = e.y;
				moving = false;

				if (shiftKeyPressed) {
					mouseStartX = mouseCurrentX;
					mouseStartY = mouseCurrentY;
				}
			}
		};

		const mouseMove = (e: MouseEvent) => {
			if (!moving) return;

			if (!shiftKeyPressed) {
				mouseCurrentX = e.x;
				mouseCurrentY = e.y;
				const factor = 1;
				const moveX = (e.x - mouseStartX) / factor;
				const moveY = (e.y - mouseStartY) / factor;

				const { width } = node.getBoundingClientRect();

				const dist = Math.sqrt(moveX * moveX + moveY * moveY * 0.5) * Math.sign(moveX);
				const newWidth = Math.max(width + dist, 16);
				node.style.width = `${newWidth}px`;
				// node.style.height = `${newWidth / imgRatio}px`;

				mouseStartX = mouseCurrentX;
				mouseStartY = mouseCurrentY;
			} else {
				if (type !== 'both') {
					return;
				}
				mouseCurrentX = e.x;
				mouseCurrentY = e.y;
				const moveX = e.x - mouseStartX;
				const moveY = e.y - mouseStartY;
				node.style.transform = `translate(${styleX + moveX}px, ${styleY + moveY}px)`;
			}
		};
		node.addEventListener('mousedown', mouseDown);
		window.addEventListener('keydown', handleShiftKeyPressed);
		window.addEventListener('keyup', handleShiftKeyReleased);
		window.addEventListener('mouseup', mouseUp);
		window.addEventListener('mousemove', mouseMove);
		return {
			destroy() {
				node.removeEventListener('mousedown', mouseDown);
				window.removeEventListener('keydown', handleShiftKeyPressed);
				window.removeEventListener('keyup', handleShiftKeyReleased);
				window.removeEventListener('mouseup', mouseUp);
				window.removeEventListener('mousemove', mouseMove);
			}
		};
	}

	let imgNode: HTMLImageElement;
	let imgRatio: number;
</script>

<div class="w-0">
	<div class="resize" use:resize={'both'} style="width: {width}px">
		<img
			use:resize={'resizeOnly'}
			src={imageUrl}
			alt=""
			referrerpolicy="no-referrer"
			draggable="false"
			bind:this={imgNode}
			on:load={() => {
				imgRatio = imgNode.width / imgNode.height;
			}}
		/>
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
