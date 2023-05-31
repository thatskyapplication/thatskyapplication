import { URL } from "node:url";
import {
	type ApplicationCommandData,
	type ChatInputCommandInteraction,
	ApplicationCommandType,
	EmbedBuilder,
	hyperlink,
} from "discord.js";
import { GITHUB_SPONSORS_URL, KO_FI_URL, PATREON_URL, THATSKYGAME_URL, WEBSITE_URL } from "../../Utility/Constants.js";
import type { ChatInputCommand } from "../index.js";

const SPONSOR_TEXT = `Want to give support? There are ways you can do that!
${hyperlink("Patreon", PATREON_URL)} | ${hyperlink("Ko-fi", KO_FI_URL)} | ${hyperlink(
	"GitHub",
	GITHUB_SPONSORS_URL,
)}` as const;

export default class implements ChatInputCommand {
	public readonly name = "about";

	public readonly type = ApplicationCommandType.ChatInput;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { client, guild } = interaction;

		await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setColor((await guild?.members.fetchMe())?.displayColor ?? 0)
					.setDescription(
						`Welcome to the awesome Discord bot for ${hyperlink(
							"Sky: Children of the Light",
							THATSKYGAME_URL,
							"thatskygame",
						)}!`,
					)
					.setFields(
						{
							name: "Invite",
							value: hyperlink("Link", new URL("invite", WEBSITE_URL)),
							inline: true,
						},
						{
							name: "Support Server",
							value: hyperlink("Link", new URL("support", WEBSITE_URL)),
							inline: true,
						},
						{
							name: "GitHub",
							value: hyperlink("Link", new URL("github", WEBSITE_URL)),
							inline: true,
						},
						{
							name: "Sponsor",
							value: SPONSOR_TEXT,
						},
					)
					.setFooter({ text: "thatskyapplication" })
					.setTitle(client.user.username)
					.setURL(WEBSITE_URL),
			],
			ephemeral: true,
		});
	}

	public get commandData(): ApplicationCommandData {
		return {
			name: this.name,
			description: "About me, the wondrous little Sky helper!",
			type: this.type,
		};
	}
}
