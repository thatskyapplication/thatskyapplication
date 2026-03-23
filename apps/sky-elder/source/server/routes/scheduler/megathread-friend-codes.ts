import { context } from "@devvit/web/server";
import { megathreadFriendCodes } from "../../features/megathread-friend-codes.js";
import { SUBREDDIT_SKY_CHILDREN_OF_LIGHT } from "../../utility/constants.js";

export async function postSchedulerMegathreadFriendCodes() {
	if (context.subredditName !== SUBREDDIT_SKY_CHILDREN_OF_LIGHT) {
		return;
	}

	await megathreadFriendCodes();
}
