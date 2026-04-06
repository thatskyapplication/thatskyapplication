type RootLoaderDataWithCDNURL = {
	cdnURL: string;
};

export function getCDNURLFromMatches(matches: readonly { data?: unknown; id: string }[]) {
	const rootData = matches.find((match) => match.id === "root")?.data as
		| RootLoaderDataWithCDNURL
		| undefined;

	if (!rootData?.cdnURL) {
		throw new Error("CDN URL was missing from the root loader data.");
	}

	return rootData.cdnURL;
}

export function cdnAssetURL(cdnURL: string, path: string) {
	return new URL(path, cdnURL).href;
}

export function discordEmojiURL(emojiId: string) {
	return `https://cdn.discordapp.com/emojis/${emojiId}.webp` as const;
}
