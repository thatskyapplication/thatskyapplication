import { friendshipTreeVariants } from "@thatskyapplication/friendship-tree-generator";
import { type Spirit, WEBSITE_URL } from "@thatskyapplication/utility";
import { SENTRY_RELEASE } from "~/config.server.js";

export function friendshipTreeImageURLs(spirit: Spirit) {
	return friendshipTreeVariants(spirit).map((variant) => {
		const imageURL = new URL(`/spirits/friendship-trees/${spirit.id}-${variant}.webp`, WEBSITE_URL);

		if (SENTRY_RELEASE) {
			imageURL.searchParams.set("v", SENTRY_RELEASE);
		}

		return imageURL.href;
	});
}
