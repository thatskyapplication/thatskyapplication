import type { Snowflake } from "@discordjs/core/http-only";
import { CDN } from "@thatskyapplication/utility";
import { CDN_URL } from "./config.js";

export const CDN_PROXY_PREFIX = "/cdn" as const;
const CDN_ALLOWED_PREFIX = "sky_profiles/icons/" as const;

const cdn = new CDN(CDN_URL);

export function skyProfileIconURL(userId: Snowflake, icon: string) {
	return `${CDN_PROXY_PREFIX}/${cdn.skyProfileIconRoute(userId, icon)}`;
}

const cdnBase = new URL(`${CDN_URL}/`);
const cdnAllowedBase = new URL(CDN_ALLOWED_PREFIX, cdnBase);

export function cdnTarget(path: string) {
	let target: URL;

	try {
		target = new URL(path, cdnBase);
	} catch {
		return null;
	}

	return target.origin === cdnBase.origin && target.href.startsWith(cdnAllowedBase.href)
		? target.href
		: null;
}
