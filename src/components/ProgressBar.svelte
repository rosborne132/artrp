<script lang="ts">
  export let max: number;
  export let current: number;

  $: currentPercent = current / max;
</script>

<div class="relative pt-1">
  <div class="overflow-hidden h-2 text-xs flex rounded bg-purple-200">
    <div
      style={`width: ${currentPercent}%`}
      class="
        shadow-none
        flex flex-col
        text-center
        whitespace-nowrap
        text-white
        justify-center
        bg-purple-500
      "
    ></div>
  </div>
</div>
<h1>ProgressBar</h1>