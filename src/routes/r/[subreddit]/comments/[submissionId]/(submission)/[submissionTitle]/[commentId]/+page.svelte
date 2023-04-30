<script lang="ts">
	import CommentContainer from '$lib/components/comment/CommentContainer.svelte';
	import { page } from '$app/stores';

	export let data;

	$: key = $page.params.commentId?.toLowerCase();
	$: submission = data.streamed.submission;
</script>

<CommentContainer {submission} flyKey={key} isSingleComment={true} />
