<script>
  export let segment;

  import { onMount } from "svelte";

  onMount(() => {
    const toggleSwitch = document.querySelector(
      '.theme-switch input[type="checkbox"]'
    );

    function switchTheme(e) {
      if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
      }
    }

    toggleSwitch.addEventListener("change", switchTheme, false);
  });
</script>

<style>
  nav {
    border-bottom: 1px solid rgb(155, 50, 43, 0.5);
    font-weight: 300;
    padding: 1em;
    display: grid;
    grid-template-columns: 1fr auto;
    justify-content: space-between;
  }

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    list-style-type: none;
  }

  /* clearfix */
  ul::after {
    content: "";
  }

  li {
    line-height: 1.5em;
  }

  li:hover {
    position: relative;
    border-bottom: 5px solid #aaaaaa;
  }

  .selected {
    position: relative;
    background-color: rgb(155, 50, 43);
    padding: 0.5em;
    color: white;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
  }

  img {
    width: 30px;
    height: 30px;
  }

  .theme-switch-wrapper {
    display: flex;
    align-items: center;
  }

  .theme-switch {
    display: inline-block;
    height: 34px;
    position: relative;
    width: 60px;
  }

  .theme-switch input {
    display: none;
  }

  .slider {
    background-color: #ccc;
    bottom: 0;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: 0.4s;
  }

  .slider:before {
    background-color: #fff;
    bottom: 4px;
    content: "";
    height: 26px;
    left: 4px;
    position: absolute;
    transition: 0.4s;
    width: 26px;
  }

  input:checked + .slider {
    background-color: #7a7a7a;
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>

<nav>
  <ul>
    <li>
      <a class={segment === undefined ? 'selected' : ''} href=".">home</a>
    </li>

    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
    <li>
      <a
        rel="prefetch"
        class={segment === 'blog' ? 'selected' : ''}
        href="blog">
        logs
      </a>
    </li>
  </ul>
  <div class="theme-switch-wrapper">
    <img src="sun.png" alt="light-mode" style="margin-right: 0.5em;" />
    <label class="theme-switch" for="checkbox">
      <input type="checkbox" id="checkbox" />
      <div class="slider round" />
    </label>
    <img src="moon.png" alt="dark-mode" style="margin-left: 0.5em;" />
  </div>
</nav>
