import { Buffer } from "node:buffer";
import { REDDIT_APPLICATION_ID, REDDIT_APPLICATION_SECRET } from "../utility/configuration.js";
import { REDDIT_BASE_WWW_URL, USER_AGENT } from "../utility/constants.js";

let accessToken: string | null = null;
let tokenExpiry: number | null = null;
const lastSeenPosts = new Map<string, string>();

interface AccessTokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope: string;
}

async function refreshAccessToken() {
	const params = new URLSearchParams();
	params.append("grant_type", "client_credentials");

	const response = await fetch(`${REDDIT_BASE_WWW_URL}/api/v1/access_token`, {
		method: "POST",
		body: params,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: `Basic ${Buffer.from(`${REDDIT_APPLICATION_ID}:${REDDIT_APPLICATION_SECRET}`).toString("base64")}`,
			"User-Agent": USER_AGENT,
		},
	});

	if (!response.ok) {
		throw new Error(await response.text());
	}

	const tokenData = (await response.json()) as AccessTokenResponse;
	accessToken = tokenData.access_token;
	tokenExpiry = Date.now() + tokenData.expires_in * 1000;
}

async function ensureValidToken() {
	if (!(accessToken && tokenExpiry && Date.now() < tokenExpiry)) {
		await refreshAccessToken();
	}
}

interface PostMediaMetadataItemS {
	u: string;
}

interface PostMediaMetadataItem {
	s: PostMediaMetadataItemS;
}

interface PostMediaMetadata {
	[media_id: string]: PostMediaMetadataItem;
}

interface PostSecureMediaRedditVideo {
	fallback_url: string;
}

interface PostSecureMedia {
	reddit_video: PostSecureMediaRedditVideo;
}

interface PostData {
	selftext: string;
	title: string;
	subreddit_name_prefixed: `r/${string}`;
	media_metadata?: PostMediaMetadata;
	name: string;
	secure_media: PostSecureMedia | null;
	is_reddit_media_domain: boolean;
	thumbnail: string;
	crosspost_parent_list?: Omit<PostData, "crosspost_parent_list">[];
	domain: string;
	over_18: boolean;
	spoiler: boolean;
	id: string;
	author: string;
	permalink: `/r/${string}`;
	url: string;
	created_utc: number;
	is_video: boolean;
}

interface Post {
	kind: string;
	data: PostData;
}

interface SubredditPostsData {
	after: string;
	dist: number;
	children: Post[];
}

interface SubredditPostsResponse {
	kind: string;
	data: SubredditPostsData;
}

export async function fetchSingleSubredditPosts(subreddit: string) {
	await ensureValidToken();
	const url = new URL(`https://oauth.reddit.com/r/${subreddit}/new`);
	url.searchParams.set("limit", "50");
	url.searchParams.set("raw_json", "1");

	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"User-Agent": USER_AGENT,
		},
	});

	if (!response.ok) {
		throw new Error(await response.text());
	}

	const posts = ((await response.json()) as SubredditPostsResponse).data.children;

	// I mean, you never know.
	if (posts.length === 0) {
		return [];
	}

	const lastSeenPostName = lastSeenPosts.get(subreddit);

	if (!lastSeenPostName) {
		// First run.
		lastSeenPosts.set(subreddit, posts[0]!.data.name);
		return [];
	}

	const newPosts = [];

	for (const post of posts) {
		if (post.data.name === lastSeenPostName) {
			break;
		}

		newPosts.push(post);
	}

	if (newPosts.length > 0) {
		lastSeenPosts.set(subreddit, newPosts[0]!.data.name);
	}

	return newPosts.reverse();
}

export async function fetchSubredditPosts() {
	return [
		...(await fetchSingleSubredditPosts("SkyChildrenOfLight")),
		...(await fetchSingleSubredditPosts("SkyGame")),
	].sort((a, b) => a.data.created_utc - b.data.created_utc);
}
