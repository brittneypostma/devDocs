---
title: CSS Podcast
image: ./logos/css-podcast.png
---

<div class="post">
<div id="toc">
<p style="font-weight: bold; font-size: 25px;">Table of Contents</p>

- [Episode One: The Box Model](#episode-one-the-box-model)
  - [Intrinsic vs Extrinsic Sizing](#intrinsic-vs-extrinsic-sizing)
  - [Boxes Everywhere](#boxes-everywhere)
  - [User Agent Stylesheet](#user-agent-stylesheet)
  - [Scrollbars](#scrollbars)
</div>

<div id="main">
<p align="center">
  <img src="css-podcast/banner.png" alt="CSS Podcast banner" width="100%">
</p>

[CSS Podcast](https://thecsspodcast.libsyn.com/)

## Episode One: The Box Model

[CSS Tricks Box Model](https://css-tricks.com/the-css-box-model/)<br/>
[W3C Box Model Module](https://www.w3.org/TR/css-box-3/)<br/>

[Adam's Box Model Codepen](https://codepen.io/argyleink/pen/bGNmgGW)<br/>
<iframe height="500" style="width: 100%;" scrolling="no" title="Box Model" src="https://codepen.io/argyleink/embed/bGNmgGW?height=500&theme-id=light&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/argyleink/pen/bGNmgGW'>Box Model</a> by Adam Argyle
  (<a href='https://codepen.io/argyleink'>@argyleink</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

In CSS every element is just a rectangular box. That's easy right, its just boxes we move around the screen. Well, sort of, but its really about the content thats in the box that can affect the rest of the box. Notice above the margin, outline, and box shadow are striked-through to show that they **do not** affect the size of the box itself. They do however, affect content around the box. The first part to think about when understanding the box model is how the sizing is determined, intrinsic or extrinsic.


### Intrinsic vs Extrinsic Sizing

**Extrinsic** is when the box size is predefined and content is put inside of it. We would explicitly set the height and the width of the box and force what's inside to stay within its given area. **Intrinsic** is when the size of the box is dynamic to the content put inside of it. In this style we would allow whatever our content is to determine the size of our box.

### Boxes Everywhere

Once we figure out whether the content box size is predefined or dynamic, we then have the **padding box** and then the **border box** outside of that. These 3 boxes determine the size of the box.So the size of the box is calculated like so:

```
width = width + padding-left + padding-right + border-left + border-right
height = height + padding-top + padding-bottom + border-top + border-bottom
```

Outside of the border, we have the **margin**, **outline**, and **box-shadow** boxes. As I said before, these don't affect the inner size of the box. They are **painted** on after the box size is calculated. You can see this when adding a border to an element versus adding an outline. A border is going to change the size of the box, which the outline will not change the placement of the element. It is important to note that **margin** is affected by the size of the content and affects the space between elements. It also belongs to the element with which it is added, except in the case of gap where it then belongs to the parent grid (or flex soon) that called it.

### User Agent Stylesheet

Occasionally, you may notice elements automatically have padding or margin applied to them. Such as a list item being indented with padding. These styles are provided by the user agent, or browser, that you are using. To avoid running into issues with this, it is common to use a [normalize css](https://necolas.github.io/normalize.css/) or [reset css](https://meyerweb.com/eric/tools/css/reset/) file. There are many versions out there or you can tweak them to your liking.

### Scrollbars

Scrollbars are interesting in CSS. They live in the same box as the **padding box**.

<p align="center">
  <img src="css-podcast/gallery.svg" alt="Photo gallery of box model" width="50%">
</p>
</div>