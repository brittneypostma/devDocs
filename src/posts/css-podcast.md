---
title: CSS Podcast
image: ./logos/css-podcast.png
---

<div class="post">
<div id="toc">
<p style="font-weight: bold; font-size: 25px;">Table of Contents</p>

- [Episode One: The Box Model](#episode-one-the-box-model)
    - [Episode Links](#episode-links)
  - [Intrinsic vs Extrinsic Sizing](#intrinsic-vs-extrinsic-sizing)
  - [Boxes Everywhere](#boxes-everywhere)
  - [User Agent Stylesheet](#user-agent-stylesheet)
  - [Scrollbars](#scrollbars)
- [Episode Two: Selectors](#episode-two-selectors)
    - [Episode Links](#episode-links-1)
  - [Simple Selectors](#simple-selectors)
- [Episode Three: Specificity](#episode-three-specificity)
    - [Episode Links](#episode-links-2)
  - [Game Time](#game-time)
</div>

<div id="main">
<p align="center">
  <img src="css-podcast/banner.png" alt="CSS Podcast banner" width="100%">
</p>

[CSS Podcast](https://thecsspodcast.libsyn.com/)

## Episode One: The Box Model

#### Episode Links
[CSS Tricks Box Model](https://css-tricks.com/the-css-box-model/)<br/>
[W3C Box Model Module](https://www.w3.org/TR/css-box-3/)<br/>
[Adam's Box Model Codepen](https://codepen.io/argyleink/pen/bGNmgGW)<br/><br/>

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

---

## Episode Two: Selectors

#### Episode Links
[CSS Tricks Selectors](https://css-tricks.com/how-css-selectors-work/)<br/>
[W3C Selectors](https://www.w3.org/TR/selectors-3/)<br/><br/>

<p align="center">
  <img src="css-podcast/skeletor.gif" alt="Skeletor laughing" width="50%">
</p>
<h4 style="text-align: center;">Selec-tors</h4>

Selectors are a syntax used to find elements (aka subjects)in the DOM tree. CSS then uses the selector to bind the styles to subjects. A CSS **rule** consists of the selector and all the style declarations applied to it. They can be combined together into **compound selectors** to create more specific rules or be defined singularly.

### Simple Selectors

- **Universal Selector** - The most general selector will add styles to every element in a document. It is represented by an asterisk `(*)`. 
- **Type Selectors** - A base element in the DOM is considered a type selector. Eg. `div, p, img`
- **Class Selectors** - The most versatile selector because they are well supported, can be added to any element, and can have each element can have multiple classes. Most commonly used with period notation or full stop `(.)`.
- **ID Selector** - There should be only one id selector per document and is the strongest, most specific selector. It is represented by the hashtag or pound `(#)`. An element can have stacked or multiple ids on it and the same id can also be repeated on an element for a quirky specificity hack.
- **Attribute Selectors** - Have the same specificity value as classes, but add functionality by having the attribute plus a value you can select by. These attributes can be elements, classes, data, languages, or even with regex, plus many more.
- **Pseudo Selectors** - These come in 2 forms pseudo-elements and pseudo-classes. A **pseudo-element** is a structural selector, targeting things around a DOM element usually with `::before` or `::after`. A **pseudo-class** targets more dynamically or states based on the DOM, but cannot be expressed with simple selectors. Some examples are `:nth-child()`, `last-child`, `:hover`, `:active`.
- **Complex Selectors** - Look for a relationship between elements. It has a cascade downward, descendant, relationship where the parent cannot be styled, but the children and siblings can. Different types of **combinators** describe the relationship between the selectors. 
  - **Descendent combinator** - These can look like `ul li` which would apply the styles only to list items in an unordered list. This also gets applied recursively or on top of one another. So, if an unordered list with an indentation had another unordered list inside of it, then it would be indented twice as much.
  - **Child combinator** - This type of combinator breaks up the recursive nature of the descendent relationship. It is made with a greater than `(>)`, like `ul>li` and this will only target the first unordered list.
  - **Sibling combinator** - Also known as the next sibling combinator, applies to the next sibling of the first element. It is made with a plus `(+)`, like `div+p` would target a paragraph tag next to a div, not within in. They are adjacent to each other under the same parent. A popular use of this is the **lobotomized owl** created by [Heydon Pickering](https://alistapart.com/article/axiomatic-css-and-lobotomized-owls/), and it only selects elements that have a sibling adjacent to them skipping the first of that type.

   ```css
    * + * {
      margin-top: 1.5em;
    }
    ```
 
  - **Subsequent-sibling combinator** - Often used to target the state of a check box. It is made with a tilde `(~)`, like `input[type=checkbox]:checked ~ div` would target the div adjacent and under the same parent as the check box.
 
  

---

## Episode Three: Specificity

<p align="center">
  <img src="css-podcast/specificity.jpg" alt="specificity meme">
</p>

#### Episode Links
[Diagram by Estelle Weyl](http://specifishity.com)<br/>
[Specificity Calculator](https://specificity.keegan.st)<br/><br/>

What happens when a subject is being targeted by multiple rules? The rule with the highest amount of points, or specificity, wins out. Specificity is how the browser decides which styles should be applied to an item. A weight or in this example points are given to each selector based on their ranking of least to most specific. Here's the game, we start at 0 and add up the number of points for each selector. If there is a tie, the last rule in the stylesheet wins. And no cheating by duplicating extra classes to your css 😜!

| Points   |   Selectors   |
|----------|---------------|
| 0        |  Universal/Not **`*`**/**`:not`**  |
| 1        | Element/Pseudo-element **`h1`**/**`::before`** |
| 10       |   Class/Pseudo-class **``.**/**`:focus`**   |
| 100      | ID **`#`** |
| 1000     |   Inline **`style`**   |

### Game Time

- 1\. *
- 2\. p
- 3\. main .header
- 4\. #nav ul li
- 5\. a:active
- 6\. a:not(:active)
- 7\. article a.outbound:not(:visited)
- 8\. a.lol.lol.lol.lol

Check your scores in the [specificity calculator](https://specificity.keegan.st). How did you do? Hopefully, this article helped you learn a little more about how to calculate specificity and apply it in your CSS!





</div>
