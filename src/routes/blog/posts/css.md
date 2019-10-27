---
title: CSS
date: 09/15/2019
---

<div>
		<iframe height="450" style="width: 100%; resize: both;" scrolling="no" title="CSS" src="//codepen.io/sballgirl11/embed/GRKYPpw/?height=265&theme-id=dark&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/sballgirl11/pen/GRKYPpw/'>CSS</a> by Brittney
  (<a href='https://codepen.io/sballgirl11'>@sballgirl11</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

    	<a href="https://developer.mozilla.org/en-US/docs/Web/CSS" rel="noopener noreferrer" target="_blank">MDN CSS</a>
    	<br/>
    	<a href="https://css-tricks.com/" rel="noopener noreferrer" target="_blank">CSS Tricks</a>
    	<p>CSS, Cascading Style Sheet, is used to describe how elements should be rendered to users.</p>
    	<p>CSS can be implemented in several ways.  Inline styling, inside the style tag of an HTML document, or in an external stylesheet.</p>

<hr/>
<div style="display: grid; grid-template-columns: repeat (auto-fit, minmax(400px, 1fr));">
<h2>Identify Elements</h2>
<p>There are multiple ways to tell the browser how to "find" the elements you want to style.</p>
<p>Here are some examples.</p>
<div style="padding-left: 2em;">
	<ul>
	<div>
	
		<li style="list-style-type: square;"><h3>Element Names</h3></li>
		<p>
			Just using an HTML elements tag name is one of the simplest ways to add styling to an element. An
			example is:
		</p>
		<pre><code>div { *<em>styles for all div tags go here</em>* } 
p {*<em>styles for paragraph tags go here</em>* }</code></pre>
	</div>
	<div style="margin: 0.5em;">
		<li style="list-style-type: square;"><h3>Class Selector</h3></li>
		<p>
			Classes are probably the most common selector given to elements, because they are reusable. <br/>You can have one css style for a certain class and give it to as many elements as you want.
		</p>
		<pre><code>&lt;div class="my-div"&gt;Style the div tag by applying the class "my-div" to it.&lt;/div></code></pre>
		<p>Then, in the css styles to use a class, you start it with a period and then the name of the class:</p>
		<pre><code>.my-div { *<em>styles for class my-div go here</em>* }</code></pre>
	</div>
	<div style="margin: 0.5em;">
		<li style="list-style-type: square;"><h3>ID Selector</h3></li>
		<p>
			IDs should only be given to a single element in the HTML and are the most specific of the simple selectors.
		</p>
		<pre><code>&lt;div id="this-div"&gt;Style the div tag by applying the id "this-div" to it.&lt;/div&gt;</code></pre>
		<p>Then, in the css styles to use an id, you start it with a hash (#) and then the name of the id:</p>
		<pre><code>#this-div { *<em>styles for class my-div go here</em>* }</code></pre>
	</div>
	</ul>
</div>
</div>
<hr/>
	<div>
		<h2>Selectors</h2>
			<p>CSS selectors tell the browser which HTML element you want to style.</p>
			<p>There are 5 types of selectors.</p>
			<ol>
			<li>1. Simple selectors (element name, class, or id)<br/>
				<div style="margin-left: 1em"><pre><code>div {*<em>styles</em>*} .my-div {*<em>styles</em>*} #this-div {*<em>styles</em>*}</code></pre></div></li>
			<li>2. Combination selectors (relationship between multiple elements)<br/>
			<div style="margin-left: 1em"><pre><code>.my-div p {*<em>styles only paragraphs with a parent container with a class of my-div</em>*}</code></pre></div></li>
			<li>3. Pseudo-class selectors (state of an element)<br/>
			<div style="margin-left: 1em"><pre><code>a:hover {*<em>styles the anchor link when it is hovered over</em>*} li:nth-child(even) {*<em>styles every other list element</em>*}</code></pre></div></li>
			<li>4. Pseudo-elements selectors (a piece of an element)<br/>
			<div style="margin-left: 1em"><pre><code>h1::before {content: "-"; *<em>styles before the h1 with a -</em>*} h1::after{content: "-"; *<em>styles after the h1 with a -</em>*}</code></pre></div></li>
			<li>5. Attribute selectors (an element with an attribute)<br/>
			<div style="margin-left: 1em"><pre><code></code>h1[title] {*<em>styles only h1s with a title element</em>*}</pre></div></li>
		</ol>
	</div>
	<div>
	<hr/>
		<h2>Specificity</h2>
			<p>If there are conflicting selectors in your CSS, the browser follows some standards to choose which rule to use.  This is called <strong><em>specifity</em></strong>.</p>
			<p>There are 4 categories that define the level of specificity for selectors ranging from most specific to least specific.</p>
			<ol>
			<li>1. Inline styles</li>
			<li>2. IDs</li>
			<li>3. Classes, attributes, and psuedo-classes</li>
			<li>4. Elements and pseudo-elements</li>
		</ol>
	</div>
	<div>
	<hr/>
		<h2>CSS Grid vs Flexbox</h2>
			<ol>
				<li style="list-style-type: decimal;">CSS Grid Layout is a two-dimensional system, meaning it can handle both columns and rows, unlike flexbox which is largely a one-dimensional system (either in a column or a row).</li>
				<li style="list-style-type: decimal;">A core difference between CSS Grid and Flexbox is that — <br/>CSS Grid’s approach is layout-first while Flexbox’ approach is content-first.
				If you are well aware of your content before making layout, then blindly opt for Flexbox and if not, opt for CSS Grid.</li>
				<li style="list-style-type: decimal;">Flexbox layout is most appropriate to the components of an application (as most of them are fundamentally linear), and small-scale layouts, while the Grid layout is intended for larger scale layouts which aren’t linear in their design.</li>
				<li style="list-style-type: decimal;">If you only need to define a layout as a row or a column, then you probably need flexbox. If you want to define a grid and fit content into it in two dimensions — you need the grid.</li>
			</ol>
			<div>
			<h3 style="text-align: center;">Where to learn and practice Flexbox and Grid</h3>
			<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); justify-items: center; align-content: center;">
			<div>
				<ol><h4>Flexbox</h4>
					<li><a href="https://flexbox.io/">What the FLEXBOX?! by Wes Bos</a></li>
					<li><a href="https://flexboxfroggy.com/">Flexbox Froggy</a></li>
					<li><a href="http://www.flexboxdefense.com/">Flexbox Defense</a></li>
					<li><a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">A Complete Guide to Flexbox by CSS Tricks</a></li>
				</ol>
			</div>
			<div>
				<ol><h4>Grid</h4>
					<li><a href="https://cssgrid.io/">CSS Grid by Wes Box</a></li>
					<li><a href="https://cssgridgarden.com/">CSS Grid Garden</a></li>
					<li><a href="https://gridbyexample.com/">Grid by Example by Rachel Andrew</a></li>
					<li><a href="https://css-tricks.com/snippets/css/complete-guide-grid/">A Complete Guide to Grid by CSS Tricks</a></li>
				</ol>
			</div>
		</div>
	</div>
</div>
