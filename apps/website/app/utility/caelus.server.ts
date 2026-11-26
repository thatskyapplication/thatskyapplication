import type { Snowflake } from "@discordjs/core/http-only";
import {
	type APIGuildsMeResponse,
	type APIPostDailyGuidesDistributeBody,
	type APIPostDailyGuidesModificationBody,
	DAILY_GUIDES_DISTRIBUTE_ROUTE,
	DAILY_GUIDES_MODIFICATIONS_ROUTE,
	guildsMeRoute,
} from "@thatskyapplication/utility";
import { INTERNAL_URL_CAELUS } from "~/config.server.js";
import pino from "~/pino.js";

const ABORT_SIGNAL_TIMEOUT = 5_000 as const;

export async function caelusInGuild(guildId: Snowflake) {
	const response = await fetch(`${INTERNAL_URL_CAELUS}${guildsMeRoute(guildId)}`, {
		signal: AbortSignal.timeout(ABORT_SIGNAL_TIMEOUT),
	});

	return ((await response.json()) as APIGuildsMeResponse).present;
}

async function postToCaelus(route: string, body: unknown) {
	return fetch(`${INTERNAL_URL_CAELUS}${route}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
		signal: AbortSignal.timeout(ABORT_SIGNAL_TIMEOUT),
	});
}

export async function logDailyGuidesModification(body: APIPostDailyGuidesModificationBody) {
	let response: Response;

	try {
		response = await postToCaelus(DAILY_GUIDES_MODIFICATIONS_ROUTE, body);
	} catch (error) {
		pino.error(error, "Failed to reach Caelus whilst logging a daily guides modification.");
		return "unconfirmed" as const;
	}

	if (response.status !== 204) {
		pino.error(
			{ status: response.status },
			"Caelus did not log a daily guides modification from the website.",
		);

		return "refused" as const;
	}

	return "logged" as const;
}

export async function distributeDailyGuides(body: APIPostDailyGuidesDistributeBody) {
	let response: Response;

	try {
		response = await postToCaelus(DAILY_GUIDES_DISTRIBUTE_ROUTE, body);
	} catch (error) {
		pino.error(error, "Failed to reach Caelus whilst distributing daily guides.");
		return "unavailable" as const;
	}

	if (response.status === 202) {
		return "started" as const;
	}

	if (response.status === 409) {
		return "in-progress" as const;
	}

	pino.error({ status: response.status }, "Caelus did not distribute daily guides.");
	return "unavailable" as const;
}
