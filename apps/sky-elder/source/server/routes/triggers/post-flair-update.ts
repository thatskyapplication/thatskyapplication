import { redis } from "@devvit/web/server";
import type { OnPostFlairUpdateRequest } from "@devvit/web/shared";
import type { Request } from "express";
import { postFlairsUpdate } from "../../features/post-flairs.js";
import { userFlairsCheckFlair } from "../../features/user-flairs.js";
import { REDIS_POST_FLAIRS_BY_POST_KEY, REDIS_POST_FLAIRS_KEY } from "../../utility/constants.js";

export async function postTriggersPostFlairUpdate(req: Request) {
	const { subreddit, post, author } = req.body as OnPostFlairUpdateRequest;

	if (author) {
		await userFlairsCheckFlair(author);
	}

	if (!(subreddit && post)) {
		throw new Error("Subreddit or post is missing from the request body.");
	}

	// Get the prior post flair if we have it.
	const priorFlair = await redis.hGet(REDIS_POST_FLAIRS_BY_POST_KEY, post.id);

	if (priorFlair) {
		// If there is a prior flair, we should decrement its count, but only if it exists.
		const priorFlairCount = await redis.hGet(REDIS_POST_FLAIRS_KEY, priorFlair);

		if (priorFlairCount) {
			await redis.hIncrBy(REDIS_POST_FLAIRS_KEY, priorFlair, -1);
		}
	}

	// If there is a new flair, increment it. Else, remove it.
	// The payload would be present with empty values if removed.
	if (post.linkFlair?.templateId) {
		await Promise.all([
			redis.hIncrBy(REDIS_POST_FLAIRS_KEY, post.linkFlair.templateId, 1),
			redis.hSet(REDIS_POST_FLAIRS_BY_POST_KEY, { [post.id]: post.linkFlair.templateId }),
		]);
	} else {
		await redis.hDel(REDIS_POST_FLAIRS_BY_POST_KEY, [post.id]);
	}

	// Update on Discord.
	await postFlairsUpdate(subreddit.name);
}
