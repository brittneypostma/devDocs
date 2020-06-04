---
title: Deno
---

<div class="post">
  <div id="toc">

### Table of Contents
- [What is Deno?](#what-is-deno)
  - [Deno vs Node.js](#deno-vs-nodejs)
  - [How to Install Deno](#how-to-install-deno)
  - [Pick Your IDE](#pick-your-ide)
**This is also available on Dev.to. Please, go give it some 💖 [Deno Park, Getting Started With Deno](https://dev.to/bdesigned/deno-park-getting-started-with-deno-48gj)!**

</div>

<div id="main">

<p align="center">
  <img src="deno/deno.gif" alt="deno logo" />
</p>

## What is Deno?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Deno was created by Ryan Dahl, the same person who created **NodeJS**. Why would the creator jump ship to a create a whole new language?  During his 2018 talk, [10 Things I Regret about Node.js](https://www.youtube.com/watch?v=M3BM9TB-8yA), Ryan mentions some initial design decisions with Node that led to him wanting to come up with a better solution.  According to the [Deno](https://deno.land/) site, Deno is a **secure** runtime for **JavaScript** and **TypeScript**. Let's break this down. Deno is built on the same engine as NodeJS, the **Chrome V8 JavaScript Engine**. The engine takes the code that we write and turns it into code that the computer can actually use. It was originally written in a language called Go, but was eventually replaced with **Rust** and **Tokio** due to concerns about double runtime and garbage collection. Deno is also **secure** by default. It has no access to outside networks or files unless explicitly enabled. You can even use **TypeScript** out of the box without additional libraries. It **bundles** your code into a single executable file and comes with built-in utilities. 

### Deno vs Node.js

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Node has its own package manager, **npm**, and that will be the first thing you notice that is missing from Deno. Deno instead uses modules referenced as URLs or file paths. Deno also uses the ES Modules and does not support **`require()`**, modules are imported by **`import * as log from "https://deno.lan/std/log/mod.ts"`**. There is also no **`package.json`** file that we see with Node. Any async action in Deno will return a promise and the APIs provided are different than Node. 

What are we waiting for, lets install Deno!

### How to Install Deno

<br/>

Supported shells are **zsh**, **bash**, **fish**, **powershell**, and **elvish**. Depending on the OS you are running and what installers you use, you are going to want to run one of these commands:

<br/>

**Shell (Mac, Linux):**
``` 
curl -fsSL https://deno.land/x/install/install.sh | sh
```
**PowerShell (Windows):**
```
iwr https://deno.land/x/install/install.ps1 -useb | iex
```
**Homebrew (Mac)**
```
brew install deno
```
**Chocolatey (Windows)**:
```
choco install deno
```

After you get the message Deno was installed successfully to `/Users/username/.deno/bin/deno`, you should be ready to go. The path may be different based on your machine, but you can test your installation by running **`deno --version`** to see if you get a version printed to the console. You can run **`deno help`** to see a list of commands and run **`deno upgrade`** to update your version of Deno. You should then be able to run the command **`deno`** to open the runtime environment. So, we are all set right? Not quite. If you can use the command **`deno`** right away, awesome you are ready to move on. Otherwise, we need to tell the system the correct path to Deno. If you see a message after the installation that says to **Manually add the directory to your `path` (or similar)**, then you need to copy the 2 lines below it that start with export and paste and run them in the terminal. They may look similar to this:

```
export DENO_INSTALL="/Users/username/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"
```

If you run into other issues with different shells, then usually a quick Google search will take you to a Stack Overflow post with the answers you are looking for 😁. 

### Pick Your IDE

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Unfortunately, since Deno is so new a lot of editors will throw errors when trying to import modules because they don't natively support it. There are a few community developed extensions for a some popular editors to solve this issue. These are [CoC](https://github.com/neoclide/coc.nvim) for **Vim** and **NeoVim**, [Deno plugin](https://plugins.jetbrains.com/plugin/14382-deno) for **JetBrains IDEs**, [tide](https://github.com/ananthakumaran/tide) and [typescript-deno-plugin](https://github.com/justjavac/typescript-deno-plugin) for **Emacs**, and finally, [Deno](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno) for VS Code. Don't see your editor? Develop an extension or check the [Discord group](https://discord.gg/TGMHGv6) on how to get started.

</div>