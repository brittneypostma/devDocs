<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`logs/${params.slug}.json`);
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

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<div class="post-page">

  <div class="post-header">
    <a rel="prefetch" href="logs">go back</a>
    <h1>{post.title}</h1>
  </div>

  <div class="content">
    {@html post.html}
  </div>

</div>

<style>
  .post-page {
    margin: 0 auto;
  }

  h1 {
    margin: 0;
  }

  .content {
    margin-top: 10px;
  }

  .content :global(.post) {
    display: flex;
  }

  .content :global(#toc)  {
    width: 300px;
    padding: 10px;
    position: fixed;
    overflow-y: auto;
    top: 224px;
    bottom: 0;
    box-shadow:  inset 0 0 10px #000000;
  }

  .content :global(#main) {
    width: calc(100% - 350px);
    position: relative;
    left: 350px;
  }

  .content :global(hr:first-child) {
    clear: both;
  }

  .content :global(p) {
    margin: 0 auto;
  }

  .content :global(h1, h3, h4, h5, h6) {
    font-weight: bold;
  }

  .content :global(h3) {
    margin: 1em auto 0;
  }

  .content :global(h2) {
    font-size: 1.5em;
    font-weight: 500;
    text-align: center;
  }

  .content :global(blockquote) {
    background: #f9f9f9;
    color: #111;
    border-left: 10px solid#ccc;
    margin: 1.5em 10px;
    padding: 0.1em 10px;
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

  .content :global(th, tr, td) {
    word-break: normal;
  }

  div {
    font-weight: 400;
  }

  @media only screen and (max-width: 900px) {
    .post-page {
      width: 95%;
      margin: 0 auto;
    }

    .post-header {
      width: 100%;
    }

    .content :global(.post){
      width: 100%;
      max-width: 100vw;
      display: grid;
      grid-template-columns: 1fr;
    }
    
    .content :global(#toc)  {
      grid-column: 1/-1;
      box-shadow: 0 0 0 0 transparent;
      position: relative;
      width: 100%;
      overflow-y: hidden;
      top: 0;
      bottom: 0;
      border-right: none;
    }
      
    .content :global(#main)  {
      width: 95%;
      grid-column: 1/-1;
    }
      

    .content :global(pre) {
      width: 100%;
      display: grid;
    }
  }
</style>
