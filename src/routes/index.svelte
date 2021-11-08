<script>
  import { categories } from '../data/categories';

  const form = {
    timeInMinutes: 1,
    category: categories[0]
  };

  const captilizeWord = str => str.charAt(0).toUpperCase() + str.slice(1)

  const handleNumberInput = e => {
    form.timeInMinutes = Number(e.target.value);
  };

  const handleSelectInput = e => {
    form.category = e.target.value;
  };

  const handleSubmit = () => {
    // set values in session storage.
    sessionStorage.setItem('warmupExercise', JSON.stringify(form));

    // redirect to warm up page.
    window.location.href = '/warmup';
  };
</script>


<div class='grid place-items-center'>
  <section class='text-center'>
    <header>
      <h1>Welcome to Draw App</h1>
    </header>

    <p>The best place for drawing exercises!</p>
  </section>

  <section class="w-full max-w-xs content-center">
    <form class='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' on:submit|preventDefault={handleSubmit}>
      <fieldset>
        <div class='mb-4'>
          <label for="categories">Pick your exercise focus</label>
          <div class='block relative'>
            <select name="categories" id="categories" class='appearance-none bg-white block border border-gray-400 focus:outline-none focus:shadow-outline hover:border-gray-500 leading-tight px-4 py-3 pr-8 rounded shadow w-full' on:change={handleSelectInput}>
              { #each categories as category }
                <option value={category}>{captilizeWord(category)}</option>
              { /each }
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        <div class='mb-4'>
          <label for="timeInMinutes">Minutes for each exercise</label>
          <input type='number' id='timeInMinutes' min={1} max={10} class='block border border-gray-400 focus:outline-none focus:bg-white hover:border-gray-500 leading-tight mb-3 px-4 py-3 rounded shadow w-full' bind:value={form.timeInMinutes} on:input={handleNumberInput}>
        </div>
      </fieldset>

      <button type="submit" class='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Start</button>
    </form>
  </section>
</div>
