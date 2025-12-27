import type { SettingsValidationRequest, SettingsValidationResponse } from "@devvit/web/shared";
import type { Request, Response } from "express";

export async function postSettingsMegathreadFriendCodesTitle(req: Request, res: Response) {
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

	if (value.length > 300) {
		res.json({
			success: false,
			error: "The title must be 300 characters or less.",
		} satisfies SettingsValidationResponse);

		return;
	}

	res.json({
		success: true,
	} satisfies SettingsValidationResponse);
}
