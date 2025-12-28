import type { OnPostDeleteRequest } from "@devvit/web/shared";
import type { Request } from "express";
import { userFlairsCheckFlair } from "../../features/user-flairs.js";

export async function postTriggersPostDelete(req: Request) {
	const { author } = req.body as OnPostDeleteRequest;

	if (!author) {
		return;
	}

	await userFlairsCheckFlair(author);
}
