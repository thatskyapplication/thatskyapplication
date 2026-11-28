import { randomBytes } from "node:crypto";
import { OAuth2Scopes } from "@discordjs/core/http-only";
import { DiscordAPIError } from "@discordjs/rest";
import { isBot } from "isbot";
import { redirect, type RouterContextProvider } from "react-router";
import { developerCache } from "~/cache.server.js";
import {
	APPLICATION_ID,
	DEVELOPER_ROLE_ID,
	REDIRECT_URI_LOGIN,
	SUPPORT_SERVER_GUILD_ID,
} from "~/config.server.js";
import discord from "~/discord.js";
import { getRequestSession } from "~/middleware/session.js";
import type { Session } from "~/session.server.js";

const DEVELOPER_CACHE_TIME_TO_LIVE_MINUTES = 5 as const;

export interface AuthenticationArguments {
	context: Readonly<RouterContextProvider>;
	request: Request;
	url: URL;
}

interface DiscordAuthenticationArguments extends AuthenticationArguments {
	scopes?: readonly OAuth2Scopes[];
}

interface DiscordAuthorisationRedirectOptions {
	session: Session;
	returnTo: string;
	scopes: readonly OAuth2Scopes[];
}

export function generateState() {
	return randomBytes(16).toString("hex");
}

export function redirectToDiscordAuthorisation({
	session,
	returnTo,
	scopes,
}: DiscordAuthorisationRedirectOptions) {
	const oAuthState = generateState();
	session.flash("oauth_state", oAuthState);
	session.flash("return_to", returnTo);

	return redirect(
		discord.oauth2.generateAuthorizationURL({
			client_id: APPLICATION_ID,
			response_type: "code",
			redirect_uri: REDIRECT_URI_LOGIN,
			scope: scopes.join(" "),
			state: oAuthState,
		}),
	);
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

export function requireDiscordAuthentication({
	context,
	request,
	url,
	scopes = [OAuth2Scopes.Identify],
}: DiscordAuthenticationArguments) {
	const session = getRequestSession(context);
	const discordUser = session.get("discord_user");

	if (!discordUser) {
		const userAgent = request.headers.get("user-agent");
		const justLoggedOut = url.searchParams.has(LOGGED_OUT_SEARCH_PARAMETER);

		if (justLoggedOut || (userAgent && isBot(userAgent))) {
			throw redirect("/");
		}

		throw redirectToDiscordAuthorisation({
			session,
			returnTo: `${url.pathname}${url.search}`,
			scopes,
		});
	}

	return { discordUser };
}

export async function requireAdminAccess({ context, request, url }: AuthenticationArguments) {
	const { discordUser } = requireDiscordAuthentication({ context, request, url });
	const cached = developerCache.get(discordUser.id);

	if (cached !== null) {
		if (!cached) {
			throw redirect("/");
		}

		return { discordUser };
	}

	let developer: boolean;

	try {
		const member = await discord.guilds.getMember(SUPPORT_SERVER_GUILD_ID, discordUser.id);
		developer = member.roles.includes(DEVELOPER_ROLE_ID);
	} catch (error) {
		if (!(error instanceof DiscordAPIError && error.status === 404)) {
			throw error;
		}

		developer = false;
	}

	developerCache.set(discordUser.id, developer, DEVELOPER_CACHE_TIME_TO_LIVE_MINUTES);

	if (!developer) {
		throw redirect("/");
	}

	return { discordUser };
}
