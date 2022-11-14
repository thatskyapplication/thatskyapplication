import { Events, MessageFlags } from "discord.js";
import DailyGuides from "../Structures/DailyGuides.js";
import { Channel, INFOGRAPHICS_DATABASE_GUILD_ID } from "../Utility/Constants.js";
import type { Event } from "./index.js";

const name = Events.MessageCreate;

export const event: Event<typeof name> = {
	name,
	async fire(message) {
		const { attachments, channelId, content, client, flags, reference } = message;

		if (
			channelId === Channel.dailyGuides &&
			flags.has(MessageFlags.Crossposted) &&
			reference?.guildId === INFOGRAPHICS_DATABASE_GUILD_ID
		) {
			const transformedContent = content.toUpperCase();

			if (transformedContent.includes("DAILY QUEST") && transformedContent.length <= 20) {
				// This is redundant.
				return;
			}

			if (
				transformedContent.includes("QUEST") ||
				transformedContent.includes("RAINBOW") ||
				transformedContent.includes("SOCIAL LIGHT") ||
				transformedContent.includes("BLOOM SAPLING")
			) {
				DailyGuides.parseQuests(content, attachments);
			}

			if (transformedContent.includes("TREASURE CANDLE")) {
				DailyGuides.parseTreasureCandles(content, attachments);
				return;
			}

			if (transformedContent.includes("SEASONAL CANDLE")) {
				DailyGuides.parseSeasonalCandles(attachments);
				return;
			}

			if (transformedContent.includes("SHATTERING SHARD LOCATION")) {
				DailyGuides.parseShardEruption(content, attachments);
			}

			void DailyGuides.healthCheck(client);
		}
	},
};
