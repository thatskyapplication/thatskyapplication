import {
	type ApplicationCommandData,
	ApplicationCommandType,
	type ChatInputCommandInteraction,
	EmbedBuilder,
	hyperlink,
} from "discord.js";
import {
	APPLICATION_INVITE_URL,
	DEFAULT_EMBED_COLOUR,
	GITHUB_SPONSORS_URL,
	KO_FI_URL,
	PATREON_URL,
	SUPPORT_SERVER_INVITE_URL,
	SkyMap,
	THATSKYGAME_URL,
	WEBSITE_URL,
} from "../../Utility/Constants.js";
import type { ChatInputCommand } from "../index.js";

const DESCRIPTION_TEXT = `Welcome to the lovely Discord bot for ${hyperlink(
	"Sky: Children of the Light",
	THATSKYGAME_URL,
	"thatskygame",
)}!

So you'd like to know about me, huh? Well, I like long walks across the ${
	SkyMap.SanctuaryIslands
}. Oh, and don't forget about gliding all over the ${SkyMap.StarlightDesert}. Also... JELLYFISH!

In any case, you can invite me by opening up my profile or using the invite link below! If you need help, head on to the support server linked also below and we'll figure it out together!` as const;

const SPONSOR_TEXT = `Want to give support? There are ways you can do that! Thank you in advance!
${hyperlink("Patreon", PATREON_URL)} | ${hyperlink("Ko-fi", KO_FI_URL)} | ${hyperlink(
	"GitHub",
	GITHUB_SPONSORS_URL,
)}` as const;

export default new (class implements ChatInputCommand {
	public readonly data = {
		name: "about",
		description: "About me, the wondrous little Sky helper!",
		type: ApplicationCommandType.ChatInput,
		integrationTypes: [0, 1],
		contexts: [0, 1, 2],
	} as const satisfies Readonly<ApplicationCommandData>;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { client } = interaction;

		await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setColor(DEFAULT_EMBED_COLOUR)
					.setDescription(DESCRIPTION_TEXT)
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
							value: SPONSOR_TEXT,
						},
					)
					.setFooter({ text: "thatskyapplication", iconURL: client.user.displayAvatarURL() })
					.setTitle(client.user.username)
					.setURL(WEBSITE_URL),
			],
			ephemeral: true,
		});
	}
})();
