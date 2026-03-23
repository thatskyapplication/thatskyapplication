import { context } from "@devvit/web/server";
import type { Toast } from "@devvit/web/shared";
import type { Request, Response } from "express";
import { megathreadFriendCodes } from "../../features/megathread-friend-codes.js";
import { SUBREDDIT_SKY_CHILDREN_OF_LIGHT } from "../../utility/constants.js";

export async function postMenuMegathreadFriendCodes(_: Request, res: Response) {
	if (context.subredditName !== SUBREDDIT_SKY_CHILDREN_OF_LIGHT) {
		res.json({
			showToast: {
				text: "Disallowed subreddit.",
				appearance: "neutral",
			} satisfies Toast,
		});

		return;
	}

	await megathreadFriendCodes(true);

	res.json({
		showToast: {
			text: "Success! Add the post to community highlights as a megathread and update references where necessary!",
			appearance: "success",
		} satisfies Toast,
	});
}
