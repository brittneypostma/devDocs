import fm from 'front-matter';
import glob from 'glob';
import { fs } from 'mz';
import path from 'path';

export async function get(req, res) {
	// List the Markdown files and return their filenames
	const posts = await new Promise((resolve, reject) =>
		glob('static/_posts/*.md', (err, files) => {
			if (err) return reject(err);
			return resolve(files);
		})
	);

	// Read the files and parse the metadata + content
	const postsFrontMatter = await Promise.all(
		posts.map(async post => {
			const content = (await fs.readFile(post)).toString();
			// Add the slug (based on the filename) to the metadata, so we can create links to this blog post
			return { ...fm(content).attributes, slug: path.parse(post).name };
		})
	);

	// Sort by reverse date, because it's a blog
	postsFrontMatter.sort((a, b) => (a.date < b.date ? 1 : -1));

	res.writeHead(200, {
		'Content-Type': 'application/json',
	});

	// Send the list of blog posts to our Svelte component
	res.end(JSON.stringify(postsFrontMatter));
}
