<script>
	import '../app.css';
</script>

<svelte:head>
  <title>Draw App</title>
</svelte:head>

<nav class='bg-white shadow-lg'>
      <div class='container flex space-x-7'>
        <header>
            <a href='/' class='flex items-center py-4 px-2'>
              <h2 class='font-semibold'>Navigation</h2>
            </a>
        </header>

        <ul class='flex items-center space-x-1'>
          <li>
            <a
                href='/'
                class='py-4 px-2 font-semibold '
                >Home</a
              >
          </li>
          <li>
            <a
							href='/about'
							class='py-4 px-2 font-semibold'
							>About</a
						>
          </li>
        </ul>
  </div>
</nav>

<div class='py-5'>
  <slot />
</div>
