import { context, reddit } from "@devvit/web/server";
import type { SettingsValidationRequest, SettingsValidationResponse } from "@devvit/web/shared";
import type { Request, Response } from "express";
import { SUBREDDIT_SKY_CHILDREN_OF_LIGHT } from "../../utility/constants.js";

export async function postSettingsMegathreadFriendCodesPostFlairId(req: Request, res: Response) {
	if (context.subredditName !== SUBREDDIT_SKY_CHILDREN_OF_LIGHT) {
		res.json({
			success: false,
			error: "Disallowed subreddit.",
		} satisfies SettingsValidationResponse);

		return;
	}

	const { value } = req.body as SettingsValidationRequest<unknown>;

	if (typeof value !== "string") {
		res.json({
			success: false,
			error: "This should be a string. This is a bug, please report it!",
		} satisfies SettingsValidationResponse);

		return;
	}

	if (value === "") {
		res.json({
			success: true,
		} satisfies SettingsValidationResponse);

		return;
	}

	if (
		!(await reddit.getPostFlairTemplates(context.subredditName)).some((flair) => flair.id === value)
	) {
		res.json({
			success: false,
			error: "Could not find a matching post flair.",
		} satisfies SettingsValidationResponse);

		return;
	}

	res.json({
		success: true,
	} satisfies SettingsValidationResponse);
}
