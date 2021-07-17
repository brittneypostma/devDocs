// TODO hardcoding the relative location makes this brittle
import { init, render } from '../output/server/app.js'; // eslint-disable-line import/no-unresolved
import { isContentTypeTextual } from '@sveltejs/kit/adapter-utils'; // eslint-disable-line import/no-unresolved

init();

export async function handler(event) {
	const { path, httpMethod, headers, rawQuery, body, isBase64Encoded } = event;

	const query = new URLSearchParams(rawQuery);

	const type = headers['content-type'];
	const rawBody =
		type && isContentTypeTextual(type)
			? isBase64Encoded
				? Buffer.from(body, 'base64').toString()
				: body
			: new TextEncoder('base64').encode(body);

	const rendered = await render({
		method: httpMethod,
		headers,
		path,
		query,
		rawBody
	});

	if (rendered) {
		return {
			isBase64Encoded: false,
			statusCode: rendered.status,
			...splitHeaders(rendered.headers),
			body: rendered.body
		};
	}

	return {
		statusCode: 404,
		body: 'Not found'
	};
}

/**
 * Splits headers into two categories: single value and multi value
 * @param {Record<string, string | string[]>} headers
 * @returns {{
 * headers: Record<string, string>,
 * multiValueHeaders: Record<string, string[]>
 * }}
 */
function splitHeaders(headers) {
	const h = {};
	const m = {};
	for (const key in headers) {
		const value = headers[key];
		const target = Array.isArray(value) ? m : h;
		target[key] = value;
	}
	return {
		headers: h,
		multiValueHeaders: m
	};
}
