import { Buffer } from "node:buffer";
import {
	type APIComponentInContainer,
	ButtonStyle,
	ComponentType,
	MessageFlags,
	RESTJSONErrorCodes,
	type RESTPostAPIWebhookWithTokenJSONBody,
	type RESTPostAPIWebhookWithTokenQuery,
	SeparatorSpacingSize,
} from "@discordjs/core";
import { DiscordAPIError } from "@discordjs/rest";
import {
	formatEmoji,
	type RedditWebhooksPacket,
	Table,
	WEBSITE_URL,
} from "@thatskyapplication/utility";
import { discord } from "../discord.js";
import { WebhookExecuteError } from "../models/webbook-execute-error.js";
import pg from "../pg.js";
import pino from "../pino.js";
import { REDDIT_APPLICATION_ID, REDDIT_APPLICATION_SECRET } from "../utility/configuration.js";
import {
	EXECUTE_TIMEOUT,
	MAXIMUM_CHARACTER_LIMIT,
	REDDIT_BASE_URL,
	REDDIT_BASE_WWW_URL,
	REDDIT_COLOUR,
	USER_AGENT,
} from "../utility/constants.js";
import { MISCELLANEOUS_EMOJIS } from "../utility/emojis.js";

let accessToken: string | null = null;
let tokenExpiry: number | null = null;
const seenPosts = new Map<string, Map<string, number>>();

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

interface PostMediaMetadataItemUnprocessed {
	status: "unprocessed";
}

interface PostMediaMetadataItemSJPG {
	u: string;
}

interface PostMediaMetadataItemSGIF {
	gif: string;
}

interface PostMediaMetadataItemGIF {
	status: "valid";
	m: "image/gif";
	s: PostMediaMetadataItemSGIF;
}

interface PostMediaMetadataItemJPG {
	status: "valid";
	m: "image/jpg";
	s: PostMediaMetadataItemSJPG;
}

interface PostMediaMetadataItemRedditVideo {
	status: "valid";
	e: "RedditVideo";
}

type PostMediaMetadataItem =
	| PostMediaMetadataItemGIF
	| PostMediaMetadataItemJPG
	| PostMediaMetadataItemRedditVideo
	| PostMediaMetadataItemUnprocessed;

interface PostMediaMetadata<Valid> {
	[media_id: string]: Valid extends true
		? Exclude<PostMediaMetadataItem, PostMediaMetadataItemUnprocessed>
		: PostMediaMetadataItem;
}

interface PostSecureMediaRedditVideo {
	fallback_url: string;
}

interface PostSecureMedia {
	reddit_video: PostSecureMediaRedditVideo;
}

interface PostData<ValidMediaMetadata> {
	selftext: string;
	title: string;
	subreddit_name_prefixed: `r/${string}`;
	media_metadata?: PostMediaMetadata<ValidMediaMetadata>;
	name: string;
	secure_media: PostSecureMedia | null;
	is_reddit_media_domain: boolean;
	thumbnail: string;
	crosspost_parent_list?: Omit<PostData<ValidMediaMetadata>, "crosspost_parent_list">[];
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

export interface Post<ValidMediaMetadata extends boolean = boolean> {
	kind: string;
	data: PostData<ValidMediaMetadata>;
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
	const seenPostsMap = seenPosts.get(subreddit);
	const url = new URL(`https://oauth.reddit.com/r/${subreddit}/new`);
	url.searchParams.set("limit", seenPostsMap === undefined ? "100" : "50");
	url.searchParams.set("raw_json", "1");

	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"User-Agent": USER_AGENT,
		},
	});

	if (!response.ok) {
		pino.warn({ res: response }, "Bad Reddit response.");
		throw new Error(await response.text());
	}

	const posts = ((await response.json()) as SubredditPostsResponse).data.children;

	if (posts.length === 0) {
		return [];
	}

	if (!seenPostsMap) {
		// First run.
		seenPosts.set(
			subreddit,
			posts.reduce(
				(map, post) => map.set(post.data.name, post.data.created_utc),
				new Map<string, number>(),
			),
		);

		return [];
	}

	const newPosts = posts.filter(
		(post): post is Post<true> =>
			!seenPostsMap.has(post.data.name) &&
			Object.values(post.data.media_metadata ?? {}).every(
				(mediaMetadataItem) => mediaMetadataItem.status === "valid",
			),
	);

	for (const newPost of newPosts) {
		seenPostsMap.set(newPost.data.name, newPost.data.created_utc);
	}

	if (seenPostsMap.size > 100) {
		// Keep only the most recent 100 post names.
		const sortedPosts = [...seenPostsMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 100);
		seenPosts.set(subreddit, new Map(sortedPosts));
	}

	return newPosts.reverse();
}

export async function fetchSubredditPosts() {
	return [
		...(await fetchSingleSubredditPosts("SkyGame")),
		...(await fetchSingleSubredditPosts("SkyChildrenOfLight")),
		...(await fetchSingleSubredditPosts("SkyChildrenofRage")),
	].sort((a, b) => a.data.created_utc - b.data.created_utc);
}

interface DiscordPayload {
	over18: boolean;
	payload: (RESTPostAPIWebhookWithTokenJSONBody & RESTPostAPIWebhookWithTokenQuery) & {
		wait: true;
	};
}

