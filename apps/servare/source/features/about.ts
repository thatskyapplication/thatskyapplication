import { calculateUserDefaultAvatarIndex } from "@discordjs/rest";
import { client } from "../discord.js";
import { DEFAULT_EMBED_COLOUR, SUPPORT_SERVER_INVITE_URL } from "../utility/constants.js";

export async function about() {
	const currentUser = await client.api.users.getCurrent();

	const index =
		currentUser.discriminator === "0"
			? calculateUserDefaultAvatarIndex(currentUser.id)
			: Number(currentUser.discriminator) % 5;

	const iconURL = currentUser.avatar
		? client.rest.cdn.avatar(currentUser.id, currentUser.avatar)
		: client.rest.cdn.defaultAvatar(index);

	return {
		color: DEFAULT_EMBED_COLOUR,
		description: `I am a Sky-themed moderation application.\nFor support, join the [support server](${SUPPORT_SERVER_INVITE_URL}).`,
		footer: { text: "thatskyapplication", icon_url: iconURL },
		title: currentUser.username,
		url: "https://thatskyapplication.com",
	};
}
