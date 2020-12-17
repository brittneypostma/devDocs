---
title: HTML
image: ./logos/html.svg
---

<div class="post">
<div id="toc">

<p style="font-weight: bold; font-size: 25px;">Table of Contents</p>

- [HTML](#html)
- [Getting started with a HTML document](#getting-started-with-a-html-document)
- [Basic Tags](#basic-tags)
- [Sectioning Tags](#sectioning-tags)
- [Text Content Tags](#text-content-tags)
- [Inline Text Tags](#inline-text-tags)
- [Image and multimedia Tags](#image-and-multimedia-tags)
- [Form Tags](#form-tags)

  </div>

<div id="main">

## HTML

<p style="text-align: center;"><strong>
These are my notes while taking the <a href="https://academy.zerotomastery.io/p/complete-web-developer-zero-to-mastery?affcode=441520_gjue7n-1">The Complete Web Developer Zero to Mastery</a> course by Andrei Neagoie on ZTM Academy.</strong>
</p>
<br/>

<iframe height="450" style="width: 100%; resize: both; border: 1px solid #333;" scrolling="no" title="yLBxMNg" src="//codepen.io/sballgirl11/embed/yLBxMNg/?height=464&theme-id=dark&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/sballgirl11/pen/yLBxMNg/'>yLBxMNg</a> by Brittney
  (<a href='https://codepen.io/sballgirl11'>@sballgirl11</a>) on <a href='https://codepen.io'>CodePen</a>
</iframe>


## Getting started with a HTML document

[MDN HTML Document](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)<br/>
[HTML Cheat Sheet by Stanford University](https://web.stanford.edu/group/csp/cs21/htmlcheatsheet.pdf)

HTML, HyperText Markup Language, is a markup language that lays out the structure of your content.

In Visual Studio Code, you can press ! and enter to get a boilerplate HTML template to start with.

---

## Basic Tags

    <!DOCTYPE html>

<dfn>is required at the beginning of every HTML document.</dfn>

    <html> </html>

<dfn>wraps all of the content on the entire page and can be referred to as the root element.</dfn>

    <head> </head>

<dfn>is a container for metadata on the site used for SEO, title, styling tags, any script tags that are needed to run the page, and others.</dfn>

    <link rel="" href="">

<dfn>specifies the relationship between the current HTML document and an external resource, like a stylesheet or icon. The rel attribute takes the type of link you are importing, such as stylesheet, and the href attribute is the location of the link relative to the current file.</dfn>

    <meta charset="utf-8">

<dfn>sets the default character set for your page and includes most characters from many written languages.</dfn>

    <title> </title>

<dfn>sets the title of your page, which appears in the browser tab your page is loaded in.</dfn>

    <style> </style>

<dfn>allows you to add css directly into your html without linking an outside css file.</dfn>

    <body> </body>

<dfn>is a container for everything your user sees on the page.</dfn>

    <script> </script>

<dfn>tags are where javascript is written or linked and can be placed at the bottom, before the closing body tag, so that they do not block the rendering of the html.</dfn>

---

## Sectioning Tags

    <address> </address>

<dfn>formats the contact information correctly for an address or a person or company.</dfn>

    <article> </article>

<dfn>is used for self-contained posts that are from newspapers, magazines, forums, etc.</dfn>

    <aside> </aside>

<dfn>content is indirectly related to the content of the page</dfn>

    <div> </div>

<dfn>generic container element for flow of the page.</dfn>

    <header> </header>

<dfn>specifies the introductory content, such as a logo, navigation bar, search, and others.</dfn>

    <nav> </nav>

<dfn>is the section where the navigation links are placed.</dfn>

    <main> </main>

<dfn>is where the main content of your document lies.</dfn>

    <section> </section>

<dfn>allows you to group your content into sections that are related.</dfn>

    <footer> </footer>

<dfn>is usually located at the bottom of the page and typically contains information about the author, copyright data, or links.</dfn>

    <h1> </h1>

<dfn>are section heading tags and go from h1 being the largest or highest section to h6 being the smallest or lowest heading.</dfn>

---

## Text Content Tags

    <blockquote> </blockquote>

<dfn>indicated an extended quotation. A cite attribute may be added to link a source URL.</dfn>

    <dd> </dd>

<dfn>gives the description, definition, or value of the previous term, used with dl (definition list tag) and a dt (definition term) tag.</dfn>

    <figcaption> </figcaption>

<dfn>is a caption or legend describing the content before it (the parent container).</dfn>

    <figure> </figure>

<dfn>is self-contained content that can include a figcaption element below it.</dfn>

    <hr> </hr>

<dfn>stands for horizontal rule and creates a line horizontally across the page to break up the content.</dfn>

    <li> </li>

<dfn>is used inside of and ol or ul tag to represent and item in a list.</dfn>

    <ol> </ol>

<dfn>is an ordered list tag that wraps the list items (li tag) by numbering them.</dfn>

    <p> </p>

<dfn>stands for paragraph tag to wrap your paragraph text in.</dfn>

    <pre> </pre>

<dfn>preformatted text which is presented exactly as written inside the HTML file.</dfn>

    <ul> </ul>

<dfn>is an unordered list tag that wraps the list items (li tag) without numbering them, default styling is bullet points.</dfn>

---

## Inline Text Tags

    <a href=""> </a>

<dfn>stands for anchor element and creates a hyperlink to another place. The href attribute is used to add the location relative to the HTML file.</dfn>

    <abbr> </abbr>

<dfn>is an abbreviation or acronym and has an optional title attribute than can a description for the abbreviation.</dfn>

    <br />

<dfn>adds a line break into the document.</dfn>

    <code> </code>

<dfn>styles the content in a way that indicates it is machine or computer code.</dfn>

    <i> </i>

<dfn>italic text typically text that is set off from the normal text.</dfn>

    <kbd> </kbd>

<dfn>Keyboard Input element is a span of inline text indicating user input from a keyboard, voice input, or other text entry device.</dfn>

    <mark> </mark>

<dfn>marked or highlighted text.</dfn>

    <q> </q>

<dfn>short inline quote, usually styled with quotes surrounding the text.</dfn>

    <s> </s>

<dfn>strike-through element adds a line through the text.</dfn>

    <small> </small>

<dfn>side-comments or small print, such as copyright or legal text.</dfn>

    <span> </span>

<dfn>generic container for grouping elements for styling purposes.</dfn>

    <strong> </strong>

<dfn>indicated the content has a strong importance and is usually rendered in bold type.</dfn>

    <sub> </sub>

<dfn>subscript type for typographical content.</dfn>

    <sup> </sup>

<dfn>superscript type for typographical content.</dfn>

    <tt> </tt>

<dfn>styles the text in the default monospace font face.</dfn>

    <var> </var>

<dfn>is a Variable Element and formats the content to stand out in a mathematical expression or programming content.</dfn>

    <wbr> </wbr>

<dfn>allows you to place a word break within your text, where the browser may not break a line at that location.</dfn>

---

## Image and multimedia Tags

    <audio src=""> </audio>

<dfn>used to embed sound content with a source tag or an src attribute with the location of the file.</dfn>

    <img src="" alt="" />

<dfn>embeds an image with a src attribute with the location of the file.</dfn>

    <track> </track>

<dfn>is used with audio and video tags to specify timed text tracks.</dfn>

    <video src=""> </video>

<dfn>embeds a media player for video playback with a source tag or an src attribute with the location of the file.</dfn>

    <iframe src=""> </iframe>

<dfn>embeds another HTML page into the current one.</dfn>

    <canvas src=""> </canvas>

<dfn>allows users to drag graphics and animations.</dfn>

---

## Form Tags

    <button> </button>

<dfn>is a clickable button, which can be used anywhere, but in forms the type attribute is added with "submit" to send the form.</dfn>

    <datalist> </datalist>

<dfn>contains a set of option elements that are available for other controls.</dfn>

    <fieldset> </fieldset>

<dfn>used to group controls and labels.</dfn>

    <form> </form>

<dfn>wraps the entire form content and has an action attribute that tells the server to "POST" the data among other options.</dfn>

    <input> </input>

<dfn>is an interactive area where the user can type into based on the attribute type given to the input; text, number, email, are just a few of the types available.</dfn>

    <label> </label>

<dfn>gives a caption or label for an item within the form.</dfn>

    <legend> </legend>

<dfn>a caption or label for fieldset element.</dfn>

    <meter> </meter>

<dfn>represents the data given in the attributes as a meter. Some attributes are min, max, low, high, value, to name a few.</dfn>

    <optgroup> </optgroup>

<dfn>groups options within a select element.</dfn>

    <option> </option>

<dfn>defines an item in a select, optgroup, or datalist element.</dfn>

    <output> </output>

<dfn>is a container where a calculation or output can be displayed.</dfn>

    <progress> </progress>

<dfn>is an indicator showing the completion progress, usually displayed as a progress bar.</dfn>

    <select> </select>

<dfn>provides a menu of options, used with option element.</dfn>

    <textarea> </textarea>

<dfn>is a multi-line, resizable text box that allows users to write a sizable amount of text like a comment.</dfn>


</div>