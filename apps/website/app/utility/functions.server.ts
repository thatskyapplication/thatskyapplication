import { randomBytes } from "node:crypto";
import { isbot } from "isbot";
import { redirect } from "react-router";
import { getSession } from "~/session.server.js";

export function generateState() {
	return randomBytes(16).toString("hex");
}

export function hasAnyHeaders(headers: Headers) {
	return [...headers].length > 0;
}

export async function requireDiscordAuthentication(request: Request) {
	const session = await getSession(request.headers.get("Cookie"));
	const discordUser = session.get("discord_user");
	const tokenExchange = session.get("token_exchange");

	if (!(discordUser && tokenExchange) || Date.now() > tokenExchange.expires_at) {
		const userAgent = request.headers.get("user-agent");

		// Keep link unfurlers on-site so they read our metadata instead.
		if (userAgent && isbot(userAgent)) {
			throw redirect("/");
		}

		const returnTo = encodeURIComponent(request.url);
		throw redirect(`/login?returnTo=${returnTo}`);
	}

	return { discordUser, tokenExchange };
}
