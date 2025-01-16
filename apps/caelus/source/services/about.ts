import { type APIChatInputApplicationCommandInteraction, MessageFlags } from "@discordjs/core";
import { calculateUserDefaultAvatarIndex } from "@discordjs/rest";
import { WEBSITE_URL } from "@thatskyapplication/utility";
import { client } from "../discord.js";
import {
	ABOUT_DESCRIPTION,
	ABOUT_SPONSOR,
	APPLICATION_INVITE_URL,
	DEFAULT_EMBED_COLOUR,
	SUPPORT_SERVER_INVITE_URL,
} from "../utility/constants.js";

export async function about(interaction: APIChatInputApplicationCommandInteraction) {
	const currentUser = await client.api.users.getCurrent();

	const index =
		currentUser.discriminator === "0"
			? calculateUserDefaultAvatarIndex(currentUser.id)
			: Number(currentUser.discriminator) % 5;

	const iconURL = currentUser.avatar
		? client.rest.cdn.avatar(currentUser.id, currentUser.avatar)
		: client.rest.cdn.defaultAvatar(index);

	await client.api.interactions.reply(interaction.id, interaction.token, {
		embeds: [
			{
				color: DEFAULT_EMBED_COLOUR,
				description: ABOUT_DESCRIPTION,
				fields: [
					{
						name: "Website",
						value: `[Link](${WEBSITE_URL})`,
						inline: true,
					},
					{
						name: "Invite",
						value: `[Link](${APPLICATION_INVITE_URL})`,
						inline: true,
					},
					{
						name: "Support Server",
						value: `[Link](${SUPPORT_SERVER_INVITE_URL})`,
						inline: true,
					},
					{
						name: "Sponsor",
						value: ABOUT_SPONSOR,
					},
				],
				footer: { text: "thatskyapplication", icon_url: iconURL },
				title: currentUser.username,
				url: WEBSITE_URL,
			},
		],
		flags: MessageFlags.Ephemeral,
	});
}
