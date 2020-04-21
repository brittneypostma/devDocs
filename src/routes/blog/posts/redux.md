---
title: Redux
---

<p align="center">
  <img src="react/redux.svg" alt="Redux Logo" width="25%">
</p>

## [Redux.js.org](https://redux.js.org/)

---

## What is Redux?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Redux is a JavaScript framework for managing **state** in an application. It helps apps run consistently and makes them easier to test. A lot of developers tend to think that Redux can only be used with React, but it can actually be ran alongside any view library. Redux does have a separate package for working with React called **React Redux**. Redux has a small, 2kb, bundle size and a large community backing it with lots of addons available. Here are a few reasons you may want to add Redux to your project.
- &#9670; Good for managing large state.
- &#9670; Useful for sharing data between components.
- &#9670; Predictable state management.

Redux does these 3 things really well, by using these 3 principles:
- 1\. Having a single source of truth, a single large object that describes the entire state of the application.
- 2\. State is read only or immutable, each action creates a new version of state.
- 3\. Only changes state using pure functions, functions that given the same input always have the same output.

---

<p align="center">
  <img src="react/redux-flow.webp" alt="Redux Flow" width="100%">
</p>

## Redux Flux Pattern

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Redux follows a strict unidirectional data flow. First, an **action** is **dispatched** using **`store.dispatch(action)`**. An action is a JavaScript object that describes what event happened. The action then gets sent through a **reducer** function. A reducer is a pure function, that receives the action as an input and then creates an updated **state**. Once the Redux **store** receives the new state, every component registered with **`store.subscribe(listener)`** will be updated with a new **view**.


### Getting Started With Redux

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Open a terminal to the directory of your application. To install Redux you can type **`npm i redux`** if you are using npm or **`yarn add redux`** if you use yarn. If you are in a **React** application, there is a separate package called **React Redux** that needs to be installed as well. To install React Redux you would type **`npm i react-redux`** for npm or **`yarn add react-redux`** for yarn. Actually, there is a template of create-react-app that includes Redux. To start a new application with both React and Redux run **`npx create-react-app my-app-name --template redux`**.

### Setting Up React Redux

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you have a project running on React that you want to add Redux to, there is some setup involved to convert your app over. You need to have added both the **redux** and **react-redux** packages to your app. React Redux has a **`<Provider />`** component, which allows the app to access the Redux store. You go into your **`src/index.js`** file and around your **`<App />`** component, you wrap the Provider like this:
``` javascript
import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './store'

import App from './App'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Redux also needs to connect to each component you need access to the store in.
In your **`src`** folder inside your React application create 2 files called **`actions.js`** and **`constants.js`**. In actions.js, we will create our action objects. Each action will take in the event and return the **payload** or data that is needed. The type is a constant and it is common practice in JavaScript to capitalize constants and it just describes what the object is doing. In, constants.js we can keep track of all of our type constants and import them into our actions.js file.

```javascript
// constants.js
export const CHANGE_SEARCH_FIELD = 'CHANGE_SEARCH_FIELD'

// actions.js
import { CHANGE_SEARCH_FIELD } from './constants.js'

export const setSearchField = (text) => ({
  type: CHANGE_SEARCH_FIELD, 
  payload: text
})
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Now we need to create our **reducers**, create a file called **`reducers.js`** in the src directory. Then, we need to write our reducer function.

```javascript
import { CHANGE_SEARCH_FIELD } from './constants.js
const initialState = {
  searchField: ''
}

export const searchRobots = ( state=initialState, action={} ) = > ({
  switch(action.type)
})
```

