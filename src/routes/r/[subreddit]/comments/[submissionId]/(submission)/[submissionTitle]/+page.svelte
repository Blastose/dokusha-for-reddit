<script lang="ts">
	// Duplicate of the +page.svelte one level above
	// This is needed so the [submissionTitle] slug and no slug are the same
	// While SvelteKit does have [[optionalSlugs]], I get a matching error when there is another level afterwards
	import CommentContainer from '$lib/components/comment/CommentContainer.svelte';

	export let data;

	$: submission = data.streamed.submission;
</script>

<CommentContainer {submission} />
