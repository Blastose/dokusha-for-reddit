<script lang="ts">
	import { page } from '$app/stores';

	export let before: string | undefined;
	export let after: string | undefined;

	$: beforeParam = $page.url.searchParams.get('before');
	$: afterParam = $page.url.searchParams.get('after');

	function createNewUrl(beforeAfter: string | undefined, paramName: string) {
		if (!beforeAfter) return '';
		const url = new URL($page.url);
		if (paramName === 'before') {
			url.searchParams.delete('after');
		} else if (paramName === 'after') {
			url.searchParams.delete('before');
		}
		url.searchParams.set(paramName, beforeAfter);
		return url.href;
	}
</script>

<div>
	{#if (beforeParam || afterParam) && before}
		<a href={createNewUrl(before, 'before')}>prev</a>
	{/if}
	{#if after}
		<a href={createNewUrl(after, 'after')}>next</a>
	{/if}
</div>

<style>
	a {
		background-color: #edeef6;
		padding: 0.25rem 0.5rem;
		border-radius: 0.375rem;
		transition-duration: 150ms;
	}

	a:hover {
		background-color: #d5d7e2;
	}

	:global(.dark) a {
		background-color: #3b3b3f;
		color: #e4e3df;
	}

	:global(.dark) a:hover {
		background-color: #2f2f33;
	}
</style>
