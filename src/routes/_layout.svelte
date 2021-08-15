<script>
  import Nav from '../components/Nav.svelte';
  import { fade } from 'svelte/transition';

  export let segment;
</script>

<Nav {segment} />

<main in:fade={{ duration: 1000 }}>
  <section>
    <slot />
  </section>
</main>

<footer>
  <a
    href="https://www.linkedin.com/in/brittney-postma-868928178/"
    rel="noreferrer"
    target="_blank"
    class="links">
    <img alt="linkedin" src="in.svg" />
  </a>
  <a
    href="https://twitter.com/brittneypostma"
    rel="noreferrer"
    target="_blank"
    class="links">
    <img alt="twitter" src="twitter.svg" />
  </a>

  <a href="https://www.bdesigned.dev/" rel="noreferrer" target="_blank" class="links">
    <img alt="bdesigned" src="bdesigned.svg" />
  </a>

  <a
    href="https://github.com/brittneypostma"
    rel="noreferrer"
    target="_blank"
    class="links">
    <img alt="github" src="github.svg" />
  </a>
  <a
    href="https://www.youtube.com/channel/UCyvOaBoW3Jti69U4Gw1ci9Q?view_as=subscriber"
    rel="noreferrer"
    target="_blank"
    class="links">
    <img alt="youtube" src="youtube.svg" />
  </a>
</footer>

<style>
  main {
    padding: 0 1rem 1rem;
    scroll-behavior: smooth;
    background-color: var(--bg-color);
    width: 100%;
    color: var(--font-color);
    height: 100%;
  }

  section {
    margin: 0 auto;
    max-width: var(--max-width);
    overflow-x: hidden;
    display: grid;
    place-items: center;
    align-content: start;
  }

  footer {border-top: 1px solid rgb(155, 50, 43, 0.75);
    background: #333;
    color: white;
    display: flex;
    gap: 2rem;
    place-content: center;
    padding: 0.5rem;
  }


  img {
    width: 30px;
    height: 30px;
  }

  a {
    text-decoration: none;
    display: grid;
    place-items: center;
    position: relative;
    color: var(--font-color);
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
