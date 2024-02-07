import { URL } from "node:url";
import {
	type ApplicationCommandData,
	type ChatInputCommandInteraction,
	type Snowflake,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	EmbedBuilder,
	Locale,
	PermissionFlagsBits,
} from "discord.js";
import { t } from "i18next";
import { CDN_URL, DEFAULT_EMBED_COLOUR, LOCALES, MAX_HUG_NO } from "../../Utility/Constants.js";
import pg, { Table } from "../../pg.js";
import type { ChatInputCommand } from "../index.js";

interface HugPacket {
	hugger_id: Snowflake;
	huggee_id: Snowflake;
	timestamp: Date;
}

export default new (class implements ChatInputCommand {
	public get data() {
		return {
			name: t("hug.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
			nameLocalizations: Object.fromEntries(
				LOCALES.map((locale) => [locale, t("hug.command-name", { lng: locale, ns: "commands" })]),
			),
			description: t("hug.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
			descriptionLocalizations: Object.fromEntries(
				LOCALES.map((locale) => [locale, t("hug.command-description", { lng: locale, ns: "commands" })]),
			),
			type: ApplicationCommandType.ChatInput,
			options: [
				{
					type: ApplicationCommandOptionType.User,
					name: t("hug.user", { lng: Locale.EnglishGB, ns: "commands" }),
					nameLocalizations: Object.fromEntries(
						LOCALES.map((locale) => [locale, t("hug.user", { lng: locale, ns: "commands" })]),
					),
					description: "The individual to be hugged.",
					descriptionLocalizations: Object.fromEntries(
						LOCALES.map((locale) => [locale, t("hug.user-description", { lng: locale, ns: "commands" })]),
					),
					required: true,
				},
			],
			dmPermission: false,
		} as const satisfies Readonly<ApplicationCommandData>;
	}

	public async chatInput(interaction: ChatInputCommandInteraction<"cached">) {
		const { channel, createdAt, guildLocale, options } = interaction;
		const user = options.getUser("user", true);
		const member = options.getMember("user");

		if (user.id === interaction.user.id) {
			await interaction.reply({
				content: t("hug.hug-self", { lng: guildLocale, ns: "commands" }),
				ephemeral: true,
			});

			return;
		}

		if (!member) {
			await interaction.reply({
				content: t("hug.not-in-server", { lng: guildLocale, ns: "commands", user: String(user) }),
				ephemeral: true,
			});

			return;
		}

		if (
			channel &&
			"user" in member &&
			!channel.isDMBased() &&
			!channel.permissionsFor(member).has(PermissionFlagsBits.ViewChannel)
		) {
			await interaction.reply({
				content: t("hug.not-around", { lng: guildLocale, ns: "commands", user: String(user) }),
				ephemeral: true,
			});

			return;
		}

		if (user.bot) {
			await interaction.reply({
				content: t("hug.bot", { lng: guildLocale, ns: "commands", user: String(user) }),
				ephemeral: true,
			});

			return;
		}

		await pg<HugPacket>(Table.Hugs).insert({
			hugger_id: interaction.user.id,
			huggee_id: user.id,
			timestamp: createdAt,
		});

		await interaction.reply({
			content: t("hug.message", { lng: guildLocale, ns: "commands", user: String(user), invoker: String(interaction.user) }),
			embeds: [
				new EmbedBuilder()
					.setColor(DEFAULT_EMBED_COLOUR)
					.setImage(String(new URL(`hugs/${Math.floor(Math.random() * MAX_HUG_NO + 1)}.gif`, CDN_URL))),
			],
		});
	}
})();
