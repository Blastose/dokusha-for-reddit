<script lang="ts">
	import type { SubmissionData, SubredditData } from 'jsrwrap';
	import { submissionStore } from '$lib/stores/submissionStore';
	import { subredditViewStore } from '$lib/stores/subredditViewStore';
	import SubredditCard from './SubredditCard.svelte';
	import SubredditClassic from './SubredditClassic.svelte';

	export let posts: SubmissionData[];
	export let about: SubredditData;

	function setSubmissionStore(submission: SubmissionData) {
		submissionStore.set(submission);
	}

	function toggleView() {
		if ($subredditViewStore === 'card') {
			subredditViewStore.set('classic');
		} else {
			subredditViewStore.set('card');
		}
	}

	$: bannerUrl = about.banner_background_image || about.banner_img;
	$: icon = about.community_icon;
</script>

<section class="flex flex-col gap-4">
	<div
		class:highlight={bannerUrl === ''}
		class:banner-image={bannerUrl !== ''}
		class="banner"
		style={bannerUrl
			? `background-image: linear-gradient(rgba(27, 27, 27, 0.1), rgba(33, 34, 36, 1)), url(${bannerUrl});`
			: ''}
	>
		<div class="blur-image">
			<div />

			<div class="text-dark-mode banner-text container mx-auto">
				{#if icon}
					<img height="64" width="64" class="icon-image" src={icon} alt="" />
				{/if}
				<p class="font-bold text-3xl">{about.title}</p>
				<a href="/{about.display_name_prefixed}" class="font-bold text-sm w-fit">
					{about.display_name_prefixed}
				</a>
			</div>
		</div>
	</div>

	<div class="container mx-auto px-4 pt-4 pb-16 flex flex-col gap-4">
		<button class="outline outline-1 rounded-sm px-2 py-1 w-fit" on:click={toggleView}>
			Switch view - Curr: {$subredditViewStore}
		</button>

		<div class="flex flex-col gap-2">
			{#each posts as post}
				{#if $subredditViewStore === 'card'}
					<SubredditCard {post} />
				{:else}
					<SubredditClassic {post} />
				{/if}
				<hr />
			{/each}
		</div>
	</div>
</section>

<style>
	hr {
		align-self: center;
		width: 95%;
	}

	:global(.dark) hr {
		border-color: rgba(88, 88, 88, 0.452);
	}

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
		background: rgb(59, 110, 85);
	}

	.blur-image {
		width: 100%;
		backdrop-filter: blur(0px);
		display: grid;
		grid-template-rows: 1fr 3fr;
	}
</style>
