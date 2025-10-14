import { type APIChatInputApplicationCommandInteraction, MessageFlags } from "@discordjs/core";
import { DiscordSnowflake } from "@sapphire/snowflake";
import { client } from "../../discord.js";
import { giveaway } from "../../features/giveaway.js";
import { interactionInvoker } from "../../utility/functions.js";

export default {
	name: "giveaway",
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
