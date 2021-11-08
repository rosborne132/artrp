<script>
	import { onMount } from 'svelte';
  import { warmUps } from '../data/warmUps';
  import WarmUp from '../components/WarmUp.svelte'

  let exercises = [];
  let values;

	onMount(() => {
		values = JSON.parse(sessionStorage.getItem('warmupExercise'));

		if (!values) {
			window.location.href = '/';
		}

    exercises = warmUps.filter(({ category }) => values.category === category)
	});
</script>


<div class="grid place-items-center">
  <h1>This is the warm up page.</h1>
  { #if values !== undefined}
    <WarmUp exercises={exercises} timeInMinutes={values.timeInMinutes} />
  { /if }
</div>


