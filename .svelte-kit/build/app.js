import { respond } from '@sveltejs/kit/ssr';
import root from './generated/root.svelte';
import { set_paths } from './runtime/paths.js';
import { set_prerendering } from './runtime/env.js';
import * as user_hooks from "./hooks.js";

const template = ({ head, body }) => "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n  <head>\r\n    <meta charset=\"utf-8\" />\r\n    <meta\r\n      name=\"viewport\"\r\n      content=\"width=device-width,initial-scale=1, shrink-to-fit=no\"\r\n    />\r\n    <meta name=\"theme-color\" content=\"#e00000\" />\r\n    <meta name=\"msapplication-TileColor\" content=\"#ffc40d\" />\r\n\r\n    <!-- Primary Meta Tags -->\r\n    <title>Console Logs</title>\r\n    <meta name=\"title\" content=\"Console Logs\" />\r\n    <meta\r\n      name=\"description\"\r\n      content=\"A site for all my bytes of programming related knowledge.\"\r\n    />\r\n\r\n    <!-- Open Graph / Facebook -->\r\n    <meta property=\"og:type\" content=\"website\" />\r\n    <meta property=\"og:url\" content=\"https://console-logs.netlify.app/og.png\" />\r\n    <meta property=\"og:title\" content=\"Console Logs\" />\r\n    <meta\r\n      property=\"og:description\"\r\n      content=\"A site for all my bytes of programming related knowledge.\"\r\n    />\r\n    <meta\r\n      property=\"og:image\"\r\n      content=\"https://console-logs.netlify.app/og.png\"\r\n    />\r\n\r\n    <!-- Twitter -->\r\n    <meta property=\"twitter:card\" content=\"summary_large_image\" />\r\n    <meta\r\n      property=\"twitter:url\"\r\n      content=\"https://console-logs.netlify.app/og.png\"\r\n    />\r\n    <meta property=\"twitter:title\" content=\"Console Logs\" />\r\n    <meta\r\n      property=\"twitter:description\"\r\n      content=\"A site for all my bytes of programming related knowledge.\"\r\n    />\r\n    <meta\r\n      property=\"twitter:image\"\r\n      content=\"https://console-logs.netlify.app/og.png\"\r\n    />\r\n    <meta name=\"twitter:image:alt\" content=\"Console dot Logs Logo\" />\r\n    <link rel=\"stylesheet\" href=\"global.css\" />\r\n    <link rel=\"stylesheet\" href=\"prism.css\" />\r\n    <link rel=\"manifest\" href=\"manifest.json\" />\r\n    <link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/apple-touch-icon.png\" />\r\n    <link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"/favicon-32x32.png\" />\r\n    <link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"/favicon-16x16.png\" />\r\n    <link rel=\"mask-icon\" href=\"/safari-pinned-tab.svg\" color=\"#333333\" />\r\n    " + head + "\r\n  </head>\r\n\r\n  <body>\r\n    <div id=\"svelte\">" + body + "</div>\r\n\r\n    <script src=\"prismjs.js\"></script>\r\n  </body>\r\n</html>\r\n";

let options = null;

const default_settings = { paths: {"base":"","assets":"/."} };

// allow paths to be overridden in svelte-kit preview
// and in prerendering
export function init(settings = default_settings) {
	set_paths(settings.paths);
	set_prerendering(settings.prerendering || false);

	options = {
		amp: false,
		dev: false,
		entry: {
			file: "/./_app/start-4b1506ef.js",
			css: ["/./_app/assets/start-a8cd1609.css"],
			js: ["/./_app/start-4b1506ef.js","/./_app/chunks/vendor-e81d31f1.js"]
		},
		fetched: undefined,
		floc: false,
		get_component_path: id => "/./_app/" + entry_lookup[id],
		get_stack: error => String(error), // for security
		handle_error: /** @param {Error & {frame?: string}} error */ (error) => {
			if (error.frame) {
				console.error(error.frame);
			}
			console.error(error.stack);
			error.stack = options.get_stack(error);
		},
		hooks: get_hooks(user_hooks),
		hydrate: true,
		initiator: undefined,
		load_component,
		manifest,
		paths: settings.paths,
		read: settings.read,
		root,
		service_worker: null,
		router: true,
		ssr: true,
		target: "#svelte",
		template,
		trailing_slash: "never"
	};
}

const d = decodeURIComponent;
const empty = () => ({});

