<script lang="ts">
	import type { LayoutData } from './$types';
	import Submission from '$lib/components/submission/Submission.svelte';
	import { onMount } from 'svelte';
	import { submissionStore } from '$lib/stores/submissionStore';

	export let data: LayoutData;

	onMount(async () => {
		submissionStore.set(await data.streamed.submission);
	});
</script>

<Submission submission={data.streamed.submission} />
