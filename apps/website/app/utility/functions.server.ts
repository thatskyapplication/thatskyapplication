import { randomBytes } from "node:crypto";
import { isbot } from "isbot";
import { redirect } from "react-router";
import { commitSession, getSession } from "~/session.server.js";

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
		const justLoggedOut = session.get("just_logged_out");

		// Keep link unfurlers on-site so they read our metadata instead.
		if (userAgent && isbot(userAgent)) {
			throw redirect("/");
		}

		if (justLoggedOut) {
			throw redirect("/", {
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			});
		}

		const returnTo = encodeURIComponent(request.url);
		throw redirect(`/login?returnTo=${returnTo}`);
	}

	return { discordUser, tokenExchange };
}
