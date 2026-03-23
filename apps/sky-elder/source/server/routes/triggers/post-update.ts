import type { OnPostUpdateRequest } from "@devvit/web/shared";
import type { Request } from "express";
import { userFlairsCheckFlair } from "../../features/user-flairs.js";
import { SUBREDDIT_SKY_CHILDREN_OF_LIGHT } from "../../utility/constants.js";

export async function postTriggersPostUpdate(req: Request) {
	const { author, subreddit } = req.body as OnPostUpdateRequest;

	if (!(author && subreddit)) {
		throw new Error("Author or subreddit is missing from the request body.");
	}

	if (subreddit.name !== SUBREDDIT_SKY_CHILDREN_OF_LIGHT) {
		return;
	}

	await userFlairsCheckFlair(author);
}
