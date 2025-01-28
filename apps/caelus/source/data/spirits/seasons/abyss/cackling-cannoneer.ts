import { RealmName, SeasonId } from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.EvilLaugh;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask54;
const hairEmoji = HAIR_EMOJIS.Hair98;
const capeEmoji = CAPE_EMOJIS.Cape70;

export default new SeasonalSpirit({
	name: SpiritName.CacklingCannoneer,
	seasonId: SeasonId.Abyss,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteEvilLaugh1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteEvilLaugh2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.CacklingCannoneerBlessing1,
				cost: { seasonalCandles: 12 },
				emoji: blessing2,
			},
			{ name: "Music sheet", cosmetic: Cosmetic.CacklingCannoneerMusicSheet, emoji: musicSheet },
			{
				name: "Mask",
				cosmetic: Cosmetic.CacklingCannoneerMask,
				cost: { seasonalCandles: 16 },
				emoji: maskEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.CacklingCannoneerBlessing2, emoji: blessing3 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteEvilLaugh3,
				cost: { seasonalCandles: 20 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteEvilLaugh4, emoji: emoteEmoji },
			{
				name: "Cape",
				cosmetic: Cosmetic.CacklingCannoneerCape,
				cost: { seasonalCandles: 26 },
				emoji: capeEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.CacklingCannoneerBlessing3, emoji: blessing3 },
			{
				name: "Blessing 4",
				cosmetic: Cosmetic.CacklingCannoneerBlessing4,
				cost: { seasonalCandles: 34 },
				emoji: blessing3,
			},
			{ name: "Hair", cosmetic: Cosmetic.CacklingCannoneerHair, emoji: hairEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.CacklingCannoneerSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.AbyssHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteEvilLaugh1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteEvilLaugh2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.CacklingCannoneerBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.CacklingCannoneerMask,
				cost: { candles: 40 },
				emoji: maskEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.CacklingCannoneerSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.CacklingCannoneerWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteEvilLaugh3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteEvilLaugh4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.CacklingCannoneerHair,
				cost: { candles: 50 },
				emoji: hairEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.CacklingCannoneerBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.CacklingCannoneerCape,
				cost: { candles: 70 },
				emoji: capeEmoji,
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.CacklingCannoneerMusicSheet,
				cost: { candles: 15 },
				emoji: musicSheet,
			},
		],
	},
	visits: {
		returning: [4],
	},
});
