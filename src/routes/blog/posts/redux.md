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

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you have a project running on React that you want to add Redux to, there is some setup involved to convert your app over. You need to have added both the **redux** and **react-redux** packages to your app. React Redux has a **`<Provider />`** component, which allows the app to access the Redux store. You go into your **`src/index.js`** file and around your **`<App />`** component, you wrap the Provider around the App component.
``` javascript
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import { Provider } from 'react-redux'
import store from './store'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Now we haven't actually created our store yet, so lets do that next. Everyone seems to have their own folder structure that they like when creating an application, this is just one way of setting up your files. If you are more comfortable with your understanding of importing and exporting files, feel free to find the way that works best for you. In your **`src`** folder inside your React application create a new folder called redux and inside of that create **`store.js`**. Inside of store.js, is where we will create our initial **state** or **store**. We need to import createStore from Redux, our rootReducer we have not created yet, and some mock JSON data. We create a defaultState object and then call createStore. The createStore function from Redux takes 3 optional arguments.
- 1\. **reducer** - A function that reduces any actions into 1 new state tree and returns the next state object.
- 2\. **[preloadedState]** - The initial or default state.
- 3\. **[enhancer]** - Optionally enhance the store with middleware or other 3rd party capabilities. Redux only comes with 1 enhancer, applyMiddleware().


```javascript
import { createStore } from 'redux'

// reducer file we have not created yet
import rootReducer from './reducers/index'

// mock data
import comments from './data/comments'
import posts from './data/posts'

// create a default state object
const defaultState = {
  posts,
  comments
}

// from redux call createStore(reducer, [preloadedState], [enhancer])
const store = createStore(rootReducer, defaultState)

export default store
```

Inside of the redux folder, create **`constants.js`**, and **`store.js`**, and 2 folders: **`reducers`** and **`actions`**. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Now that we have created our store, we will create our action objects. Create a new file inside the **redux** folder called **`actions.js`**. As your app grows, this is where you may opt to create a folder with a separate file for each different action. As this is a smaller app, I am putting them into 1 actions.js file. Each action will take in the event that happened and a copy of the current state. It then updates the **payload** or data and returns an updated copy of the state. We also need to create a file called **`constants.js`** to keep track of all of our type constants and import them into our actions.js file. The constants.js file is optional, it is a common practice in larger applications to hold all of the constant names of the action types. 

```javascript
// constants.js
export const INCREMENT_LIKES = 'INCREMENT_LIKES'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
```

```javascript
// actions.js
import { INCREMENT_LIKES, ADD_COMMENT, REMOVE_COMMENT } from './constants.js'

export const increment = index => ({
  type: INCREMENT_LIKES, 
  payload: index
})

export const addComment = (postId, author, comment) => ({
  type: ADD_COMMENT,
  postId,
  author,
  comment
})

export const removeComment = (postId, i) => ({
  type: REMOVE_COMMENT,
  postId,
  i
})
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Now we finally need to create our **reducers**. Here, we probably should go ahead and create a new folder called **reducers** inside the redux folder. Then create a file for each action reducer. I've created **`posts.ja`**, **`comments.js`**, and **`rootReducer.js`**. Then, we need to write our reducer functions. 

```javascript
// posts.js
import {}
export const posts = (state=[], action={}) => {
  switch(action.type) {
    case 
  }
}

// comments.js

// rootReducer.js
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The last thing we have left to do is connect our app to the store.