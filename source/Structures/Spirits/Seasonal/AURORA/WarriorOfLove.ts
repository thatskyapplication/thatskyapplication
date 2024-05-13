/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";
import { SeasonName } from "../../../Season/index.js";
import { type ItemsData, SeasonalSpirit } from "../../Base.js";

const emote = SpiritEmote.Twirl;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask68;
const hairEmoji = HAIR_EMOJIS.Hair113;
const capeEmoji = CAPE_EMOJIS.Cape93;

export default new SeasonalSpirit({
	name: SpiritName.WarriorOfLove,
	season: SeasonName.Aurora,
	emote,
	realm: Realm.ValleyOfTriumph,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { item: "Mask", cost: { seasonalCandles: 6 }, emoji: maskEmoji })
			.set(1 << 3, { item: "Blessing 1", cost: null, emoji: blessing3 })
			.set(1 << 4, { item: "Blessing 2", cost: { seasonalCandles: 12 }, emoji: blessing3 })
			.set(1 << 5, { item: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 20 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { item: "Music sheet", cost: { seasonalCandles: 24 }, emoji: musicSheet })
			.set(1 << 9, { item: "Blessing 3", cost: null, emoji: blessing3 })
			.set(1 << 10, { item: "Blessing 4", cost: { seasonalCandles: 30 }, emoji: blessing3 })
			.set(1 << 11, { item: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 12, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.AuroraHeart }),
	},
});
