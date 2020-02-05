<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  export let posts;
</script>

<style>
  .grid-logs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 2em;
  }

  .list {
    list-style-type: none;
    padding: 1rem;
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    -webkit-transition: all 0.1s linear; /* Safari */
    transition: all 0.1s linear;
    margin-bottom: 1em;
    line-height: 1.5;
    padding-inline-start: 0;
    text-align: center;
  }

  a {
    text-decoration: none;
    background: #fff;
    display: block;
  }
  a:visited {
    color: #333;
  }
  .list:hover {
    transform: scale(1.05);
  }
  .list:active {
    transform: scale(0.95);
  }
  h2 {
    margin: 0;
  }
</style>

<svelte:head>
  <title>Logs</title>
</svelte:head>

<h1>Logs</h1>

<div class="grid-logs">
  {#each posts as post}
    <div>
      <a rel="prefetch" href="blog/{post.slug}">
        <div class="list">
          <h2>{post.title}</h2>
        </div>
      </a>
    </div>
  {/each}
</div>
