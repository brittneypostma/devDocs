<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`blog/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { post: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let post;
</script>

<style>
  .post-header {
    width: 75%;
    margin: 0 auto;
  }

  h1 {
    text-align: center;
  }

  .content {
    width: 75%;
    margin: 0 auto;
  }

    .content :global(pre) {
    display: inline-block;
  }

  .content :global(h2) {
    font-size: 1.5em;
    font-weight: 500;
    text-align: center;
  }

  .content :global(blockquote) {
    background: #f9f9f9;
    border-left: 10px solid#ccc;
    margin: 1.5em 10px;
    padding: .1em 10px;
  }

  .content :global(ul) {
    line-height: 1.5;
    padding: 0;
    margin: 0 0 16px;
  }

  .content :global(ol) {
    line-height: 1.5;
    padding: 0;
    margin: 0 0 16px;
  }


  .content :global(li) {
    list-style-type: none;
    margin-left: 2em;
  }

  .content :global(dfn) {
    border-radius: 2px;
    position: relative;
    top: -0.9em;
    line-height: 2em;
    font-style: normal;
  }

  .content :global(table) {
    width: 100%;
    color: black;
  }

  .content :global(em) {
    color: #888;
  }

  .content :global(table tr:nth-child(even)) {
    background-color: #eeeeee;
  }
  .content :global(table tr:nth-child(odd)) {
    background-color: #ffffff;
  }

  .content :global(table, th, td) {
    border: 1px solid black;
    border-collapse: collapse;
  }

  .content :global(th, td) {
    padding: 15px;
    text-align: left;
  }

  div {
    font-weight: 300;
  }

  @media only screen and (max-width: 900px) {
    .content {
      width: 100%;
    }

    .post-header {
      width: 100%;
    }
  }
</style>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<div class="post-header">
  <a rel="prefetch" href="blog">go back</a>
  <h1>{post.title}</h1>
</div>

<div class="content">
  {@html post.html}
</div>
