import { type APIChatInputApplicationCommandInteraction, MessageFlags } from "@discordjs/core";
import { t } from "i18next";
import { client } from "../../discord.js";
import { shop } from "../../features/shop.js";

export default {
	name: t("shop.command-name", { ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			components: shop(),
			flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
		});
	},
} as const;
