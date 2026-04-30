import type { Snowflake } from "@discordjs/core/http-only";
import { type APIGuildsMeResponse, guildsMeRoute } from "@thatskyapplication/utility";
import { INTERNAL_URL_CAELUS } from "~/config.server.js";

const ABORT_SIGNAL_TIMEOUT = 5_000 as const;

export async function caelusInGuild(guildId: Snowflake) {
	const response = await fetch(`${INTERNAL_URL_CAELUS}${guildsMeRoute(guildId)}`, {
		signal: AbortSignal.timeout(ABORT_SIGNAL_TIMEOUT),
	});

	return ((await response.json()) as APIGuildsMeResponse).present;
}
