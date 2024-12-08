import type { APIChatInputApplicationCommandInteraction } from "@discordjs/core";
import { isGuildChatInputCommand } from "../../utility/functions.js";
import { contentCreatorsDisplayEditOptions } from "../../services/content-creators.js";

export default {
	name: "content-creators",
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		if (!isGuildChatInputCommand(interaction)) {
			return;
		}

		await contentCreatorsDisplayEditOptions(interaction);
	},
} as const;
