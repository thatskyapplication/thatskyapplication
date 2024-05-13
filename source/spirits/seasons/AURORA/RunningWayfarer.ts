/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { type ItemsData, SeasonalSpirit } from "../../../Structures/Spirits.js";
import { RealmName } from "../../../Utility/Constants.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS, SEASON_EMOJIS } from "../../../Utility/emojis.js";
import { SeasonName } from "../../../Utility/seasons.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../Utility/spirits.js";

const emote = SpiritEmote.WavingLight;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask67;
const hairEmoji = HAIR_EMOJIS.Hair112;
const capeEmoji = CAPE_EMOJIS.Cape92;

export default new SeasonalSpirit({
	name: SpiritName.RunningWayfarer,
	season: SeasonName.Aurora,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { item: "Mask", cost: { seasonalCandles: 12 }, emoji: maskEmoji })
			.set(1 << 3, { item: "Blessing 1", cost: null, emoji: blessing3 })
			.set(1 << 4, { item: "Blessing 2", cost: { seasonalCandles: 16 }, emoji: blessing3 })
			.set(1 << 5, { item: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 20 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { item: "Blessing 3", cost: { seasonalCandles: 24 }, emoji: blessing3 })
			.set(1 << 9, { item: "Music sheet", cost: null, emoji: musicSheet })
			.set(1 << 10, { item: "Cape", cost: { seasonalCandles: 30 }, emoji: capeEmoji })
			.set(1 << 11, { item: "Blessing 4", cost: null, emoji: blessing3 })
			.set(1 << 12, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.AuroraHeart }),
	},
});
