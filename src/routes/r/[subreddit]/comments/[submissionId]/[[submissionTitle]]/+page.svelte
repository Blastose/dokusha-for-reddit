<script lang="ts">
	import type { PageData } from './$types';
	import Submission from '$lib/components/submission/Submission.svelte';
	import { onMount } from 'svelte';
	import { submissionStore } from '$lib/stores/submissionStore';

	export let data: PageData;

	onMount(async () => {
		submissionStore.set(await data.streamed.submission);
	});
</script>

<main class="container mx-auto">
	<Submission submission={data.streamed.submission} />
</main>
