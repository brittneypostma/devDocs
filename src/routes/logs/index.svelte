<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`logs.json`)
      .then(r => r.json())
      .then(posts => {
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
      <p class="title">{post.title}</p>
    </a>
  {/each}
</div>

<style>
  .grid-logs {
    font-family: 'Work Sans', sans-serif;
    font-size: 25px;
    line-height: 1.65;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 2em;
  }

  .title {
    padding: 10px 15px;
    list-style-type: none;
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    -webkit-transition: all 0.1s linear; /* Safari */
    transition: all 0.1s linear;
    text-align: center;
    margin: 0;
  }

  a {
    text-decoration: none;
    background: #fff;
    display: block;
  }
  a:visited {
    color: #333;
  }
  .title:hover {
    transform: scale(1.05);
  }
  .title:active {
    transform: scale(0.95);
  }
</style>
