---
title: Responsive CSS
image: ./logos/css.svg
---

<div class="post">
<div id="toc">

<p style="font-weight: bold; font-size: 25px;">Table of Contents</p>

- [Responsive Layouts & Design](#responsive-layouts--design)
- [Basic Design Principles](#basic-design-principles)
  - [Mobile First Design](#mobile-first-design)
  - [Fluid Grids & Relative Units](#fluid-grids--relative-units)
  - [Media Queries](#media-queries)
- [Flexbox vs Grid](#flexbox-vs-grid)
- [Grid Basics](#grid-basics)
  - [Gap](#gap)
  - [Placement](#placement)
  - [Self](#self)
  - [Explicit Grid](#explicit-grid)

</div>

<div id="main">

## Responsive Layouts & Design

<p style="text-align: center;"><strong>
Hello, I'm Brittney Postma and I am happy to announce that I am joining the other amazing instructors at the <a href="https://academy.zerotomastery.io/p/complete-web-developer-zero-to-mastery?affcode=441520_gjue7n-1">ZTM Academy</a>! I did a live workshop on <a href="">Responsive Web Design</a> that is available to all Academy students now! You can view the preview on <a href="">YouTube</a> or this article walks through the workshop and how to create a beautiful and fluid web page.</strong>
</p>
<br/>

---

<p align="center">
  <img src="rwd/quote.jpg" alt="Every person, no matter what screen they are on, deserves a great user experience." style="max-width: min(100%, 700px)"/>
</p>

---

## Basic Design Principles

What makes a good design? A good design should attract attention. Make it interesting and have a clear message that is present throughout the design. Have a consistent balance in margins and paddings to allow the eye to flow down the page. Then, when we break the rules (yes, there's a time to break the rules), it really makes a statement. There are 3 basic principles that I follow when creating responsive design. I start with the mobile design of the page, then create fluid grids and use relative units, and then add in media queries to adapt my layouts. 

### Mobile First Design

By starting with the mobile view of a website, we can see what is actually necessary for the design and clutter that needs to be cut out. The layout is usually simpler and allows us to visualize the content at a small scale. Mobile sites also tend to have more usability issues with touch inputs and swiping. By starting with the mobile view, we can address these issues before they become a problem. 

### Fluid Grids & Relative Units

Using modern CSS tools, we can create grids that flow as a screen gets larger. We take advantage of the powers of Flexbox and Grid to their full potential. Along with those, we use relative units throughout our design. Instead of basing everything on the inflexible pixel, we can use a range of units like vw, vh, rems, ems, ch, and percentages that create a fluid page that looks great on any device. 

### Media Queries

There are **far** too many screen sizes today to worry about creating a design for each screen. With mobile first design, media queries are only used to adapt the layouts. By using a breakpoint only when an element needs to be adapted, rather than the size of the users screen, we reduce the amount of media queries and create a more fluid page. I write all of my base css to style the mobile view of the page and then use a `min-width: 768px` and `min-width: 1024px` breakpoints to change the grids in certain elements. This means less code I have to write and a more beautiful page. 

---

## Flexbox vs Grid

A question that keeps getting asked is should I use Flexbox or Grid? The answer is both! We should stop thinking about them as if we are choosing between frameworks like bootstrap or tailwind. Think about the pattern you need for the layout and use them in conjunction with one another. Flexbox is a one-dimensional system, it works either in a column or a row but not both. They are content-first and work well when distributing space and aligning content. Grid is two-dimensional working in both rows and columns. It is layout-first and works well on large scale layouts that aren't linear. Grid also allows you to define areas and the relationship between them. You can even next a grid in a flex container or the other way around. 

> **Which layout method do you use the most?**<br/>
> a. CSS Grid<br/>
> b. Flexbox<br/>
> c. Tables<br/>
> d. Floats

---

## Grid Basics

What happens when we put `display: grid` on an element? At first glance, it looks like nothing changed. Well, that's because it is shorthand for `display: block grid`. There is a lesser used rule, `display: inline-grid` that would create an inline grid that is only the width of the content inside of it. Just by using `display: grid` on an item makes it a grid container and we get access to all the other grid properties. Plus it makes all of the children grid items that become part of the grid layout. At this point, we just have an **implicit** grid. To create a layout, we would need to define some columns and rows. By using `grid-template-rows` and `grid-template-columns` we can explicitly define that layout of the grid we want. Anything that falls outside of that, is still going to follow that implicit grid.

<iframe height="265" style="width: 100%;" scrolling="no" title="CSS Grid Starter" src="https://codepen.io/bdesigned/embed/OJXXyvN?height=265&theme-id=light&default-tab=css,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/bdesigned/pen/OJXXyvN'>CSS Grid Starter</a> by bDesigned
  (<a href='https://codepen.io/bdesigned'>@bdesigned</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


### Gap

Gap allows us to define the spacing or gutters between the items. The `gap` property, previously `grid-gap`, was renamed since it was added to the Flexbox spec as well. It can be defined for both rows and columns with `gap` or used as `row-gap` and `column-gap` to differentiate between the two.

### Placement

Placement in grid at first glance can seem complicated, but let's break it down. There are two base properties for each axis, `justify` and `align`, then `content` places the container, and `items` places each grid item. The `justify` property is along the inline axis, or horizontal in grid. The `align` property is along the block axis, or vertical in grid. We can then combine `justify-content` and `justify-items` to place either the grid container or each item along the horizontal axis. Also, `align-content` and `align-items` can be used to place the container or each item along the vertical axis. Here's a list to visualize it.

- &#x25FE; **`justify-content`** - places the container along the inline axis, horizontal in grid. Options are start, end, center, stretch, or space-around.
- &#x25FE; **`justify-item`** - places each item/child along the inline axis, horizontal in grid. Options are start, end, center, or stretch.
- &#x25FE; **`align-content`** - places the container along the block axis, vertical in grid. Options are start, end, center, stretch, or space-around.
- &#x25FE; **`align-items`** - places each item/child along the block axis, vertical in grid. Options are start, end, center, or stretch.

If you want to place the container or items into the same place along both axes, the shortcut `place-content` or `place-items` can be used. For example, putting `place-items: center` on the grid will perfectly center each grid item and `place-content: center` would center the container based on the width and the height.

### Self

Along with placing the entire grid container or the items as a whole, each child or grid item can define where it should be placed in the grid with `justify-self` or `align-self`.

```css
.grid {
  display: grid;
  gap: 1rem;
}

.grid-item {
  /* place at the end of the inline/horizontal axis */
  justify-self: end;
  /* place at the end of the block/vertical axis */
  align-self: end;
}
```

There is also the ability to span a grid item across grid columns or rows. 

```css
.col12 {
  /* span across 12 columns */
  grid-column: span 12;
  /* span down 2 rows */
  grid-row: span 2;
}

.col6 {
  grid-column: span 6;
}

.col4 {
  grid-column: span 4;
  grid-row: span 2;
}

.col2 {
  grid-column: span 2;
}
```

### Explicit Grid

Everything we have talked about so far has fallen into the **implicit** grid, we never defined what we wanted our grid to look like. The properties that do this are `grid-template-columns` and `grid-template-rows`.



</div>