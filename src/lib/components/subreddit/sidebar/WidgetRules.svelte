<script lang="ts">
	import type { WidgetSubredditRules } from 'jsrwrap/types';

	export let widget: WidgetSubredditRules;
</script>

<section>
	<h2>{widget.shortName}</h2>
	<div class="flex flex-col gap-2">
		{#each widget.data as rule, index}
			<details>
				<summary>{index + 1}. {rule.shortName}</summary>
				{@html rule.descriptionHtml}
			</details>
		{/each}
	</div>
</section>

<style>
	summary {
		cursor: pointer;
		border-radius: 0.375rem;
		transition: background-color 300ms;
		position: relative;
	}

	summary:hover {
		background-color: #ffffff40;
	}

	summary::marker {
		content: none;
	}
	summary::before,
	summary::after {
		content: '';
	}
	summary::before,
	summary::after {
		width: 0.75em;
		height: 0;
		border-bottom: 2px solid;
		position: absolute;
		top: calc(50% - 1px);
		right: 0;
		transform: translateY(-50%);
	}
	summary::after {
		transform: rotate(90deg);
		transform-origin: 50% 50%;
	}
	[open] summary::after {
		transform: rotate(0deg);
	}
</style>
