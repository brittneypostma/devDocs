---
title: CSS
date: 09/15/2019
---

<div style="max-width: 86vw">

<iframe height="450" style="width: 100%; resize: both;" scrolling="no" title="CSS" src="//codepen.io/sballgirl11/embed/GRKYPpw/?height=265&theme-id=dark&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">See the Pen <a href='https://codepen.io/sballgirl11/pen/GRKYPpw/'>CSS</a> by Brittney <a href='https://codepen.io/sballgirl11'>@sballgirl11</a> on <a href='https://codepen.io'>CodePen</a></iframe>

### Table of Contents

- [Identify Elements](#identify-elements)
  - [Element Names](#element-names)
  - [Class Selector](#class-selector)
  - [ID Selector](#id-selector)
- [Selectors](#selectors)
- [Specificity](#specificity)
- [CSS Grid vs Flexbox](#css-grid-vs-flexbox)
  - [Where to learn and practice Flexbox and Grid](#where-to-learn-and-practice-flexbox-and-grid)
    - [Flexbox](#flexbox)
    - [Grid](#grid)

---

[MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)  
[CSS Tricks](https://css-tricks.com/)

CSS, Cascading Style Sheet, is used to describe how elements should be rendered to users.

CSS can be implemented in several ways. Inline styling, inside the style tag of an HTML document, or in an external stylesheet.

---

## Identify Elements

There are multiple ways to tell the browser how to "find" the elements you want to style.

Here are some examples.

### Element Names

Just using an HTML elements tag name is one of the simplest ways to add styling to an element. An example is:

    div { *styles for all div tags go here* }
    p {*styles for paragraph tags go here* }

### Class Selector

Classes are probably the most common selector given to elements, because they are reusable.  
You can have one css style for a certain class and give it to as many elements as you want.

    <div class="my-div">Style the div tag by applying the class "my-div" to it.</div>

Then, in the css styles to use a class, you start it with a period and then the name of the class:

    .my-div { *styles for class my-div go here* }

### ID Selector

IDs should only be given to a single element in the HTML and are the most specific of the simple selectors.

    <div id="this-div">Style the div tag by applying the id "this-div" to it.</div>

Then, in the css styles to use an id, you start it with a hash (#) and then the name of the id:

    #this-div { *styles for class my-div go here* }

---

## Selectors

CSS selectors tell the browser which HTML element you want to style.

There are 5 types of selectors.

1.  1\. Simple selectors (element name, class, or id)



```css
div {*styles*} .my-div {*styles*} #this-div {*styles*}
```

    

2.  2\. Combination selectors (relationship between multiple elements)

```css
 .my-div p {*styles only paragraphs with a parent container with a class of my-div*}
``` 

3.  3\. Pseudo-class selectors (state of an element)

```css
a:hover {*styles the anchor link when it is hovered over*} li:nth-child(even) {*styles every other list element*}
```

4.  4\. Pseudo-elements selectors (a piece of an element)

```css
h1::before {content: "-"; *styles before the h1 with a -*} h1::after{content: "-"; *styles after the h1 with a -*}
```

5.  5\. Attribute selectors (an element with an attribute)

</div>

<div>

---

## Specificity

If there are conflicting selectors in your CSS, the browser follows some standards to choose which rule to use. This is called **_specifity_**.

There are 4 categories that define the level of specificity for selectors ranging from most specific to least specific.

1.  1\. Inline styles
2.  2\. IDs
3.  3\. Classes, attributes, and psuedo-classes
4.  4\. Elements and pseudo-elements

</div>

<div>

---

## CSS Grid vs Flexbox

CSS Grid Layout is a two-dimensional system, meaning it can handle both columns and rows, unlike flexbox which is largely a one-dimensional system (either in a column or a row). A core difference between CSS Grid and Flexbox is that — CSS Grid’s approach is layout-first while Flexbox’ approach is content-first. If you are well aware of your content before making layout, then blindly opt for Flexbox and if not, opt for CSS Grid. Flexbox layout is most appropriate to the components of an application (as most of them are fundamentally linear), and small-scale layouts, while the Grid layout is intended for larger scale layouts which aren’t linear in their design. If you only need to define a layout as a row or a column, then you probably need flexbox. If you want to define a grid and fit content into it in two dimensions — you need the grid.

### Where to learn and practice Flexbox and Grid

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));align-content: center;">

<div>

#### Flexbox

[What the FLEXBOX?! by Wes Bos](https://flexbox.io/)<br/>
[Flexbox Froggy](https://flexboxfroggy.com/)<br/>
[Flexbox Defense](http://www.flexboxdefense.com/)<br/>
[A Complete Guide to Flexbox by CSS Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

</div>

<div>

#### Grid

[CSS Grid by Wes Box](https://cssgrid.io/)<br/>
[CSS Grid Garden](https://cssgridgarden.com/)<br/>
[Grid by Example by Rachel Andrew](https://gridbyexample.com/)<br/>
[A Complete Guide to Grid by CSS Tricks](https://css-tricks.com/snippets/css/complete-guide-grid/)

</div>

</div>

</div>

</div>