---
title: HTML
date: 09/01/2019
---

<iframe height="450" style="width: 100%; resize: both;" scrolling="no" title="yLBxMNg" src="//codepen.io/sballgirl11/embed/yLBxMNg/?height=464&theme-id=dark&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/sballgirl11/pen/yLBxMNg/'>yLBxMNg</a> by Brittney
  (<a href='https://codepen.io/sballgirl11'>@sballgirl11</a>) on <a href='https://codepen.io'>CodePen</a>
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
