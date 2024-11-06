import {
	type APIChatInputApplicationCommandInteraction,
	Locale,
	PermissionFlagsBits,
} from "@discordjs/core";
import { t } from "i18next";
import type { InteractionPayload } from "../../models/InteractionPayload.js";
import { setup, status, unset } from "../../services/notification.js";
import { NOT_IN_CACHED_GUILD_RESPONSE } from "../../utility/constants.js";
import { cannotUsePermissions } from "../../utility/permissions.js";

export default {
	name: t("notifications.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput({ client, interaction }: InteractionPayload) {
		if (!interaction.guild_id) {
			await client.api.interactions.reply(
				interaction.id,
				interaction.token,
				NOT_IN_CACHED_GUILD_RESPONSE,
			);
			return;
		}

		if (
			await cannotUsePermissions(client.api, interaction, PermissionFlagsBits.UseExternalEmojis)
		) {
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
	async setup(interaction: APIChatInputApplicationCommandInteraction) {
		await setup(interaction);
	},
	async status(interaction: APIChatInputApplicationCommandInteraction) {
		await status(interaction);
	},
	async unset(interaction: APIChatInputApplicationCommandInteraction) {
		await unset(interaction);
	},
} as const;
