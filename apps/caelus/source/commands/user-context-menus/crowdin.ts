import { type APIUserApplicationCommandInteraction, MessageFlags } from "@discordjs/core";
import { client } from "../../discord.js";
import { crowdinUserProfile } from "../../features/crowdin.js";

export default {
	name: "Crowdin",
	async userContextMenu(interaction: APIUserApplicationCommandInteraction) {
		const { data } = interaction;
		const userProfile = await crowdinUserProfile(data.target_id);

		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: userProfile ?? "No associated Crowdin account.",
			flags: MessageFlags.Ephemeral,
		});
	},
} as const;
