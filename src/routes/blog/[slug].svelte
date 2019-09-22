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
  /*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
  */

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

  .content :global(h2) {
    font-size: 1.4em;
    font-weight: 500;
  }

  .content :global(pre) {
    background-color: #f0f8ff;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    padding: 0.5em;
    border-radius: 2px;
    display: inline-block;
    margin: 0;
  }

  .content :global(pre) :global(code) {
    background-color: transparent;
    padding: 0;
    color: #333333;
  }

  .content :global(ul) {
    line-height: 1.5;
    padding: 0;
    margin: 0 0 16px;
  }

  .content :global(li) {
    list-style-type: none;
  }

  .content :global(dfn) {
    border-radius: 2px;
    position: relative;
    top: -0.9em;
    line-height: 2em;
    font-style: normal;
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
