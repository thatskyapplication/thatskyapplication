import { APPLICATION_NAME } from "~/utility/constants";

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
	return String(new URL(path, cdnURL));
}

export function applicationIconURL(cdnURL: string) {
	return cdnAssetURL(cdnURL, `avatar_icons/${APPLICATION_NAME.toLowerCase()}.webp`);
}

export function shardEruptionIconURL(cdnURL: string) {
	return cdnAssetURL(cdnURL, "assets/shard_strong.webp");
}

export function skyKidIconURL(cdnURL: string) {
	return cdnAssetURL(cdnURL, "assets/sky_kid.webp");
}

export function seasonalCandleIconURL(cdnURL: string) {
	return cdnAssetURL(cdnURL, "icons/seasonal_candle.webp");
}