export async function reddit() {
	// Fetch webhooks.
	let redditWebhooksPackets = await pg<RedditWebhooksPacket>(Table.RedditWebhooks).select(
		"webhook_id",
		"webhook_token",
	);

	// Don't fetch posts if there are no webhooks.
	if (redditWebhooksPackets.length === 0) {
		return;
	}

	const posts = await fetchSubredditPosts();

	if (posts.length === 0) {
		return;
	}

	const payloads: DiscordPayload[] = [];
	const payloadsErrors = [];

	// Construct the payload for Discord.
	for (const post of posts) {
		try {
			let { data } = post;
			const title = `## ${data.title.replace(/^#+/g, (match) => match.replace(/#/g, "\\#"))}`;
			let authorText = `[u/${data.author}](${REDDIT_BASE_URL}/user/${data.author}) in [${data.subreddit_name_prefixed}](${REDDIT_BASE_URL}/${data.subreddit_name_prefixed})`;
			const footer = `-# ${formatEmoji(MISCELLANEOUS_EMOJIS.Reddit)} [thatskyapplication](${WEBSITE_URL}) (<t:${data.created_utc}:R>)`;

			if (data.crosspost_parent_list) {
				if (data.crosspost_parent_list.length > 1) {
					pino.warn(post, "Multiple crossposts found!");
				}

				data = data.crosspost_parent_list[0]!;

				authorText +=
					post.data.author === data.author
						? ` crossposted their own post from [${data.subreddit_name_prefixed}](${REDDIT_BASE_URL}/${data.subreddit_name_prefixed})`
						: ` crossposted from [${data.subreddit_name_prefixed}](${REDDIT_BASE_URL}/${data.subreddit_name_prefixed}) by [u/${data.author}](${REDDIT_BASE_URL}/user/${data.author})`;
			}

			const containerComponents: APIComponentInContainer[] = [
				{
					type: ComponentType.TextDisplay,
					content: title,
				},
				{
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
				{
					type: ComponentType.Section,
					accessory: {
						type: ComponentType.Button,
						style: ButtonStyle.Link,
						url: `${REDDIT_BASE_URL}${post.data.permalink}`,
						label: "View",
					},
					components: [{ type: ComponentType.TextDisplay, content: authorText }],
				},
			];

			const limit = MAXIMUM_CHARACTER_LIMIT - title.length - authorText.length - footer.length;

			// Text may be only new lines which Discord's API trims.
			if (data.selftext.trim().length > 0) {
				let selfText = data.selftext;

				if (selfText.length > limit) {
					selfText = `${selfText.slice(0, limit - 3)}...`;
				}

				containerComponents.push({ type: ComponentType.TextDisplay, content: selfText });
			}

			const urls = [];

			if (data.is_video && data.secure_media) {
				urls.push(data.secure_media.reddit_video.fallback_url);
			}

			for (const mediaMetadataItem of Object.values(data.media_metadata ?? {})) {
				if ("s" in mediaMetadataItem) {
					if ("u" in mediaMetadataItem.s) {
						urls.push(mediaMetadataItem.s.u);
					}

					if ("gif" in mediaMetadataItem.s) {
						urls.push(mediaMetadataItem.s.gif);
					}
				}
			}

			if (data.domain === "i.redd.it") {
				urls.push(data.url);
			}

			if (urls.length > 0) {
				// Reddit has a maximum of 20 assets. Discord has a maximum of 10.
				for (let index = 0; index < urls.length; index += 10) {
					const chunk = urls.slice(index, index + 10);

					containerComponents.push({
						type: ComponentType.MediaGallery,
						items: chunk.map((url) => ({ media: { url } })),
					});
				}
			}

			containerComponents.push(
				{
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
				{
					type: ComponentType.TextDisplay,
					content: footer,
				},
			);

			payloads.push({
				over18: post.data.over_18 || data.over_18,
				payload: {
					allowed_mentions: { parse: [] },
					components: [
						{
							type: ComponentType.Container,
							components: containerComponents,
							accent_color: REDDIT_COLOUR,
							spoiler: post.data.spoiler,
						},
					],
					flags: MessageFlags.IsComponentsV2,
					wait: true,
					with_components: true,
				},
			});
		} catch (error) {
			payloadsErrors.push({ post, error });
		}
	}

	if (payloadsErrors.length > 0) {
		pino.error({ payloadsErrors }, "Failed to generate Reddit payloads.");
	}

	// Execute webhooks.
	for (const payload of payloads) {
		if (payload.over18) {
			continue;
		}

		const abortController = new AbortController();
		const timeout = setTimeout(() => abortController.abort(), EXECUTE_TIMEOUT);

		const promises = redditWebhooksPackets.map((redditWebhooksPacket) =>
			discord.webhooks
				.execute(
					redditWebhooksPacket.webhook_id,
					redditWebhooksPacket.webhook_token,
					payload.payload,
					{ signal: abortController.signal },
				)
				.catch((error) => Promise.reject(new WebhookExecuteError(redditWebhooksPacket, error))),
		);

		const settled = await Promise.allSettled(promises);
		clearTimeout(timeout);
		const errors = [];

		for (const result of settled) {
			if (result.status === "rejected") {
				const reason = result.reason as WebhookExecuteError;

				if (
					reason.cause instanceof DiscordAPIError &&
					reason.cause.code === RESTJSONErrorCodes.UnknownWebhook
				) {
					pino.info(`Deleting unknown webhook ${reason.webhook.webhook_id}.`);

					await pg<RedditWebhooksPacket>(Table.RedditWebhooks)
						.delete()
						.where({ webhook_id: reason.webhook.webhook_id });

					redditWebhooksPackets = redditWebhooksPackets.filter(
						(packet) => packet.webhook_id !== reason.webhook.webhook_id,
					);
				} else {
					errors.push(reason);
				}
			}
		}

		if (errors.length > 0) {
			pino.error(
				{ posts, error: new AggregateError(errors, "Failed to execute webooks.") },
				"Failed to execute webhooks.",
			);
		}
	}
}
