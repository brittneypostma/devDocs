<script>
  import { onMount } from 'svelte';
  import Nav from '../components/Nav.svelte';

  export let segment;

  onMount(() => {
    document.getElementById('year').innerHTML = new Date().getFullYear();
  });
</script>

<Nav {segment} />

<main>
  <slot />
</main>

<footer>
  <a
    href="https://www.linkedin.com/in/brittney-postma-868928178/"
    rel="noreferrer"
    target="_blank"
    class="links">
    <img alt="linkedin" src="in.svg" style="width: 30px; height: 30px;" />
  </a>
  <a
    href="https://twitter.com/brittneypostma"
    rel="noreferrer"
    target="_blank"
    class="links">
    <img alt="twitter" src="twitter.svg" style="width: 30px; height: 30px;" />
  </a>
  &copy;
  <span id="year" />
  <a href="https://www.bdesigned.dev/" rel="noreferrer" target="_blank">
    bDesigned
  </a>

  <a
    href="https://github.com/brittneypostma"
    rel="noreferrer"
    target="_blank"
    class="links">
    <img alt="github" src="github.svg" style="width: 30px; height: 30px;" />
  </a>
  <a
    href="https://www.youtube.com/channel/UCyvOaBoW3Jti69U4Gw1ci9Q?view_as=subscriber"
    rel="noreferrer"
    target="_blank"
    class="links">
    <img alt="youtube" src="youtube.svg" style="width: 30px; height: 30px;" />
  </a>
</footer>

<style>
  main {
    height: calc(100vh - 200px);;
    position: relative;
    top: 88px;
    background-color: var(--bg-color);
    padding: 0 2em;
    margin: 0 auto;
    box-sizing: border-box;
    width: 100%;
    color: var(--font-color);
    overflow-x: hidden;
  }

  footer {
    font-size: 18px;
    line-height: 1.65;
    position: relative;
    grid-row-start: 3;
    grid-row-end: -1;
    font-size: 14px;
    text-align: center;
    width: 100%;
    background: var(--heading-color);
    color: white;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
  }

  footer span {
    margin-left: -10px;
  }

  footer span + a {
    color: white;
    font-weight: 700;
    height: 5px;
    line-height: 0.5;
    margin-left: -5px;
    margin-top: -1px;
    padding: 10px 3px;
  }

  footer span + a::before {
    bottom: -3px;
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
    color: white;
  }

  a::before {
    content: '';
    position: absolute;
    transition: transform 0.2s linear;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 3px;
    background: var(--bg-color);
    transform: scaleX(0);
  }

  a:hover::before {
    transform: scaleX(1);
  }

  .links::before {
    background: transparent;
  }

  .links {
    transition: 0.2s linear all;
  }

  .links:hover {
    filter: brightness(50%);
  }
</style>
