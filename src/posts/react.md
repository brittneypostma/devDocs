---
title: React
image: ./logos/react.svg
---

<div class="post">
<div id="toc">

<p style="font-weight: bold; font-size: 25px;">Table of Contents</p>

- [The Complete React Developer](#the-complete-react-developer)
- [What is React?](#what-is-react)
  - [Declarative vs Imperative](#declarative-vs-imperative)
  - [Components](#components)
  - [Unidirectional Data Flow](#unidirectional-data-flow)
  - [Lifecycle](#lifecycle)
  - [Why React?](#why-react)
- [Getting Started With React](#getting-started-with-react)
  - [React Folder Structure](#react-folder-structure)
  - [How React Works](#how-react-works)
  - [Service Worker](#service-worker)
  - [Introducing JSX](#introducing-jsx)
  - [Function vs Class Components](#function-vs-class-components)
  - [Props](#props)
  - [State](#state)
  - [Class Methods](#class-methods)
  - [Binding](#binding)
  - [Hooks](#hooks)
- [Create React App from Scratch](#create-react-app-from-scratch)
  - [Webpack](#webpack)
  - [Part 2 - Build Webpack with React from Scratch](#part-2---build-webpack-with-react-from-scratch)
  - [Part 3 - Build Webpack with React from Scratch](#part-3---build-webpack-with-react-from-scratch)
  - [Connect React](#connect-react)

  </div>

<div id="main">

## The Complete React Developer

<p style="text-align: center;"><strong>
These are my notes while taking the <a href="https://academy.zerotomastery.io/p/complete-react-developer-redux-hooks-graphql-zero-to-mastery?affcode=441520_gjue7n-1">The Complete React Developer</a> course by Andrei Neagoie and Yihua Zhang on ZTM Academy.</strong>
</p>
<br/>

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

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React is built around this concept of reusable components. Components are intended to be small pieces that are put together to build a larger application, a lot like lego blocks. The components are created once and able to be pulled in anywhere they are needed. Components can even be reused in multiple applications. Frameworks like Material-UI have pre-styled components that can be put into any application. Some developers even have their own library or components that they like to use in their applications. There are 2 types of components in React, functional, sometimes called pure, or class components. We will dive into the differences between them a little later.
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

### Lifecycle

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In React each component has a lifecycle with 3 main phases that you can capture or change data in. **Mounting** is the initial phase of the lifecycle. When a component first appears in the DOM, it is considered mounted. **Updating** happens whenever there is a change to the state or props. And finally, **Unmounting** happens when the component is removed from the DOM or unmounted. This is when you want to clean up any code that may cause memory leaks like timeouts or intervals. Each lifecycle phase has specific methods than can be called within a class component explained in the [Class Methods](#class-methods) section.

[The Component Lifecycle](https://reactjs.org/docs/react-component.html#the-component-lifecycle)
<br/><br/>

<p align="center">
  <img src="./react/lifecycle.png" alt="React Component Lifecycle" width="75%">
</p>

### Why React?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React is a UI library, it only handles the UI and allows you to bring in other libraries or frameworks if you need to handle other concerns. Unlike AngularJS, that hands you everything in the kitchen you might need, React is just the oven that bakes the finished product. This can be extremely beneficial if you are already familiar with other packages and want to use them in your applications. With React it is easy to bring in whatever you need to build your project. React also has variations the can be ran on many different platforms. [React Native](https://console-logs.netlify.app/blog/react-native) runs on Android and IOS devices for mobile, Electron that runs with Windows and Mac for desktop, and React360 for VR applications. In the end, React is one of the most popular choices for Front-end development today and is one of the most sought after job positions.

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

### React Folder Structure

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;React is constantly changing and updating itself, so it can be hard to keep up with all the latest and greatest information. Create-react-app now has its own dedicated page <a href="https://create-react-app.dev/docs/folder-structure/" target="_blank" rel="noopener noreferrer">here</a> that should be up to date with whenever you are reading this. They usually change out the logo.svg and update some of the code, but the overall folder structure typically stays the same. When you open up the new react app in a code editor, you are going to see a some folders and files like this.

<p align="center">
  <img src="./react/folders.png" alt="React Folder structure">
</p>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This may seem a bit overwhelming, but lets break it down. The base folder is named whatever you named your application when running `create-react-app`. Inside of that, we see some folders and a couple files. The `README.md` file gives a description of what the application is or does, it will show up as the front page on the GitHub repository if you add it. The other file in the main directory is `package.json`. This is where all the information about what packages and versions the app currently needs to run. Depending on if you used `npm` or `yarn` to install, you will see a list of scripts that are able to be run in the terminal to start, build, test, and eject the app. My advice is don't ever eject unless you know exactly what you are doing. Also if you are just starting out, don't mess with this file too much. But, if you want to learn more about it, you can head <a href="https://docs.npmjs.com/files/package.json" target="_blank" rel="noopener noreferrer">here</a>. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;So, we have 3 folders left in the main directory. The first is `node_modules`. These are all the files the packages in `package.json` need to run your app. Whenever you `npm install` or `yarn` a package, it will install its files into the `node_modules` folder. You do not directly do anything with this folder. Next, we have the `public` folder. It contains `index.html`, the page template, and `index.js`, the JavaScript entry point. For the project to build, these files must keep the same names and locations. Only files inside the public directory can be directly used by `public/index.html`, such as the `favicon.ico` and other images needed for meta tags.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lastly, we have the `src` folder. This is the folder where the code of your application lives. For now you see `App.css`, `App.js`, `App.test.js`, `index.css`, `index.js`, and `logo.svg`. Everything you see on the page in the browser is located within these files. These files can be deleted, renamed, or edited and any new files and folders, will be added to this directory. Additionally, if you already had Git installed when you created the app, a `.git` directory will be created too. This initializes a git repository for your project. After you create a new repo on GitHub, you can run `git remote add origin https://github.com/your-github-username/repo-name` you will be able to `git add .`, `git commit -m "any changes you made`, and then `git push` to add your application to GitHub. You might want to add a `.gitignore` file for any files you don't want to add to the repository, such as environment variables or tokens. There were a few new files added in the latest release that we don't need to worry about at this time, we will talk about `serviceWorker.js` in the [Service Worker](#service-worker) section and if you are curious about the other files, a Google search will usually help you find the answer.

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

<div id="service-worker"></div>

### Service Worker

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;By default the service worker in your app is turned off, or unregistered. During the build of the application, a service worker file is generated. By switching `serviceWorker.unregister()` to `serviceWorker.register()` is all you need to turn the service on. This will turn your app into a **Progressive Web App** which is described <a href="https://web.dev/progressive-web-apps/" target="_blank" rel="noopener noreferrer">here</a>. Turning it on basically allows your app to have some functionality while offline, but can cause issues when debugging.

[Create React App Service Worker Docs](https://create-react-app.dev/docs/making-a-progressive-web-app/)

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

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JSX is JavaScript XML (Extensible Markup Language), that is a lot of fancy jargon for a way to write HTML in React. It looks and feels a lot like HTML, but has some key differences. One of the first things you may notice if you get an error, is in JSX all elements must be properly closed. Some tags in HTML automatically close like `<img>` and `<input>`, but in JSX they need to be closed with a backslash **`/`**.

```html
<img src="filename.png" />
<input type="text" />
```

Another common error in JSX is when adding a class to an element. In HTML you can write `class=""`, but in JSX it is `className=""`. JSX uses camelCase rather than lowercase for attributes and event handling.

```html
<div className="container">
  <p class="name" onClick={handleClick}>Name</p>
</div>
```

Because JSX is a JavaScript extension, you can insert JavaScript expressions directly by using `{ }` curly braces.

```html
<h1>{10 * 10}% JSX</h1>
```

[JSX In Depth Docs](https://reactjs.org/docs/jsx-in-depth.html)

### Function vs Class Components

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Function components are the simplest way to define a component and are sometimes called pure components because they don't have any side effects or changes to state of the application. Function components are impure if they change the state or don't always output the same result. Function components are literally a JavaScript function that accepts an optional **props** argument and returns JSX. Class components are written a bit differently than function components, but do the same thing as well as extending some extra methods that can be used. You can view more info on those in the [Class Methods](#class-methods) section. Here is what a class component looks like:

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

Or, the **Component** can be destructured in the import like so:

```javascript
import React, {Component} from 'react'

class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

[React Components Docs](https://reactjs.org/docs/components-and-props.html)


### Props

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As you dive into React and as you saw above, you may see or hear the term **props** used a lot. It is a keyword in React, which is short for properties and is used to pass data from a parent component to a child. The data is read-only and should not be changed by the child. Here is what React says in regards to props:

>React is pretty flexible but it has a single strict rule:
>
>### All React components must act like pure functions with respect to their props.

### State

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In React there are 2 ways to initiate the **state** of the application, through an object in a class component or using the **state hook**. **Hooks** are a newer addition to React and only work in versions 16.8 or higher, you can learn more in the [Hooks Section](#hooks). A lot of older code bases with still use the class method because of this, but you are able to use whichever feels more comfortable to you as there are no plans to get rid of classes in React.
<br/><br/>

- #### Class component
```javascript
class Example extends React.Component {
  constructor(props) {
    super(props);
    // initiate state here
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

- #### useState Hook
```javascript
import React, { useState } from 'react';
function Example() {
  // Initiate state as count and update as setCount
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

<div id="class-methods"></div>

### Class Methods

<p align="center" style="overflow-x: auto;">
  <img src="./react/class-methods.svg" alt="React Class Methods">
  <img src="./react/lifecycle-methods.png" alt="React Component Lifecycle"><br/>
  <a href="http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/" target="_blank" rel="noopener noreferrer">Interactive image</a>
</p>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When a class component is used, there are methods provided by the class available to use during the 3 phases of the lifecycle. During the mounting phase there are 4 methods. They get called in this order:

- 1\. **constructor()** - is called first when the component is initiated and is the place to initialize your state. It takes props as an argument and requires `super(props)` to be called to inherit the parent's methods.
- 2\. **getDerivedStateFromProps()** - method is the place to update the state of the component based on the props coming from the parent.
- 3\. **render()** - is required in a class component and outputs the JSX to the DOM.
- 4\. **componentDidMount()** - is called after the component is mounted to the DOM. This is where you place functions that require the window object or for the component to be present.

```javascript
class Header extends React.Component {
  constructor(props) {
    super(props);
    // state sets color to red by default
    this.state = {favoriteColor: "red"};
  }
  static getDerivedStateFromProps(props, state) {
    // changes favoriteColor state to update based on parent props
    return {favoriteColor: props.favCol };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({favoriteColor: "yellow"})
    }, 1000)
  }
  render() {
    return (
      <h1>My Favorite Color is {this.state.favoriteColor}</h1>
    );
  }
}

// Parent sets favCol to yellow
ReactDOM.render(<Header favCol="yellow"/>, document.getElementById('root'));
```

The 2nd phase is updating. During this phase, we can call 5 different methods in this order:

- 1\. **getDerivedStateFromProps()** - same as mounting phase.
- 2\. **shouldComponentUpdate()** -  returns a Boolean (true/false) value that tells React whether or not to update the component.
- 3\. **render()** - called by default, renders the JSX to the DOM again.
- 4\. **getSnapshotBeforeUpdate()** - gives access to props and state before it is updated.
- 5\. **componentDidUpdate()** - is called after the component is updated.

```javascript
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoriteColor: "red"};
  }
  static getDerivedStateFromProps(props, state) {
    // changes favoriteColor state to update based on parent props
    return {favoriteColor: props.favCol };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({favoriteColor: "yellow"})
    }, 1000)
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    document.getElementById("div1").innerHTML =
    "Before the update, the favorite was " + prevState.favoriteColor;
  // returns red
  }
  componentDidUpdate() {
    document.getElementById("div2").innerHTML =
    "The updated favorite is " + this.state.favoriteColor;
    // returns yellow
  }
  render() {
    return (
      <div>
        <h1>My Favorite Color is {this.state.favoriteColor}</h1>
        <div id="div1"></div>
        <div id="div2"></div>
      </div>
    );
  }
}

ReactDOM.render(<Header />, document.getElementById('root'));
```

Finally, the last phase of the lifecycle in a component is unmounting. Here we only call the **componentWillUnmount()** method.

```javascript
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoriteColor: "red"};
  }
  let timer = null;
  componentDidMount() {
    timer = setTimeout(() => {
      this.setState({favoriteColor: "yellow"})
    }, 1000)
  }
  componentWillUnmount() {
    clearTimeout(timer)
  }
  render() {
    return (
      <div>
        <h1>My Favorite Color is {this.state.favoriteColor}</h1>
      </div>
    );
  }
}

ReactDOM.render(<Header />, document.getElementById('root'));
```

### Binding

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A common problem in class components is running into issues with the binding of **this**. Class methods are not bound by default and if you forget to bind **this**, the function will return undefined.

```javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

Another way to bind **this** is to just use an arrow function instead, which will lexically bind **this**.

```javascript
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}

class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```

<div id="hooks"></div>

### Hooks

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hooks work in React version 16.8 or higher and were added to simplify the connection between components and make the code more readable. Classes can be confusing to both people and machines reading the code and it makes it more difficult to organize and reuse. Understanding **this** binding was also troublesome. Hooks simply lets you use React features without having a class component and extending methods. React says they have no plans to remove classes and everything is backward compatible and you can use hooks alongside class components. There are many built-in hooks React provides, but you can also create custom hooks to use. The hooks that are used most often are:
- **useState** - returns a state value, and a function to update it. 
- **useEffect** - accepts a function as an argument the would cause a side effect.
- **useContext**  - accepts an object as an argument and returns the current value of that object.

```javascript
import { createContext, useState, useEffect } from 'react';
const context = createContext(null);
export default function UserProvider({ children }) {
  // The useState() hook defines a state variable.
  const [userData, setUserData] = useState(null);
  // The useEffect() hook registers a function to run after render.
  useEffect(() => {
    fetch('/api/v1/whoami')        // Ask the server for user data.
      .then(response => response.json()) // Get the response as JSON
      .then(data => {                    // When data arrives...
        setUserData({                    // set our state variable.
          username: data.username,
          isAuthenticated: data.is_authenticated,
          timezone: data.timezone,
          gravatarUrl: data.gravatar_url
        });
      });
  }, []);  // This empty array means the effect will only run once.
  // On the first render userData will have the default value null.
  // But after that render, the effect function will run and will
  // start a fetch of the real user data. When the data arrives, it
  // will be passed to setUserData(), which changes state and
  // triggers a new render. On this second render, we'll have real
  // user data to provide to any consumers. (And the effect will not
  // run again.)
  return (
    <context.Provider value={userData}>
      {children}
    </context.Provider>
  );
}

UserProvider.context = context;
```

Additional hooks are:
- **useReducer** - an alternative to useState that returns the current state paired with a dispatch method similar to Redux.
- **useCallback** - returns a memoized callback function. Basically caches the value returned from the callback function to make it more efficient.
- **useMemo** - returns a memoized value. Only updates when one of the dependencies changes to avoid recalculating on every render.
- **useRef** - returns an object that is mutable. Like a box it holds a value through the life of the component.
- **useImperativeHandle** - goes with useRef and customizes the value useRef exposes.
- **useLayoutEffect** - similar to useEffect, but fires after DOM mutations. Can block visual updates.
- **useDebugValue** - can display a label for custom hooks.

[Hooks API Docs](https://reactjs.org/docs/hooks-reference.html)

---

## Create React App from Scratch

### Webpack

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Webpack is probably the most widely used module bundler. Webpack requires a lot of setup, but that also comes with a lot of control over what and how you want to use things. There are 4 main concepts in Webpack. **Entry** is a JavaScript file where Webpack will enter your project, typically **`index.js`**. **Output** is where you tell Webpack to output all of the files in bundles together, typically a **`build`** folder. **Loaders** are what you put your code through to compile or transpile your code, a popular tool for this is **Babel**. Lastly, **Plugins** play a vital role in outputting your code. Webpack has a rich plugin interface you can explore here: [Webpack Plugins](https://webpack.js.org/plugins/).
<br/>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Create React App comes with Webpack already pre-configured for you. This is going to teach you how it is done. Go to the directory of your choice and follow these steps to create a new project and setup Webpack.

- 1\. **`mkdir webpack-project`** and then **`cd webpack-project`**
- 2\. **`npm init`** - this will walk you through the steps of creating a basic package.json file.
- 3\. **`npm i --save-dev webpack webpack-dev-server webpack-cli`** - install webpack.
- 4\. **`mkdir build`** then **`cd build`** then **`touch index.html`** and **`touch bundle.js`**- create our build folder, html entry point, and js bundle file.
- 5\. **`cd ..`** to go back to the root directory of your project.
- 6\. **`touch webpack.config.js`** to create the webpack configuration file we will use next.

- 7\. Open up the project in your favorite editor. Mine is VS Code and I wrote a whole article on getting it setup with a good developer environment here [VS Code Setup](https://dev.to/bdesigned/vscode-setup-with-eslint-and-prettier-1gek). In your package.json file we are going to edit the "scripts" section. Make sure your file looks like this unless you customized the package.json setup. Change the "scripts" section to include **`"start": "webpack-dev-server --config ./webpack.config.js --mode development"`** so we can run our server with Webpack using **`npm start`**.

```javascript
{
  "name": "webpack-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server --config ./webpack.config.js --mode development"
  },
  "author": "",
  "license": "ISC",
    "devDependencies": {
    "webpack": "^4.43.0",
    "webpack-dev-server": "^3.11.0",
    "webpack-cli": "^3.3.11"
  }
}
```

- 8\. **`mkdir src`** - in your **root** directory create a src folder.
- 9\. **`cd src`** then **`touch index.js`** to change into src folder and create our js entry point. Add **`console.log('Webpack wizard!')`** to the index.js file.
- 10\. Next, open up the **`webpack.config.js`** file and add the following code.

```javascript
module.exports = {
  entry: [
    './src/index.js' // The entry point
  ],
  output: {
    path: (__dirname = '/build'), // folder webpack should output files to
    publicPath: '/', // path to build directory
    filename: 'bundle.js' // file to output js to
  },
  devServer: {
    contentBase: './build' // dev server folder to use
  }
}
```

- 11\. Now, open up the index.html file and add the following code. We will inject React into the `div` with `id="app"` and Webpack will bundle our js into the bundle.js file.

```html
<!-- index.html file -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Webpack Wizard</title>
  </head>
  <body>
    <h1>Webpack Wizard</h1>
    <div id="app"></div>
    <script src="/bundle.js"></script>
  </body>
</html>
```

- 12\. At this step, we should check to ensure Webpack is configured correctly. Run **`npm start`** from the root directory. This will output some information to the terminal, but if you visit **`http://localhost:8080/`** in your browser, you should see something like this.

<p align="center">
  <img src="https://console-logs.netlify.app/jr2sr/webpack.png" alt="webpack output" width="100%" style="border: 1px solid black">
</p>

### Part 2 - Build Webpack with React from Scratch

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Yay! Part 1 is done. Now, we move onto **Babel** to transpile our code back to ES5 so we have full browser support.

- 1\. **`npm i --save-dev babel-core babel-loader babel-preset-env babel-preset-react`** - in your root directory, install babel core, babel loader, and babel preset env.
- 2\. Open package.json and add **`"babel": { "presets": [ "env", "react" ]}`** to it. It should now look like this.

```javascript
{
	"name": "webpack-project",
	"version": "1.0.0",
	"description": "building webpack from scratch",
	"main": "index.js",
	"scripts": {
		"start": "webpack-dev-server --config ./webpack.config.js --mode development"
	},
	"babel": {
		"presets": [
			"env",
			"react"
		]
	},
	"author": "Brittney Postma",
	"license": "ISC",
	"devDependencies": {
		"babel-core": "^6.26.3",
		"babel-loader": "^8.1.0",
		"babel-preset-env": "^1.7.0",
		"babel-preset-react": "^6.24.1",
		"webpack": "^4.43.0",
		"webpack-cli": "^3.3.11",
		"webpack-dev-server": "^3.11.0"
	}
}
```

- 3\. In **`webpack.config.js`** add **`module: { rules: [{ test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] }]}, resolve: { extensions: ['js', 'jsx'] }`**. It now should look like this.

```javascript
module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: (__dirname = '/build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './build'
  },
  module: {
    rules: [
      {
        // test for all js and jsx files
        test: /\.(js|jsx)$/,
        // exclude node modules folder
        exclude: /node_modules/,
        // run all js and jsx through babel-loader
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    // makes it so you don't have to
    // write .js and .jsx at the end of imports
    extensions: ['js', 'jsx']
  }
}
```

### Part 3 - Build Webpack with React from Scratch

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Finally, Webpack and Babel are setup. The last step is to install React and ESLint.

- 1\. **`npm i react react-dom`** then **`npm i --save-dev eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks @babel/core @babel/preset-env @babel/preset-react babel-eslint babel-loader`** to install React and ESLint from your root directory.
- 2\. Now edit webpack.config.js to include **`{ test: /\.(js|jsx)$/, exclude: /node_modules, use: ['eslint-loader'] }`** in the rules section.

```javascript
module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: (__dirname = '/build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './build'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['eslint-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
```

- 3\. **`touch .eslintrc.json`** to create the ESLint configuration file.
- 4\. Open .eslintrc and input the following code to configure ESLint, and Babel.

```javascript
// .eslintrc
{
	"extends": ["airbnb-base"],
	"env": {
		"node": true,
		"es6": true,
		"browser": true
	},
	"parser": "babel-eslint",
	"rules": {
		"no-console": "off"
	}
}

```

- 5\. Open package.json and add **`"babel": { "presets": ["@babel/preset-env","@babel/preset-react"] },`** to configure babel.
- 6\. Finally, it is time to test our configuration. Run **`npm start`** 🍀 and fingers crossed it is working.

**Warning** - If you run into errors or issues when running **`npm start`**, which you probably will, then first try fully reading the error and then Googling the error. I spent an hour looking for the reason babel-core was missing and nothing worked. I looked down and saw this error and the answer was staring me in the face. I was using a deprecated version of babel and had to redo my entire setup.

### Connect React

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The last thing to do is connect React and insert it into our `div` with the `id="app"` we created earlier. Remove the console log from `src/index.js` and we are going to build our React component.

```javascript
import React from 'react'
import ReactDOM from 'react-dom'

const WebpackWizard = () => {
  return (
    <div>
      <h1>Webpack Wizard</h1>
    </div>
  )
}

ReactDOM.render(<WebpackWizard />, document.getElementById('app'))
```

Congratulations! If you are still with me, we now have a working version of basically create-react-app, but we built it from scratch. 🎉

</div>