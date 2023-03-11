<script lang="ts">
	import type { PageData } from './$types';
	import Submission from '$lib/components/submission/Submission.svelte';

	export let data: PageData;
</script>

<main class="container mx-auto px-4 pt-4 pb-24 ">
	<Submission submission={data.streamed.submission} />
</main>
