---
title: Redux
---

<p align="center">
  <img src="react/redux.svg" alt="Redux Logo" width="25%">
</p>

## [Redux.js.org](https://redux.js.org/)

---

## What is Redux?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Redux is a JavaScript framework for managing **state** in an application. It helps apps run consistently and makes them easier to test. A lot of developers tend to think that Redux can only be used with React, but it can actually be ran alongside any view library. It has a small, 2kb, bundle size and a large community backing it with lots of addons available. Here are a few reasons you may want to add Redux to your project.
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

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Open a terminal to the directory of your application. To install Redux you can type **`npm i redux`** if you are using npm or **`yarn add redux`** if you use yarn.