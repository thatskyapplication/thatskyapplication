import { Events, MessageFlags } from "discord.js";
import DailyGuides from "../Structures/DailyGuides.js";
import DailyGuidesDistribution from "../Structures/DailyGuidesDistribution.js";
import { Channel, INFOGRAPHICS_DATABASE_GUILD_ID } from "../Utility/Constants.js";
import { consoleLog } from "../Utility/Utility.js";
import type { Event } from "./index.js";

const name = Events.MessageCreate;

export const event: Event<typeof name> = {
	name,
	async fire(message) {
		const { attachments, channelId, content, client, flags, reference } = message;

		if (
			channelId === Channel.dailyGuides &&
			flags.has(MessageFlags.IsCrosspost) &&
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
				void DailyGuides.parseQuests(content, attachments);
				void DailyGuidesDistribution.distribute(client);
				return;
			}

			if (transformedContent.includes("TREASURE CANDLE")) {
				void DailyGuides.parseTreasureCandles(content, attachments);
				void DailyGuidesDistribution.distribute(client);
				return;
			}

			if (transformedContent.includes("SEASONAL CANDLE")) {
				void DailyGuides.parseSeasonalCandles(attachments);
				void DailyGuidesDistribution.distribute(client);
				return;
			}

			if (transformedContent.includes("SHATTERING SHARD LOCATION")) {
				void DailyGuides.parseShardEruption(content, attachments);
				void DailyGuidesDistribution.distribute(client);
				return;
			}

			consoleLog("Intercepted an unparsed message.");
		}
	},
};
