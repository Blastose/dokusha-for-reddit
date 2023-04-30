<script lang="ts">
	import CommentContainer from '$lib/components/comment/CommentContainer.svelte';

	export let data;

	$: submission = data.streamed.submission;
</script>

<CommentContainer {submission} />
