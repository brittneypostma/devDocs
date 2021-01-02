---
title: Next.JS
image: ./logos/next.svg
---

<div class="post">
<div id="toc">

<p style="font-weight: bold; font-size: 25px;">Table of Contents</p>

- [Creating a Next app](#creating-a-next-app)
  - [Folder structure](#folder-structure)
  - [Rendering in NextJS](#rendering-in-nextjs)
    - [Static Generation](#static-generation)

</div>

<div id="main">

<p align="center">
  <img src="/logos/next.svg" alt="Next JS logo" width="100%">
</p>

Next.js is a framework built on top of React to provide code optimizations and the option to statically generate pages, server-side render, or client-side rendering. The wide range of possibilities makes it a great choice when building a React project. It has an amazing developer experience by providing routing, code splitting, multiple built in CSS options, hot reloading with fast refresh, typescript support, optional api routes, and the multiple rendering options mentioned above. Next.js also added image optimization recently to automate the serving of different sizes and formats.

## Creating a Next app

[Create Next App docs](https://nextjs.org/docs/api-reference/create-next-app)<br/><br/>

To create a new Next project, make sure you have Node.js 10.13 or later and either run `npx create-next-app` for npm or `yarn create-next-app` for yarn. Be forewarned that if you have yarn installed, the npx command will install using yarn instead. You can run `npx create-next-app --use-npm` to avoid this. This is a known issue and hopefully they are working on a fix. Once the command is ran, simply follow the instructions to name and change directories into your new project. You can then open it up in your favorite code editor and run either `npm run dev` or `yarn dev` to spin up the development server. To see the hot reloading in action, simply change the words Create Next App in `pages/index.js` to the name of your app and save the file.

### Folder structure

NextJS uses a folder based routing system. Any js file created in the pages directory will create a new route in your site.

### Rendering in NextJS

By default, NextJS prerenders each file into HTML in advance instead of on the client side in a traditional React app. This provides better performance for end users and allows the use of React code without sending all the JavaScript to the browser. Next provides two ways pages can be pre-rendered **server side** or **staticly generated**. Unless absolutely needed, static generation is the recommended method to use for performance reasons. Pages in NextJS can also use client-side rendering alongside static or server rendered. This will allow some parts of the page to be rendered entirely in the browser by the client and would not be pre-rendered.

#### Static Generation

The NextJS API provides a `getStaticProps` function to fetch data needed for a staticly generated page.

</div>