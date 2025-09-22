import type { APIChatInputApplicationCommandInteraction } from "@discordjs/core";
import { ai, customStatus } from "../../features/admin.js";
import { isGuildChatInputCommand } from "../../utility/functions.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: "admin",
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		if (!isGuildChatInputCommand(interaction)) {
			return;
		}

		const options = new OptionResolver(interaction);

		switch (options.getSubcommandGroup(false) ?? options.getSubcommand()) {
			case "ai": {
				await ai(interaction, options);
				return;
			}
			case "custom-status": {
				await customStatus(interaction, options);
				return;
			}
		}
	},
} as const;
