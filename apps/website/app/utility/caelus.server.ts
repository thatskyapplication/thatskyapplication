import type { Snowflake } from "@discordjs/core/http-only";
import { type APIGuildsMeResponse, guildsMeRoute } from "@thatskyapplication/utility";
import { INTERNAL_URL_CAELUS } from "~/config.server.js";
import pino from "~/pino.js";

export async function caelusInGuild(guildId: Snowflake) {
	try {
		const response = await fetch(`${INTERNAL_URL_CAELUS}${guildsMeRoute(guildId)}`, {
			signal: AbortSignal.timeout(5000),
		});

		if (!response.ok) {
			if (response.status === 404) {
				return null;
			}

			pino.error({ guildId, response }, "Failed to fetch guild data from Caelus.");
			return null;
		}

		return ((await response.json()) as APIGuildsMeResponse).present;
	} catch (error) {
		pino.error({ error, guildId }, "Error fetching guild data from Caelus.");
		return null;
	}
}
