import { context, type Post, reddit, redis, settings } from "@devvit/web/server";
import type { T3 } from "@devvit/web/shared";
import { skyCurrentSeason, skyNow } from "@thatskyapplication/utility";
import {
	REDIS_MEGATHREAD_FRIEND_CODES_KEY,
	SETTINGS_MEGATHREAD_FRIEND_CODES_POST_FLAIR_ID,
	SETTINGS_MEGATHREAD_FRIEND_CODES_TEXT_KEY,
	SETTINGS_MEGATHREAD_FRIEND_CODES_TITLE_KEY,
} from "../utility/constants.js";
import { postIdWithoutPrefix } from "../utility/functions.js";

export async function megathreadFriendCodes(force = false) {
	// Grab the current megathread.
	const postId = await redis.get(REDIS_MEGATHREAD_FRIEND_CODES_KEY);

	if (!postId) {
		// No post id. Make one.
		await megathreadCreate();
		return;
	}

	// Fetch the megathread.
	const post = await reddit.getPostById(postId as T3);

	// If it's archived, create a new one.
	if (post.isArchived()) {
		await megathreadCreate(post);
		return;
	}

	// Force check.
	// If there was no post id, one would have been created anyway.
	if (force) {
		await megathreadCreate(post);
		return;
	}

	// If there is no current season, do nothing.
	const currentSeason = skyCurrentSeason(skyNow());

	if (!currentSeason) {
		return;
	}

	// Only create a new megathread if the current season started after the megathread.
	if (currentSeason.start.toJSDate() <= post.createdAt) {
		return;
	}

	// Proceed to create the new megathread.
	await megathreadCreate(post);
}

async function megathreadCreate(post?: Post) {
	const [title, text, flairId] = await Promise.all([
		settings.get(SETTINGS_MEGATHREAD_FRIEND_CODES_TITLE_KEY),
		settings.get(SETTINGS_MEGATHREAD_FRIEND_CODES_TEXT_KEY),
		settings.get(SETTINGS_MEGATHREAD_FRIEND_CODES_POST_FLAIR_ID),
	]);

	if (
		typeof title !== "string" ||
		typeof text !== "string" ||
		typeof flairId !== "string" ||
		title.length === 0 ||
		text.length === 0 ||
		flairId.length === 0
	) {
		console.warn(
			"Attempted to create a friend codes megathread, but lacked the necessary settings to do so.",
		);

		return;
	}

	// Lock the old megathread, if necessary.
	if (post && !post.isLocked()) {
		await post.lock();
	}

	// Unsticky the old megathread, if necessary.
	if (post?.isStickied()) {
		await post.unsticky();
	}

	// Create a new megathread.
	const newMegathread = await reddit.submitPost({
		subredditName: context.subredditName,
		title,
		text,
		flairId,
	});

	const newMegathreadLink = `https://redd.it/${postIdWithoutPrefix(newMegathread.id)}`;

	if (post) {
		// Link to the new megathread.
		await post.edit({
			text: `A new megathread has been created. Follow the journey [here](${newMegathreadLink})!`,
		});

		// Update any rules that references the old megathread.
		const subreddit = await reddit.getCurrentSubreddit();
		const rules = await subreddit.getRules();
		const oldMegathreadLink = `https://redd.it/${postIdWithoutPrefix(post.id)}`;

		for (const rule of rules) {
			if (!rule.description.includes(oldMegathreadLink)) {
				continue;
			}

			await rule.update({
				description: rule.description.replace(oldMegathreadLink, newMegathreadLink),
			});
		}

		// Update any removal reasons that reference the old megathread.
		const removalReasons = await subreddit.getRemovalReasons();

		for (const removalReason of removalReasons) {
			if (!removalReason.message.includes(oldMegathreadLink)) {
				continue;
			}

			await subreddit.updateRemovalReason(removalReason.id, {
				title: removalReason.title,
				message: removalReason.message.replace(oldMegathreadLink, newMegathreadLink),
			});
		}
	}

	// We would also add the new megathread to community highlights, but there is no way to do that.
	await newMegathread.sticky(1);
	await newMegathread.distinguish();
	await newMegathread.setSuggestedCommentSort("NEW");

	// Update Redis.
	await redis.set(REDIS_MEGATHREAD_FRIEND_CODES_KEY, newMegathread.id);
}
