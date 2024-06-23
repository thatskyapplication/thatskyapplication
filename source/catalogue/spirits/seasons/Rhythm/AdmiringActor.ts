import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import { MASK_EMOJIS, MISCELLANEOUS_EMOJIS, OUTFIT_EMOJIS, SEASON_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.BlowKiss;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const outfitEmoji = OUTFIT_EMOJIS.Outfit14;
const maskEmoji = MASK_EMOJIS.Mask24;

export default new SeasonalSpirit({
	name: SpiritName.AdmiringActor,
	season: SeasonName.Rhythm,
	emote,
	realm: RealmName.HiddenForest,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Blessing", bit: 1 << 2, cost: { seasonalCandles: 12 }, emoji: blessing2 },
			{ name: "Music sheet", bit: 1 << 3, emoji: musicSheet },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { seasonalCandles: 14 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, emoji: emoteEmoji },
			{ name: "Outfit", bit: 1 << 9, cost: { seasonalCandles: 16 }, emoji: outfitEmoji },
			{ name: "Mask", bit: 1 << 10, emoji: maskEmoji },
			{ name: "Seasonal heart", bit: 1 << 4, cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RhythmHeart },
		],
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { hearts: 4 }, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Music sheet", bit: 1 << 3, cost: { candles: 15 }, emoji: musicSheet },
			{ name: "Heart", bit: 1 << 4, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Wing buff", bit: 1 << 5, cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, cost: { hearts: 6 }, emoji: emoteEmoji },
			{ name: "Blessing 2", bit: 1 << 8, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Outfit", bit: 1 << 9, cost: { candles: 65 }, emoji: outfitEmoji },
			{ name: "Mask", bit: 1 << 10, cost: { candles: 42 }, emoji: maskEmoji },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(20, skyDate(2_020, 10, 15))
			.set(38, skyDate(2_021, 6, 24))
			.set(89, skyDate(2_023, 6, 8)),
	},
});
