<script lang="ts">
	export let data;

	function formatDate(date: Date) {
		const month = date.toLocaleString('default', { month: 'long' });
		return `${month} ${date.getDate()}, ${date.getFullYear()}`;
	}
</script>

<section class="flex flex-col">
	<div class="text-dark-mode banner">
		<div class="container mx-auto banner-text">
			<p class="text-2xl font-bold mb-2">u/{data.about.name}</p>
			<p class="font-bold">
				{data.about.link_karma.toLocaleString()} post karma
			</p>
			<p class="font-bold">{data.about.comment_karma.toLocaleString()} comment karma</p>
			<p class="font-bold">Cake day {formatDate(new Date(data.about.created_utc * 1000))}</p>
		</div>
	</div>

	<div class="container content-container">
		<div>
			<a href="/">overview</a>
			<a href="comments">comments</a>
			<a href="submitted">submitted</a>
			<a href="gilded">gilded</a>
		</div>

		<slot />
	</div>
</section>

<style>
	.banner {
		height: 11rem;
		background-color: rgb(67, 75, 124);
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.banner-text {
		display: flex;
		flex-direction: column;
		align-self: flex-end;
		padding: 1rem;
	}

	.content-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-left: auto;
		margin-right: auto;
		padding-bottom: 4rem;
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 1.5rem;
	}

	@media (min-width: 1024px) {
		.banner-text {
			padding: 1rem 4rem;
		}

		.content-container {
			padding-left: 4rem;
			padding-right: 4rem;
		}
	}
</style>
