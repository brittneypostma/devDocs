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

			
		`
  },

  {
    title: "CSS",
    slug: "css",
    html: `
			
		`
  }

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
  post.html = post.html.replace(/^\t{3}/gm, "");
});

export default posts;
