<style>
  .cont {
    display: grid;
    justify-content: center;
    justify-items: center;
    text-align: center;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    text-align: center;
    margin: 0 auto;
    font-weight: 600;
  }

  img {
    width: 100%;
    max-width: 400px;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Console Logs</title>
</svelte:head>
<div class="cont">
  <h1>Welcome to console logs!</h1>
  <p>A site for all my bytes of programming related knowledge.</p>
  <img alt="dev" src="dev.png" />
</div>
