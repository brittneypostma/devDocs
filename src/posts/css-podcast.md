---
title: CSS Podcast
image: ./logos/css-podcast.png
---

<div class="post">
<div id="toc">
<p style="font-weight: bold; font-size: 25px;">Table of Contents</p>

- [Episode One: The Box Model](#episode-one-the-box-model)
  - [Intrinsic vs Extrinsic Sizing](#intrinsic-vs-extrinsic-sizing)
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

In CSS every element is a rectangular box, no matter what kind of element it is. Notice above the margin and, outline, and box shadow are striked-through to show that they **do not** affect the size of the box itself. They do however, affect content around the box. Size of a box is calculated like so:

```
width = width + padding-left + padding-right + border-left + border-right
height = height + padding-top + padding-bottom + border-top + border-bottom
```


### Intrinsic vs Extrinsic Sizing

</div>