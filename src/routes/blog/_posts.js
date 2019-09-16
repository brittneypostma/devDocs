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
		slug: 'what-is-sapper',
		html: `
			<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element" rel="noopener noreferrer" target="_blank">MDN HTML Tags</a>
			<br/>
			<a href="https://web.stanford.edu/group/csp/cs21/htmlcheatsheet.pdf" rel="noopener noreferrer" target="_blank">HTML Cheatsheet by Standford University</a>
			<p>HTML is a markup language that lays out the structure of your content.</p>
			
			<h2>Getting started with a HTML document</h2>
			<a href="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics" rel="noopener noreferrer" target="_blank">MDN HTML Document</a>
			<p>In Visual Studio Code, you can press ! and enter to get a boilerplate HTML template to start with.</p>
			<ol>
				<li><code>!DOCTYPE html</code> is required at the beginning of every HTML document.</li>
				<li><code>html</code> wraps all of the content on the entire page and can be referred to as the root element.</li>
				<li><code>head</code> is a container for metadata on the site used for SEO, title, styling tags, any script tags that are needed to run the page, and others.</li>
				<li><code>meta charset="utf-8"</code> sets the default character set for your page and includes most characters from many written languages.</li>
				<li><code>title</code> sets the title of your page, which appears in the browser tab your page is loaded in.</li>
				<li><code>body</code> is a container for everything your user sees on the page.</li>
				<li><code>script</code> tags can be placed at the bottom so that they do not block the rendering of the html.</li>
			</ol>

			<p></p>
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
