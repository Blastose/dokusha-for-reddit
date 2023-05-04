<script lang="ts">
	import UserCreatedContainer from '$lib/components/user/UserCreatedContainer.svelte';

	export let data;
</script>

<svelte:head><title>overview for {data.about.name}</title></svelte:head>

<UserCreatedContainer created={data.streamed.overview} />
