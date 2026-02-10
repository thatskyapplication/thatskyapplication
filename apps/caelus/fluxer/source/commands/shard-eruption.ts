import { shardEruption, skyNow } from "@thatskyapplication/utility";
import { client } from "../fluxer.js";
import type { Command } from "./index.js";

export default {
	names: ["shard-eruption", "shard"],
	async execute(data) {
		const shard = shardEruption();

		if (!shard) {
			await client.api.channels.createMessage(data.channel_id, {
				content: "There is no shard eruption today.",
				message_reference: {
					message_id: data.id,
					channel_id: data.channel_id,
					fail_if_not_exists: false,
				},
			});

			return;
		}

		const now = skyNow();

		const timestamps = shard.timestamps
			.map(({ start, end }) => {
				const line = `<t:${start.toUnixInteger()}:s> - <t:${end.toUnixInteger()}:s>`;
				return now >= end ? `~~${line}~~` : line;
			})
			.join("\n");

		const reward =
			shard.reward === 200
				? "200 Light"
				: `${shard.reward} Ascended Candle${shard.reward === 1 ? "" : "s"}`;

		await client.api.channels.createMessage(data.channel_id, {
			content: `**${shard.strong ? "Strong" : "Regular"} Shard** in ${shard.realm} (${shard.skyMap})\nReward: ${reward}\n${timestamps}`,
			message_reference: {
				message_id: data.id,
				channel_id: data.channel_id,
				fail_if_not_exists: false,
			},
		});
	},
} satisfies Command;
