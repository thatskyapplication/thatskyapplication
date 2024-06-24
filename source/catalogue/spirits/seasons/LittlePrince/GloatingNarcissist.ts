import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import { HAIR_EMOJIS, MISCELLANEOUS_EMOJIS, OUTFIT_EMOJIS, SEASON_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Gloat;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const outfitEmoji = OUTFIT_EMOJIS.Outfit21;
const hairEmoji = HAIR_EMOJIS.Hair86;

export default new SeasonalSpirit({
	name: SpiritName.GloatingNarcissist,
	season: SeasonName.LittlePrince,
	emote,
	realm: RealmName.VaultOfKnowledge,
	hasMarketingVideo: true,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { seasonalCandles: 14 }, emoji: blessing2 },
			{ name: "Music sheet", bit: 1 << 3, emoji: musicSheet },
			{ name: `${emote} 3`, bit: 1 << 4, cost: { seasonalCandles: 18 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 5, emoji: emoteEmoji },
			{ name: "Blessing 2", bit: 1 << 6, cost: { seasonalCandles: 22 }, emoji: blessing2 },
			{ name: "Outfit", bit: 1 << 7, emoji: outfitEmoji },
			{ name: "Hair", bit: 1 << 8, cost: { seasonalCandles: 26 }, emoji: hairEmoji },
			{ name: "Blessing 3", bit: 1 << 9, emoji: blessing2 },
			{ name: "Seasonal heart", bit: 1 << 10, cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.LittlePrinceHeart },
		],
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { hearts: 4 }, emoji: emoteEmoji },
			{ name: "Heart", bit: 1 << 10, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Blessing 1", bit: 1 << 2, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Music sheet", bit: 1 << 3, cost: { candles: 15 }, emoji: musicSheet },
			{ name: "Hair", bit: 1 << 8, cost: { candles: 46 }, emoji: hairEmoji },
			{ name: "Wing buff", bit: 1 << 11, cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{ name: `${emote} 3`, bit: 1 << 4, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 5, cost: { hearts: 6 }, emoji: emoteEmoji },
			{ name: "Blessing 2", bit: 1 << 6, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Outfit", bit: 1 << 7, cost: { candles: 65 }, emoji: outfitEmoji },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(92, skyDate(2_023, 7, 20)),
	},
});
