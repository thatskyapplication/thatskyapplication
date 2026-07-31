type RootLoaderDataWithCDNURL = {
	cdnURL: string;
};

export function getCDNURLFromMatches(
	matches: readonly ({ id: string; loaderData?: unknown } | undefined)[],
) {
	const rootData = matches.find((match) => match?.id === "root")?.loaderData as
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
