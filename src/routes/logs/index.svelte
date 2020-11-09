<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`logs.json`)
      .then((r) => r.json())
      .then((posts) => {
        return { posts };
      });
  }
</script>

<script>
  import { fly } from 'svelte/transition';
  export let posts;
</script>

<svelte:head>
  <title>Logs</title>
</svelte:head>

<h1>Logs</h1>

<div class="grid-logs" in:fly={{ y: 200, duration: 1000 }}>
  {#each posts as post}
    <a rel="prefetch" href="logs/{post.slug}">
      <div class="title">
        <img
          src={post.image || null}
          alt={post.slug} />
        <p>{post.title}</p>
      </div>
    </a>
  {/each}
</div>

<style>
  img {
    height: 50px;
    width: 50px;
  }
  .grid-logs {
    background: var(--bg-color);
    padding-bottom: 50px;
    font-family: 'Work Sans', sans-serif;
    font-size: 1.5rem;
    line-height: 1.65;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    grid-gap: 2em;
  }

  .title {
    position: relative;
    padding: 2.75rem 1rem;
    list-style-type: none;
    background: var(--bg-color);
    color: var(--font-color);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    text-align: center;
    margin: 0;
  }

  .title:hover {
    top: -5px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .title:active {
    top: -2px;
  }

  p {
    margin: 0;
  }

  a {
    text-decoration: none;
    background: var(--accent-color);
    display: block;
  }

  a:visited {
    color: var(--font-color);
  }
</style>
