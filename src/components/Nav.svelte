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
    border-bottom: 1px solid rgb(155, 50, 43);
    font-weight: 700;
    padding: 1em;
    display: grid;
    grid-template-columns: 1fr auto;
    justify-content: space-between;
    font-size: 16px;
    margin-bottom: 2em;
  }

  .links {
    display: flex;
    margin-left: 10px;
  }

 
  .a-logo {
    margin: 0;
    padding: 0;
  }

  .logo {
    width: 50px;
    transition: all 0.5s linear;
    cursor: pointer;
  }

  .logo:hover {
    transform: scale(1.3);
  }

    .nav-links {
    display: flex;
  }

  a {
    color: inherit;
    text-decoration: none;
    padding: 1em;
    display: block;
    position: relative;
  }

  a:not(.selected) {
    opacity: 0.7;
  }

  a::before {
    content: "";
    position: absolute;
    transition: transform 0.3s ease;
    left: 12%;
    bottom: 0;
    top: 40px;
    width: 75%;
    height: 2px;
    background: #aaa;
    transform: scaleX(0);
  }

  a:hover::before,
  .selected::before {
    transform: scaleX(1);
  }

  .selected::before {
    background: rgb(155, 50, 43);
  }

  .slider-img {
    width: 30px;
    height: 30px;
  }

  .theme-switch-wrapper {
    display: flex;
    align-items: center;
    margin-right:  2em;
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
    transition: all 0.4s linear;
  }

  .slider:before {
    background-color: #fff;
    bottom: 4px;
    content: "";
    height: 26px;
    left: 4px;
    position: absolute;
    transition: all 0.4s linear;
    width: 26px;
  }

  .slider:hover::before {
    background-color: #ccc;
    transform: translateX(13px);
  }

  .slider:hover {
    background-color: #777;
  }

  input:checked + .slider {
    background-color: #7a7a7a;
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }

  input:hover + .slider:before {
    transform: translateX(13px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>

<nav>
  
  <div class="links">
  <a class="a-logo" href="."><img src="favicon.png" alt="logo" class="logo"/></a>
  <div class="nav-links">
    <a class={segment === undefined ? 'selected' : ''} href=".">home</a>

    <a rel="prefetch" class={segment === 'blog' ? 'selected' : ''} href="blog">
      logs
    </a>
    </div>
  </div>
  <div class="theme-switch-wrapper">
    <img class="slider-img" src="sun.png" alt="light-mode" style="margin-right: 0.5em;" />
    <label class="theme-switch" for="checkbox">
      <input type="checkbox" id="checkbox" />
      <div class="slider round" />
    </label>
    <img class="slider-img" src="moon.png" alt="dark-mode" style="margin-left: 0.5em;" />
  </div>

</nav>
