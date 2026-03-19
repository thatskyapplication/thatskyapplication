import { reddit, settings } from "@devvit/web/server";
import type { OnPostCreateRequest, T3 } from "@devvit/web/shared";
import {
	type APIComponentInContainer,
	ButtonStyle,
	ComponentType,
	MessageFlags,
	SeparatorSpacingSize,
} from "discord-api-types/v10";
import type { Request } from "express";
import { userFlairsCheckFlair } from "../../features/user-flairs.js";
import {
	MAXIMUM_CHARACTER_LIMIT,
	POST_CREATE_COLOUR,
	REDDIT_BASE_URL,
	SETTINGS_POSTS_WEBHOOK_URL,
} from "../../utility/constants.js";

export async function postTriggersPostCreate(req: Request) {
	const { subreddit, post, author } = req.body as OnPostCreateRequest;

	if (author) {
		await userFlairsCheckFlair(author);
	}

	if (post?.nsfw) {
		return;
	}

	if (!(subreddit && post && author)) {
		throw new Error("Subreddit, post, or author is missing from the request body.");
	}

	const discordWebhookURL = await settings.get(SETTINGS_POSTS_WEBHOOK_URL);

	if (typeof discordWebhookURL !== "string") {
		console.warn("Discord webhook URL is not set.");
		return;
	}

	const title = `## ${post.title.replace(/^#+/g, (match) => match.replace(/#/g, "\\#"))}`;
	let authorText = `[u/${author.name}](${author.url}) in [r/${subreddit.name}](${REDDIT_BASE_URL}${subreddit.permalink})`;
	const footer = `-# <t:${Math.floor(post.createdAt / 1000)}:R>`;
	const postV2 = await reddit.getPostById(post.id as T3);
	let resolvedPost = postV2;

	if (post.crosspostParentId) {
		resolvedPost = await reddit.getPostById(post.crosspostParentId as T3);

		authorText +=
			author.name === resolvedPost.authorName
				? ` crossposted their own post from [r/${resolvedPost.subredditName}](${resolvedPost.url})`
				: ` crossposted from [r/${resolvedPost.subredditName}](${resolvedPost.url}) by [u/${resolvedPost.authorName}](${resolvedPost.url})`;
	}

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Link,
				url: `${REDDIT_BASE_URL}${post.permalink}`,
				label: "View",
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: title,
				},
			],
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.TextDisplay,
			content: authorText,
		},
	];

	const limit = MAXIMUM_CHARACTER_LIMIT - title.length - authorText.length - footer.length;

	// Text may be only new lines which Discord's API trims.
	let text = resolvedPost.body;

	if (text && text.trim().length > 0) {
		if (text.length > limit) {
			text = `${text.slice(0, limit - 3)}...`;
		}

		containerComponents.push({ type: ComponentType.TextDisplay, content: text });
	}

	const urls = [];

	// `Post` doesn't seem to have a way to identify whether it's a single image.
	// We'll use `PostV2` then.
	if (post.isImage) {
		urls.push(post.url);
	}

	// `Post` doesn't seem to have a way to identify whether it's a video.
	// We'll use `PostV2` then.
	if (post.isVideo && resolvedPost.secureMedia?.redditVideo?.fallbackUrl) {
		urls.push(resolvedPost.secureMedia.redditVideo.fallbackUrl);
	}

	// Gallery check to ensure no thumbnails are
	if (post.isGallery && resolvedPost.gallery.length > 0) {
		for (const galleryMedia of resolvedPost.gallery) {
			urls.push(galleryMedia.url);
		}
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

	await fetch(`${discordWebhookURL}?wait=true&with_components=true`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			allowed_mentions: { parse: [] },
			components: [
				{
					type: ComponentType.Container,
					accent_color: POST_CREATE_COLOUR,
					components: containerComponents,
					spoiler: post.isSpoiler,
				},
			],
			flags: MessageFlags.IsComponentsV2,
		}),
	});
}
