---
title: Redux
image: ./logos/redux.svg
---

<div class="post">
<div id="toc">

<p style="font-weight: bold; font-size: 25px;">Table of Contents</p>

- [Redux.js.org](#reduxjsorg)
- [What is Redux?](#what-is-redux)
- [Redux Flux Pattern](#redux-flux-pattern)
  - [Why Redux?](#why-redux)
  - [Getting Started With Redux](#getting-started-with-redux)
  - [Setting Up React Redux](#setting-up-react-redux)

**This is also available on Dev.to. Please, go give it some 💖 [Explain Redux like I'm 5!](https://dev.to/bdesigned/explain-redux-like-i-m-5-18kn)!**

  </div>

<div id="main">

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

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Redux follows a unidirectional or one direction flow of data. It starts in the **view**, the item on a screen that a user sees when visiting your application. If a user clicks a button or types something in, we expect something to happen. This is called an **action** and when an action happens, we need to make sure to change what is displayed to the user. To do this, Redux has a few steps it goes through. It starts when the user does an action in our application. That action is **dispatched**, that's just a fancy word for sent, through a **reducer** function. A reducer simply condenses multiple things that could be happening into one final object to send back to the user. It needs to be a **pure** function, every time you input the same thing, you should always get the same result returned. The reducer then hands that new condensed object back to the **store**. The store is the container, our box, which holds the state. It then updates the state and gives it to the view to update. Now the user is seeing what they expect on the screen!

### Why Redux?

Here are a few reasons you may want to add Redux to your project.

- Good for managing large state.
- Useful for sharing data between components.
- Predictable state management.

Redux does these 3 things really well, by using these 3 principles:

- 1\. Having a single source of truth, a single large object that describes the entire state of the application.
- 2\. State is read only or immutable, each action creates a new version of state.
- 3\. Only changes state using pure functions, functions that given the same input always have the same output.

### Getting Started With Redux

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Open a terminal to the directory of your application. To install Redux you can type **`npm i redux`** if you are using npm or **`yarn add redux`** if you use yarn. If you are in a **React** application, there is a separate package called **React Redux** that needs to be installed as well. To install React Redux you would type **`npm i react-redux`** for npm or **`yarn add react-redux`** for yarn. Actually, there is a template of create-react-app that includes Redux. To start a new application with both React and Redux run **`npx create-react-app my-app-name --template redux`**.

### Setting Up React Redux

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you have a project running on React that you want to add Redux to, there is some setup involved to convert your app over. You need to have added both the **redux** and **react-redux** packages to your app. React Redux has a **`<Provider />`** component, which allows the app to access the Redux store. You go into your **`src/index.js`** file and around your **`<App />`** component, you wrap the Provider component.

```javascript
import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './redux/store'

import Connect from './Connect'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <Connect />
  </Provider>,
  rootElement
)
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Now we haven't actually created our store yet, so lets do that next. Everyone seems to have their own folder structure that they like when creating an application, this is just one way of setting up your files. If you are more comfortable with your understanding of importing and exporting files, feel free to find the way that works best for you. In your **`src`** folder inside your React application create a new folder called redux and inside of that create **`store.js`**. Inside of store.js, is where we will create our Redux store and connect it with the reducers. We need to import createStore and applyMiddleware from Redux, our rootReducer that we have not created yet, and some middleWare packages to handle the async functions. We also need to install **redux-thunk** and **redux-logger** into our app. Use `npm i redux-thunk redux-logger` for npm and `yarn add redux-thunk redux-logger` for yarn. The createStore function from Redux takes 3 optional arguments.

- 1\. **reducer** - A function that reduces any actions into 1 new state tree and returns the next state object.
- 2\. **[preloadedState]** - The initial or default state.
- 3\. **[enhancer]** - Optionally enhance the store with middleware or other 3rd party capabilities. Redux only comes with 1 enhancer, applyMiddleware().
  In this app, our initial state is going to be created inside the reducers file, so we do not have a preloadedState.

```javascript
import { createStore, applyMiddleware } from 'redux'

// middleware for async reducers
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

// reducer file we have not created yet
import { rootReducer } from './reducers.js'

const logger = createLogger()

// from redux call createStore(reducer, [preloadedState], [enhancer])
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger))

export default store
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Now that we have created our store, we will create our actions objects. Create a new file inside the **redux** folder called **`actions.js`**. As your app grows, this is where you may opt to create a folder with a separate file for each different action. As this is a smaller app, I am putting them into 1 actions.js file. Each action will take in the event that happened and a copy of the current state. It then updates the **payload** or data and returns an updated copy of the state. We also need to create a file called **`constants.js`** to keep track of all of our type constants and import them into our actions.js file. The constants.js file is optional, it is a common practice in larger applications to hold all of the constant names of the action types.

```javascript
// constants.js
export const CHANGE_SEARCHFIELD = 'CHANGE_SEARCHFIELD'
export const REQUEST_ROBOTS_PENDING = 'REQUEST_ROBOTS_PENDING'
export const REQUEST_ROBOTS_SUCCESS = 'REQUEST_ROBOTS_SUCCESS'
export const REQUEST_ROBOTS_FAILED = 'REQUEST_ROBOTS_FAILED'
```

```javascript
// actions.js
import {
  CHANGE_SEARCHFIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED
} from './constants'

export const setSearchField = text => ({
  type: CHANGE_SEARCHFIELD,
  payload: text
})

export const requestRobots = () => dispatch => {
  dispatch({ type: REQUEST_ROBOTS_PENDING })
  const apiCall = link => fetch(link).then(response => response.json())
  apiCall('https://jsonplaceholder.typicode.com/users')
    .then(data => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error }))
}
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Now we need to create our **reducers**. Here, we probably should go ahead and create a new folder called **reducers** inside the redux folder. Then create a file for each action reducer. I've created **`posts.js`**, **`comments.js`**, and **`rootReducer.js`**, which will combine all of our reducer functions into one function. Now we need to write our reducer functions. In posts.js, we will take our old state in and create an updated version of it, with the likes incremented by 1. In comments.js,

```javascript
import {
  CHANGE_SEARCHFIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED
} from './constants'
import { combineReducers } from 'redux'

const initialStateSearch = {
  searchField: ''
}

export const searchRobots = (state = initialStateSearch, action = {}) => {
  switch (action.type) {
    case CHANGE_SEARCHFIELD:
      return Object.assign({}, state, { searchField: action.payload })
    default:
      return state
  }
}

const initialStateRobots = {
  robots: [],
  isPending: true
}

export const requestRobots = (state = initialStateRobots, action = {}) => {
  switch (action.type) {
    case REQUEST_ROBOTS_PENDING:
      return Object.assign({}, state, { isPending: true })
    case REQUEST_ROBOTS_SUCCESS:
      return Object.assign({}, state, {
        robots: action.payload,
        isPending: false
      })
    case REQUEST_ROBOTS_FAILED:
      return Object.assign({}, state, { error: action.payload })
    default:
      return state
  }
}

// take the 2 reducer functions and combine into 1
export const rootReducer = combineReducers({
  requestRobots,
  searchRobots
})
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The last thing we have left to do is connect our app to the store. In our **src** folder create a new component called **Connect.js**. In Connect.js, we need to import **connect** from react-redux and set up 2 functions: **mapStateToProps** and **mapDispatchToProps**. In mapStateToProps, we are giving access to the state or store to all the children components. In mapDispatchToProps, we are sending the events to the correct actions.

```javascript
import { connect } from 'react-redux'
import { setSearchField, requestRobots } from './redux/actions'
import App from './App'

const mapStateToProps = state => ({
  searchField: state.searchRobots.searchField,
  robots: state.requestRobots.robots,
  isPending: state.requestRobots.isPending
})

const mapDispatchToProps = dispatch => ({
  onSearchChange: event => dispatch(setSearchField(event.target.value)),
  onRequestRobots: () => dispatch(requestRobots())
})

// we take the 2 functions and connect them to our App component
const Connect = connect(mapStateToProps, mapDispatchToProps)(App)

export default Connect
```

Finally, our app is fully connected to Redux! This is our final folder structure.

```
-public
-src
  -components
    -Card.js
    -CardList.js
    -ErrorBoundary.js
    -SearchBox.js
    -component-styles.css
  -redux
    -actions.js
    -constants.js
    -reducers.js
    -store.js
  App.js
  Connect.js
  index.js
  styles.css
package.json
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You can find the code for the rest of the components <a href="https://github.com/brittneypostma/robofriends-redux/tree/master/src" target="_blank" rel="noopener noreferrer">here</a> or checkout the
[Code Sandbox](https://codesandbox.io/s/robofriends-jmyy7?fontsize=14&hidenavigation=1&theme=dark&file=/src/App.js).

</div>