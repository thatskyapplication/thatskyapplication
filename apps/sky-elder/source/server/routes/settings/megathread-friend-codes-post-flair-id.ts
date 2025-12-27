import { context, reddit } from "@devvit/web/server";
import type { SettingsValidationRequest, SettingsValidationResponse } from "@devvit/web/shared";
import type { Request, Response } from "express";

export async function postSettingsMegathreadFriendCodesPostFlairId(req: Request, res: Response) {
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
