<script lang="ts">
	import type { PageData } from './$types';
	import type Snoowrap from 'snoowrap';

	export let data: any;
	let { submission }: { submission: Snoowrap.Submission } = data;
	// console.log(submission);
</script>

<main class="container mx-auto px-4">
	<div class="flex flex-col gap-2">
		<div>
			<span class="font-bold text-2xl">{@html submission.title}</span>
			{@html submission.selftext_html ?? ''}
		</div>

		<div>
			<span class="font-bold text-lg">Comments: </span>
			{#each submission.comments as comment}
				<div class="flex gap-2">
					<div>
						<span class="font-semibold">{comment.author}</span>
						<span>
							{@html comment.body_html}
						</span>
						<div class="pl-6">
							{#each comment.replies as reply}
								<span class="font-semibold">{reply.author}</span>
								<span>
									{@html reply.body_html}
								</span>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>
