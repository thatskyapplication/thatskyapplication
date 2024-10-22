import {
	type ChatInputCommandInteraction,
	EmbedBuilder,
	MessageFlags,
	hyperlink,
} from "discord.js";
import {
	ABOUT_DESCRIPTION,
	ABOUT_SPONSOR,
	APPLICATION_INVITE_URL,
	DEFAULT_EMBED_COLOUR,
	SUPPORT_SERVER_INVITE_URL,
	WEBSITE_URL,
} from "../utility/constants.js";

export async function about(interaction: ChatInputCommandInteraction) {
	const { client } = interaction;

	await interaction.reply({
		embeds: [
			new EmbedBuilder()
				.setColor(DEFAULT_EMBED_COLOUR)
				.setDescription(ABOUT_DESCRIPTION)
				.setFields(
					{
						name: "Website",
						value: hyperlink("Link", WEBSITE_URL),
						inline: true,
					},
					{
						name: "Invite",
						value: hyperlink("Link", APPLICATION_INVITE_URL),
						inline: true,
					},
					{
						name: "Support Server",
						value: hyperlink("Link", SUPPORT_SERVER_INVITE_URL),
						inline: true,
					},
					{
						name: "Sponsor",
						value: ABOUT_SPONSOR,
					},
				)
				.setFooter({ text: "thatskyapplication", iconURL: client.user.displayAvatarURL() })
				.setTitle(client.user.username)
				.setURL(WEBSITE_URL),
		],
		flags: MessageFlags.Ephemeral,
	});
}
