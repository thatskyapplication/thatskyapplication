import {
	type APIChatInputApplicationCommandInteraction,
	Locale,
	MessageFlags,
} from "@discordjs/core";
import { DiscordSnowflake } from "@sapphire/snowflake";
import { t } from "i18next";
import { client } from "../../discord.js";
import { giveaway } from "../../features/giveaway.js";
import { interactionInvoker } from "../../utility/functions.js";

export default {
	name: t("giveaway.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const invokerId = interactionInvoker(interaction).id;

		await client.api.interactions.reply(interaction.id, interaction.token, {
			components: await giveaway({
				userId: invokerId,
				createdTimestamp: DiscordSnowflake.timestampFrom(invokerId),
				viewInformation: false,
				guildId: interaction.guild_id,
			}),
			flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
		});
	},
} as const;
