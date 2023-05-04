<script lang="ts">
	import UserCreatedContainer from '$lib/components/user/UserCreatedContainer.svelte';
	import { page } from '$app/stores';

	export let data;

	let title: string;

	let type: 'comment' | 'post' | undefined = undefined;
	$: {
		if ($page.params.userWhere === 'overview') {
			title = `overview for ${data.about.name}`;
		} else if ($page.params.userWhere === 'comments') {
			title = `comments by ${data.about.name}`;
			type = 'comment';
		} else if ($page.params.userWhere === 'submitted') {
			title = `submitted by ${data.about.name}`;
			type = 'post';
		} else if ($page.params.userWhere === 'gilded') {
			title = `gilded by ${data.about.name}`;
		}
	}
</script>

<svelte:head><title>{title}</title></svelte:head>

<UserCreatedContainer created={data.streamed.creations} {type} />
