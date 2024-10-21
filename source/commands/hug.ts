import { URL } from "node:url";
import {
	type ChatInputCommandInteraction,
	EmbedBuilder,
	Locale,
	MessageFlags,
	PermissionFlagsBits,
} from "discord.js";
import { t } from "i18next";
import { CDN_URL, DEFAULT_EMBED_COLOUR, MAX_HUG_NO } from "../Utility2/Constants.js";
import type { ChatInputCommand } from "./index.js";

export default new (class implements ChatInputCommand {
	public readonly name = t("hug.command-name", { lng: Locale.EnglishGB, ns: "commands" });

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { channel, guildLocale, options } = interaction;
		const user = options.getUser("user", true);
		const member = options.getMember("user");
		const resolvedLocale = guildLocale ?? Locale.EnglishGB;

		if (user.id === interaction.user.id) {
			await interaction.reply({
				content: t("hug.hug-self", { lng: resolvedLocale, ns: "commands" }),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		if (interaction.inGuild() && !member) {
			await interaction.reply({
				content: t("hug.not-in-server", {
					lng: resolvedLocale,
					ns: "commands",
					user: String(user),
				}),
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
			await interaction.reply({
				content: t("hug.not-around", { lng: resolvedLocale, ns: "commands", user: String(user) }),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		if (user.bot) {
			await interaction.reply({
				content: t("hug.bot", { lng: resolvedLocale, ns: "commands", user: String(user) }),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		await interaction.reply({
			content: t("hug.message", {
				lng: resolvedLocale,
				ns: "commands",
				user: String(user),
				invoker: String(interaction.user),
			}),
			embeds: [
				new EmbedBuilder()
					.setColor(DEFAULT_EMBED_COLOUR)
					.setImage(
						String(new URL(`hugs/${Math.floor(Math.random() * MAX_HUG_NO + 1)}.gif`, CDN_URL)),
					),
			],
		});
	}
})();
