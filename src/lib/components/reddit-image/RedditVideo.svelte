<script lang="ts">
	import { onMount } from 'svelte';
	import { getRedditVideoData } from '$lib/utils/redditImagePreview';
	import type { SubmissionData } from 'jsrwrap/types';

	export let post: SubmissionData;
	const { videoUrl: a, audioUrl: b } = getRedditVideoData(post) ?? { videoUrl: '', audioUrl: '' };

	export let videoUrl: string = a || 'https://v.redd.it/hn6h8n0sztsa1/DASH_720.mp4';
	export let audioUrl: string = b || 'https://v.redd.it/hn6h8n0sztsa1/DASH_audio.mp4';

	let videoElement: HTMLVideoElement;
	let audioElement: HTMLAudioElement;

	function pauseAudio() {
		audioElement.pause();
	}
	function playAudio() {
		audioElement.currentTime = videoElement.currentTime;
		audioElement.play();
	}
	function seekAudio() {
		audioElement.currentTime = videoElement.currentTime;
	}

	function setupEventListeners() {
		videoElement.addEventListener('pause', pauseAudio);

		videoElement.addEventListener('play', playAudio);

		videoElement.addEventListener('waiting', pauseAudio);

		videoElement.addEventListener('playing', playAudio);

		videoElement.addEventListener('seeked', seekAudio);
	}

	onMount(() => {
		// videoElement.play();
		audioElement.volume = 0.1;

		setupEventListeners();

		return () => {
			videoElement.removeEventListener('pause', pauseAudio);
			videoElement.removeEventListener('play', playAudio);
			videoElement.removeEventListener('waiting', pauseAudio);
			videoElement.removeEventListener('playing', playAudio);
			videoElement.removeEventListener('seeked', seekAudio);
		};
	});
</script>

<div>
	<!-- svelte-ignore a11y-media-has-caption -->
	<video src={videoUrl} bind:this={videoElement} controls />
	<audio src={audioUrl} bind:this={audioElement} controls />
</div>
