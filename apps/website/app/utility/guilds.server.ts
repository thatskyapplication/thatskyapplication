import {
	OAuth2Scopes,
	PermissionFlagsBits,
	type RESTGetAPICurrentUserGuildsResult,
	type Snowflake,
} from "@discordjs/core/http-only";
import { DiscordAPIError } from "@discordjs/rest";
import { guildCache } from "~/cache.server.js";
import discord from "~/discord.js";
import { getRequestSession } from "~/middleware/session.js";
import { DiscordAuthorisationError, getAccessToken } from "./discord-oauth.server.js";
import {
	type AuthenticationArguments,
	redirectToDiscordAuthorisation,
	requireDiscordAuthentication,
} from "./functions.server.js";

const GUILDS_AUTHORISATION_SCOPES = [OAuth2Scopes.Identify, OAuth2Scopes.Guilds] as const;

async function getUserAdminGuilds(userId: Snowflake) {
	const cached = guildCache.get(userId);

	if (cached) {
		return cached;
	}

	const accessToken = await getAccessToken(userId);
	let guilds: RESTGetAPICurrentUserGuildsResult;

	try {
		guilds = await discord.users.getGuilds(undefined, {
			auth: { prefix: "Bearer", token: accessToken },
		});
	} catch (error) {
		if (error instanceof DiscordAPIError && error.status === 401) {
			throw new DiscordAuthorisationError();
		}

		throw error;
	}

	const guildsWithAdmin = guilds.filter(
		(guild) =>
			(BigInt(guild.permissions) & PermissionFlagsBits.Administrator) ===
			PermissionFlagsBits.Administrator,
	);

	guildCache.set(userId, guildsWithAdmin, 5);
	return guildsWithAdmin;
}

export async function requireUserAdminGuilds({ context, request, url }: AuthenticationArguments) {
	const { discordUser } = requireDiscordAuthentication({
		context,
		request,
		url,
		scopes: GUILDS_AUTHORISATION_SCOPES,
	});

	try {
		return await getUserAdminGuilds(discordUser.id);
	} catch (error) {
		if (error instanceof DiscordAuthorisationError) {
			throw redirectToDiscordAuthorisation({
				session: getRequestSession(context),
				returnTo: `${url.pathname}${url.search}`,
				scopes: GUILDS_AUTHORISATION_SCOPES,
			});
		}

		throw error;
	}
}
