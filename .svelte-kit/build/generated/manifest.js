const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../../../src/routes/__error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/logs/index.svelte"),
	() => import("../../../src/routes/logs/[slug].svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/logs/index.json.js
	[/^\/logs\.json$/],

	// src/routes/logs/index.svelte
	[/^\/logs\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/logs/[slug].json.js
	[/^\/logs\/([^/]+?)\.json$/],

	// src/routes/logs/[slug].svelte
	[/^\/logs\/([^/]+?)\/?$/, [c[0], c[4]], [c[1]], (m) => ({ slug: d(m[1])})]
];

export const fallback = [c[0](), c[1]()];