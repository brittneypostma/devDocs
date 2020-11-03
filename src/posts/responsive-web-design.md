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

There are **far** too many screen sizes today to worry about creating a design for each screen. With mobile first design, media queries are only used to adapt the layouts. By using a breakpoint only when an element needs to be adapted, rather than the size of the users screen, we reduce the amount of media queries and create a more fluid page. This means less code we have to write and a more beautiful page.

</div>