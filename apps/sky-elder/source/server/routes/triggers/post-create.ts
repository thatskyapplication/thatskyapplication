import { type Post, reddit, settings } from "@devvit/web/server";
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
	let originalPost: Post | null = null;

	if (post.crosspostParentId) {
		originalPost = await reddit.getPostById(post.crosspostParentId as T3);

		authorText +=
			author.name === originalPost.authorName
				? ` crossposted their own post from [${originalPost.subredditName}](${originalPost.url})`
				: ` crossposted from [${originalPost.subredditName}](${originalPost.url}) by [u/${originalPost.authorName}](${originalPost.url})`;
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
	let text = originalPost?.body ?? post.selftext;

	if (text.trim().length > 0) {
		if (text.length > limit) {
			text = `${text.slice(0, limit - 3)}...`;
		}

		containerComponents.push({ type: ComponentType.TextDisplay, content: text });
	}

	const urls = [];

	if (post.isImage) {
		urls.push(post.url);
	}

	if (originalPost?.gallery && originalPost.gallery.length > 0) {
		for (const galleryMedia of originalPost.gallery) {
			urls.push(galleryMedia.url);
		}
	} else if (post.galleryImages.length > 0) {
		urls.push(...post.galleryImages);
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
