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
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
    padding-inline-start: 0;
    text-align: center;
  }

  .grid-logs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 1em;
    margin: 0 1em;
  }

  li {
    list-style-type: none;
    padding: 1rem;
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
  }

  a {
    color: #333;
    text-decoration: none;
    background: #fff;
    display: block;
  }
  a:visited {
    color: #333;
  }
  li:hover {
    transform: scale(1.05);
  }
  li:active {
    transform: scale(0.95);
  }
  h2 {
    margin: 0;
  }

  .post-item-footer {
    font-family: Rubik, sans-serif;
    font-weight: 700;
  }

  .post-item-date {
    color: #aaa;
    text-align: left;
    text-transform: uppercase;
    margin-right: 16px;
  }
</style>

<svelte:head>
  <title>Logs</title>
</svelte:head>

<h1>Logs</h1>

<ul>
  <div class="grid-logs">
    {#each posts as post}
      <div>
        <a rel="prefetch" href="blog/{post.slug}">
          <li>

            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <div class="post-item-footer">
              <span class="post-item-date">— {post.printDate}</span>
            </div>
          </li>
        </a>
      </div>
    {/each}
  </div>
</ul>
