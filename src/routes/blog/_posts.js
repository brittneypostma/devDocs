// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

const posts = [
  {
    title: "HTML",
    slug: "html",
    html: `
		<iframe height="450" style="width: 100%; resize: both;" scrolling="no" title="yLBxMNg" src="//codepen.io/sballgirl11/embed/yLBxMNg/?height=464&theme-id=dark&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/sballgirl11/pen/yLBxMNg/'>yLBxMNg</a> by Brittney
  (<a href='https://codepen.io/sballgirl11'>@sballgirl11</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe><br/>
			<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element" rel="noopener noreferrer" target="_blank">MDN HTML Tags</a>
			<br/>
			<a href="https://web.stanford.edu/group/csp/cs21/htmlcheatsheet.pdf" rel="noopener noreferrer" target="_blank">HTML Cheat 	sheet by Stanford University</a>
			<p>HTML, HyperText Markup Language, is a markup language that lays out the structure of your content.</p>
			
			<h2>Getting started with a HTML document</h2>
			<a href="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics" rel="noopener noreferrer" target="_blank">MDN HTML Document</a>
		
			<p>In Visual Studio Code, you can press ! and enter to get a boilerplate HTML template to start with.</p>
			
			<hr/>

<h2>Basic Tags</h2>
			
				<pre><code>&lt;!DOCTYPE html&gt;</code></pre><dfn> is required at the beginning of every HTML document.</dfn><br/>
				<pre><code>&lt;html&gt; &lt;/html&gt;</code></pre><dfn> wraps all of the content on the entire page and can be referred to as the root element.</dfn><br/>
				<pre><code>&lt;head&gt; &lt;/head&gt;</code></pre><dfn> is a container for metadata on the site used for SEO, title, styling tags, any script tags that are needed to run the page, and others.</dfn><br/>
				<pre><code>&lt;link rel="" href=""&gt;</code></pre><dfn> specifies the relationship between the current HTML document and an external resource, like a stylesheet or icon. The rel attribute takes the type of link you are importing, such as stylesheet, and the href attribute is the location of the link relative to the current file.</dfn><br/>
				<pre><code>&lt;meta charset="utf-8"&gt;</code></pre><dfn> sets the default character set for your page and includes most characters from many written languages.</dfn><br/>
				<pre><code>&lt;title&gt; &lt;/title&gt;</code></pre><dfn> sets the title of your page, which appears in the browser tab your page is loaded in.</dfn><br/>
				<pre><code>&lt;style&gt; &lt;/style&gt;</code></pre><dfn> allows you to add css directly into your html without linking an outside css file.</dfn><br/>
				<pre><code>&lt;body&gt; &lt;/body&gt;</code></pre><dfn> is a container for everything your user sees on the page.</dfn><br/>
				<pre><code>&lt;script&gt; &lt;/script&gt;</code></pre><dfn> tags are where javascript is written or linked and can be placed at the bottom, before the closing body tag, so that they do not block the rendering of the html.</dfn><br/>
			
			<hr/>
			<h2>Sectioning Tags</h2>
			
				<pre><code>&lt;address&gt; &lt;/address&gt;</code></pre><dfn> formats the contact information correctly for an address or a person or company.</dfn><br/>
				<pre><code>&lt;article&gt; &lt;/article&gt;</code></pre><dfn> is used for self-contained posts that are from newspapers, magazines, forums, etc.</dfn><br/>
				<pre><code>&lt;aside&gt; &lt;/aside&gt;</code></pre><dfn> content is indirectly related to the content of the page</dfn><br/>
				<pre><code>&lt;div&gt; &lt;/div&gt;</code></pre><dfn> generic container element for flow of the page.</dfn><br/>
				<pre><code>&lt;header&gt; &lt;/header&gt;</code></pre><dfn> specifies the introductory content, such as a logo, navigation bar, search, and others.</dfn><br/>
				<pre><code>&lt;nav&gt; &lt;/nav&gt;</code></pre><dfn> is the section where the navigation links are placed.</dfn><br/>
				<pre><code>&lt;main&gt; &lt;/main&gt;</code></pre><dfn> is where the main content of your document lies.</dfn><br/>
				<pre><code>&lt;section&gt; &lt;/section&gt;</code></pre><dfn> allows you to group your content into sections that are related.</dfn><br/>
				<pre><code>&lt;footer&gt; &lt;/footer&gt;</code></pre><dfn> is usually located at the bottom of the page and typically contains information about the author, copyright data, or links.</dfn><br/>
				<pre><code>&lt;h1&gt; &lt;/h1&gt;</code></pre><dfn> are section heading tags and go from h1 being the largest or highest section to h6 being the smallest or lowest heading.</dfn><br/>
			
			<hr/>
			<h2>Text Content Tags</h2>
			
				<pre><code>&lt;blockquote&gt; &lt;/blockquote&gt;</code></pre><dfn> indicated an extended quotation. A cite attribute may be added to link a source URL.</dfn><br/>
				<pre><code>&lt;dd&gt; &lt;/dd&gt;</code></pre><dfn> gives the description, definition, or value of the previous term, used with dl (definition list tag) and a dt (definition term) tag.</dfn><br/>
				<pre><code>&lt;figcaption&gt; &lt;/figcaption&gt;</code></pre><dfn> is a caption or legend describing the content before it (the parent container).</dfn><br/>
				<pre><code>&lt;figure&gt; &lt;/figure&gt;</code></pre><dfn> is self-contained content that can include a figcaption element below it.</dfn><br/>
				<pre><code>&lt;hr&gt; &lt;/hr&gt;</code></pre><dfn> stands for horizontal rule and creates a line horizontally across the page to break up the content.</dfn><br/>
				<pre><code>&lt;li&gt; &lt;/li&gt;</code></pre><dfn> is used inside of and ol or  ul tag to represent and item in a list.</dfn><br/>
				<pre><code>&lt;ol&gt; &lt;/ol&gt;</code></pre><dfn> is an ordered list tag that wraps the list items (li tag) by numbering them.</dfn><br/>
				<pre><code>&lt;p&gt; &lt;/p&gt;</code></pre><dfn> stands for paragraph tag to wrap your paragraph text in.</dfn><br/>
				<pre><code>&lt;pre&gt; &lt;/pre&gt;</code></pre><dfn> preformatted text which is presented exactly as written inside the HTML file.</dfn><br/>
				<pre><code>&lt;ul&gt; &lt;/ul&gt;</code></pre><dfn> is an unordered list tag that wraps the list items (li tag) without numbering them, default styling is bullet points.</dfn><br/>
			
			<hr/>
			<dfn></dfn>
			<h2>Inline Text Tags</h2>
			
				<pre><code>&lt;a href=""&gt; &lt;/a&gt;</code></pre><dfn> stands for anchor element and creates a hyperlink to another place.  The href attribute is used to add the location relative to the HTML file.</dfn><br/>
				<pre><code>&lt;abbr&gt; &lt;/abbr&gt;</code></pre><dfn> is an abbreviation or acronym and has an optional title attribute than can a description for the abbreviation.</dfn><br/>
				<pre><code>&lt;br /&gt;</code></pre><dfn> adds a line break into the document.</dfn><br/>
				<pre><code>&lt;code&gt; &lt;/code&gt;</code></pre><dfn> styles the content in a way that indicates it is machine or computer code.</dfn><br/>
				<pre><code>&lt;i&gt; &lt;/i&gt;</code></pre><dfn> italic text typically text that is set off from the normal text.</dfn><br/>
				<pre><code>&lt;kbd&gt; &lt;/kbd&gt;</code></pre><dfn> Keyboard Input element is a span of inline text indicating user input from a keyboard, voice input, or other text entry device.</dfn><br/>
				<pre><code>&lt;mark&gt; &lt;/mark&gt;</code></pre><dfn> marked or highlighted text.</dfn><br/>
				<pre><code>&lt;q&gt; &lt;/q&gt;</code></pre><dfn> short inline quote, usually styled with quotes surrounding the text.</dfn><br/>
				<pre><code>&lt;s&gt; &lt;/s&gt;</code></pre><dfn> strike-through element adds a line through the text.</dfn><br/>
				<pre><code>&lt;small&gt; &lt;/small&gt;</code></pre><dfn> side-comments or small print, such as copyright or legal text.</dfn><br/>
				<pre><code>&lt;span&gt; &lt;/span&gt;</code></pre><dfn> generic container for grouping elements for styling purposes.</dfn><br/>
				<pre><code>&lt;strong&gt; &lt;/strong&gt;</code></pre><dfn> indicated the content has a strong importance and is usually rendered in bold type.</dfn><br/>
				<pre><code>&lt;sub&gt; &lt;/sub&gt;</code></pre><dfn> subscript type for typographical content.</dfn><br/>
				<pre><code>&lt;sup&gt; &lt;/sup&gt;</code></pre><dfn> superscript type for typographical content.</dfn><br/>
				<pre><code>&lt;tt&gt; &lt;/tt&gt;</code></pre><dfn> styles the text in the default monospace font face.</dfn><br/>
				<pre><code>&lt;var&gt; &lt;/var&gt;</code></pre><dfn> is a Variable Element and formats the content to stand out in a mathematical expression or programming content.</dfn><br/>
				<pre><code>&lt;wbr&gt; &lt;/wbr&gt;</code></pre><dfn> allows you to place a word break within your text, where the browser may not break a line at that location.</dfn><br/>
			
			<hr/>
			<h2>Image and multimedia Tags</h2>
				<pre><code>&lt;audio src=""&gt; &lt;/audio&gt;</code></pre><dfn> used to embed sound content with a source tag or an src attribute with the location of the file.</dfn><br/>
				<pre><code>&lt;img src="" alt="" /&gt;</code></pre><dfn> embeds an image with a src attribute with the location of the file.</dfn><br/>
				<pre><code>&lt;track&gt; &lt;/track&gt;</code></pre><dfn> is used with audio and video tags to specify timed text tracks.</dfn><br/>
				<pre><code>&lt;video src=""&gt; &lt;/video&gt;</code></pre><dfn> embeds a media player for video playback with a source tag or an src attribute with the location of the file.</dfn><br/>
				<pre><code>&lt;iframe src=""&gt; &lt;/iframe&gt;</code></pre><dfn> embeds another HTML page into the current one.</dfn><br/>
				<pre><code>&lt;canvas src=""&gt; &lt;/canvas&gt;</code></pre><dfn> allows users to drag graphics and animations.</dfn><br/>
			</div>
			<hr/>
			<h2>Form Tags</h2>
				<pre><code>&lt;button&gt; &lt;/button&gt;</code></pre><dfn> is a clickable button, which can be used anywhere, but in forms the type attribute is added with "submit" to send the form.</dfn><br/>
				<pre><code>&lt;datalist&gt; &lt;/datalist&gt;</code></pre><dfn> contains a set of option elements that are available for other controls.</dfn><br/>
				<pre><code>&lt;fieldset&gt; &lt;/fieldset&gt;</code></pre><dfn> used to group controls and labels.</dfn><br/>
				<pre><code>&lt;form&gt; &lt;/form&gt;</code></pre><dfn> wraps the entire form content and has an action attribute that tells the server to "POST" the data among other options.</dfn><br/>
				<pre><code>&lt;input&gt; &lt;/input&gt;</code></pre><dfn> is an interactive area where the user can type into based on the attribute type given to the input; text, number, email, are just a few of the types available.</dfn><br/>
				<pre><code>&lt;label&gt; &lt;/label&gt;</code></pre><dfn> gives a caption or label for an item within the form.</dfn><br/>
				<pre><code>&lt;legend&gt; &lt;/legend&gt;</code></pre><dfn> a caption or label for fieldset element.</dfn><br/>
				<pre><code>&lt;meter&gt; &lt;/meter&gt;</code></pre><dfn> represents the data given in the attributes as a meter. Some attributes are min, max, low, high, value, to name a few.</dfn><br/>
				<pre><code>&lt;optgroup&gt; &lt;/optgroup&gt;</code></pre><dfn> groups options within a select element.</dfn><br/>
				<pre><code>&lt;option&gt; &lt;/option&gt;</code></pre><dfn> defines an item in a select, optgroup, or datalist element.</dfn><br/>
				<pre><code>&lt;output&gt; &lt;/output&gt;</code></pre><dfn> is a container where a calculation or output can be displayed.</dfn><br/>
				<pre><code>&lt;progress&gt; &lt;/progress&gt;</code></pre><dfn> is an indicator showing the completion progress, usually displayed as a progress bar.</dfn><br/>
				<pre><code>&lt;select&gt; &lt;/select&gt;</code></pre><dfn> provides a menu of options, used with option element.</dfn><br/>
				<pre><code>&lt;textarea&gt; &lt;/textarea&gt;</code></pre><dfn> is a multi-line, resizable text box that allows users to write a sizable amount of text like a comment.</dfn><br/>
			
			<hr/>
		`
  },

  {
    title: "CSS",
    slug: "css",
    html: `
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

		`
  },

  {
    title: "JavaScript",
    slug: "javascript",
    html: `
		<iframe
		height="450"
		style="width: 100%; resize: both;"
		scrolling="no"
		title="Javascript"
		src="https://codepen.io/sballgirl11/embed/rNBoKrd?height=265&theme-id=dark&default-tab=result"
	>
		See the Pen <a href="https://codepen.io/sballgirl11/pen/GRKYPpw/">Javascript</a> by Brittney (<a
			href="https://codepen.io/sballgirl11"
			>@sballgirl11</a
		>) on <a href="https://codepen.io">CodePen</a>. </iframe
	><br />
	
	<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" rel="noopener noreferrer" target="_blank">
		MDN JavaScript
	</a>
	
	<p>JavaScript is the verb of the internet, it powers anything that is an action.</p>
	<p>
		The easiest way to start using JavaScript is to open the console in your browser, in most browsers Ctrl+Shift+I will
		open it up and you can navigate to the console tab.
	</p>
	<p>In JavaScript, the \\ (backslash) character is reserved as an escape character.  If you use the backslash key, the key typed after that will be ignored.  This is useful when typing strings with multiple ' or ".
	
	<hr />
	<div style="display: grid; grid-template-columns: repeat (auto-fit, minmax(400px, 1fr));">
		<div style="display: grid;">
			<div>
				<h2>Types</h2>
				<h3>Primitive Data Types</h3>
				<div style="display: grid; margin-left: 2em;">
				<ul>
					<li style="list-style-type: decimal;">
					<strong>Boolean</strong> - true or false<br/>
					<pre><code>const bool1 = true;<br/>const bool2 = false;</code></pre>
					</li>
					<li style="list-style-type: decimal;"> 
					<strong>Null</strong> - explicitly nothing<br/>
					<pre><code>const nothing = null;</code></pre>
					</li>
					<li style="list-style-type: decimal;"> 
					<strong>Undefined</strong> - a variable that has no value.<br/>
					<pre><code>const undVar;<br/>console.log(undVar);<br/>//<em>undefined</em></code></pre>
					</li>
					<li style="list-style-type: decimal;"> 
					<strong>Number</strong> - numbers in JavaScript can be written with of without a decimal point and can also be Infinity or NaN (not a number).<br/>
					<pre><code>const num1 = 11;<br/>const num2 = 0.42;</code></pre>
					</li>
					<li style="list-style-type: decimal;"> 
					<strong>String</strong> - stores text inside double or single quotes or in template literals (\`).<br/>
					<pre><code>const str1 = 'I am string 1.';<br/>const str2 = "I am string 2."<br/>const str3 = \`I am string 3.\`;</code></pre>
					</li>
					<li style="list-style-type: decimal;"> 
					<strong>Symbol</strong> - an immutable primitive value that is unique, created by invoking the function Symbol. Symbols are guaranteed to be unique.
					Even if we create many symbols with the same description, they are different values.<br/>
					<pre><code>// here are two symbols with the same description,<br/>let Sym1 = Symbol("Sym");<br/>let Sym2 = Symbol("Sym");<br/>console.log(Sym1 == Sym2); // <em>returns "false"</em></code></pre>
					</li>
					<li style="list-style-type: decimal;"> 
					<strong>BigInt</strong> - a numeric data type that can represent integers in the arbitrary precision format.<br/>
					<pre><code>const x = 2n ** 53n;<br/>//<em>9007199254740992n</em></code></pre>
					</li>
				</ul>
			</div>
			<h3>Object Data Type</h3>
			<p>In JavaScript, almost "everything" can be an object.</p>
				<div style="margin-left: 2em;">
					<ul>
						<li style="list-style-type: square;">
							Booleans defined with the new keyword.
						</li>
						<li style="list-style-type: square;">
							Numbers defined with the new keyword.
						</li>
						<li style="list-style-type: square;">
							Strings defined with the new keyword.
						</li>
						<li style="list-style-type: square;">
							Dates are always objects.
						</li>
						<li style="list-style-type: square;">
							Math is always an object.
						</li>
						<li style="list-style-type: square;">
							Regular expressions are always objects.
						</li>
						<li style="list-style-type: square;">
							Arrays are always objects.
						</li>
						<li style="list-style-type: square;">
							Functions are always objects.
						</li>
						<li style="list-style-type: square;">
							Objects are always objects.
						</li>
					</ul>
				</div>
	
				<hr />
			</div>

			<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
			<div>
				<h2>Comparisons</h2>
				<p>
					In JavaScript a single = sign is for assigning values, so there are other ways to check for
					equality.
				</p>
				<div style="display: grid; margin-left: 2em;">
					<ul>
						<li style="list-style-type: square;">
							<pre><code>&gt;=</code></pre>
							<dfn> - is true if the left side is greater than or equal to the value or the right side.</dfn>
						</li>
						<li style="list-style-type: square;">
							<pre><code>&lt;=</code></pre>
							<dfn> - is true if the left side is less than or equal to the value or the right side. </dfn>
						</li>
						<li style="list-style-type: square;">
							<pre><code>&gt;</code></pre>
							<dfn> - is true if the left side is greater than the value or the right side.</dfn>
						</li>
						<li style="list-style-type: square;">
							<pre><code>&lt;</code></pre>
							<dfn> - is true if the left side is less than the value or the right side.</dfn>
						</li>
						<li style="list-style-type: square;">
							<pre><code>== or !=</code></pre>
							<dfn>
								- The equality and inequality operators convert the operands if they are not of the same
								type, then applies a strict comparison. Using these should be avoided, because JavaScript "guesses" what you want and changes the type of the input.
							</dfn>
						</li>
						<li style="list-style-type: square;">
							<pre><code>//=== or !==<br/>3 === '3'; //;<em>false</em><br/>3 === 3; //;<em>true</em><br/>3 !== 4; //;<em>true</em><br/>3 !== 3; //;<em>false</em></code></pre>
							<dfn>
								- The strict equality and inequality operators with no type conversion by JavaScript.  This is the correct way to compare values.
							</dfn>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<hr/>

		<div style="display: grid;">
			<div>
				<h2>Variables</h2>
				<p>
					In JavaScript variables can be assigned with 3 different types: var, let, and const, var and let values can be changed, but const values are constant and unchangeable. They can all be assigned to any of the JavaScript types.
				</p>
					<div style="display: grid; margin-left: 2em;">
					<ul>
						<li style="list-style-type: decimal;">
						<strong>var</strong> - declares a variable, optionally initializing it to a value and is function scoped (more on this later).<br/>
						<pre><code>var x;<br/>x = 11;<br/>var y = "this is a string named y"</code></pre>
						</li>
						<li style="list-style-type: decimal;"> 
						<strong>let</strong> - similar to var, except that it is scoped to the block ( { } ) that it is declared inside of, or block scoped.<br/>
						<pre><code>const nothing = null;</code></pre>
						</li>
						<li style="list-style-type: decimal;"> 
						<strong>const</strong> - declares a variable that cannot be changed and must be initialed to a value, it is also block scoped.<br/>
						<pre><code>const z = 'always the same';<br/>const a; //<em>Syntax error: missing initializer</em><br/>const name = 'Brittney';<br/>name = 'Mary' //<em>Uncaught TypeError: Assignment to constant variable.</em></code></pre>
						</li>
					</ul>
				</div>
				<h3>Naming Variables</h3>
				<p>All JavaScript variables must be identified with unique names. These unique names are called <strong>identifiers</strong>. Variables can be named anything, with a few contraints, but it is best practice to name the variables as descriptive to what they are as possible. Using something called camelCase is also best practice. The first word is lowercased and any word after the first letter would be uppercased (myName or numberOfTimes).</p>
				<p>The general rules for constructing names for variables (unique identifiers) are:</p>
				<div style="margin-left: 2em;">
					<ul>
						<li style="list-style-type: square;">
							Names must begin with a letter, an underscore (_) or a dollar sign ($).
						</li>
						<li style="list-style-type: square;">
							Names can only contain letters, numbers, underscores, or dollar signs.
						</li>
						<li style="list-style-type: square;">
							Names cannot contain spaces.
						</li>
						<li style="list-style-type: square;">
							Names are case sensitive ( y is not Y).
						</li>
					</ul>
				</div>
			</div>
		</div>


		</div>
	</div>
	

	

		`
    // },
    // {
    // 	title: 'Svelte',
    // 	slug: 'why-the-name',
    // 	html: `
    // 		<p>In war, the soldiers who build bridges, repair roads, clear minefields and conduct demolitions — all under combat conditions — are known as <em>sappers</em>.</p>

    // 		<p>For web developers, the stakes are generally lower than those for combat engineers. But we face our own hostile environment: underpowered devices, poor network connections, and the complexity inherent in front-end engineering. Sapper, which is short for <strong>S</strong>velte <strong>app</strong> mak<strong>er</strong>, is your courageous and dutiful ally.</p>
    // 	`,
    // },
    // {
    // 	title: 'React',
    // 	slug: 'why-the-name',
    // 	html: `
    // 		<p>In war, the soldiers who build bridges, repair roads, clear minefields and conduct demolitions — all under combat conditions — are known as <em>sappers</em>.</p>

    // 		<p>For web developers, the stakes are generally lower than those for combat engineers. But we face our own hostile environment: underpowered devices, poor network connections, and the complexity inherent in front-end engineering. Sapper, which is short for <strong>S</strong>velte <strong>app</strong> mak<strong>er</strong>, is your courageous and dutiful ally.</p>
    // 	`,
    // },
    // {
    // 	title: 'Gatsby',
    // 	slug: 'why-the-name',
    // 	html: `
    // 		<p>In war, the soldiers who build bridges, repair roads, clear minefields and conduct demolitions — all under combat conditions — are known as <em>sappers</em>.</p>

    // 		<p>For web developers, the stakes are generally lower than those for combat engineers. But we face our own hostile environment: underpowered devices, poor network connections, and the complexity inherent in front-end engineering. Sapper, which is short for <strong>S</strong>velte <strong>app</strong> mak<strong>er</strong>, is your courageous and dutiful ally.</p>
    // 	`,
  }
];

posts.forEach(post => {
  post.html = post.html.replace(/^\t{3}/gm, "");
});

export default posts;
