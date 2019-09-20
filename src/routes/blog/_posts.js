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
			<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element" rel="noopener noreferrer" target="_blank">MDN HTML Tags</a>
			<br/>
			<a href="https://web.stanford.edu/group/csp/cs21/htmlcheatsheet.pdf" rel="noopener noreferrer" target="_blank">HTML Cheat 	sheet by Stanford University</a>
			<p>HTML, HyperText Markup Language, is a markup language that lays out the structure of your content.</p>
			
			<h2>Getting started with a HTML document</h2>
			<a href="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics" rel="noopener noreferrer" target="_blank">MDN HTML Document</a>
		
			<p>In Visual Studio Code, you can press ! and enter to get a boilerplate HTML template to start with.</p>
			
			<hr/>

			<iframe height="450" style="width: 100%;" scrolling="no" title="yLBxMNg" src="//codepen.io/sballgirl11/embed/yLBxMNg/?height=464&theme-id=dark&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/sballgirl11/pen/yLBxMNg/'>yLBxMNg</a> by Brittney
  (<a href='https://codepen.io/sballgirl11'>@sballgirl11</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
<h2>Basic Tags</h2>
			<ul>
				<li><pre><code>&lt;!DOCTYPE html&gt;</code></pre> is required at the beginning of every HTML document.</li>
				<li><pre><code>&lt;html&gt; &lt;/html&gt;</code></pre> wraps all of the content on the entire page and can be referred to as the root element.</li>
				<li><pre><code>&lt;head&gt; &lt;/head&gt;</code></pre> is a container for metadata on the site used for SEO, title, styling tags, any script tags that are needed to run the page, and others.</li>
				<li><pre><code>&lt;link rel="" href=""&gt;</code></pre> specifies the relationship between the current HTML document and an external resource, like a stylesheet or icon. The rel attribute takes the type of link you are importing, such as stylesheet, and the href attribute is the location of the link relative to the current file.</li>
				<li><pre><code>&lt;meta charset="utf-8"&gt;</code></pre> sets the default character set for your page and includes most characters from many written languages.</li>
				<li><pre><code>&lt;title&gt; &lt;/title&gt;</code></pre> sets the title of your page, which appears in the browser tab your page is loaded in.</li>
				<li><pre><code>&lt;style&gt; &lt;/style&gt;</code></pre> allows you to add css directly into your html without linking an outside css file.</li>
				<li><pre><code>&lt;body&gt; &lt;/body&gt;</code></pre> is a container for everything your user sees on the page.</li>
				<li><pre><code>&lt;script&gt; &lt;/script&gt;</code></pre> tags are where javascript is written or linked and can be placed at the bottom, before the closing body tag, so that they do not block the rendering of the html.</li>
			</ul>
			<hr/>
			<h2>Sectioning Tags</h2>
			<ul>
				<li><pre><code>&lt;address&gt; &lt;/address&gt;</code></pre> formats the contact information correctly for an address or a person or company.</li>
				<li><pre><code>&lt;article&gt; &lt;/article&gt;</code></pre> is used for self-contained posts that are from newspapers, magazines, forums, etc.</li>
				<li><pre><code>&lt;aside&gt; &lt;/aside&gt;</code></pre> content is indirectly related to the content of the page</li>
				<li><pre><code>&lt;div&gt; &lt;/div&gt;</code></pre> generic container element for flow of the page.</li>
				<li><pre><code>&lt;header&gt; &lt;/header&gt;</code></pre> specifies the introductory content, such as a logo, navigation bar, search, and others.</li>
				<li><pre><code>&lt;nav&gt; &lt;/nav&gt;</code></pre> is the section where the navigation links are placed.</li>
				<li><pre><code>&lt;main&gt; &lt;/main&gt;</code></pre> is where the main content of your document lies.</li>
				<li><pre><code>&lt;section&gt; &lt;/section&gt;</code></pre> allows you to group your content into sections that are related.</li>
				<li><pre><code>&lt;footer&gt; &lt;/footer&gt;</code></pre> is usually located at the bottom of the page and typically contains information about the author, copyright data, or links.</li>
				<li><pre><code>&lt;h1&gt; &lt;/h1&gt;</code></pre> are section heading tags and go from h1 being the largest or highest section to h6 being the smallest or lowest heading.</li>
			</ul>
			<hr/>
			<h2>Text Content Tags</h2>
			<ul>
				<li><pre><code>&lt;blockquote&gt; &lt;/blockquote&gt;</code></pre> indicated an extended quotation. A cite attribute may be added to link a source URL.</li>
				<li><pre><code>&lt;dd&gt; &lt;/dd&gt;</code></pre> gives the description, definition, or value of the previous term, used with dl (definition list tag) and a dt (definition term) tag.</li>
				<li><pre><code>&lt;figcaption&gt; &lt;/figcaption&gt;</code></pre> is a caption or legend describing the content before it (the parent container).</li>
				<li><pre><code>&lt;figure&gt; &lt;/figure&gt;</code></pre> is self-contained content that can include a figcaption element below it.</li>
				<li><pre><code>&lt;hr&gt; &lt;/hr&gt;</code></pre> stands for horizontal rule and creates a line horizontally across the page to break up the content.</li>
				<li><pre><code>&lt;li&gt; &lt;/li&gt;</code></pre> is used inside of and ol or  ul tag to represent and item in a list.</li>
				<li><pre><code>&lt;ol&gt; &lt;/ol&gt;</code></pre> is an ordered list tag that wraps the list items (li tag) by numbering them.</li>
				<li><pre><code>&lt;p&gt; &lt;/p&gt;</code></pre> stands for paragraph tag to wrap your paragraph text in.</li>
				<li><pre><code>&lt;pre&gt; &lt;/pre&gt;</code></pre> preformatted text which is presented exactly as written inside the HTML file.</li>
				<li><pre><code>&lt;ul&gt; &lt;/ul&gt;</code></pre> is an unordered list tag that wraps the list items (li tag) without numbering them, default styling is bullet points.</li>
			</ul>
			<hr/>
			<p></p>
			<h2>Inline Text Tags</h2>
			<ul>
				<li><pre><code>&lt;a href=""&gt; &lt;/a&gt;</code></pre> stands for anchor element and creates a hyperlink to another place.  The href attribute is used to add the location relative to the HTML file.</li>
				<li><pre><code>&lt;abbr&gt; &lt;/abbr&gt;</code></pre> is an abbreviation or acronym and has an optional title attribute than can a description for the abbreviation.</li>
				<li><pre><code>&lt;br /&gt;</code></pre> adds a line break into the document.</li>
				<li><pre><code>&lt;code&gt; &lt;/code&gt;</code></pre> styles the content in a way that indicates it is machine or computer code.</li>
				<li><pre><code>&lt;i&gt; &lt;/i&gt;</code></pre> italic text typically text that is set off from the normal text.</li>
				<li><pre><code>&lt;kbd&gt; &lt;/kbd&gt;</code></pre> Keyboard Input element is a span of inline text indicating user input from a keyboard, voice input, or other text entry device.</li>
				<li><pre><code>&lt;mark&gt; &lt;/mark&gt;</code></pre> marked or highlighted text.</li>
				<li><pre><code>&lt;q&gt; &lt;/q&gt;</code></pre> short inline quote, usually styled with quotes surrounding the text.</li>
				<li><pre><code>&lt;s&gt; &lt;/s&gt;</code></pre> strike-through element adds a line through the text.</li>
				<li><pre><code>&lt;small&gt; &lt;/small&gt;</code></pre> side-comments or small print, such as copyright or legal text.</li>
				<li><pre><code>&lt;span&gt; &lt;/span&gt;</code></pre> generic container for grouping elements for styling purposes.</li>
				<li><pre><code>&lt;strong&gt; &lt;/strong&gt;</code></pre> indicated the content has a strong importance and is usually rendered in bold type.</li>
				<li><pre><code>&lt;sub&gt; &lt;/sub&gt;</code></pre> subscript type for typographical content.</li>
				<li><pre><code>&lt;sup&gt; &lt;/sup&gt;</code></pre> superscript type for typographical content.</li>
				<li><pre><code>&lt;tt&gt; &lt;/tt&gt;</code></pre> styles the text in the default monospace font face.</li>
				<li><pre><code>&lt;var&gt; &lt;/var&gt;</code></pre> is a Variable Element and formats the content to stand out in a mathematical expression or programming content.</li>
				<li><pre><code>&lt;wbr&gt; &lt;/wbr&gt;</code></pre> allows you to place a word break within your text, where the browser may not break a line at that location.</li>
			</ul>
			<hr/>
			<h2>Image and multimedia Tags</h2>
			<ul>
				<li><pre><code>&lt;audio src=""&gt; &lt;/audio&gt;</code></pre> used to embed sound content with a source tag or an src attribute with the location of the file.</li>
				<li><pre><code>&lt;img src="" alt="" /&gt;</code></pre> embeds an image with a src attribute with the location of the file.</li>
				<li><pre><code>&lt;track&gt; &lt;/track&gt;</code></pre> is used with audio and video tags to specify timed text tracks.</li>
				<li><pre><code>&lt;video src=""&gt; &lt;/video&gt;</code></pre> embeds a media player for video playback with a source tag or an src attribute with the location of the file.</li>
				<li><pre><code>&lt;iframe src=""&gt; &lt;/iframe&gt;</code></pre> embeds another HTML page into the current one.</li>
				<li><pre><code>&lt;canvas src=""&gt; &lt;/canvas&gt;</code></pre> allows users to drag graphics and animations.</li>
			</ul>
			<hr/>
			<h2>Form Tags</h2>
			<ul>
				<li><pre><code>&lt;button&gt; &lt;/button&gt;</code></pre> is a clickable button, which can be used anywhere, but in forms the type attribute is added with "submit" to send the form.</li>
				<li><pre><code>&lt;datalist&gt; &lt;/datalist&gt;</code></pre> contains a set of option elements that are available for other controls.</li>
				<li><pre><code>&lt;fieldset&gt; &lt;/fieldset&gt;</code></pre> used to group controls and labels.</li>
				<li><pre><code>&lt;form&gt; &lt;/form&gt;</code></pre> wraps the entire form content and has an action attribute that tells the server to "POST" the data among other options.</li>
				<li><pre><code>&lt;input&gt; &lt;/input&gt;</code></pre> is an interactive area where the user can type into based on the attribute type given to the input; text, number, email, are just a few of the types available.</li>
				<li><pre><code>&lt;label&gt; &lt;/label&gt;</code></pre> gives a caption or label for an item within the form.</li>
				<li><pre><code>&lt;legend&gt; &lt;/legend&gt;</code></pre> a caption or label for fieldset element.</li>
				<li><pre><code>&lt;meter&gt; &lt;/meter&gt;</code></pre> represents the data given in the attributes as a meter. Some attributes are min, max, low, high, value, to name a few.</li>
				<li><pre><code>&lt;optgroup&gt; &lt;/optgroup&gt;</code></pre> groups options within a select element.</li>
				<li><pre><code>&lt;option&gt; &lt;/option&gt;</code></pre> defines an item in a select, optgroup, or datalist element.</li>
				<li><pre><code>&lt;output&gt; &lt;/output&gt;</code></pre> is a container where a calculation or output can be displayed.</li>
				<li><pre><code>&lt;progress&gt; &lt;/progress&gt;</code></pre> is an indicator showing the completion progress, usually displayed as a progress bar.</li>
				<li><pre><code>&lt;select&gt; &lt;/select&gt;</code></pre> provides a menu of options, used with option element.</li>
				<li><pre><code>&lt;textarea&gt; &lt;/textarea&gt;</code></pre> is a multi-line, resizable text box that allows users to write a sizable amount of text like a comment.</li>
			</ul>
			<hr/>
		`,
	},

	{
		title: 'CSS',
		slug: 'css',
		html: `
		<a href="https://developer.mozilla.org/en-US/docs/Web/CSS" rel="noopener noreferrer" target="_blank">MDN CSS</a>
		<br/>
		<a href="https://css-tricks.com/" rel="noopener noreferrer" target="_blank">CSS Tricks</a>
		<p>CSS, Cascading Style Sheet, is used to describe how elements should be rendered to users.</p>
		<p>CSS can be implemented in several ways.  Inline styling, inside the style tag of an HTML document, or in an external stylesheet.</p>
		<iframe height="450" style="width: 100%;" scrolling="no" title="CSS" src="//codepen.io/sballgirl11/embed/GRKYPpw/?height=265&theme-id=dark&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/sballgirl11/pen/GRKYPpw/'>CSS</a> by Brittney
  (<a href='https://codepen.io/sballgirl11'>@sballgirl11</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
		`,
	},

	// {
	// 	title: 'JavaScript',
	// 	slug: 'why-the-name',
	// 	html: `
	// 		<p>In war, the soldiers who build bridges, repair roads, clear minefields and conduct demolitions — all under combat conditions — are known as <em>sappers</em>.</p>

	// 		<p>For web developers, the stakes are generally lower than those for combat engineers. But we face our own hostile environment: underpowered devices, poor network connections, and the complexity inherent in front-end engineering. Sapper, which is short for <strong>S</strong>velte <strong>app</strong> mak<strong>er</strong>, is your courageous and dutiful ally.</p>
	// 	`,
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
	// },
];

posts.forEach(post => {
	post.html = post.html.replace(/^\t{3}/gm, '');
});

export default posts;
