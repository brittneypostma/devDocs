<script>
  import { onMount } from "svelte";
  import Nav from "../components/Nav.svelte";

  export let segment;

  onMount(() => {
    document.getElementById("year").innerHTML = new Date().getFullYear();
  });
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
    overflow-x: hidden;
  }

  footer {
    grid-row-start: 3;
    grid-row-end: -1;
    font-size: 14px;
    text-align: center;
    width: 100%;
    margin-bottom: 1em;
  }

  img {
    width: 75px;
    height: 20px;
    position: relative;
    top: 5px;
  }

  a {
    text-decoration: none;
    display: inline-block;
    position: relative;
    color: rgb(155, 50, 43);
  }

  a::before {
    content: "";
    position: absolute;
    transition: transform 0.3s ease;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: rgb(155, 50, 43);
    transform: scaleX(0);
  }

  a:hover::before {
    transform: scaleX(1);
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>

<footer>
  &copy;
  <span id="year" />
  <a href="https://bdesigned.netlify.com/" rel="noreferrer" target="_blank">
    b.Designed
  </a>
  Powered by
  <img alt="svelte" src="svelte-logo.png" />
  and
  <img alt="sapper" src="sapper.png" />

</footer>
