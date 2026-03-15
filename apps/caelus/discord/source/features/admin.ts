import {
	ActivityType,
	type APIChatInputApplicationCommandGuildInteraction,
	MessageFlags,
	PresenceUpdateStatus,
} from "@discordjs/core";
import { client } from "../discord.js";
import type { OptionResolver } from "../utility/option-resolver.js";

export async function customStatus(
	interaction: APIChatInputApplicationCommandGuildInteraction,
	options: OptionResolver,
) {
	const text = options.getString("text", true);
	const shardCount = await client.gateway.getShardCount();
	const promises = [];

	for (let index = 0; index < shardCount; index++) {
		promises.push(
			client.updatePresence(index, {
				activities: [{ type: ActivityType.Custom, name: text, state: text }],
				afk: false,
				since: null,
				status: PresenceUpdateStatus.Online,
			}),
		);
	}

	await Promise.all(promises);

	await client.api.interactions.reply(interaction.id, interaction.token, {
		content: "Custom status set.",
		flags: MessageFlags.Ephemeral,
	});
}
