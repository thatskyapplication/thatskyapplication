import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants.js";
import { skyDate } from "../../../../utility/dates.js";
import {
	HELD_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.KungFu;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask09;
const heldProp = HELD_PROPS_EMOJIS.HeldProp08;

export default new SeasonalSpirit({
	name: SpiritName.GreetingShaman,
	seasonId: SeasonId.Gratitude,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteKungFu1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteKungFu2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.GreetingShamanBlessing1,
				cost: { seasonalCandles: 18 },
				emoji: blessing2,
			},
			{ name: "Large bell", cosmetic: Cosmetic.GreetingShamanLargeBell, emoji: heldProp },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteKungFu3,
				cost: { seasonalCandles: 20 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteKungFu4, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.GreetingShamanBlessing2,
				cost: { seasonalCandles: 22 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.GreetingShamanMask,
				cost: { hearts: 5 },
				emoji: maskEmoji,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteKungFu1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteKungFu2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.GreetingShamanBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Large bell",
				cosmetic: Cosmetic.GreetingShamanLargeBell,
				cost: { candles: 45 },
				emoji: heldProp,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.GreetingShamanHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.GreetingShamanWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteKungFu3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteKungFu4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.GreetingShamanBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.GreetingShamanMask,
				cost: { candles: 54 },
				emoji: maskEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(14, skyDate(2_020, 7, 23))
			.set(62, skyDate(2_022, 5, 26)),
		returning: [3],
	},
});
