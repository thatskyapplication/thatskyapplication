import { type APIChatInputApplicationCommandInteraction, MessageFlags } from "@discordjs/core";
import { t } from "i18next";
import { client } from "../../discord.js";
import { checklist } from "../../features/checklist.js";
import { interactionInvoker } from "../../utility/functions.js";

export default {
	name: t("checklist.command-name", { ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			components: await checklist({
				userId: interactionInvoker(interaction).id,
				locale: interaction.locale,
			}),
			flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
		});
	},
} as const;
