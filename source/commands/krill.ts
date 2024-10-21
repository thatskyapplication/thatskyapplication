import { URL } from "node:url";
import {
	type ChatInputCommandInteraction,
	EmbedBuilder,
	Locale,
	MessageFlags,
	PermissionFlagsBits,
} from "discord.js";
import { t } from "i18next";
import { CDN_URL, DEFAULT_EMBED_COLOUR, MAX_KRILL_NO } from "../utility/constants-2.js";
import type { ChatInputCommand } from "./index.js";

export default new (class implements ChatInputCommand {
	public readonly name = t("krill.command-name", { lng: Locale.EnglishGB, ns: "commands" });

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { channel, options } = interaction;
		const user = options.getUser("user", true);
		const member = options.getMember("user");

		if (user.id === interaction.user.id) {
			await interaction.reply({ content: "Self-krilling is no joke.", ephemeral: true });
			return;
		}

		if (interaction.inGuild() && !member) {
			await interaction.reply({
				content: `${user} is not in this server to be krilled.`,
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
			await interaction.reply({ content: `${user} is not around to be krilled!`, ephemeral: true });
			return;
		}

		if (user.bot) {
			await interaction.reply({
				content: `${user} is a bot. They're pretty strong. Immune to krills, I'd say.`,
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		await interaction.reply({
			content: `${user} has been krilled by ${interaction.user}!`,
			embeds: [
				new EmbedBuilder()
					.setColor(DEFAULT_EMBED_COLOUR)
					.setImage(
						String(new URL(`krills/${Math.floor(Math.random() * MAX_KRILL_NO + 1)}.gif`, CDN_URL)),
					),
			],
		});
	}
})();
