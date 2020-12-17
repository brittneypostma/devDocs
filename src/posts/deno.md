---
title: Deno
image: ./logos/deno.svg
---

<div class="post">
  <div id="toc">

<p style="font-weight: bold; font-size: 25px;">Table of Contents</p>

- [Deno: An Intro](#deno-an-intro)
- [What is Deno?](#what-is-deno)
  - [Deno vs Node.js](#deno-vs-nodejs)
  - [Will Deno replace Node.js?](#will-deno-replace-nodejs)
  - [Why Deno?](#why-deno)
  - [How to Install Deno](#how-to-install-deno)
  - [Pick Your IDE](#pick-your-ide)

**This is also available on Dev.to. Please, go give it some 💖 [VSCode Setup with ESLint and Prettier](https://dev.to/bdesigned/vscode-setup-with-eslint-and-prettier-1gek)!**

  </div>

<div id="main">

## Deno: An Intro

<p style="text-align: center;"><strong>
These are my notes while taking the <a href="https://academy.zerotomastery.io/p/deno-the-complete-guide-zero-to-mastery?affcode=441520_gjue7n-1">Deno: The Complete Guide</a> course by Andrei Neagoie and Adam Odziemkowski on ZTM Academy.</strong>
</p>
<br/>

<p align="center">
  <img src="deno/Deno.jpg" alt="deno park" width="100%"/>
</p>

## What is Deno?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Deno was created by Ryan Dahl, the same person who created **NodeJS**. Why would the creator jump ship to a create a whole new language?  During his 2018 talk, [10 Things I Regret about Node.js](https://www.youtube.com/watch?v=M3BM9TB-8yA), Ryan mentions some initial design decisions with Node that led to him wanting to come up with a better solution.  According to the [Deno](https://deno.land/) site, Deno is a **secure** runtime for **JavaScript** and **TypeScript**. Let's break this down. Deno is built on the same engine as NodeJS, the **Chrome V8 JavaScript Engine**. The engine takes the code that we write and turns it into code that the computer can actually use. It was originally written in a language called Go, but was eventually replaced with **Rust** and **Tokio** due to concerns about double runtime and garbage collection. Deno is also **secure** by default. It has no access to outside networks or files unless explicitly enabled by using a **sandbox environment**. You can even use **TypeScript** out of the box without additional libraries. It **bundles** your code into a single executable file and comes with built-in utilities. 

### Deno vs Node.js

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Node has its own package manager, **npm**, and that will be the first thing you notice that is missing from Deno. Deno instead uses modules referenced as URLs, just like browsers. Deno also uses the ES Modules and does not support **`require()`**, modules are imported by **`import * as log from "https://deno.lan/std/log/mod.ts"`**. This allows for Deno packages to be distributed without an additional registry to download from. Package maintainers can host their code where they want and we can use it while also automatically updating the package unless a version number is specified. There is no **`package.json`** file and no more **`node_modules`**. When the application starts, Deno will download all imported modules and cache them so they can be used offline. Once they are cached, Deno doesn't need to download them again unless we ask them to be with the **`--reload`** flag. The Deno creators recommend adding the caches of the modules to your version control system (i.e. git) in case the website the module is hosted on goes down. Importing modules by the URL can become tedious if doing so multiple times in an application. The Deno creators thought of this too and gave us an alternative. We can re-export the imported module from a file like this **`export { test, runTests } from "https://deno.land/std@v0.32.0/testing/mod.ts"`**. It can then be imported by name inside the files you need them like this **`import { test, runTests } from './pathToFile.ts"`**. 

<p align="center">
  <img src="deno/deno.gif" alt="deno logo" />
</p>


### Will Deno replace Node.js?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Absolutely not and will not even make a footprint in the market for quiet sometime. It is an exciting new technology that a lot of people are going to want to use, but it is too new. Node is extremely well established and supported. Deno will gain momentum and maybe some startups will pick it up along the way, but Node is still going to be around for a very, very long time.

### Why Deno?

Deno is basically an improved version of Node, so why should we choose it? 

- &diams; Allows use of modern JavaScript (let, const, import)
- &diams; TypeScript out of the box
- &diams; URL based modules that don't need a 3rd party system.
- &diams; No package manager to maintain, package.json, or node_modules.
- &diams; Integrated test runner for testing your code.
- &diams; Ability to use await at the top level.
- &diams; Provides APIs (fetch, window object) to be as compatible with browsers as possible.

What are we waiting for, lets install Deno!

### How to Install Deno

<br/>

Supported shells are **zsh**, **bash**, **fish**, **powershell**, and **elvish**. Depending on the OS you are running and what installers you use, you are going to want to run one of these commands:

<br/>

**Shell (Mac, Linux):**
``` bash
curl -fsSL https://deno.land/x/install/install.sh | sh
```
**PowerShell (Windows):**
```bash
iwr https://deno.land/x/install/install.ps1 -useb | iex
```
**Homebrew (Mac)**
```bash
brew install deno
```
**Chocolatey (Windows)**:
```bash
choco install deno
```

After you get the message Deno was installed successfully to `/Users/username/.deno/bin/deno`, you should be ready to go. The path may be different based on your machine, but you can test your installation by running **`deno --version`** to see if you get a version printed to the console. You can run **`deno help`** to see a list of commands and run **`deno upgrade`** to update your version of Deno. You should then be able to run the command **`deno`** to open the runtime environment. So, we are all set right? Not quite. If you can use the command **`deno`** right away, awesome you are ready to move on. Otherwise, we need to tell the system the correct path to Deno. If you see a message after the installation that says to **Manually add the directory to your `path` (or similar)**, then you need to copy the 2 lines below it that start with export and paste and run them in the terminal. They may look similar to this:

```bash
export DENO_INSTALL="/Users/username/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"
```

If you run into other issues with different shells, then usually a quick Google search will take you to a Stack Overflow post with the answers you are looking for 😁. 

### Pick Your IDE

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Unfortunately, since Deno is so new a lot of editors will throw errors when trying to import modules because they don't natively support it. There are a few community developed extensions for a some popular editors to solve this issue. These are [CoC](https://github.com/neoclide/coc.nvim) for **Vim** and **NeoVim**, [Deno plugin](https://plugins.jetbrains.com/plugin/14382-deno) for **JetBrains IDEs**, [tide](https://github.com/ananthakumaran/tide) and [typescript-deno-plugin](https://github.com/justjavac/typescript-deno-plugin) for **Emacs**, and finally, [Deno](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno) for VS Code. Don't see your editor? Develop and extension or check the [Discord group](https://discord.gg/TGMHGv6) on how to get started.

</div>