import {
	type APIChatInputApplicationCommandInteraction,
	Locale,
	MessageFlags,
} from "@discordjs/core";
import { t } from "i18next";
import { client } from "../../discord.js";
import { start } from "../../features/catalogue.js";
import { interactionInvoker } from "../../utility/functions.js";

export default {
	name: t("catalogue.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			components: await start({
				userId: interactionInvoker(interaction).id,
				locale: interaction.locale,
			}),
			flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
		});
	},
} as const;
