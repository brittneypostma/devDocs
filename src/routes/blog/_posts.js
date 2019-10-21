// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

const posts = [
	{
		title: 'HTML',
		slug: 'html',
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
		`,
	},

	{
		title: 'CSS',
		slug: 'css',
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

		`,
	},

	{
		title: 'JavaScript',
		slug: 'javascript',
		html: `
		<iframe
		height="525"
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

	<p>In JavaScript, the \\ (backslash) character is reserved as an escape character.  If you use the backslash key, the key typed after that will be ignored.  This is useful when typing strings with multiple ' or ".</p>

	<p>JavaScript can either be put inside of a tag in the HTML file or can be linked to an external file where the src is the location of the file relative to the HTML file you are in.</p>
	<div style=" display: flex;">
		<div style="margin-right: 0.5em;"><pre><code>&lt;script&gt; *<em>JavaScript goes here</em>* &lt;/script&gt;</code></pre></div><div><pre><code>&lt;script&gt; type="text/javascript" src="script.js" &lt;/script&gt;</code></pre></div>
	</div>

	<p>Because HTML is read synchronously, from top to bottom, it is best practice to put your script tags at the bottom of the HTML file just before the closing body (&lt;/body&gt;) tag.

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
					<strong>Undefined</strong> - a variable that has no value or has yet to be assigned.<br/>
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


	<div style="display: grid;">
		<div style="display: grid;">
			<div>
				<h2>Keywords</h2>
				<h3 style="text-align: center;">JavaScript Reserved Words</h3>
				<div style="display: grid; margin-left: 2em;">
				<table>
				<tr>
				<td>abstract</td>
				<td>arguments</td>
				<td>await</td>
				<td>boolean</td>
				</tr>
				<tr>
				<td>break</td>
				<td>byte</td>
				<td>case</td>
				<td>catch</td>
				</tr>
				<tr>
				<td>char</td>
				<td>class</td>
				<td>const</td>
				<td>continue</td>
				</tr>
				<tr>
				<td>debugger</td>
				<td>default</td>
				<td>delete</td>
				<td>do</td>
				</tr>
				<tr>
				<td>double</td>
				<td>else</td>
				<td>enum</td>
				<td>eval</td>
				</tr>
				<tr>
				<td>export</td>
				<td>extends</td>
				<td>false</td>
				<td>final</td>
				</tr>
				<tr>
				<td>finally</td>
				<td>float</td>
				<td>for</td>
				<td>function</td>
				</tr>
				<tr>
				<td>goto</td>
				<td>if</td>
				<td>implements</td>
				<td>import</td>
				</tr>
				<tr>
				<td>in</td>
				<td>instanceof</td>
				<td>int</td>
				<td>interface</td>
				</tr>
				<tr>
				<td>let</td>
				<td>long</td>
				<td>native</td>
				<td>new</td>
				</tr>
				<tr>
				<td>null</td>
				<td>package</td>
				<td>private</td>
				<td>protected</td>
				</tr>
				<tr>
				<td>public</td>
				<td>return</td>
				<td>short</td>
				<td>static</td>
				</tr>
				<tr>
				<td>super</td>
				<td>switch</td>
				<td>synchronized</td>
				<td>this</td>
				</tr>
				<tr>
				<td>throw</td>
				<td>throws</td>
				<td>transient</td>
				<td>true</td>
				</tr>
				<tr>
				<td>try</td>
				<td>typeof</td>
				<td>var</td>
				<td>void</td>
				</tr>
				<tr>
				<td>volatile</td>
				<td>while</td>
				<td>with</td>
				<td>yield</td>
				</tr>
				</table>
				</div>
			</div>
		</div>
	</div>
				<hr />

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
				<p>All JavaScript variables must be identified with unique names. These unique names are called <strong>identifiers</strong>. Variables can be named anything, with a few constraints, but it is best practice to name the variables as descriptive to what they are as possible. Using something called camelCase is also best practice. The first word is lowercase and any word after the first letter would be uppercase (myName or numberOfTimes).</p>
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
		<hr/>

		<div style="display: grid;">
			<div>
				<h2>Conditionals</h2>
				<p>
					Conditional statements are used when you want to perform different actions depending on different conditions.
				</p>
					<div style="display: grid; margin-left: 2em;">
					<ul>
						<li style="list-style-type: decimal;">
						<strong>if</strong> - used when you want to check if a condition is true before executing code.<br/>
						<pre><code>var name = "Brittney";<br/>if (name === "Brittney) {<br/>  alert("Hi Brittney!);<br/>}</code></pre>
						</li>
						<li style="list-style-type: decimal;"> 
						<strong>else</strong> - used to specify a block of code to be executed when the <em>if</em> block is false.<br/>
						<pre><code>if (name === "Brittney) {<br/>  alert("Hi Brittney!);<br/>}  else {<br/>  alert("Hi!");<br/>}</code></pre>
						</li>
						<li style="list-style-type: decimal;"> 
						<strong>else if</strong> - used to specify another condition when the <em>if</em> statement is false and before the else block.<br/>
						<pre><code>if (name === "Brittney) {<br/>  alert("Hi Brittney!);<br/>}  else if (name === "Joe") {<br/>  alert("Hi Joe!");<br/>}  else {<br/>  alert("Hi!");<br/>}</code></pre>
						</li>
						<li style="list-style-type: decimal;"> 
						<strong>ternary operator</strong> - is frequently used as a shortcut for the if statement. Multiple conditions can be wrapped in () to separate them.<br/>
						<pre><code>//Syntax for ternary:<br/><em>(condition) ? executeIfTrue : executeIfFalse<br/>(condition) ? executeIfTrue : (secondCondition) ? executeIfSecondIsTrue : executeIfAllAreFalse</em><br/>var age = 37;<br/>var beverage = (age &gt;= 21) ? "Here's a beer!" : "Have some juice!";<br/>console.log(beverage); //<em>"Here's a beer!"</em><br/>var num = 0;<br/>(num &gt; 0) ? "positive" : (num &lt; 0) ? "negative" : "zero"; //<em>"zero"</em></code></pre>
						</li>
						<li style="list-style-type: decimal;"> 
						<strong>switch</strong> - used to specify multiple "cases" to be used if they are true. The switch expression is evaluated once and compared with the values of each case, if there is a match, that block of code is executed.<br/>
						<pre><code>switch (new Date().getDay()) {<br/>  case 6:<br/>    day = "Today is Saturday!";<br/>    break;<br/>  case 0:<br/>    day = "Today is Sunday!";<br/>    break;<br/>  default:<br/>    day = "Ready for the weekend!";<br/>}</code></pre>
						</li>
					</ul>
				</div>
				<h3>Logical Operators</h3>
				<ul>
					<li style="list-style-type: square;">
					<strong>||</strong> - the OR operator checks until it finds a "truthy" value.<br/>
					<pre><code>if (age &lt; 16 || age &gt; 100) {<br/>  alert("You should not drive a car.");<br/>}</code></pre>
					</li>
					<li style="list-style-type: square;">
					<strong>&&</strong> - the AND operator checks both sides to be a "truthy" value before executing.<br/>
					<pre><code>if (firstName === "Brittney" && lastName === "Postma") {<br/>  alert("Your name is Brittney Postma.");<br/>}</code></pre>
					</li>
					<li style="list-style-type: square;">
					<strong>!</strong> - the NOT or BANG operator means the opposite of when used alone and means not when used with other operators.<br/>
					<pre><code>!true //<em>false</em><br/>!false //<em>true</em><br/>var guess = prompt("Guess my number");<br/>var myNum = 11;<br/>if (guess !== myNum) {<br/>  alert("Sorry, you're wrong");<br/>}</code></pre>
					</li>
				</ul>
				<hr/>

				<div style="display: grid;">
					<div>
						<h2>The Console</h2>
						<p>
							The console object provides access to the browser's debugging console. There are different ways to use the console (Ctrl + Shift + I) in JavaScript and it is a great way to debug your code.
						</p>
						<h3>A few of the most used console objects:</h3>
						<ul>
							<li style="list-style-type: square;">
								<strong>console.log</strong> - outputs whatever you specify to the console.<br />
								<pre><code>console.log("Hi Brittney!!") //<em>Hi Brittney!!</em><br/>var num = 11;<br/>console.log(num) //<em>11</em></code></pre>
							</li>
							<li style="list-style-type: square;">
								<strong>console.error</strong> - usually has a red color and outputs an error message to the console.<br />
								<pre><code>console.error(err) //<em style="color: red;">this might be found in a promise catch statement (more on this later).</em></code></pre>
							</li>
							<li style="list-style-type: square;">
								<strong>console.clear</strong> - clears everything inside the console window and leaves a fresh window.
								used with other operators.<br />
								<pre><code>console.clear();</code></pre>
							</li>
							<li style="list-style-type: square;">
								<strong>console.count</strong> - Log the number of times this line has been called with the given label.<br />
								<pre><code>console.count( [label] )</code></pre>
							</li>
							<li style="list-style-type: square;">
								<strong>console.group, console.groupCollapsed, console.groupEnd</strong> - Console.group() creates a new inline group, indenting all following output by another level. To move back out a level, call groupEnd(). To have a group be collapsed instead of expanded by default call console.groupCollapsed().
								used with other operators.<br />
								<pre><code>console.log("Hello world!");<br/>console.group();<br/>console.log("Hello from inside the group!");<br/>console.groupEnd();<br/>console.log("and outside again!");<br/>//<em>Hello world!</em><br/>//<em>&#9660; console.group</em><br/>//  <em>Hello from inside the group!</em><br/>//<em>and outside again!</em></code></pre>
							</li>
							<li style="list-style-type: square;">
								<strong>console.table</strong> - displays data in a table format.<br />
								<pre><code>console.table(["apples", "oranges", "bananas"]); //<table><tr><th>(index)</th><th>Values</th></tr><tr><td>0</td><td>"apples"</td></tr><tr><td>1</td><td>"oranges"</td></tr><tr><td>2</td><td>"bananas"</td></tr></table></code></pre>
							</li>
							<li style="list-style-type: square;">
								<strong>console.time</strong> - Starts a timer with a name specified as an input parameter. Up to 10,000 simultaneous timers can run on a given page.<br />
								<pre><code>console.time();</code></pre>
							</li>
						</ul>
					</div>
				</div>
				<hr/>


				<div style="display: grid;">
					<div>
						<h2>Functions</h2>
						<p>
							Functions in JavaScript are reusable blocks of code that perform a task to can be executed later.  Functions perform the actions inside of them when they are <strong><em>invoked</em></strong> or <strong><em>called</em></strong>. To access a value inside of a function a <strong><em>return statement</em></strong>  must be added, this also immediately exits the function.
						</p>
						<p>
							Functions can be declared a few different ways and are either anonymous (no name), or given a name just like a variable. Function <strong><em>parameters</em></strong>, placed inside the parentheses (), are the names given when defining the function Function <strong><em>arguments</em></strong> are the actual values that are passed to and received by the function.
						</p>	
						<p>
							You can write functions in the function syntax or by using an <strong><em>arrow function</em></strong>.  Arrow functions usually have a shorter syntax than typical functions and there is no binding of <strong><em>this</em></strong> (more on "this" later).
						</p>
						<ul>
							<li style="list-style-type: square;">
								<h4><strong>Anonymous function</strong></h4>
								<pre><code>function(<em>parameters</em>) {*<em>statements to be executed when called</em>*}<br/>() => {*<em>statements</em>*}<br/><em>parameter</em> => {*<em>statements</em>*}</code></pre>
							</li>
							<li style="list-style-type: square;">
								<h4><strong>Named function</strong></h4>
								<pre><code>function fnName (<em>parameters</em>) {*<em>statements to be executed when called</em>*}<br/>const fnName = (<em>parameters</em>) => {*<em>statements</em>*}<br/>//same as<br/>const variableName = fnName(<em>parameters</em>) {*<em>statements</em>*}</code></pre>
							</li>
						</ul>
						<h3>Function examples</h3>
						<ul>
							<li style="list-style-type: square;">
								<h4><strong>Add 2 numbers</strong></h4>
								<div style="style="display: grid;>
								<pre style="margin-right: 0.5em;"><code>//ES6 arrow function, to invoke it use <em>add()</em><br/>const add =  () => {<br/>var firstNum = parseInt(window.prompt("What is the first number?"), 10);<br/>var secondNum = parseInt(window.prompt("What is the second number?"), 10);<br/>var sum = firstNum + secondNum;<br/>alert("The sum is " + sum)<br/>}</code></pre>
								<pre><code>//regular named function<br/>function add () {<br/>var firstNum = parseInt(window.prompt("What is the first number?"), 10);<br/>var secondNum = parseInt(window.prompt("What is the second number?"), 10);<br/>var sum = firstNum + secondNum;<br/>alert("The sum is " + sum)<br/>}</code></pre>
								</div>
							</li>
							<li style="list-style-type: square;">
								<h4><strong>Multiply 2 numbers with parameters</strong></h4>
								<div style="style="display: grid;>
								<pre style="margin-right: 0.5em;"><code>//ES6 arrow function<br/>//to invoke it use <em>multiply(argument, argument)</em> or <em>multiply(5, 10)</em><br/>const multiply =  (a, b) => a * b
								</code></pre>
								<pre><code>//regular named function<br/>function multiply (a, b) {<br/>  return a * b<br/>}</code></pre>
								</div>
							</li>
					</ul>
					</div>
				</div>
				<hr/>

	<div style="display: grid;">
			<div>
				<h2>Arrays</h2>
				<a href="https://www.w3schools.com/jsref/jsref_obj_array.asp" rel="noopener noreferrer" target="_blank">w3schools JavaScript Array Reference Sheet</a>
				<p>
					The Array object is used to store multiple values in a single variable with the [] (bracket) syntax. Arrays use numbers to access the elements inside of them. The indexes are zero-based, so <code>arrayName[0]</code> returns the first item, then <code>[1]</code> returns the second, then <code>[2]</code> returns the third, and so on.
				</p>
				<h3>Array Properties and Methods</h3>
				<ul>
					<li style="list-style-type: square;">
						<strong>length</strong> - sets or returns the number of elements in an array.<br/>
						<pre><code>var numbers = [1, 2, 3, 4, 5];<br/>console.log(numbers.length) //<em>5</em><br/>numbers.length = 3<br/>console.log(numbers.length) //<em>3 - numbers is now [1, 2, 3]</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>concat()</strong> - joins 2 or more arrays together and returns a copy of the arrays.  Does not change the original array.<br/>
						<pre><code>var numArr1 = [1, 2, 3];<br/>var numArr2 = [4, 5, 6]<br/>var allTheNumbers = numArr1.concat(numArr2)<br/>console.log(allTheNumbers, numArr1, numArr2)<br/>//<em>[1, 2, 3, 4, 5, 6], [1, 2, 3], [4, 5, 6]</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>copyWithin()</strong> - *(index position to copy to, optional starting index, optional ending index)* - copies array values to another position in the array, overwriting the original value. Modifies the original array.<br/>
						<pre><code>var fruits = ["peach", "orange", "apple", "banana"]<br/>fruits.copyWithin(2, 0)<br/>console.log(fruits) //<em>["peach", "orange", "peach", "orange"]</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>entries()</strong> - returns an Array Iterator object (gives access to the .next() and .value method) with key/value pairs.  For each item in the original array, the new object will contain an array with the index as the key and the item as the value<br/>
						<pre><code>var array1 = ['a', 'b', 'c'];<br/>var iterator1 = array1.entries();<br/>console.log(iterator1.next().value);<br/>//<em>expected output: Array [0, "a"]</em><br/>console.log(iterator1.next().value);<br/>//<em>expected output: Array [1, "b"]</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>filter()</strong> - creates a new array with only the elements from the original array that pass a test. The syntax is <code>let newArr = ogArr.filter(callbackFunction)</code> The callback function is used to test each element in the ogArr and returns those elements to newArr.<br/>
						<pre><code>var ogArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];<br/>var newArr = ogArr.filter(even => (even % 2 === 0)<br/>console.log(newArr, ogArr)<br/>//<em>[2, 4, 6, 8, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>find() findIndex()</strong> - returns the first value that passes the test. The syntax is <code>let found = ogArr.find(callbackFunction)</code> The callback function is used to test each element in the ogArr until a truthy value is found and returns a single value. findIndex() returns the index of the value.<br/>
						<pre><code>var ogArr = [10, 20, 30, 40];<br/>var found = ogArr.find(element =&gt; (element > 10))<br/>console.log(found)<br/>//<em>20</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>forEach()</strong> - is similar to a for loop and runs the callback function over every element in an array. he syntax is <code>ogArr.forEach((element, index, array) => callback function)</code> Modifies the original array.<br/>
						<pre><code>var ogArr = [5, 10, 15, 20]<br/>ogArr.forEach((element, index, arr) =&gt; (arr[index] = element * 10))<br/>console.log(ogArr)<br/>//<em>[50, 100, 150, 200]</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>from()</strong> - returns a new array from anything with a length property or iterable object (basically other arrays).<br/>
						<pre><code>var myArr = Array.from("ABCDEFG")<br/>console.log(myArr)<br/>//&#9658;<em>(7) ["A", "B", "C", "D", "E", "F", "G"]</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>from()</strong> - returns a new array from anything with a length property or iterable object (basically other arrays).<br/>
						<pre><code>var myArr = Array.from("ABCDEFG")<br/>console.log(myArr)<br/>//&#9658;<em>(7) ["A", "B", "C", "D", "E", "F", "G"]</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>includes()</strong> - checks if an array includes an element, the fromIndex is an optional argument.<br/>
						<pre><code>var arr = ['a', 'b', 'c']<br/>arr.includes('c')<br/>//<em>true</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>indexOf() lastIndexOf()</strong> - checks if an array includes an element and returns the first position/index where it can be found. The fromIndex is an optional argument. lastIndexOf() starts at the end and returns the first index where it is found.<br/>
						<pre><code>var shopList = ['milk', 'bread', 'eggs']<br/>const addToList = (shopList, item) =&gt; shopList.indexOf(item) === -1 ? shopList.push(item) : null<br/>addToList(shopList, 'cheese')<br/>console.log(shopList, shopList.indexOf('cheese')<br/>//&#9658;<em>['milk', 'bread', 'eggs', 'cheese'], 4</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>join()</strong> - joins all elements of an array together in a string. A seperator can optionally be called as well, if no seperator is specified, a comma is used.<br/>
						<pre><code>var names = ["Brittney", "Joe"]<br/>console.log(names.join(), names.join(" and "))<br/>//<em>(Brittney, Joe), (Brittney and Joe)</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>map()</strong> - creates a new array with the results of a callback function on every element in the original array.<br/>
						<pre><code>var ogArr = [1, 4, 9, 16]<br/>const doubleArr = ogArr.map(x =&gt; x * 2)<br/>console.log(ogArr, doubleArr)<br/>//&#9658;<em>[1, 4, 9, 16], [2, 8, 18, 32]</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>pop()</strong> - modifies an array by taking off the last element, returns the element it removed.<br/>
						<pre><code>var myFish = ['angel', 'clown', 'mandarin', 'sturgeon']<br/>var popped = myFish.pop()<br/>console.log(myFish, popped)<br/>//&#9658;<em>['angel', 'clown', 'mandarin'], 'sturgeon'</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>push()</strong> - modifies an array by adding an element specified to the end of the original array and returns the new length.<br/>
						<pre><code>var myFish = ['angel', 'clown', 'mandarin', 'sturgeon']<br/>myFish.push('sword')<br/>console.log(myFish)<br/>//&#9658;<em>['angel', 'clown', 'mandarin', 'sturgeon', 'sword']</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>shift()</strong> - modifies an array by taking off the first element, returns the element it removed.<br/>
						<pre><code>var myFish = ['angel', 'clown', 'mandarin', 'sturgeon']<br/>var shifted = myFish.shift()<br/>console.log(myFish, shifted)<br/>//&#9658;<em>['clown', 'mandarin', 'sturgeon'], 'angel'</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>unshift()</strong> - modifies an array by adding an element specified to the beginning of the original array and returns the new length.<br/>
						<pre><code>var myFish = ['angel', 'clown', 'mandarin', 'sturgeon']<br/>myFish.unshift('sword')<br/>console.log(myFish)<br/>//&#9658;<em>['sword', 'angel', 'clown', 'mandarin', 'sturgeon']</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>reduce() reduceRight()</strong> - executes a reducer function on an array left to right, reduceRight() goes right to left. The syntax is <code>reduce((accumulator, currentValue) => accumulator + currentValue)</code><br/>
						<pre><code>const array1 = [1, 2, 3, 4]<br/>const reducedArr = array1.reduce((acc, val) =&gt; acc + val))<br/>console.log(reducedArr)<br/>//&#9658;<em>10 (1 + 2 + 3 + 4)</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>reverse()</strong> - reverses the order of the elements in an array.<br/>
						<pre><code>const array1 = [1, 2, 3, 4]<br/>const revArr = array1.reverse()<br/>console.log(revArr)<br/>//&#9658;<em>[4, 3, 2, 1]</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>slice()</strong> - returns a copy of an array from the specified positions to a new array. The syntax is <code>arr.slice(beginIndex, endIndex),</code><br/>
						<pre><code>const array1 = [1, 2, 3, 4]<br/>const sliced = array1.slice(2, 4)<br/>console.log(sliced)<br/>//&#9658;<em>(2) [3, 4]</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>splice()</strong> - modifies an existing array by removing/replacing existing elements or adding new ones. The syntax is <code>arr.splice(startIndex, deleteCount(optional), 'item'(optional)),</code><br/>
						<pre><code>var months = ['Jan', 'March', 'April', 'June']<br/>months.splice(1, 0, 'Feb') //<em>inserts at index 1</em><br/>console.log(months)<br/>//&#9658;<em>['Jan', 'Feb', 'March', 'April', 'June']</em></code></pre>
						<pre><code>var months = ['Jan', 'March', 'April', 'June']<br/>months.splice(4, 1, 'May') //<em>replaces 1 element at index 4</em><br/>console.log(months)<br/>//&#9658;<em>['Jan', 'Feb', 'March', 'April', 'May']</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>some()</strong> - checks if any elements in an array pass the test by the callback function.<br/>
						<pre><code>const array1 = [1, 2, 3, 4]<br/>var even = element =&gt; element % 2 === 0<br/>console.log(array1.some(even))<br/>//<em>true</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>toString()</strong> - returns a string of the specified arrays elements.<br/>
						<pre><code>const array1 = [1, 2, 3, 4]<br/>console.log(array1.toString())<br/>//<em>1,2,3,4</em></code></pre>
					</li>
				</ul>
				<hr/>
			</div>
		</div>
		<div style="display: grid;">
			<div>
				<h2>Objects</h2>
				<a href="https://www.w3schools.com/js/js_objects.asp" rel="noopener noreferrer" target="_blank">w3schools JavaScript Objects Reference Sheet</a>
				<p>
					Objects, collections of properties, are used to store values in property:value pairs with the { } (curly-brace) syntax.  Properties can be accessed or changed by using <code>objName.propName</code> and methods (functions inside of an object) can be called with <code>objName.propName()</code><br/>
				</p>
				<pre><code>var objName = {<br/>color: "blue",<br/>shape: "circle",<br/>price: 5,<br/>otherColors: ["yellow", "red", "green"]<br/>logShape: function() {<br/>	console.log('I am a' + objName.color + objName.shape + '!')<br/>	}<br/>}<br/>objName.logShape() // <em>I am a blue circle!</em></code></pre>
			</div>
		</div>
		

		<h2 style="text-align: center;">Friendbook Example with Array of Objects</h2>

		<iframe
		height="525"
		style="width: 100%; resize: both;"
		scrolling="no"
		title="Javascript"
		src="https://codepen.io/sballgirl11/embed/gOOLGdW?height=265&theme-id=0&default-tab=css,result"
	>
		See the Pen <a href="https://codepen.io/sballgirl11/pen/GRKYPpw/">Javascript</a> by Brittney (<a
			href="https://codepen.io/sballgirl11"
			>@sballgirl11</a
		>) on <a href="https://codepen.io">CodePen</a>. </iframe
	><br />

	<hr/>

		<div style="display: grid;">
			<div>
				<h2>Loops</h2>
				<p>
				Loops offer a quick and easy way to do something repeatedly.<br/>
				</p>
				<h3>Types of Loops</h3>
				<ul>
					<li style="list-style-type: square;">
						<strong>for</strong> - loops through a block of code a number of times.<br/><code>for (statement 1; statement 2; statement 3) { // code block to be executed }</code>
						<ul>
							<li style="list-style-type: square; margin-left: 1em;"><strong>Statement 1</strong> is executed (one time) before the execution of the code block.</li>
							<li style="list-style-type: square; margin-left: 1em;"><strong>Statement 2</strong> defines the condition for executing the code block.</li>
							<li style="list-style-type: square; margin-left: 1em;"><strong>Statement 3</strong> is executed (every time) after the code block has been executed.</li>
						</ul>
						<pre><code>for (i = 0; i &lt; 5; i++) {<br/>  text += "The number is " + i + "!" + &lt;br/&gt;<br/>}<br/>// <em>The number is 0!<br/>The number is 1!<br/>The number is 2!<br/>The number is 3!<br/>The number is 4!</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>for/in</strong> - loops through the properties of an object.<code>for (variable in object) { // code block to be executed }</code><br/>
						<pre><code>let arr = [3, 5, 7]<br/>for (let i in arr) {<br/>  console.log(i)<br/>}<br/>// <em>0, 1, 2</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>for/of</strong> - loops through the values of an iterable object.<code>for (variable of object) { // code block to be executed }</code><br/>
						<pre><code>let arr = [3, 5, 7]<br/>for (let i in arr) {<br/>  console.log(i)<br/>}<br/>// <em>3, 5, 7</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>while</strong> - loops through a block of code while a specified condition is true.<code>while (condition) { // code block to be executed }</code><br/>
						<pre><code>let i = 0<br/>while (i &lt; 5) {<br/>  i++<br/>  console.log(i)<br/>}<br/>// <em>0, 1, 2, 3, 4</em></code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>do/while</strong> - also loops through a block of code while a specified condition is true.<code>do { //statement } while (condition)</code><br/>
						<pre><code>let i = 0<br/>do {<br/>  i++<br/>  console.log(i)<br/>}<br/>while (i &lt; 5)<br/>// <em>0, 1, 2, 3, 4</em></code></pre>
					</li>
				</ul>
			</div>
		</div>

		<hr/>
			
		<div style="display: grid;">
			<div>
				<h2>Scope</h2>
				<p>
				Scope determines the accessibility (visibility) of variables. There are 2 type of scope, local scope and global scope.<br/>
				</p>
				
				<ul>
					<li style="list-style-type: square;">
						<strong>Global Scope</strong> - Variables declared outside a function are global scoped and can be accessed anywhere. This is the root scope and lives on the window object.<br/>
						<pre><code>let name = "Brittney"<br/>// code here CAN use variable name<br/>function myFunction() {<br/>  name = "Joe"<br/>  // code here CAN use variable name</code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>Local Scope</strong> - Variables declared inside a function become locally scoped and are not accessible outside the funtion.<br/>
						
						<pre><code>// code here can NOT use variable name<br/>function myFunction() {<br/>  var name = "Brittney"<br/>  // code here CAN use variable name<br/>}</code></pre>
					</li>
					<li style="list-style-type: square;">
						<strong>Both Example</strong><br/>
						
						<pre><code>// Root Scope (window)<br/>var fun = 5;<br/><br/>function funFunction() {<br/>  // local scope<br/>  var fun = "having fun"<br/>  console.log(1, fun)<br/>}<br/><br/>function funnerFunction() {<br/>  // local scope<br/><br/>  var fun = "having more fun"<br/>  console.log(2, fun)<br/>}<br/><br/>function funnestFunction() {<br/>  fun = "having the most fun"<br/>  console.log(3, fun)<br/>}<br/><br/>console.log("global", fun)<br/>funFunction()<br/>funnerFunction()<br/>funnestFunction<br/><br/>//<em> window 5<br/>   1 "having fun"<br/>   2 "having more fun"<br/>   3 "having the most fun"</em><br/>console.log(fun) // <em>having the most fun</em></code></pre>
					</li>
					
				</ul>
			</div>
		</div>
		<hr/>
	

		
		`,
	},
	{
		title: 'Spreadsheets',
		slug: 'spreadsheets',
		html: `
			<div style="display: grid; grid-template-columns: repeat (auto-fit, minmax(400px, 1fr));">
			
				<div>
					<a href="https://support.google.com/docs/table/25273?hl=en" rel="noopener noreferrer" target="_blank">Google Sheets Function List</a>
					<h3 style="text-align: center;">Abbreviations</h3>
						<ul>
							<li style="list-style-type: square;">
							<strong>Y</strong> - whole years</br>
							</li>
							<li style="list-style-type: square;">
							<strong>M</strong> - whole months</br>
							</li>
							<li style="list-style-type: square;">
							<strong>D</strong> - whole days</br>
							</li>
							<li style="list-style-type: square;">
							<strong>MD</strong> - left over days after subtracting whole months.</br>
							</li>
							<li style="list-style-type: square;">
							<strong>YM</strong> - left over months about subtracting whole years</br>
							</li>
							<li style="list-style-type: square;">
							<strong>YD</strong> - number of days between 2 dates no more than one year apart.</br>
							</li>
							<li style="list-style-type: square;">
							<strong>HH</strong> - whole hours.</br>
							</li>
							<li style="list-style-type: square;">
							<strong>MM</strong> - whole minutes.</br>
							</li>
							<li style="list-style-type: square;">
							<strong>SS</strong> - whole seconds.</br>
							</li>
							<li style="list-style-type: square;">
							<strong>mode</strong> - 1 resizes the image to fit in the cell, 2 stretches or compresses to fit inside cell, 3 leave image at size, 4 allows the specification of a custom size.</br>
							</li>
						</ul>
						<hr/>
				</div>
					
					
				<div style="display: grid;">
					<h3 style="text-align: center;">Formulas</h3>
					<h4>Date & Time Formulas</h4>
					<ul>
						<li style="list-style-type: square;">
							<strong>DATE</strong> - converts a provided year, month, and day into a date.</br>
							<pre><code>DATE(year, month, day)</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>DATEDIF</strong> - calculates the number of days, months, or years between 2 dates. Units are (Y, M, D, MD, YM, and YD).</br>
							<pre><code>DATEDIF(start_date, end_date, unit)</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>DATEVALUE</strong> - converts a given date string to a date value.</br>
							<pre><code>DATEVALUE(date_string)</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>DAY</strong> - returns the day that a given date falls on, in numeric format.</br>
							<pre><code>DAY(date)</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>DAYS</strong> - returns the number of days between two dates.</br>
							<pre><code>DAYS(end_date, start_date)</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>EDATE</strong> - returns a date a given number of months before or after another date.</br>
							<pre><code>EDATE(start_date, months)</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>HOUR</strong> - returns the hour of a given time, in numeric format.</br>
							<pre><code>HOUR(time)</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>MINUTE</strong> - returns the minute of a given time, in numeric format.</br>
							<pre><code>MINUTE(time)</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>MONTH</strong> - returns the month of the year a given date falls in, in numeric format.</br>
							<pre><code>MONTH(date)</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>NOW</strong> - returns the current date and time as a date value.</br>
							<pre><code>NOW()</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>TIME</strong> - converts a given hour, minute, and second into a time.</br>
							<pre><code>TIME(hour, minute, second)</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>TIMEVALUE</strong> - returns the fraction of a 24-hour day the time represents.</br>
							<pre><code>TIMEVALUE(time_string)</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>TODAY</strong> - returns the current date as a date value.</br>
							<pre><code>TODAY()</code></pre>
						</li>
					</ul>
					<hr/>
					<h4>Filter & Sort Formulas</h4>
					<ul>
						<li style="list-style-type: square;">
							<strong>FILTER</strong> - returns only rows or columns that meet the given conditions. Range is data to be filtered, condition1 is a column or row containing boolean values to the range, condition2 and on are optional. FILTER can only be used to filter rows or columns at one time. In order to filter both rows and columns, use the return value of one FILTER function as range in another.</br>
							<pre><code>FILTER(range, condition1, [condition2, ...])<br/>FILTER(A2, A2="Guest Visitor")</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>SORT</strong> - sorts the rows of a given range by values in one or more columns.</br>
							<pre><code>SORT(range, sort_column, is_ascending, [sort_column2], [is_ascending2])<br/>SORT(A:B, 1, TRUE)</code></pre>
						</li>
					</ul>
					<hr/>
					<h4>Google Formulas</h4>
					<ul>
						<li style="list-style-type: square;">
							<strong>ARRAYFORMULA</strong> - displays values returned from an array formula into multiple rows and/or columns and allows non-array functions to be used with arrays.</br>
							<pre><code>ARRAYFORMULA(array_formula)<br/>ARRAYFORMULA(B * C)<br/>ARRAYFORMULA(SUMPRODUCT(B, C))</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>IMAGE</strong> - inserts an image into a cell, mode is optional but must be set to 4 to use height and width.</br>
							<pre><code>IMAGE(url, [mode], [height], [width])</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>QUERY</strong> - run an API Query across data. Data is the range of cells to perform the query on, query is the query to perform and must be enclosed in "" (quotation marks) or be a cell containing the text, and headers is the number of header rows and is optional.</br>
							<a href="https://www.seerinteractive.com/blog/how-to-query-data-in-google-sheets/" rel="noopener noreferrer" target="_blank">How to Query Data</a><br/>
							<pre><code>QUERY(data, query, [headers])<br/>QUERY(MonthlyData!A2:B, "select B, A where todate(A) &gt;= date '"&text(A1, "yyyy-mm-dd")&"'")</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>SPARKLINE</strong> - creates a mini chart contained within a single cell, options are optional and are a range of setting used to customize the chart, see link for more info.<br/><a href="https://support.google.com/docs/answer/3093289" rel="noopener noreferrer" target="_blank">SPARKLINE Google Docs</a></br>
							<pre><code>SPARKLINE(data, [options])</code></pre>
						</li>
					</ul>
					<hr/>
					<h4>Logical Formulas</h4>
					<ul>
						<li style="list-style-type: square;">
							<strong>AND</strong> - returns boolean value after evaluating expression given.</br>
							<pre><code>AND(logical_expression1, [logical_expression2, ...])<br/>AND(A2 = "foo", B2  = "bar")</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>OR</strong> - returns boolean value after evaluating expression give.</br>
							<pre><code>OR(logical_expression1, [logical_expression2, ...])</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>IF</strong> - retuns a single value if the expression evaluates to true.</br>
							<pre><code>IF(logical_expression, value_if_true, value_if_false)<br/>IF(A2,"A2 was true","A2 was false")</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>IFS</strong> - evaluates multiple conditions and returns a value that corresponds to the first true condition.</br>
							<pre><code>IFS(condition1, value1, [condition2, value2], …)</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>NOT</strong> - returns opposite of a boolean expression. Zero is the only numberic value that is false.</br>
							<pre><code>NOT(logical_expression)<br/>NOT(ISERR(A2))<br/>NOT(true) //false<br/>NOT(false) //true</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>SWITCH</strong> - tests an expressiong against a list of cases and returns the value of the first matching case with optional default case.</br>
							<pre><code>SWITCH(expression, case1, value1, [default or case2, value2], ...)<br/>SWITCH(B2:B, "Guest Visitor", "", INDEX(E2:E))</code></pre>
						</li>
					</ul>
					<hr/>
					<h4>Lookup Formulas</h4>
					<ul>
						<li style="list-style-type: square;">
							<strong>INDEX</strong> - returns contents of a cell, specified by row and column offset. Row and column are optional.</br>
							<pre><code>INDEX(reference, [row], [column])<br/>INDEX(E2:E)</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>OFFSET</strong> - returns a range reference shifted a specified number of rows and columns from a starting cell reference.</br>
							<pre><code>OFFSET(cell_reference, offset_rows, offset_columns, [height], [width])</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>VLOOKUP</strong> - vertical lookup. Searches down the first column of a range for a key and returns the value of a specified cell in the row found.</br>
							<pre><code>VLOOKUP(search_key, range, index, [is_sorted])</code></pre>
						</li>
					</ul>	
					<hr/>
					<h4>Math & Operator Formulas</h4>
					<ul>
						<li style="list-style-type: square;">
							<strong>FLOOR</strong> - rounds a number down to the nearest integer.</br>
							<pre><code>FLOOR(value, [factor])</code></pre>
						</li>
						<li style="list-style-type: square;">
							<strong>INT</strong> - rounds a number down to the nearest integer that is less than or equal to it.</br>
							<pre><code>INT(value)</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>PRODUCT</strong> - returns the result of multiplying a series of numbers together.</br>
							<pre><code>PRODUCT(factor1, [factor2, ...])</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>QUOTIENT</strong> - returns one number divided by another.</br>
							<pre><code>QUOTIENT(dividend, divisor)</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>ROUND</strong> - rounds a number to a certain number of decimal places.</br>
							<pre><code>ROUND(value, [places])</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>SUM</strong> - returns the sum of a series of numbers.</br>
							<pre><code>SUM(value1, [value2, ...])</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>SUMIF</strong> - returns a conditional sum across a range.</br>
							<pre><code>SUMIF(range, criterion, [sum_range])</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>SUMIFS</strong> - returns the sum of a range depending on specified criteria.</br>
							<pre><code>SUMIFS(sum_range, criteria_range1, criterion1, [criteria_range2, criterion2, ...])</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>ADD</strong> - 	returns the sum of two numbers. Equivalent to the '+' operator.</br>
							<pre><code>ADD(value1, value2)</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>CONCAT</strong> - returns the concatenation of 2 values. Equivalent to the '&' operator.</br>
							<pre><code>CONCAT(value1, value2)</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>DIVIDE</strong> - returns one number divided by another. Equivalent to the '/' operator.</br>
							<pre><code>DIVIDE(dividend, divisor)</code></pre>
						</li>
						<li style="list-style-type: square;"> 
							<strong>MINUS</strong> - returns the difference of 2 numbers. Equivalent to the '-' operator.</br>
							<pre><code>MINUS(value1, value2)</code></pre>
						</li>
						<li style="list-style-type: square;"> 
						<strong>MULTIPLY</strong> - returns the product of 2 numbers. Equivalent to the '*' operator.</br>
						<pre><code>MULTIPLY(value1, value2)</code></pre>
					</li>
					</ul>	
				</div>
			</div>
				`,
	},
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
	// },
];

posts.forEach(post => {
	post.html = post.html.replace(/^\t{3}/gm, '');
});

export default posts;
