<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<style>
  main {
    position: relative;
    background-color: var(--bg-color);
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
    width: 100%;
    color: var(--font-color);
  }

  footer {
    grid-row-start: 3;
    grid-row-end: 4;
    font-size: 14px;
    text-align: center;
    width: 100%;
    text-transform: uppercase;
  }

  img {
    width: 75px;
    height: 20px;
    position: relative;
    top: 5px;
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>

<footer>
  Built with
  <img alt="svelte" src="svelte-logo.png" />
  and
  <img alt="sapper" src="sapper.png" />
</footer>
