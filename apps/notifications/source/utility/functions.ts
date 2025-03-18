import { Buffer } from "node:buffer";
import { request } from "undici";
import { pg } from "../pg.js";
import type { VersionsPacket } from "../types.js";
import { APP_STORE_ID, APP_STORE_TOKEN_REGULAR_EXPRESSION, VERSIONS_TABLE } from "./constants.js";

export async function updateAppStoreToken() {
	const appStoreText = await (
		await request(`https://apps.apple.com/us/app/sky-children-of-the-light/id${APP_STORE_ID}`)
	).body.text();
	const appStoreToken = APP_STORE_TOKEN_REGULAR_EXPRESSION.exec(appStoreText)?.[1];

	if (!appStoreToken) {
		throw new Error("Failed to fetch App Store token.");
	}

	await pg<VersionsPacket>(VERSIONS_TABLE).update({ app_store_token: appStoreToken });
	return appStoreToken;
}

export function isAppStoreTokenExpired(appStoreToken: string) {
	const [, payload] = appStoreToken.split(".");

	if (!payload) {
		throw new Error("Failed to extract payload from App Store token.");
	}

	const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"));
	return exp * 1000 < Date.now();
}
