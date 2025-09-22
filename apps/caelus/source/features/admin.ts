import {
	ActivityType,
	type APIChatInputApplicationCommandGuildInteraction,
	MessageFlags,
	PresenceUpdateStatus,
} from "@discordjs/core";
import { client } from "../discord.js";
import Configuration from "../models/Configuration.js";
import type { OptionResolver } from "../utility/option-resolver.js";

export async function ai(
	interaction: APIChatInputApplicationCommandGuildInteraction,
	options: OptionResolver,
) {
	const enable = options.getBoolean("enable", true);
	await Configuration.edit({ ai: enable });

	await client.api.interactions.reply(interaction.id, interaction.token, {
		content: `AI feature set to \`${Configuration.ai}\`.`,
		flags: MessageFlags.Ephemeral,
	});
}

export async function customStatus(
	interaction: APIChatInputApplicationCommandGuildInteraction,
	options: OptionResolver,
) {
	const text = options.getString("text", true);

	await client.updatePresence(0, {
		activities: [{ type: ActivityType.Custom, name: text, state: text }],
		afk: false,
		since: null,
		status: PresenceUpdateStatus.Online,
	});

	await client.api.interactions.reply(interaction.id, interaction.token, {
		content: "Custom status set.",
		flags: MessageFlags.Ephemeral,
	});
}
