<script lang="ts">
	import { subredditViewStore } from '$lib/stores/subredditViewStore';
	import SortPosts from '$lib/components/sort/SortPosts.svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;

	function toggleView() {
		if ($subredditViewStore === 'card') {
			subredditViewStore.set('classic');
		} else {
			subredditViewStore.set('card');
		}
	}

	beforeNavigate((beforeNavigate) => {
		if (beforeNavigate.delta && beforeNavigate.delta < 0) {
			flyDirection = -1;
		} else {
			flyDirection = 1;
		}
	});

	let flyDirection = 1;
	$: flyXOffset = 20;

	$: about = data.about;
	$: bannerUrl = about.banner_background_image || about.banner_img;
	$: icon = about.community_icon || about.icon_img;
	$: showSubredditOptions = !/^https?:\/\/[A-z0-9:.-]+\/r\/[A-z_0-9]+\/comments\/.*?$/.test(
		$page.url.toString()
	);
</script>

<section class="flex flex-col">
	{#key bannerUrl}
		<div
			class:highlight={bannerUrl === ''}
			class:banner-image={bannerUrl !== ''}
			class="banner"
			style={bannerUrl
				? `background-image: linear-gradient(rgba(27, 27, 27, 0.1), rgba(43, 44, 46, 1)), url(${bannerUrl});`
				: ''}
		>
			<div class="blur-image">
				<div />

				<div class="text-dark-mode banner-text container mx-auto">
					{#if icon}
						{#key icon}
							<img height="64" width="64" class="icon-image" src={icon} alt="" />
						{/key}
					{/if}
					<p class="font-bold text-2xl">{about.title}</p>
					<a href="/{about.display_name_prefixed}" class="font-bold text-sm w-fit">
						{about.display_name_prefixed}
					</a>
				</div>
			</div>
		</div>
	{/key}

	<div
		class="container mx-auto px-4 {showSubredditOptions
			? 'pt-4'
			: 'pt-2'} pb-16 flex flex-col gap-4"
	>
		{#if showSubredditOptions}
			<SortPosts />

			<button class="outline outline-1 rounded-sm px-2 py-1 w-fit" on:click={toggleView}>
				Switch view - Current view: {$subredditViewStore}
			</button>
		{/if}

		{#key data.pathname}
			<div in:fly={{ x: flyXOffset * flyDirection, duration: 250, easing: cubicOut }}>
				<slot />
			</div>
		{/key}
	</div>
</section>

<style>
	.banner-text {
		display: flex;
		flex-direction: column;
		align-self: flex-end;
		padding: 1rem;
	}

	.icon-image {
		border-radius: 9999px;
	}

	.banner {
		min-height: 10rem;
		display: flex;
	}

	.banner-image {
		overflow: hidden;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center center;
	}

	.highlight:not(.banner-image) {
		background: rgb(88, 97, 158);
	}

	:global(.dark) .highlight:not(.banner-image) {
		background: rgb(67, 75, 124);
	}

	.blur-image {
		width: 100%;
		backdrop-filter: blur(0px);
		display: grid;
		grid-template-rows: 0.5fr 3fr;
	}
</style>
