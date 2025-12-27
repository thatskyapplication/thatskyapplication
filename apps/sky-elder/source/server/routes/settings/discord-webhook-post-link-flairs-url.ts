import { redis } from "@devvit/web/server";
import type { SettingsValidationRequest, SettingsValidationResponse } from "@devvit/web/shared";
import type { Request, Response } from "express";
import {
	DISCORD_WEBHOOK_URL_REGULAR_EXPRESSION,
	REDIS_POST_FLAIRS_MESSAGE_ID_KEY,
} from "../../utility/constants.js";

export async function postSettingsDiscordWebhookPostLinkFlairsURL(req: Request, res: Response) {
	const { value } = req.body as SettingsValidationRequest<unknown>;

	if (typeof value !== "string") {
		res.json({
			success: false,
			error: "This should be a string. This is a bug, please report it!",
		} satisfies SettingsValidationResponse);

		return;
	}

	if (value === "") {
		await redis.del(REDIS_POST_FLAIRS_MESSAGE_ID_KEY);

		res.json({
			success: true,
		} satisfies SettingsValidationResponse);

		return;
	}

	if (!DISCORD_WEBHOOK_URL_REGULAR_EXPRESSION.test(value)) {
		res.json({
			success: false,
			error: "Invalid Discord webhook URL provided. Please ensure you are copying correctly!",
		} satisfies SettingsValidationResponse);

		return;
	}

	const response = await fetch(value);

	if (!response.ok) {
		res.json({
			success: false,
			error: "An error was encountered whilst verifying this webhook. Please double-check the URL!",
		} satisfies SettingsValidationResponse);

		return;
	}

	res.json({
		success: true,
	} satisfies SettingsValidationResponse);
}
