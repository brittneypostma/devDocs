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
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';

  onMount(() => {
    [...document.querySelectorAll('a')]
      .filter((a) => !!a.hash)
      .forEach((a) => {
        try {
          if (!a.hash || !document.querySelectorAll(a.hash).length)
            throw new Error("Anchor isn't valid");
          a.href = window.location + a.hash;
        } catch (e) {
          console.error('Error: ', e);
        }
      });
  });
</script>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<section class="post-page" in:fade={{ duration: 1000 }}>
    <header>
      <a rel="prefetch" href="logs">go back</a>
      <h1>{post.title}</h1>
    </header>
    {@html post.html}
</section>

<style>
  h1 {
    margin: 0;
    font-size: 36px;
  }

  header {
    position: fixed;
    padding: 1rem;
  }

  .post-page :global(a) {
    text-decoration: none;
    display: inline-block;
    position: relative;
    color: var(--accent-color);
  }

  .post-page :global(a::before) {
    content: '';
    position: absolute;
    transition: transform 0.3s ease;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: var(--accent-color);
    transform: scaleX(0);
  }

  .post-page :global(a:hover::before) {
    transform: scaleX(1);
  }

  .post-page :global(img) {
    max-width: 100%;
  }

  .post-page :global(#toc) {
    scrollbar-color: rgb(155, 50, 43, 0.75) #333;
    scrollbar-width: thin;
    width: 320px;
    padding: 10px;
    position: fixed;
    overflow-y: auto;
    top: 205px;
    bottom: 47px;
    box-shadow: inset 0 0 10px black, 4px 0 8px 0 rgba(0, 0, 0, 0.25);
  }


  .post-page :global(#main) {
    height: calc(100vh - 100px);
    width: calc(100% - 375px);;
    position: relative;
    padding-bottom: 20px;
    left: 350px;
    top: 104px;
  }

  .post-page :global(hr:first-child) {
    clear: both;
  }

  .post-page :global(p) {
    margin: 0 auto;
  }

  .post-page :global(h1, h3, h4, h5, h6) {
    font-weight: bold;
    line-height: 1.2;
  }

  .post-page :global(h2) {
    font-size: 39.06px;
    font-weight: 700;
    text-align: center;
    margin: 0;
  }

  .post-page :global(h3) {
    font-size: 25px;
  }

  .post-page :global(blockquote) {
    background: var(--nav-color);
    color: #111;
    border-left: 10px solid rgb(155, 50, 43, 0.75);
    margin: 1.5em 10px;
    padding: 0.1em 10px;
  }

  .post-page :global(ul) {
    line-height: 1.5;
    padding: 0;
    margin: 0 0 16px;
  }

  .post-page :global(ol) {
    line-height: 1.5;
    padding: 0;
    margin: 0 0 16px;
  }

  .post-page :global(li) {
    list-style-type: none;
    margin-left: 2em;
  }

  .post-page :global(dfn) {
    border-radius: 2px;
    position: relative;
    top: -0.9em;
    line-height: 2rem;
    font-style: normal;
  }

  .post-page :global(table) {
    width: 100%;
    color: black;
  }

  .post-page :global(em) {
    color: #888;
  }

  .post-page :global(table tr:nth-child(even)) {
    background-color: #eeeeee;
  }
  .post-page :global(table tr:nth-child(odd)) {
    background-color: #ffffff;
  }

  .post-page :global(table, th, td) {
    border: 1px solid black;
    border-collapse: collapse;
  }

  .post-page :global(th, td) {
    padding: 15px;
    text-align: left;
  }

  .post-page :global(th, tr, td) {
    word-break: normal;
  }


  @media only screen and (max-width: 900px) {
    header {
      position: relative;
    }

    .post-page :global(.post) {
      width: 100%;
      max-width: 100vw;
      display: inline-block;
    }

    .post-page :global(#toc) {
      box-shadow: 0 0 0 0 transparent;
      position: relative;
      width: 100%;
      overflow-y: hidden;
      top: 0;
      bottom: 0;
      border-right: none;
      border-bottom: 2px dotted rgb(155, 50, 43);
    }

    .post-page :global(#main) {
      width: 100%;
      left: 0;
      top: 0;
      padding: 0 1rem;
    }

    .post-page :global(pre) {
      width: 100%;
      display: grid;
    }
  }
</style>
