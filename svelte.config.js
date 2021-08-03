import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import path from 'path'
import adapter from '@sveltejs/adapter-netlify'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    "extensions": [".svelte", ...mdsvexConfig.extensions],

    kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: adapter(),
		target: '#svelte',
		vite: {
			resolve: {
				alias: {
					'@components': path.resolve('./src/lib/components'),
					'@lib': path.resolve('./src/lib'),
					'@utils': path.resolve('./src/lib/utils')
				}
			}
		}
	},

    preprocess: [mdsvex(mdsvexConfig)]
}

export default config

