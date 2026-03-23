import { redis } from "@devvit/web/server";
import type { OnPostSubmitRequest } from "@devvit/web/shared";
import type { Request } from "express";
import { postFlairsUpdate } from "../../features/post-flairs.js";
import { userFlairsCheckFlair } from "../../features/user-flairs.js";
import {
	REDIS_POST_FLAIRS_BY_POST_KEY,
	REDIS_POST_FLAIRS_KEY,
	SUBREDDIT_SKY_CHILDREN_OF_LIGHT,
} from "../../utility/constants.js";

export async function postTriggersPostSubmit(req: Request) {
	const { subreddit, post, author } = req.body as OnPostSubmitRequest;

	if (!(subreddit && post)) {
		throw new Error("Subreddit or post is missing from the request body.");
	}

	if (subreddit.name !== SUBREDDIT_SKY_CHILDREN_OF_LIGHT) {
		return;
	}

	if (author) {
		await userFlairsCheckFlair(author);
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
