<script>
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition';

  let ready = false
  onMount(() => ready = true)

  function typewriter(node, { speed = 75 }) {
    const valid =
      node.childNodes.length === 1 &&
      node.childNodes[0].nodeType === Node.TEXT_NODE;

    if (!valid) {
      throw new Error(
        `This transition only works on elements with a single text node child`
      );
    }

    const text = node.textContent;
    const duration = text.length * speed;

    return {
      duration,
      tick: (t) => {
        const i = ~~(text.length * t);
        node.textContent = text.slice(0, i);
      }
    };
  }
</script>

<svelte:head>
  <title>Console Logs</title>
</svelte:head>
{#if ready}
<div class="cont" in:fade={{ duration: 1000 }}>
  <h1>The Console Logs</h1>
  <p in:typewriter>A site for all my bytes of programming related knowledge.</p>
  <img alt="Brittney Postma animated sitting in front of computer filled with stickers." src="me.png" />
  <a href="/logs">
    <button>LOGS</button>
  </a>
</div>
{/if}
<style>
  .cont {
    padding-bottom: 10px;
    font-family: 'Space Mono', monospace;
    line-height: 1.65;
    display: grid;
    place-content: center;
    place-items: center;
    text-align: center;
    max-width: 100vw;
    height: calc(100vh - 115px);
  }

  img {
    width: 300px;
  }

  h1 {
    font-size: 2em;
    text-transform: uppercase;
    text-align: center;
    margin: 0 auto;
    font-weight: 600;
  }

  a {
    text-decoration: none;
    min-width: 250px;
    margin-top: 10px;
    border-radius: 0.25rem;
    box-shadow: 0 0 0 4px #424242, 0 8px 0 0 #424242;
    transition: transform 0.2s cubic-bezier(0, 0, 0.58, 1);
  }

  button {
    min-height: 40px;
    width: 100%;
    font-family: var(--heading-font);
    color: white;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
    border: 0;
    text-decoration: none;
    font-weight: 600;
    background:  rgb(155, 50, 43);
    border-radius: 0.25rem;
    border: 1px solid rgb(155,50,43);
    transform-style: preserve-3d;
    transition: transform 0.2s ease-in-out;
  }

  button:active {
    top: 2px;
  }

  button:hover {
    filter: brightness(0.95);
  }

  @media (min-width: 800px) {
    a {
      min-width: 565px;
    }
    h1 {
      font-size: 4em;
    }

    img {
      width: 670px;
    }
  }
</style>
