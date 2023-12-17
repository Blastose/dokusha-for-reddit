<script lang="ts">
	import { subredditViewStore } from '$lib/stores/subredditViewStore';
	import SortPosts from '$lib/components/sort/SortPosts.svelte';
	import { page } from '$app/stores';
	import Fly from '$lib/components/layout/Fly.svelte';
	import SubredditSidebar from '$lib/components/subreddit/sidebar/SubredditSidebar.svelte';

	export let data;

	function toggleView() {
		if ($subredditViewStore === 'card') {
			subredditViewStore.set('classic');
		} else {
			subredditViewStore.set('card');
		}
	}

	$: key = $page.params.subreddit?.toLowerCase();

	$: about = data.about;
	$: bannerUrl = about.banner_background_image || about.banner_img;
	$: icon = about.community_icon || about.icon_img;
	$: showSubredditOptions = !/^https?:\/\/[A-z0-9:.-]+\/r\/[A-z_0-9]+\/comments\/.*?$/.test(
		$page.url.toString()
	);
</script>

<section class="flex flex-col">
	<div class="container content-container {showSubredditOptions ? 'pt-4' : 'pt-2'}">
		{#key bannerUrl}
			<div>
				<div
					class="h-[64px] sm:h-[128px] w-full rounded-md bg-no-repeat bg-cover bg-center"
					style:background-image="url({bannerUrl})"
				/>
				<div class="flex px-2 gap-2 relative bottom-[30px] mb-[-30px]">
					<img
						class="border-[#292b2f] bg-[#292b2f] border-4 rounded-full h-[80px] w-[80px]"
						src={icon}
						alt=""
					/>
					<h1 class="flex self-end font-bold pb-3 text-2xl">{about.display_name_prefixed}</h1>
				</div>
			</div>
		{/key}

		{#if showSubredditOptions}
			<SortPosts />

			<button class="outline outline-1 rounded-sm px-2 py-1 w-fit" on:click={toggleView}>
				Switch view - Current view: {$subredditViewStore}
			</button>
		{/if}

		<div class="grid grid-cols-[1fr_256px] gap-4">
			<Fly {key}>
				<slot />
			</Fly>

			{#if showSubredditOptions}
				<div class="sticky max-h-7">
					<SubredditSidebar widgets={data.sidebar} {about} />
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	.content-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-left: auto;
		margin-right: auto;
		padding-bottom: 4rem;
		padding-left: 1rem;
		padding-right: 1rem;
	}

	@media (min-width: 1024px) {
		.content-container {
			padding-left: 4rem;
			padding-right: 4rem;
		}
	}
</style>
