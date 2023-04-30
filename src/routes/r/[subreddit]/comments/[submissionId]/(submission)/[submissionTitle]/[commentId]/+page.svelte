<script lang="ts">
	import Submission from '$lib/components/submission/Submission.svelte';

	export let data;
</script>

<Submission submission={data.streamed.submission} isSingleComment={true} />
