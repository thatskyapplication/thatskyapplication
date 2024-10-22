import { type ChatInputCommandInteraction, Locale, PermissionFlagsBits } from "discord.js";
import { t } from "i18next";
import { setup, status, unset } from "../../services/notification.js";
import { NOT_IN_CACHED_GUILD_RESPONSE } from "../../utility/constants.js";
import { cannotUsePermissions } from "../../utility/permission-checks.js";

export default {
	name: t("notifications.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: ChatInputCommandInteraction) {
		if (!interaction.inCachedGuild()) {
			await interaction.reply(NOT_IN_CACHED_GUILD_RESPONSE);
			return;
		}

		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		switch (interaction.options.getSubcommand()) {
			case "setup": {
				await this.setup(interaction);
				return;
			}
			case "status": {
				await this.status(interaction);
				return;
			}
			case "unset": {
				await this.unset(interaction);
			}
		}
	},
	async setup(interaction: ChatInputCommandInteraction<"cached">) {
		await setup(interaction);
	},
	async status(interaction: ChatInputCommandInteraction<"cached">) {
		await status(interaction);
	},
	async unset(interaction: ChatInputCommandInteraction<"cached">) {
		await unset(interaction);
	},
} as const;
