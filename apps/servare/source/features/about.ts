import { client } from "../discord.js";
import { DEFAULT_EMBED_COLOUR, SUPPORT_SERVER_INVITE_URL } from "../utility/constants.js";
import { avatarURL } from "../utility/functions.js";

export async function about() {
	const currentUser = await client.api.users.getCurrent();

	return {
		color: DEFAULT_EMBED_COLOUR,
		description: `I am a Sky-themed moderation application.\nFor support, join the [support server](${SUPPORT_SERVER_INVITE_URL}).`,
		footer: { text: "thatskyapplication", icon_url: avatarURL(currentUser) },
		title: currentUser.username,
		url: "https://thatskyapplication.com",
	};
}
