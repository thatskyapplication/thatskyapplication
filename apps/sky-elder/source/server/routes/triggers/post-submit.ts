import { redis } from "@devvit/web/server";
import type { OnPostSubmitRequest } from "@devvit/web/shared";
import type { Request } from "express";
import { postFlairsUpdate } from "../../features/post-flairs.js";
import { REDIS_POST_FLAIRS_BY_POST_KEY, REDIS_POST_FLAIRS_KEY } from "../../utility/constants.js";

export async function postTriggersPostSubmit(req: Request) {
	const body = req.body as OnPostSubmitRequest;
	const { subreddit, post } = body;

	if (!(subreddit && post)) {
		throw new Error("Subreddit or post is missing from the request body.");
	}

	// The payload would be present with empty values if not set.
	if (!post.linkFlair?.templateId) {
		return;
	}

	await Promise.all([
		redis.hIncrBy(REDIS_POST_FLAIRS_KEY, post.linkFlair.templateId, 1),
		// The post flair update trigger does not contain the prior flair. Store it for future use.
		redis.hSet(REDIS_POST_FLAIRS_BY_POST_KEY, { [post.id]: post.linkFlair.templateId }),
	]);

	await postFlairsUpdate(subreddit.name);
}
