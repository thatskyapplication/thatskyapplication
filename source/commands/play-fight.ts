import { URL } from "node:url";
import {
	type ChatInputCommandInteraction,
	EmbedBuilder,
	Locale,
	MessageFlags,
	PermissionFlagsBits,
} from "discord.js";
import { t } from "i18next";
import { CDN_URL, DEFAULT_EMBED_COLOUR, MAX_PLAY_FIGHT_NO } from "../utility/Constants.js";
import type { ChatInputCommand } from "./index.js";

export default new (class implements ChatInputCommand {
	public readonly name = t("play-fight.command-name", { lng: Locale.EnglishGB, ns: "commands" });

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { channel, options } = interaction;
		const user = options.getUser("user", true);
		const member = options.getMember("user");

		if (user.id === interaction.user.id) {
			await interaction.reply({ content: "Play with others!", ephemeral: true });
			return;
		}

		if (interaction.inGuild() && !member) {
			await interaction.reply({
				content: `${user} is not in this server to fight.`,
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		if (
			channel &&
			!channel.isDMBased() &&
			member &&
			"user" in member &&
			!channel.permissionsFor(member).has(PermissionFlagsBits.ViewChannel)
		) {
			await interaction.reply({ content: `${user} is not around to be fought!`, ephemeral: true });
			return;
		}

		if (user.bot) {
			await interaction.reply({
				content: `${user} is a bot. They're pretty durable. Immune to fights, I'd say.`,
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		await interaction.reply({
			content: `${interaction.user} is fighting ${user}!`,
			embeds: [
				new EmbedBuilder()
					.setColor(DEFAULT_EMBED_COLOUR)
					.setImage(
						String(
							new URL(
								`play_fights/${Math.floor(Math.random() * MAX_PLAY_FIGHT_NO + 1)}.gif`,
								CDN_URL,
							),
						),
					),
			],
		});
	}
})();
