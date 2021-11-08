<script lang="ts">
  import Page from './Page.svelte';
  import ProgressBar from './ProgressBar.svelte'
  // props
  export let exercises: any[];
  export let timeInMinutes: number;

  const totalWarmUps: number = 5;
  let currentWarmUp: number = 1;

  $: currentExercise = exercises[currentWarmUp];

  const updateCurrentWarmUp = () => {
    if (currentWarmUp + 1 > totalWarmUps) {
      // Clear the timers

      // Go to the home page
      window.location.href = '/';
    }

    currentWarmUp += 1;
  }
</script>

<div class="grid place-items-center">
  <Page callback={updateCurrentWarmUp} currentExercise={currentExercise} timeInMinutes={timeInMinutes} />
  <ProgressBar max={totalWarmUps} current={currentWarmUp}/>
</div>