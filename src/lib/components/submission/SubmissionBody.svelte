<script lang="ts">
	import type { SubmissionData } from 'jsrwrap';
	import { purify } from '$lib/utils/purify';
	import { replaceHtml } from '$lib/utils/replaceHtml';
	import relativeTime from '$lib/utils/relativeTime';

	export let submission: SubmissionData;
</script>

<div class="flex flex-col gap-4">
	<div>
		<p class="font-bold text-xl">{submission.title}</p>
		<div class="flex gap-1">
			<p class="text-blue-600 font-bold">
				{submission.author}
			</p>
			<span>|</span>
			<p>{relativeTime(submission.created_utc)}</p>
		</div>
	</div>

	<div class="reddit-md max-w-4xl">
		{@html purify(replaceHtml(submission.selftext))}
	</div>

	<div>
		<p class="flex gap-1">
			<span class="font-mono font-bold text-green-700">{submission.score}</span><span
				class="font-mono font-bold">/</span
			><span class="font-mono font-bold text-pink-700">{submission.num_comments}</span>
		</p>
	</div>
</div>
