---
title: Deno
---

<div class="post">
  <div id="toc">

### Table of Contents
- [What is Deno?](#what-is-deno)
  - [How to Install Deno](#how-to-install-deno)

  </div>

<div id="main">

<p align="center">
  <img src="deno/deno.svg" alt="deno logo" />
</p>

## What is Deno?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Deno was created by Ryan Dahl, the same person who created **NodeJS**. Why would the creator jump ship to a new language?  During his 2018 talk, [10 Things I Regret about Node.js](https://www.youtube.com/watch?v=M3BM9TB-8yA), Ryan mentions some initial design decisions with Node that led to  According to the [Deno](https://deno.land/) site, Deno is a **secure** runtime for **JavaScript** and **TypeScript**. Let's break this down. Deno is built on the same engine as NodeJS, the **Chrome V8 JavaScript Engine**. The engine takes care of taking the code that we write and turning it into code that the computer can actually use. It was originally written in a language called Go, but was eventually replaced with **Rust** due to concerns about double runtime and garbage collection. Deno is also **secure** by default. It has no access to outside networks or files unless explicitly enabled. You can even use **TypeScript** out of the box without additional libraries. It **bundles** your code into a single executable file and comes with built-in utilities. What are we waiting for, lets install Deno!

### How to Install Deno

<br/>

Depending on the OS you are running and what installers you use, you are going to want to run one of these commands:

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

After you get the message Deno was installed successfully to `/Users/username/.deno/bin/deno`, you should be ready to go. The path may be different based on your machine, but as long as it installed successfully, you should be good. If you follow the path listed, you should find the deno executable file

</div>