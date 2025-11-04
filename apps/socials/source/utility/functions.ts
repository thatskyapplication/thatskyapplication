import { AppBskyRichtextFacet, type Facet, RichText } from "@atproto/api";
import { captureException } from "@sentry/node";
import pino from "../pino.js";

export function captureError(error: unknown, message?: string) {
	pino.error(error, message);
	captureException(error);
}

export function embedLinksInText(text: string, facets: Facet[]): string {
	const richText = new RichText({ text, facets });
	let result = "";
	let lastIndex = 0;
	const utf8ToUtf16Map = new Map<number, number>();

	for (let i = 0; i < text.length; i++) {
		const utf8Index = richText.unicodeText.utf16IndexToUtf8Index(i);
		utf8ToUtf16Map.set(utf8Index, i);
	}

	// Sort facets by start index.
	const sortedFacets = [...(richText.facets ?? [])].sort(
		(a, b) => a.index.byteStart - b.index.byteStart,
	);

	for (const facet of sortedFacets) {
		const startUtf16 = utf8ToUtf16Map.get(facet.index.byteStart) ?? lastIndex;
		const endUtf16 = utf8ToUtf16Map.get(facet.index.byteEnd) ?? text.length;
		result += text.slice(lastIndex, startUtf16);
		const facetText = text.slice(startUtf16, endUtf16);
		const feature = facet.features[0];

		if (AppBskyRichtextFacet.isLink(feature)) {
			result += `[${facetText}](${feature.uri})`;
		} else if (AppBskyRichtextFacet.isMention(feature)) {
			result += `[${facetText}](https://bsky.app/profile/${feature.did})`;
		} else if (AppBskyRichtextFacet.isTag(feature)) {
			const tagText = facetText.startsWith("#") ? facetText.slice(1) : facetText;
			result += `[${facetText}](https://bsky.app/search?q=%23${encodeURIComponent(tagText)})`;
		} else {
			result += facetText;
		}

		lastIndex = endUtf16;
	}

	// Add remaining text after the last facet.
	result += text.slice(lastIndex);
	return result;
}

export function formatBlueskyImageURL(did: string, id: string) {
	return `https://cdn.bsky.app/img/feed_thumbnail/plain/${did}/${id}`;
}

interface BlueskyProfile {
	handle: string;
	displayName?: string;
	avatar?: string;
}

export async function fetchBlueskyProfile(did: string) {
	const response = await fetch(
		`https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${did}`,
		{ method: "GET" },
	);

	if (!response.ok) {
		throw await response.json();
	}

	return (await response.json()) as BlueskyProfile;
}
