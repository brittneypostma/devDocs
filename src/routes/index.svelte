<script>
import { fade } from 'svelte/transition';

	function typewriter(node, { speed = 100 }) {
		const valid = (
			node.childNodes.length === 1 &&
			node.childNodes[0].nodeType === Node.TEXT_NODE
		);

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		const duration = text.length * speed;

		return {
			duration,
			tick: t => {
				const i = ~~(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}
</script>
<svelte:head>
  <title>Console Logs</title>
</svelte:head>
<div class="cont" in:fade="{{ duration: 1000 }}">
  <h1>Welcome to console logs!</h1>
  <p in:typewriter>A site for all my bytes of programming related knowledge.</p>
  <img alt="dev" src="dev.png" />
</div>

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
