<script lang="ts">
	import UserCreatedContainer from '$lib/components/user/UserCreatedContainer.svelte';
	import type { Comment } from 'jsrwrap/types';

	export let data;

	// Needed to prevent a TS error for some reason
	$: comments = data.comments as (Comment & { type: 'comment' })[];
</script>

<svelte:head><title>comments by {data.about.name}</title></svelte:head>

<UserCreatedContainer created={comments} />
