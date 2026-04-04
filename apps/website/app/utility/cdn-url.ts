import { skyProfileBannerRoute } from "@thatskyapplication/utility";
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

export function discordEmojiURL(emojiId: string) {
	return `https://cdn.discordapp.com/emojis/${emojiId}.webp`;
}

export function skyProfileBannerURL<UserId extends string>(
	cdnURL: string,
	userId: UserId,
	banner: string,
) {
	return cdnAssetURL(cdnURL, skyProfileBannerRoute(userId, banner));
}

export function skyKidIconURL(cdnURL: string) {
	return cdnAssetURL(cdnURL, "assets/sky_kid.webp");
}
