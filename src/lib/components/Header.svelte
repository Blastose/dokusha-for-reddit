<script lang="ts">
	import { onMount } from 'svelte';

	let hideHeader = false;

	onMount(() => {
		let prevScrollPos = window.scrollY;
		window.onscroll = () => {
			let currentScrollPos = window.scrollY;
			if (prevScrollPos > currentScrollPos) {
				hideHeader = false;
			} else {
				hideHeader = true;
			}
			prevScrollPos = currentScrollPos;
		};
	});
</script>

<header class="sticky top-0 z-50 shadow-sm bg-white duration-150 {hideHeader ? `-top-[60px]` : ''}">
	<div class="container mx-auto p-4 flex justify-between items-center">
		<a href="/" class="text-xl font-bold"> Dokusha for Reddit </a>
		<div class="flex gap-2">
			<button>switch mode</button>
			<button>Login</button>
		</div>
	</div>
</header>
