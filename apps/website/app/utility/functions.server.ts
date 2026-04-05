import { randomBytes } from "node:crypto";
import { DiscordAPIError } from "@discordjs/rest";
import { isbot } from "isbot";
import { redirect } from "react-router";
import { DEVELOPER_ROLE_ID, SUPPORT_SERVER_GUILD_ID } from "~/config.server.js";
import discord from "~/discord.js";
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

export async function requireAdminAccess(request: Request) {
	const { discordUser } = await requireDiscordAuthentication(request);

	try {
		const member = await discord.guilds.getMember(SUPPORT_SERVER_GUILD_ID, discordUser.id);

		if (!member.roles.includes(DEVELOPER_ROLE_ID)) {
			throw redirect("/");
		}

		return { discordUser, member };
	} catch (error) {
		if (error instanceof DiscordAPIError && error.status === 404) {
			throw redirect("/");
		}

		throw error;
	}
}
