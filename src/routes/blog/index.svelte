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
    display: grid;
    grid-template-columns: 33fr 33fr 33fr;
    grid-gap: 20px;
  }

  li {
    list-style-type: none;
    padding: 1rem;
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
</style>

<svelte:head>
  <title>devDocs</title>
</svelte:head>

<h1>devDocs</h1>

<ul>
  {#each posts as post}
    <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
    <a rel="prefetch" href="blog/{post.slug}">
      <li>

        <h2>{post.title}</h2>

      </li>
    </a>
  {/each}
</ul>