const manifest = {
	assets: [{"file":"Advanced_Javascript.png","size":621671,"type":"image/png"},{"file":"Octocat.png","size":32590,"type":"image/png"},{"file":"android-chrome-192x192.png","size":9295,"type":"image/png"},{"file":"android-chrome-512x512.png","size":13815,"type":"image/png"},{"file":"apple-touch-icon.png","size":7797,"type":"image/png"},{"file":"atomic-design/atomic-design.png","size":32753,"type":"image/png"},{"file":"atomic-design/atoms.png","size":71376,"type":"image/png"},{"file":"atomic-design/auto-layout.png","size":19865,"type":"image/png"},{"file":"atomic-design/designSystemChecklist.png","size":18145,"type":"image/png"},{"file":"atomic-design/pages.png","size":20887,"type":"image/png"},{"file":"bdesigned.svg","size":3233,"type":"image/svg+xml"},{"file":"big-o.jpg","size":746099,"type":"image/jpeg"},{"file":"bit.png","size":2234,"type":"image/png"},{"file":"browserconfig.xml","size":255,"type":"application/xml"},{"file":"css-podcast/banner.png","size":811949,"type":"image/png"},{"file":"css-podcast/gallery.svg","size":34648,"type":"image/svg+xml"},{"file":"css-podcast/skeletor.gif","size":3970542,"type":"image/gif"},{"file":"css-podcast/specificity.jpg","size":114879,"type":"image/jpeg"},{"file":"css-podcast/una_doodle.png","size":268124,"type":"image/png"},{"file":"data.png","size":38191,"type":"image/png"},{"file":"deno/Deno.jpg","size":278712,"type":"image/jpeg"},{"file":"deno/deno.gif","size":856068,"type":"image/gif"},{"file":"deno/deno.svg","size":6357,"type":"image/svg+xml"},{"file":"dun.png","size":146989,"type":"image/png"},{"file":"favicon-16x16.png","size":470,"type":"image/png"},{"file":"favicon-32x32.png","size":1007,"type":"image/png"},{"file":"favicon.ico","size":15406,"type":"image/vnd.microsoft.icon"},{"file":"fonts/SpaceMono-Regular.ttf","size":93252,"type":"font/ttf"},{"file":"fonts/WorkSans-Regular.ttf","size":135828,"type":"font/ttf"},{"file":"g/dev.png","size":138576,"type":"image/png"},{"file":"g/favicon.png","size":58392,"type":"image/png"},{"file":"g/octocat.png","size":35754,"type":"image/png"},{"file":"g/sun.png","size":7905,"type":"image/png"},{"file":"git-cheat-sheet.png","size":286887,"type":"image/png"},{"file":"git_areas.png","size":22255,"type":"image/png"},{"file":"gitcheatsheet.png","size":295491,"type":"image/png"},{"file":"github.svg","size":1582,"type":"image/svg+xml"},{"file":"global.css","size":2307,"type":"text/css"},{"file":"gql/page1.png","size":11684,"type":"image/png"},{"file":"great-success.png","size":81921,"type":"image/png"},{"file":"imperative_code.png","size":99344,"type":"image/png"},{"file":"in.svg","size":902,"type":"image/svg+xml"},{"file":"javascript_engine.png","size":282043,"type":"image/png"},{"file":"jr2sr/crp.png","size":22140,"type":"image/png"},{"file":"jr2sr/encryption.gif","size":224366,"type":"image/gif"},{"file":"jr2sr/error-webpack.png","size":164243,"type":"image/png"},{"file":"jr2sr/images.png","size":740364,"type":"image/png"},{"file":"jr2sr/performance.png","size":943445,"type":"image/png"},{"file":"jr2sr/roadmap.png","size":722454,"type":"image/png"},{"file":"jr2sr/ssh.png","size":227887,"type":"image/png"},{"file":"jr2sr/webpack.png","size":16690,"type":"image/png"},{"file":"languages.png","size":148725,"type":"image/png"},{"file":"logo-192.png","size":4760,"type":"image/png"},{"file":"logo-512.png","size":13928,"type":"image/png"},{"file":"logo.svg","size":10253,"type":"image/svg+xml"},{"file":"logos/atoms.svg","size":386,"type":"image/svg+xml"},{"file":"logos/css-podcast.png","size":14162,"type":"image/png"},{"file":"logos/css.svg","size":960,"type":"image/svg+xml"},{"file":"logos/deno.svg","size":6047,"type":"image/svg+xml"},{"file":"logos/git.svg","size":896,"type":"image/svg+xml"},{"file":"logos/gql.svg","size":2505,"type":"image/svg+xml"},{"file":"logos/html.svg","size":1021,"type":"image/svg+xml"},{"file":"logos/js.svg","size":1066,"type":"image/svg+xml"},{"file":"logos/md.svg","size":680,"type":"image/svg+xml"},{"file":"logos/next.svg","size":3386,"type":"image/svg+xml"},{"file":"logos/open-source-logo.png","size":8612,"type":"image/png"},{"file":"logos/python.svg","size":1313,"type":"image/svg+xml"},{"file":"logos/react.svg","size":2624,"type":"image/svg+xml"},{"file":"logos/redux.svg","size":1776,"type":"image/svg+xml"},{"file":"logos/sheets.png","size":7961,"type":"image/png"},{"file":"logos/uiux.svg","size":25077,"type":"image/svg+xml"},{"file":"logos/uiuxfull.svg","size":25069,"type":"image/svg+xml"},{"file":"logos/vscode.svg","size":329,"type":"image/svg+xml"},{"file":"manifest.json","size":424,"type":"application/json"},{"file":"mark_and_sweep.gif","size":147344,"type":"image/gif"},{"file":"me.png","size":97159,"type":"image/png"},{"file":"memory-stack.png","size":9814,"type":"image/png"},{"file":"moon.png","size":2371,"type":"image/png"},{"file":"mstile-150x150.png","size":8293,"type":"image/png"},{"file":"node_js.png","size":32086,"type":"image/png"},{"file":"og.png","size":19082,"type":"image/png"},{"file":"pollute.gif","size":3816686,"type":"image/gif"},{"file":"prism.css","size":6954,"type":"text/css"},{"file":"prismjs.js","size":111158,"type":"application/javascript"},{"file":"prototype_chain.png","size":780150,"type":"image/png"},{"file":"python.png","size":83564,"type":"image/png"},{"file":"react/Redux-flow.webp","size":11658,"type":"image/webp"},{"file":"react/class-methods.svg","size":43776,"type":"image/svg+xml"},{"file":"react/components.svg","size":20200,"type":"image/svg+xml"},{"file":"react/dom-tree.svg","size":35593,"type":"image/svg+xml"},{"file":"react/folders.png","size":15398,"type":"image/png"},{"file":"react/lifecycle-methods.png","size":35517,"type":"image/png"},{"file":"react/lifecycle.png","size":30517,"type":"image/png"},{"file":"react/react-native.png","size":119502,"type":"image/png"},{"file":"react/react.svg","size":1549,"type":"image/svg+xml"},{"file":"react/redux.svg","size":1121,"type":"image/svg+xml"},{"file":"react-3d/threejs-1cube-no-light-scene.svg","size":46204,"type":"image/svg+xml"},{"file":"react-3d/threejs-structure.svg","size":123539,"type":"image/svg+xml"},{"file":"recursion.png","size":14162,"type":"image/png"},{"file":"resources.pdf","size":218913,"type":"application/pdf"},{"file":"rtk/logo.png","size":33106,"type":"image/png"},{"file":"rwd/fill-fit.jpg","size":90720,"type":"image/jpeg"},{"file":"rwd/quote.jpg","size":156411,"type":"image/jpeg"},{"file":"safari-pinned-tab.svg","size":9252,"type":"image/svg+xml"},{"file":"sapper.png","size":3362,"type":"image/png"},{"file":"scope_chain.png","size":185977,"type":"image/png"},{"file":"scope_graph.png","size":669352,"type":"image/png"},{"file":"site.webmanifest","size":263,"type":"application/manifest+json"},{"file":"structure_tree.png","size":10829,"type":"image/png"},{"file":"sun.png","size":11245,"type":"image/png"},{"file":"svelte-logo-horizontal.svg","size":2735,"type":"image/svg+xml"},{"file":"svelte-logo.png","size":9346,"type":"image/png"},{"file":"svelte.png","size":14044,"type":"image/png"},{"file":"twitter.svg","size":1115,"type":"image/svg+xml"},{"file":"uiux/SPA Portfolio.html","size":7942,"type":"text/html"},{"file":"uiux/SPA Portfolio_files/bolt.png","size":869,"type":"image/png"},{"file":"uiux/SPA Portfolio_files/laptop.png","size":928,"type":"image/png"},{"file":"uiux/SPA Portfolio_files/marketing.png","size":1487,"type":"image/png"},{"file":"uiux/SPA Portfolio_files/responsive.png","size":26130,"type":"image/png"},{"file":"uiux/SPA Portfolio_files/styles.css","size":1560,"type":"text/css"},{"file":"uiux/contrast.png","size":113040,"type":"image/png"},{"file":"uiux/flow.jpg","size":1991270,"type":"image/jpeg"},{"file":"uiux/flow.png","size":145459,"type":"image/png"},{"file":"uiux/fonts.png","size":96976,"type":"image/png"},{"file":"uiux/ratio.png","size":36692,"type":"image/png"},{"file":"uiux/sans-serif.png","size":45650,"type":"image/png"},{"file":"uiux/serif.png","size":47340,"type":"image/png"},{"file":"uiux/sitemap.jpg","size":2465370,"type":"image/jpeg"},{"file":"uiux/sketching.png","size":126013,"type":"image/png"},{"file":"uiux/states.jpg","size":2674845,"type":"image/jpeg"},{"file":"uiux/typescale.png","size":270700,"type":"image/png"},{"file":"uiux/user-flow.png","size":140680,"type":"image/png"},{"file":"values.svg","size":355304,"type":"image/svg+xml"},{"file":"vscode-theme/header.png","size":43429,"type":"image/png"},{"file":"vscode-theme/inspect.png","size":19167,"type":"image/png"},{"file":"vscode-theme/json1.png","size":87100,"type":"image/png"},{"file":"vscode-theme/search.png","size":5136,"type":"image/png"},{"file":"vscode-theme/token1.png","size":161152,"type":"image/png"},{"file":"vscode-theme/token2.png","size":130960,"type":"image/png"},{"file":"vscode-theme/token3.png","size":185867,"type":"image/png"},{"file":"vscode-theme/token4.png","size":174358,"type":"image/png"},{"file":"youtube.svg","size":802,"type":"image/svg+xml"}],
	layout: "src/routes/__layout.svelte",
	error: "src/routes/__error.svelte",
	routes: [
		{
						type: 'page',
						pattern: /^\/$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'endpoint',
						pattern: /^\/logs\.json$/,
						params: empty,
						load: () => import("../../src/routes/logs/index.json.js")
					},
		{
						type: 'page',
						pattern: /^\/logs\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/logs/index.svelte"],
						b: ["src/routes/__error.svelte"]
					},
		{
						type: 'endpoint',
						pattern: /^\/logs\/([^/]+?)\.json$/,
						params: (m) => ({ slug: d(m[1])}),
						load: () => import("../../src/routes/logs/[slug].json.js")
					},
		{
						type: 'page',
						pattern: /^\/logs\/([^/]+?)\/?$/,
						params: (m) => ({ slug: d(m[1])}),
						a: ["src/routes/__layout.svelte", "src/routes/logs/[slug].svelte"],
						b: ["src/routes/__error.svelte"]
					}
	]
};

