<script lang="ts" context="module">
	export type IconType = keyof typeof icons;
	const icons = {
		close: {
			box: 24,
			svg: `<path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>`
		},
		home: {
			box: 24,
			svg: `<path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />`
		},
		loading: {
			box: 24,
			svg: `<path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />`
		},
		menu: {
			box: 24,
			svg: `<path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />`
		},
		arrowUpOutline: {
			box: 24,
			svg: `<path d="M15,20H9V12H4.16L12,4.16L19.84,12H15V20Z" />`
		},
		arrowDownOutline: {
			box: 24,
			svg: `<path d="M9,4H15V12H19.84L12,19.84L4.16,12H9V4Z" />`
		},
		externalLink: {
			box: 24,
			svg: `<path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />`
		}
	};
</script>

<script lang="ts">
	export let name: IconType;
	export let width: string;
	export let height: string;
	export let hidden: boolean = true;
	let className: string = '';
	export { className as class };
	const icon = icons[name];
</script>

<svg aria-hidden={hidden} class={className} {width} {height} viewBox="0 0 {icon.box} {icon.box}">
	{@html icon.svg}
</svg>
