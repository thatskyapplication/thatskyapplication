import type { RESTPostOAuth2AccessTokenResult, Snowflake } from "@discordjs/core/http-only";
import { DiscordAPIError } from "@discordjs/rest";
import type { Kysely } from "kysely";
import type { DB } from "@thatskyapplication/utility";
import { APPLICATION_ID, DISCORD_CLIENT_SECRET } from "~/config.server.js";
import database from "~/database.server.js";
import discord from "~/discord.js";
import pino from "~/pino.js";

const TOKEN_EXPIRY_LEEWAY = 60000 as const;
const REFRESH_TIMEOUT = 10000 as const;

export class DiscordAuthorisationError extends Error {
	public override readonly name = "DiscordAuthorisationError";

	public constructor() {
		super("There is no usable Discord authorisation.");
	}
}

function isExpired(expiresAt: Date) {
	return expiresAt.getTime() - TOKEN_EXPIRY_LEEWAY <= Date.now();
}

export async function saveDiscordOAuth(
	userId: Snowflake,
	result: RESTPostOAuth2AccessTokenResult,
	executor: Kysely<DB> = database,
) {
	await executor
		.insertInto("discord_oauth")
		.values({
			user_id: userId,
			access_token: result.access_token,
			refresh_token: result.refresh_token,
			expires_at: new Date(Date.now() + result.expires_in * 1000),
		})
		.onConflict((oc) =>
			oc.column("user_id").doUpdateSet((eb) => ({
				access_token: eb.ref("excluded.access_token"),
				refresh_token: eb.ref("excluded.refresh_token"),
				expires_at: eb.ref("excluded.expires_at"),
			})),
		)
		.execute();
}

export async function getAccessToken(userId: Snowflake) {
	const discordOAuthPacket = await database
		.selectFrom("discord_oauth")
		.selectAll()
		.where("user_id", "=", userId)
		.executeTakeFirst();

	if (!discordOAuthPacket) {
		throw new DiscordAuthorisationError();
	}

	if (!isExpired(discordOAuthPacket.expires_at)) {
		return discordOAuthPacket.access_token;
	}

	const accessToken = await database.transaction().execute(async (transaction) => {
		const lockedDiscordOAuthPacket = await transaction
			.selectFrom("discord_oauth")
			.selectAll()
			.where("user_id", "=", userId)
			.forUpdate()
			.executeTakeFirst();

		if (!lockedDiscordOAuthPacket) {
			return null;
		}

		if (!isExpired(lockedDiscordOAuthPacket.expires_at)) {
			return lockedDiscordOAuthPacket.access_token;
		}

		let result: RESTPostOAuth2AccessTokenResult;

		try {
			result = await discord.oauth2.refreshToken(
				{
					client_id: APPLICATION_ID,
					client_secret: DISCORD_CLIENT_SECRET,
					grant_type: "refresh_token",
					refresh_token: lockedDiscordOAuthPacket.refresh_token,
				},
				{ signal: AbortSignal.timeout(REFRESH_TIMEOUT) },
			);
		} catch (error) {
			if (error instanceof DiscordAPIError && error.code === "invalid_grant") {
				pino.info({ userId }, "The Discord authorisation was revoked.");
				await transaction.deleteFrom("discord_oauth").where("user_id", "=", userId).execute();
				return null;
			}

			pino.error({ error, userId }, "Failed to refresh the Discord access token.");
			throw error;
		}

		await saveDiscordOAuth(userId, result, transaction);
		return result.access_token;
	});

	if (accessToken === null) {
		throw new DiscordAuthorisationError();
	}

	return accessToken;
}
