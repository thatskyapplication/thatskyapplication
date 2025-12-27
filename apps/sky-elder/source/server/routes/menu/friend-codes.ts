import type { Toast } from "@devvit/web/shared";
import type { Request, Response } from "express";
import { megathreadFriendCodes } from "../../features/megathread-friend-codes.js";

export async function postMenuMegathreadFriendCodes(_: Request, res: Response) {
	await megathreadFriendCodes(true);

	res.json({
		showToast: {
			text: "Success! Add the post to community highlights as a megathread and update references where necessary!",
			appearance: "success",
		} satisfies Toast,
	});
}
