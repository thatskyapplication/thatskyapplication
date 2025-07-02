import {
	type APIChatInputApplicationCommandInteraction,
	ButtonStyle,
	ComponentType,
	Locale,
	MessageFlags,
} from "@discordjs/core";
import { t } from "i18next";
import { client } from "../../discord.js";
import { DATA_DELETION_CUSTOM_ID } from "../../utility/constants.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("data.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const options = new OptionResolver(interaction);

		switch (options.getSubcommand()) {
			case "delete": {
				await client.api.interactions.reply(interaction.id, interaction.token, {
					components: [
						{
							type: ComponentType.ActionRow,
							components: [
								{
									type: ComponentType.Button,
									custom_id: DATA_DELETION_CUSTOM_ID,
									label: t("data.delete-my-data", { lng: interaction.locale, ns: "features" }),
									style: ButtonStyle.Danger,
								},
							],
						},
					],
					content: t("data.delete-message", { lng: interaction.locale, ns: "features" }),
					flags: MessageFlags.Ephemeral,
				});
			}
		}
	},
} as const;
