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
			<a href="https://web.stanford.edu/group/csp/cs21/htmlcheatsheet.pdf" rel="noopener noreferrer" target="_blank">HTML Cheatsheet by Standford University</a>
			<p>HTML, HyperText Markup Language, is a markup language that lays out the structure of your content.</p>
			
			<h2>Getting started with a HTML document</h2>
			<a href="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics" rel="noopener noreferrer" target="_blank">MDN HTML Document</a>
		
			<p>In Visual Studio Code, you can press ! and enter to get a boilerplate HTML template to start with.</p>
			
			<hr/>

			<iframe height="464" style="width: 100%;" scrolling="no" title="yLBxMNg" src="//codepen.io/sballgirl11/embed/yLBxMNg/?height=464&theme-id=dark&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/sballgirl11/pen/yLBxMNg/'>yLBxMNg</a> by Brittney
  (<a href='https://codepen.io/sballgirl11'>@sballgirl11</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>	

			<h2>Basic Tags</h2>
			<ol>
				<li><code>\< !DOCTYPE html \></code> is required at the beginning of every HTML document.</li>
				<li><code>\< html \> \< /html \></code> wraps all of the content on the entire page and can be referred to as the root element.</li>
				<li><code>\< head \> \< /head \></code> is a container for metadata on the site used for SEO, title, styling tags, any script tags that are needed to run the page, and others.</li>
				<li><code>\< link rel="" href="" \></code> specifies the relationship between the current HTML document and an external resource, like a stylesheet or icon. The rel attribute takes the type of link you are importing, such as stylesheet, and the href attribute is the location of the link relative to the current file.</li>
				<li><code>\< meta charset="utf-8" /\></code> sets the default character set for your page and includes most characters from many written languages.</li>
				<li><code>\< title \> \< /title \></code> sets the title of your page, which appears in the browser tab your page is loaded in.</li>
				<li><code>\< style \> \< /style \></code> allows you to add css directly into your html without linking an outside css file.</li>
				<li><code>\< body \> \< /body \></code> is a container for everything your user sees on the page.</li>
				<li><code>\< script \> \< /script \></code> tags are where javascript is written or linked and can be placed at the bottom, before the closing body tag, so that they do not block the rendering of the html.</li>
			</ol>
			<hr/>

			<h2>Sectioning Tags</h2>
			<ol>
				<li><code>\< address \> \< /address \></code> formats the contact information correctly for an address or a person or company.</li>
				<li><code>\< article \> \< /article \></code> is used for self-contained posts that are from newspapers, magazines, forums, etc.</li>
				<li><code>\< aside \> \< /aside \></code> content is indirectly related to the content of the page</li>
				<li><code>\< div \> \< /div \></code> generic container element for flow of the page.</li>
				<li><code>\< header \> \< /header \></code> specifies the introductory content, such as a logo, navigation bar, search, and others.</li>
				<li><code>\< nav \> \< /nav \></code> is the section where the navigation links are placed.</li>
				<li><code>\< main \> \< /main \></code> is where the main content of your document lies.</li>
				<li><code>\< section \> \< /section \></code> allows you to group your content into sections that are related.</li>
				<li><code>\< footer \> \< /footer \></code> is usually located at the bottom of the page and typically contains information about the author, copyright data, or links.</li>
				<li><code>\< h1 \> \< /h1 \></code> are section heading tags and go from h1 being the largest or highest section to h6 being the smallest or lowest heading.</li>
			</ol>
			<hr/>

			<h2>Text Content Tags</h2>
			<ol>
				<li><code>\< blockquote \> \< /blockquote \></code> indicated an extended quotation. A cite attribute may be added to link a source URL.</li>
				<li><code>\< dd \> \< /dd \></code> gives the description, definition, or value of the previous term, used with dl (definition list tag) and a dt (definition term) tag.</li>
				<li><code>\< figcaption \> \< /figcaption \></code> is a caption or legend describing the content before it (the parent container).</li>
				<li><code>\< figure \> \< /figure \></code> is self-contained content that can include a figcaption element below it.</li>
				<li><code>\< hr \> \< /hr \></code> stands for horizontal rule and creates a line horizontally across the page to break up the content.</li>
				<li><code>\< li \> \< /li \></code> is used inside of and ol or  ul tag to represent and item in a list.</li>
				<li><code>\< ol \> \< /ol \></code> is an ordered list tag that wraps the list items (li tag) by numbering them.</li>
				<li><code>\< p \> \< /p \></code> stands for paragraph tag to wrap your paragraph text in.</li>
				<li><code>\< pre \> \< /pre \></code> preformatted text which is presented exactly as written inside the HTML file.</li>
				<li><code>\< ul \> \< /ul \></code> is an unordered list tag that wraps the list items (li tag) without numbering them, default styling is bullet points.</li>
			</ol>
			<hr/>

			<h2>Inline Text Tags</h2>
			<ol>
				<li><code>\< a href="" \> \< /a \></code> stands for anchor element and creates a hyperlink to another place.  The href attribute is used to add the location relative to the HTML file.</li>
				<li><code>\< abbr \> \< /abbr \></code> is an abbreviation or acronym and has an optional title attribut than can a description for the abbreviation.</li>
				<li><code>\< br /\></code> adds a line break into the document.</li>
				<li><code>\< code \> \< /code \></code> styles the content in a way that indicates it is machine or computer code.</li>
				<li><code>\< em \> \< /em \></code> is an emphasis tag that give the text extra importance and is usually italic.</li>
				<li><code>\< kbd \> \< /kbd \></code> Keyboard Input element is a span of inline text indicating user input from a keyboard, voice input, or other text entry device.</li>
				<li><code>\< mark \> \< /mark \></code> marked or highlighted text.</li>
				<li><code>\< q \> \< /q \></code> short inline quote, usually styled with quotes surrounding the text.</li>
				<li><code>\< s \> \< /s \></code> strikethrough element adds a line through the text.</li>
				<li><code>\< small \> \< /small \></code> side-comments or small print, such as copyright or legal text.</li>
				<li><code>\< span \> \< /span \></code> generic container for grouping elements for styling purposes.</li>
				<li><code>\< strong \> \< /strong \></code> indicated the content has a strong importance and is usually rendered in bold type.</li>
				<li><code>\< sub \> \< /sub \></code> subscript type for typographical content.</li>
				<li><code>\< sup \> \< /sup \></code> superscript type for typographical content.</li>
				<li><code>\< tt \> \< /tt \></code> styles the text in the default monospace font face.</li>
				<li><code>\< var \> \< /var \></code> is a Variable Element and formats the content to stand out in a mathematical expression or programming content.</li>
				<li><code>\< wbr \> \< /wbr \></code> allows you to place a word break within your text, where the browser may not break a line at that location.</li>
			</ol>
			<hr/>

			<h2>Image and multimedia Tags</h2>
			<ol>
				<li><code>\< audio src="" \> \< /audio \></code> used to embed sound content with a source tag or an src attribute with the location of the file.</li>
				<li><code>\< img src="" alt="" /\></code> embeds an image with a src attribute with the location of the file.</li>
				<li><code>\< track \> \< /track \></code> is used with audio and video tags to specify timed text tracks.</li>
				<li><code>\< video src=""\> \< /video \></code> embeds a media plaayer for video playback with a source tag or an src attribute with the location of the file.</li>
				<li><code>\< iframe src=""\> \< /iframe \></code> embeds another HTML page into the current one.</li>
				<li><code>\< canvas src=""\> \< /canvas \></code> allows users to drag graphics and animations.</li>
			</ol>
			<hr/>

			<h2>Form Tags</h2>
			<ol>
				<li><code>\< button \> \< /button \></code> is a clicable button, which can be used anywhere, but in forms the type attribute is added with "submit" to send the form.</li>
				<li><code>\< datalist \> \< /datalist \></code> contains a set of option elements that are available for other controls.</li>
				<li><code>\< fieldset \> \< /fieldset \></code> used to group controls and labels.</li>
				<li><code>\< form \> \< /form \></code> wraps the entire form content and has an action attribute that tells the server to "POST" the data among other options.</li>
				<li><code>\< input \> \< /input \></code> is an interactive area where the user can type into based on the attribute type given to the input; text, number, email, are just a few of the types available.</li>
				<li><code>\< label \> \< /label \></code> gives a caption or label for an item within the form.</li>
				<li><code>\< legend \> \< /legend \></code> a caption or label for fieldset element.</li>
				<li><code>\< meter \> \< /meter \></code> represents the data given in the attributes as a meter. Some attributes are min, max, low, high, value, to name a few.</li>
				<li><code>\< optgroup \> \< /optgroup \></code> groups options within a select element.</li>
				<li><code>\< option \> \< /option \></code> defines an item in a select, optgroup, or datalist element.</li>
				<li><code>\< output \> \< /output \></code> is a container where a calculation or output can be displayed.</li>
				<li><code>\< progress \> \< /progress \></code> is an indicator showing the completion progress, usually displayed as a progress bar.</li>
				<li><code>\< select \> \< /select \></code> provides a menu of options, used with option element.</li>
				<li><code>\< textarea \> \< /textarea \></code> is a multi-line, resizable text box that allows users to write a sizable amount of text like a comment.</li>
			</ol>
			<hr/>
		`,
	},

	// {
	// 	title: 'CSS',
	// 	slug: 'how-to-use-sapper',
	// 	html: `
	// 		<h2>Step one</h2>
	// 		<p>Create a new project, using <a href='https://github.com/Rich-Harris/degit'>degit</a>:</p>

	// 		<pre><code>npx degit "sveltejs/sapper-template#rollup" my-app
	// 		cd my-app
	// 		npm install # or yarn!
	// 		npm run dev
	// 		</code></pre>

	// 		<h2>Step two</h2>
	// 		<p>Go to <a href='http://localhost:3000'>localhost:3000</a>. Open <code>my-app</code> in your editor. Edit the files in the <code>src/routes</code> directory or add new ones.</p>

	// 		<h2>Step three</h2>
	// 		<p>...</p>

	// 		<h2>Step four</h2>
	// 		<p>Resist overdone joke formats.</p>
	// 	`,
	// },

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
