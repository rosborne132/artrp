<script>
	import { onMount } from 'svelte';

	onMount(() => {
		const values = JSON.parse(sessionStorage.getItem('warmupExercise'));

		if (!values) {
			window.location.href = '/';
		}
	});
</script>

<h1>This is the warm up page.</h1>
