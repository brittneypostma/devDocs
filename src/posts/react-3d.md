---
title: React 3D
image: ./logos/react.svg
---

<div class="post">
<div id="toc">

<p style="font-weight: bold; font-size: 25px;">Table of Contents</p>

- [Intro to React 3D](#intro-to-react-3d)

</div>

<div id="main">

## Intro to React 3D

[ThreeJS](https://threejs.org/)<br/>
[ThreeJS Fundamentals](https://threejsfundamentals.org/threejs/lessons/threejs-fundamentals.html)

<p align="center">
    <img src="react-3d/threejs-structure.svg" alt="Three JS Structure">
</p>

In this image, the renderer is a canvas element that contains all of the scene which contains all of the other objects. There can be many **Mesh** objects, which specify the **Geometry**. **Light** is necessary to give your objects color, otherwise they are void of light, or black. **Texture** is unsurprisingly used to render texture on objects in your screen. Another object that is needed is the **Camera** to be able to move the view around. We are going to be using React Three Fiber which includes the camera element.

<p align="center">
    <img src="react-3d/threejs-1cube-no-light-scene.svg" alt="Three JS 1 cube with no light">
</p>


</div>