---
title: React 3D
image: ./logos/react.svg
---

<div class="post">
<div id="toc">

<p style="font-weight: bold; font-size: 25px;">Table of Contents</p>

- [Three JS](#three-js)
  - [React Three Fiber](#react-three-fiber)

</div>

<div id="main">

## Three JS

<p align="center">
    <img src="react-3d/threejs-structure.svg" alt="Three JS Structure" width="75%">
</p>

[ThreeJS](https://threejs.org/)<br/>
[ThreeJS Fundamentals](https://threejsfundamentals.org/threejs/lessons/threejs-fundamentals.html)<br/><br/>

In this image, the renderer is a **Scene** which defines the background and contains all of the other objects. There can be multiple **Mesh** objects, which specify the **Geometry** of an object with a **Material** to define the color. **Light** is necessary to give your objects color, otherwise they are void of light, or black. **Texture** is unsurprisingly used to render texture on objects in your screen. Another object that is needed is the **Camera** to be able to move the view around. We are going to be using React Three Fiber **Canvas** element which includes the camera.

<p align="center">
    <img src="react-3d/threejs-1cube-no-light-scene.svg" alt="Three JS 1 cube with no light" width="50%">
</p>

### React Three Fiber

React Three Fiber is a renderer built on top of Threejs. It provides a component-based **Scene** element with built-in helpers and hooks for an easier starting point than jumping into all of the Threejs library. Let's get a create-react-app up and running and install the package.

```bash
npx create-react-app react-3d
cd react-3d
npm install three react-three-fiber
```

</div>