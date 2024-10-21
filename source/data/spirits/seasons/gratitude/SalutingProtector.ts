import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../models/Spirits.js";
import { RealmName } from "../../../../utility/Constants.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { skyDate } from "../../../../utility/dates.js";
import { CAPE_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Acknowledge;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask08;
const capeEmoji = CAPE_EMOJIS.Cape13;

export default new SeasonalSpirit({
	name: SpiritName.SalutingProtector,
	seasonId: SeasonId.Gratitude,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteAcknowledge1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteAcknowledge2, emoji: emoteEmoji },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.SalutingProtectorMusicSheet,
				cost: { seasonalCandles: 16 },
				emoji: musicSheet,
			},
			{ name: "Blessing", cosmetic: Cosmetic.SalutingProtectorBlessing1, emoji: blessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteAcknowledge3,
				cost: { seasonalCandles: 18 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteAcknowledge4, emoji: emoteEmoji },
			{
				name: "Cape",
				cosmetic: Cosmetic.SalutingProtectorCape,
				cost: { seasonalCandles: 20 },
				emoji: capeEmoji,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.SalutingProtectorMask,
				cost: { hearts: 5 },
				emoji: maskEmoji,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteAcknowledge1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteAcknowledge2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SalutingProtectorBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.SalutingProtectorMusicSheet,
				cost: { candles: 15 },
				emoji: musicSheet,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.SalutingProtectorHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.SalutingProtectorWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteAcknowledge3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteAcknowledge4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SalutingProtectorBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.SalutingProtectorCape,
				cost: { candles: 75 },
				emoji: capeEmoji,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.SalutingProtectorMask,
				cost: { candles: 42 },
				emoji: maskEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set("Error", skyDate(2_020, 5, 28))
			.set(53, skyDate(2_022, 1, 20)),
	},
});
