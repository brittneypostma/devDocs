---
title: React
---

## The Complete React Developer

<p align="center">
  <img src="./react/react.svg" alt="React Logo" width="25%" style="padding: 20px;">
</p>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Before the introduction of front-end frameworks and libraries, websites were built solely using HTML, CSS, and JavaScript. As applications continued to grow in size, it became more and more difficult to manage the codebase and find bugs. Eventually, things like JQuery and Backbone.js came along to help manipulate the DOM (Document Object Model), but it still wasn't a great solution to the growing problems. AngularJS, created by Google, was first to the market in 2010 and it quickly became the most popular JavaScript framework. It helped developers solve a lot of the issues by organizing code into containers. However, as projects continued to grow in size, developers saw more frustrations with the framework. To correct these issues, the Angular team decided to do a complete rewrite of the framework. They provided no migration from the original to the new Angular2 and this frustrated a lot of developers causing them to look elsewhere for a solution. Meanwhile, as Angular was rewriting their framework and irritating their client base, developers at Facebook were working on a solution to the issues they were experiencing in running a large scale application with a lot of moving parts. In May 2013, React was introduced to the world. It was a game-changer for frontend development. With so many frustrations and the rewrite of Angular many developers moved to React during this tumultuous time. React quickly grew in popularity and is still today the most popular frontend framework, at least for now.

> **Nifty Snippet**: React is used by some of the biggest companies in the world to build their applications. These include Airbnb, Uber, Facebook, Netflix, Instagram, Pinterest, Twitter, and many more.

---

## What is React?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;According to <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">reactjs.org</a>, React is a JavaScript library for building user interfaces. A library, not a framework. What's the difference? Well, both libraries and frameworks are reusable code that is written by someone else that solves common issues. The biggest difference is control. Frameworks control the structure and layout of a program, they tell you where you can provide input and have limited choices. Libraries, on the other hand, allow the owner to decide on the architecture of a program and only pull in the library where it is needed. The technical term is called "inversion of control". In a library, you are in charge of the flow, when and where to call the library. If you use a framework, then it decides the flow of the application and tells you where you can input your code. You call a library, but a framework calls you!

### Declarative vs Imperative

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React is declarative, but what does that mean? To keep it simple, imperative is step by step instructions on how to do something and declarative is more tell it what you want and I'll handle the rest. React basically says, don't touch the DOM, I'll handle it. Changing the DOM is really expensive in terms of memory for a program and other frameworks directly manipulated it causing bottlenecks that decreased the speed of the applications. React allows you to declare what you want to change and it will figure out the best way to efficiently update and render the DOM when data is changed.

### Components

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React is built around this concept of reusable components. Components are intended to be small pieces that are put together to build a larger application, a lot like lego blocks. The components are created once and able to be pulled in anywhere they are needed. Components can even be reused in multiple applications. Frameworks like Material-UI have pre-styled components that can be put into any application. Some developers even have their own library or components that they like to use in their applications.
<br/><br/>

<p align="center" style="overflow-x: auto;">
  <img src="./react/components.svg" alt="React Component Visual" width="75%">
</p>

### Unidirectional Data Flow

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Unidirectional or one way is how data flows in React. From top to bottom, parent to children. If you graph out the DOM, it is a tree-like structure starting with the body and branching out to any children components that are created. React creates a virtual version of the DOM to hold all changes in until it is ready to **repaint** or re-render the actual DOM. All changes to the **state** of the program will be put into the virtual DOM, it will check for the differences, and then finally re-render the actual DOM.
<br/><br/>

<p align="center" style="overflow-x: auto;">
  <img src="./react/dom-tree.svg" alt="React DOM Tree" width="75%">
</p>

### Why React?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React is a UI library, it only handles the UI and allows you to bring in other libraries or frameworks if you need to handle other concerns. Unlike AngularJS, that hands you everything in the kitchen you might need, React is just the oven that bakes the finished product. This can be extremely beneficial if you are already familiar with other packages and want to use them in your applications. With React it is easy to bring in whatever you need to build your project. React also has variations the can be ran on many different platforms. React Native runs on Android and IOS devices for mobile, Electron that runs with Windows and Mac for desktop, and React360 for VR applications. In the end, React is one of the most popular choices for Front-end development today and is one of the most sought after job positions.

> **Nifty Snippet**:Great React developers do a few things really well. Deciding on how to break down to components and structure the application, deciding on the state and where it lives, and what changes when state changes. Doing these 3 things well will make your program as efficient and fast as it can be.

---

## Getting Started With React

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you want to test React before using it in your application, there are many code playgrounds that have React templates. A few are <a href="https://reactjs.org/redirect-to-codepen/hello-world" target="_blank" rel="noopener noreferrer">CodePen</a>, <a href="https://repl.it/" target="_blank" rel="noopener noreferrer">Repl.it</a>, or <a href="https://codesandbox.io/s/new" target="_blank" rel="noopener noreferrer">Code Sandbox</a>. React also has a simple way you can try React on your HTML site <a href="https://reactjs.org/docs/add-react-to-a-website.html" target="_blank" rel="noopener noreferrer">here</a>. There are even more ways to integrate React if you head over <a href="https://reactjs.org/docs/getting-started.html" target="_blank" rel="noopener noreferrer">here</a>. For a single page application or **SPA**, the easiest way to get started is to open a terminal to the directory of your choice and type `npx create-react-app my-app` to create a new react application.

```
npx create-react-app my-app
cd my-app
npm start
```

Running the above commands will start up a local server, typically at port 3000. If you follow the link in the terminal, it will open the starter page for React in the browser.

### Introducing JSX

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JSX is JavaScript XML (Extensible Markup Language), that is a lot of fancy jargon for a way to write HTML in React. It looks and feels a lot like HTML, but has some key differences. One of the first things you may notice if you get an error, is in JSX all elements must be properly closed. Some tags in HTML automatically close like `<img>` and `<input>`, but in JSX they need to be closed with a **`/`**.

```html
<img src="filename.png" />
<input type="text" />
```

Another common error in JSX is when adding a class to an element. In HTML you can write `class=""`, but in JSX it is `className=""`

```html
<div className="container">
  <p class="name">Name</p>
</div>
```

Because JSX is a JavaScript extension, you can insert JavaScript expressions directly by using `{ }` curly braces.

```html
<h1>{10 * 10}% JSX</h1>
```