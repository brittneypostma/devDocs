<script>
  export let segment;

  import { onMount } from 'svelte';

  onMount(() => {
    const toggleSwitch = document.querySelector(
      '.theme-switch input[type="checkbox"]'
    );

    function switchTheme(e) {
      if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    }

    toggleSwitch.addEventListener('change', switchTheme, false);
  });
</script>

<nav>

  <div class="links">
    <a class="a-logo" href=".">
      <img src="logo.svg" alt="logo" class="The Console Logs logo" />
    </a>
    <div class="nav-links">
      <a class={segment === undefined ? 'selected' : ''} href=".">home</a>

      <a
        rel="prefetch"
        class={segment === 'logs' ? 'selected' : ''}
        href="logs">
        logs
      </a>
      <a href="https://dev.to/bdesigned" class="dev" target="_blank" rel="noopener noreferrer">
        <img src="https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg" alt="Brittney Postma's DEV Profile" height="30" width="30">
      </a>
    </div>
  </div>
  <div class="theme-switch-wrapper">
    <img
      class="slider-img"
      src="sun.png"
      alt="light-mode"
      style="margin-right: 0.5em;" />
    <label class="theme-switch" for="checkbox" aria-label=" Light and Dark mode switch">
      <input type="checkbox" id="checkbox" />
      <div class="slider round" />
    </label>
    <img
      class="slider-img"
      src="moon.png"
      alt="dark-mode"
      style="margin-left: 0.5em;" />
  </div>

</nav>

<style>
  nav {
    background:var(--nav-color);
    border-bottom: 1px solid rgb(155, 50, 43);
    font-weight: 700;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
  }

  .links {
    display: flex;
    align-items: center;
  }

  .a-logo {
    margin: 0;
    padding: 0;
  }

  .a-logo::before {
    background: transparent;
  }

  .logo {
    width: 50px;
    transition: all 0.2s linear;
    cursor: pointer;
  }

  .logo:hover {
    transform: scale(1.2);
  }

  .nav-links {
    display: flex;
  }

  a {
    color: #424242;
    text-decoration: none;
    padding: 1em;
    display: block;
    position: relative;
  }

  a::before {
    content: '';
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

  .dev::before {
    background: transparent;
  }

  .dev:hover::before {
    background: transparent;
  }

  .slider-img {
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
    transition: all 0.4s linear;
  }

  .slider:before {
    background-color: #fff;
    bottom: 4px;
    content: '';
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

  @media only screen and (max-width: 500px) {
    nav {
      font-size: 14px;
    }

    input:hover + .slider:before {
      transform: none;
    }

    .slider:hover::before {
      background-color: #ccc;
      transform: none;
    }

    .slider-img {
      width: 20px;
      height: 20px;
    }

    .theme-switch {
      display: inline-block;
      height: 20px;
      position: relative;
      width: 50px;
    }

    .slider:before {
      background-color: #fff;
      bottom: 3px;
      content: '';
      height: 15px;
      left: 4px;
      position: absolute;
      transition: all 0.4s linear;
      width: 15px;
    }
    .theme-switch-wrapper {
      top: 7px;
      position: relative;
    }
  }
</style>
