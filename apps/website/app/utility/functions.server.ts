import { randomBytes } from "node:crypto";
import { DiscordAPIError } from "@discordjs/rest";
import { isBot } from "isbot";
import { redirect, type RouterContextProvider } from "react-router";
import { DEVELOPER_ROLE_ID, SUPPORT_SERVER_GUILD_ID } from "~/config.server.js";
import discord from "~/discord.js";
import { getRequestSession } from "~/middleware/session.js";

interface AuthenticationArguments {
	context: Readonly<RouterContextProvider>;
	request: Request;
	url: URL;
}

export function generateState() {
	return randomBytes(16).toString("hex");
}

export const LOGGED_OUT_SEARCH_PARAMETER = "loggedOut" as const;

export function resolveReturnTo(returnTo: string | null | undefined, origin: string) {
	let returnToURL: URL;

	try {
		returnToURL = new URL(returnTo || "/", origin);
	} catch {
		return "/";
	}

	if (returnToURL.origin !== origin) {
		return "/";
	}

	const pathname = returnToURL.pathname.replace(/^\/+/, "");
	return `/${pathname}${returnToURL.search}${returnToURL.hash}`;
}

export function requireDiscordAuthentication({ context, request, url }: AuthenticationArguments) {
	const session = getRequestSession(context);
	const discordUser = session.get("discord_user");

	if (!discordUser) {
		const userAgent = request.headers.get("user-agent");
		const justLoggedOut = url.searchParams.has(LOGGED_OUT_SEARCH_PARAMETER);

		if (justLoggedOut || (userAgent && isBot(userAgent))) {
			throw redirect("/");
		}

		const returnTo = encodeURIComponent(String(url));
		throw redirect(`/login?returnTo=${returnTo}`);
	}

	return { discordUser };
}

export async function requireAdminAccess({ context, request, url }: AuthenticationArguments) {
	const { discordUser } = requireDiscordAuthentication({ context, request, url });

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
