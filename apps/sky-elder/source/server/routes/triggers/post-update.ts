import type { OnPostUpdateRequest } from "@devvit/web/shared";
import type { Request } from "express";
import { userFlairsCheckFlair } from "../../features/user-flairs.js";

export async function postTriggersPostUpdate(req: Request) {
	const { author } = req.body as OnPostUpdateRequest;

	if (!author) {
		return;
	}

	await userFlairsCheckFlair(author);
}