// this looks redundant, but the indirection allows us to access
// named imports without triggering Rollup's missing import detection
const get_hooks = hooks => ({
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || (({ request, resolve }) => resolve(request)),
	serverFetch: hooks.serverFetch || fetch
});

const module_lookup = {
	"src/routes/__layout.svelte": () => import("../../src/routes/__layout.svelte"),"src/routes/__error.svelte": () => import("../../src/routes/__error.svelte"),"src/routes/index.svelte": () => import("../../src/routes/index.svelte"),"src/routes/logs/index.svelte": () => import("../../src/routes/logs/index.svelte"),"src/routes/logs/[slug].svelte": () => import("../../src/routes/logs/[slug].svelte")
};

const metadata_lookup = {"src/routes/__layout.svelte":{"entry":"/./_app/pages/__layout.svelte-c40fd473.js","css":["/./_app/assets/pages/__layout.svelte-48428b46.css"],"js":["/./_app/pages/__layout.svelte-c40fd473.js","/./_app/chunks/vendor-e81d31f1.js"],"styles":null},"src/routes/__error.svelte":{"entry":"/./_app/pages/__error.svelte-bcc86294.js","css":[],"js":["/./_app/pages/__error.svelte-bcc86294.js","/./_app/chunks/vendor-e81d31f1.js"],"styles":null},"src/routes/index.svelte":{"entry":"/./_app/pages/index.svelte-08847188.js","css":["/./_app/assets/pages/index.svelte-7a765449.css"],"js":["/./_app/pages/index.svelte-08847188.js","/./_app/chunks/vendor-e81d31f1.js"],"styles":null},"src/routes/logs/index.svelte":{"entry":"/./_app/pages/logs/index.svelte-0c978ddc.js","css":["/./_app/assets/pages/logs/index.svelte-661ca756.css"],"js":["/./_app/pages/logs/index.svelte-0c978ddc.js","/./_app/chunks/vendor-e81d31f1.js"],"styles":null},"src/routes/logs/[slug].svelte":{"entry":"/./_app/pages/logs/[slug].svelte-aadc58e8.js","css":["/./_app/assets/pages/logs/[slug].svelte-5a067698.css"],"js":["/./_app/pages/logs/[slug].svelte-aadc58e8.js","/./_app/chunks/vendor-e81d31f1.js"],"styles":null}};

async function load_component(file) {
	return {
		module: await module_lookup[file](),
		...metadata_lookup[file]
	};
}

export function render(request, {
	prerender
} = {}) {
	const host = request.headers["host"];
	return respond({ ...request, host }, options, { prerender });
}