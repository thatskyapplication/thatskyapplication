import { reddit, settings } from "@devvit/web/server";
import { type PostV2, T3 } from "@devvit/web/shared";
import { SETTINGS_DUPLICATE_REMOVAL_REASON_ID } from "../utility/constants.js";
import { postIdWithoutPrefix } from "../utility/functions.js";

const MINIMUM_ORIGINAL_POST_SCORE = 30 as const;
const MINIMUM_ORIGINAL_POST_AGE_IN_DAYS = 7 as const;
const MAXIMUM_MATCHED_POSTS = 50 as const;

export async function duplicateCheck(post: PostV2) {
	const subreddit = await reddit.getCurrentSubreddit();
	const fetchedPost = await reddit.getPostById(T3(post.id));

	const posts = await subreddit
		.searchPosts({
			query: `title:"${fetchedPost.title.replaceAll('"', "")}"`,
			sort: "relevance",
			timeframe: "all",
		})
		.all();

	const matchedPosts = posts.filter(
		(postResult) =>
			postResult.id !== fetchedPost.id &&
			postResult.title === fetchedPost.title &&
			postResult.authorId !== fetchedPost.authorId,
	);

	if (matchedPosts.length > MAXIMUM_MATCHED_POSTS) {
		return;
	}

	const latestOriginalPostCreatedAt =
		fetchedPost.createdAt.getTime() - MINIMUM_ORIGINAL_POST_AGE_IN_DAYS * 86_400_000;

	const originalPost = matchedPosts
		.filter(
			(matchedPost) =>
				matchedPost.score >= MINIMUM_ORIGINAL_POST_SCORE &&
				matchedPost.createdAt.getTime() <= latestOriginalPostCreatedAt,
		)
		.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())[0];

	if (!originalPost) {
		return;
	}

	const originalPostLink = `https://redd.it/${postIdWithoutPrefix(originalPost.id)}`;
	await fetchedPost.remove(true);
	await fetchedPost.lock();
	const removalReasonId = await settings.get(SETTINGS_DUPLICATE_REMOVAL_REASON_ID);

	await fetchedPost.addRemovalNote({
		reasonId: typeof removalReasonId === "string" ? removalReasonId : "",
		modNote: `Duplicate trigger. Original: ${originalPostLink}`,
	});

	const comment = await fetchedPost.addComment({ text: `Duplicate: ${originalPostLink}` });
	await comment.distinguish(true);
}
