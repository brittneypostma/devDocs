---
title: Redux Toolkit
---

<p align="center">
  <img src="./rtk/logo.png" alt="Redux Toolkit Logo" width="75%">
</p>

---

#### Table of Contents

- [What is Redux Toolkit?](#what-is-redux-toolkit)
- [Why Redux Toolkit?](#why-redux-toolkit)
- [Using Redux Toolkit](#using-redux-toolkit)

## What is Redux Toolkit?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Redux Toolkit is the new **official** way to incorporate Redux into your project. It tries to solve some of the common concerns developers expressed in using the original Redux package. Such as too much setup, too complicated, and needed too many addon packages to function. With toolkit, there is less configuration and a lot more work is done under the hood and middlewares have been integrated in for async thunks. While the original Redux package was very unopinionated and allowed you to choose which packages you wanted to use with it, the new Redux Toolkit is opinionated because it comes with those packages out of the box. You can think of Redux Toolkit as the Create React App for Redux as it comes with things that will help get you started faster. Here's a list of the new APIs from [Redux Toolkit Docs](https://redux-toolkit.js.org/introduction/quick-start):

- &diams; **`configureStore()`**: wraps `createStore` to provide simplified configuration options and good defaults. It can automatically combine your slice reducers, adds whatever Redux middleware you supply, includes `redux-thunk` by default, and enables use of the Redux DevTools Extension.
- &diams; **`createReducer()`**: that lets you supply a lookup table of action types to case reducer functions, rather than writing switch statements. In addition, it automatically uses the `immer` library to let you write simpler immutable updates with normal mutative code, like `state.todos[3].completed = true`.
- &diams; **`createAction()`**: generates an action creator function for the given action type string. The function itself has `toString()` defined, so that it can be used in place of the type constant.
- &diams; **`createSlice()`**: accepts an object of reducer functions, a slice name, and an initial state value, and automatically generates a slice reducer with corresponding action creators and action types.
- &diams; **`createAsyncThunk`**: accepts an action type string and a function that returns a promise, and generates a thunk that dispatches `pending/fulfilled/rejected` action types based on that promise
- &diams; **`createEntityAdapter`**: generates a set of reusable reducers and selectors to manage normalized data in the store.
- &diams; **`createSelector`**- utility from the Reselect library, re-exported for ease of use.

## Why Redux Toolkit?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As I said above, using Redux Toolkit will greatly decrease the configuration and setup of the Redux store. This will get you ready to code faster and simplify adding new items to your store. While the bundle size is going to be larger than the original Redux package, the RTK team is constantly working on better tree-shaking techniques to decrease its size. As Redux Toolkit installs the individual packages, you always have the option to remove pieces you aren't using as well. It also chooses to use `redux-thunk` over `redux-saga` and you can swap those out if you wish. Here is more information on [Why RTK uses Redux Thunk over Redux Saga](https://www.youtube.com/redirect?v=9lCmbth63k0&redir_token=iP6uatfm2qwV48vpraoPY20fgxd8MTU5MDQxMTk2N0AxNTkwMzI1NTY3&q=https%3A%2F%2Fblog.isquaredsoftware.com%2F2020%2F02%2Fblogged-answers-why-redux-toolkit-uses-thunks-for-async-logic%2F&event=video_description), if you want to know more.

## Using Redux Toolkit

To start a new project with Redux Toolkit:

```
npx create-react-app my-app-name --template redux
```

To add Redux Toolkit to an existing app.

```js
// NPM

npm i @reduxjs/toolkit

// Yarn

yarn add @reduxjs/toolkit
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Coming from the original Redux package, you may think `createAction()` and `createReducer()` are going to be your first files to setup. Even though you can still set it up that way, most of the time, all you are going to need is the `createSlice()` function. It will accept a slice name string, an initial state and an object of reducer functions as parameters and will automatically generate the action creators and types that correspond to the reducers and state. It essentially combines 3 files into 1. Create a redux folder and a `todosSlice.js` file. Let's take a look at a slice for setting up a todo.

```js
import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  // slice name
  name: 'todos',
  // initial state
  initialState: [
    {
      id: 1,
      desc: 'name slice',
      isComplete: true
    },
    {
      id: 2,
      desc: 'set initial state',
      isComplete: true
    },
    {
      id: 3,
      desc: 'create reducer',
      isComplete: false
    }
  ],
  // object of reducer functions
  reducers: {
    // action
    create: {
      // the reducer
      reducer: ( state, { payload }) => state.push(payload),
      // ran before reducer
      prepare: ({desc}) => ({
        payload: {
          // not the best way to do unique ids
          id: Math.random().toString(36).substr(2, 9),
          desc,
          isComplete: false
        }
      })
    },
    // action
    edit: (state, { payload }) => {
      // reducer
      const idx = state.findIndex(todo => todo.id === payload.id)
      if (idx !== -1) state[idx].dec = payload.desc
    },
    // action
    toggle: (state, { payload }) => {
      // reducer
      const idx state.findIndex(todo => todo.id === payload.id)
      if (idx !== 01) state[idx].isComplete = payload.isComplete
    },
    // action
    remove: (state, { payload }) => {
      // reducer
      const idx state.findIndex(todo => todo.id === payload.id)
      if (idx !== -1) state.splice(idx, 1)
    }
  }
})

// destructuring actions and reducer from the slice
const { actions, reducer } = todosSlice

// destructuring actions off slice
const { create, edit, toggle, remove } = actions

// export reducer
export default reducer
```

Next, we need to create a `rootReducer.js` file to combine our reducers for the store.

```js
import { combineReducers } from '@reduxjs/toolkit'
// import the reducer as todosReducer
import todosReducer from './todosSlice'

export default combineReducers({
  todos: todosReducer
})
```

Finally, we just need to configure the store. You can do this by creating a `store.js` file or just include it in the `index.js`.

```js
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'

const store = configureStore({
  reducer: rootReducer
})

export default store
```

Now in `index.js`, we need to wrap the **Provider** around our main component.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import store from './redux/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.register()
```

That's it! Redux Toolkit is now set up and connected to our application. This is a basic tutorial, next time we will dive deeper into RTK! Thanks for the :heart:!
