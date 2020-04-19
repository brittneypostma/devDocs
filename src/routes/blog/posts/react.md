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

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you want to test React before using it in your application, there are many code playgrounds that have React templates. A few are <a href="https://reactjs.org/redirect-to-codepen/hello-world" target="_blank" rel="noopener noreferrer">CodePen</a>, <a href="https://codesandbox.io/s/new" target="_blank" rel="noopener noreferrer">Code Sandbox</a>, or <a href="https://repl.it/" target="_blank" rel="noopener noreferrer">Repl.it</a>. React also has a simple way you can try React on your HTML site <a href="https://reactjs.org/docs/add-react-to-a-website.html" target="_blank" rel="noopener noreferrer">here</a>. There are even more ways to integrate React if you head over <a href="https://reactjs.org/docs/getting-started.html" target="_blank" rel="noopener noreferrer">here</a>. For a single page application or **SPA**, the easiest way to get started is to open a terminal to the directory of your choice and type `npx create-react-app app-name` to create a new react application.

```
npx create-react-app app-name
cd app-name
npm start
```

Running the above commands will start up a local server, typically at port 3000. If you follow the link in the terminal, it will open the starter page for React in the browser. You can also open the folder in your favorite code editor, if you use VSCode you can simply type `code .` in your terminal to open up that folder location.

<br/>

[Create React App Docs](https://create-react-app.dev/docs/getting-started)<br/>
[Reactjs.org](https://reactjs.org/)

---

### React Folder Structure

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React is constantly changing and updating itself, so it can be hard to keep up with all the latest and greatest information. Create-react-app now has its own dedicated page <a href="https://create-react-app.dev/docs/folder-structure/" target="_blank" rel="noopener noreferrer">here</a> that should be up to date with whenever you are reading this. They usually change out the logo.svg and update some of the code, but the overall folder structure typically stays the same. When you open up the new react app in a code editor, you are going to see a some folders and files like this.

<p align="center">
  <img src="./react/folders.png" alt="React Folder structure">
</p>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This may seem a bit overwhelming, but lets break it down. The base folder is named whatever you named your application when running `create-react-app`. Inside of that, we see some folders and a couple files. The `README.md` file gives a description of what the application is or does, it will show up as the front page on the GitHub repository if you add it. The other file in the main directory is `package.json`. This is where all the information about what packages and versions the app currently needs to run. Depending on if you used `npm` or `yarn` to install, you will see a list of scripts that are able to be run in the terminal to start, build, test, and eject the app. My advice is don't ever eject unless you know exactly what you are doing. Also if you are just starting out, don't mess with this file too much. But, if you want to learn more about it, you can head <a href="https://docs.npmjs.com/files/package.json" target="_blank" rel="noopener noreferrer">here</a>. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;So, we have 3 folders left in the main directory. The first is `node_modules`. These are all the files the packages in `package.json` need to run your app. Whenever you `npm install` or `yarn` a package, it will install its files into the `node_modules` folder. You do not directly do anything with this folder. Next, we have the `public` folder. It contains `index.html`, the page template, and `index.js`, the JavaScript entry point. For the project to build, these files must keep the same names and locations. Only files inside the public directory can be directly used by `public/index.html`, such as the `favicon.ico` and other images needed for meta tags.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lastly, we have the `src` folder. This is the folder where the code of your application lives. For now you see `App.css`, `App.js`, `App.test.js`, `index.css`, `index.js`, and `logo.svg`. Everything you see on the page in the browser is located within these files. These files can be deleted, renamed, or edited and any new files and folders, will be added to this directory. Additionally, if you already had Git installed when you created the app, a `.git` directory will be created too. This initializes a git repository for your project. After you create a new repo on GitHub, you can run `git remote add origin https://github.com/your-github-username/repo-name` you will be able to `git add .`, `git commit -m "any changes you made`, and then `git push` to add your application to GitHub. You might want to add a `.gitignore` file for any files you don't want to add to the repository, such as environment variables or tokens. There were a few new files added in the latest release that we don't need to worry about at this time, we will talk about `serviceWorker.js` later and if you are curious about the other files, a Google search will usually help you find the answer.

---

### How React Works

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you open `src/index.js`, you will find the file that React uses to inject all your files into the div with the id **"root"** in `public/index.html`. We are importing React, ReactDOM, a css file, the App.js file, and the serviceWorker. We then tell ReactDOM to render (a method on the ReactDOM class) some React.StrictMode component and then our App component inside of that. StrictMode is a fairly new addition that is supposed to help us find potential bug in the application, it doesn't render anything visually, but activated checks and warnings at runtime. These are only done in development mode and does not affect the production build. In fact, we could take everything from ( to the , and input any valid HTML and it would show up in the browser. But, in the end you want your `src/index.js` to look like this:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
```

---

### Service Worker

[Create React App Service Worker Docs](https://create-react-app.dev/docs/making-a-progressive-web-app/)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;By default the service worker in your app is turned off, or unregistered. During the build of the application, a service worker file is generated. By switching `serviceWorker.unregister()` to `serviceWorker.register()` is all you need to turn the service on. This will turn your app into a **Progressive Web App** which is described <a href="https://web.dev/progressive-web-apps/" target="_blank" rel="noopener noreferrer">here</a>. Turning it on basically allows your app to have some functionality while offline, but can cause issues when debugging.

---

### Introducing JSX

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When you open up `App.js` you will see something that looks a lot like HTML, but it is actually JSX. What you are seeing if JavaScript importing the library React, importing the logo, and the css file, and then a function that returns JSX. But what is JSX?

```javascript
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

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
