import path from 'path'
import adapter from '@sveltejs/adapter-netlify'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: adapter(),
		target: '#svelte',
		vite: {
			resolve: {
				alias: {
					'@lib': path.resolve('./src/lib')
				}
			}
		}
	}
}

export default config

