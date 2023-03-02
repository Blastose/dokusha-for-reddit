<script lang="ts">
	import type { PageData } from './$types';
	import Submission from '$lib/components/submission/Submission.svelte';

	export let data: PageData;
</script>

<Submission submission={data.streamed.submission} />
