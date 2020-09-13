<script>
  import { fade } from 'svelte/transition';

  function typewriter(node, { speed = 100 }) {
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
<div class="cont" in:fade={{ duration: 1000 }}>
  <h1>Welcome to console logs!</h1>
  <p in:typewriter>A site for all my bytes of programming related knowledge.</p>
  <img alt="dev" src="dev.png" />
  <a href="/logs"><button>LOGS</button></a>
</div>

<style>
  .cont {
    padding-bottom: 10px;
    font-family: 'Space Mono', monospace;
    line-height: 1.65;
    display: grid;
    justify-content: center;
    justify-items: center;
    text-align: center;
    max-width: 100vw;
    /* height: 100%;
    align-items: center;
    align-content: center; */
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

  a{
    position: relative;
    margin-top: 10px;
    border-radius: 2px;
    background: var(--accent-color);
    box-shadow: 0 0 0 2px #424242, 0 8px 0 0 #424242;
    padding: 25px 150px;    
  }

  button {
    width: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    font-family: var(--heading-font);
    color: white;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
    border: 0;
    text-decoration: none;
    font-weight: 600;
    /* padding: 0px 110px; */
    background: var(--accent-color);
    border-radius: 2px;
    transform-style: preserve-3d;
    transition: transform 0.2s cubic-bezier(0, 0, 0.58, 1), background 0.2s cubic-bezier(0, 0, 0.58, 1);
  }

  button:hover {
    filter: brightness(1.15);
  }

  button:active {
    top: 5px;
    /* transform: translate3d(0, 2px, 0); */
  }

  @media (min-width: 800px) {
    h1 {
      font-size: 4em;
    }

    img {
      width: 670px;
    }

    a {
      
    padding: 25px 304px;
    }

    button {
      
    padding: 0px 264px;
    }
  }
</style>
