import { Collection } from "discord.js";
import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

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
		seasonal: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { name: "Mask", cost: { seasonalCandles: 12 }, emoji: maskEmoji })
			.set(1 << 3, { name: "Blessing 1", cost: null, emoji: blessing3 })
			.set(1 << 4, { name: "Blessing 2", cost: { seasonalCandles: 16 }, emoji: blessing3 })
			.set(1 << 5, { name: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 6, { name: `${emote} 3`, cost: { seasonalCandles: 20 }, emoji: emoteEmoji })
			.set(1 << 7, { name: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { name: "Blessing 3", cost: { seasonalCandles: 24 }, emoji: blessing3 })
			.set(1 << 9, { name: "Music sheet", cost: null, emoji: musicSheet })
			.set(1 << 10, { name: "Cape", cost: { seasonalCandles: 30 }, emoji: capeEmoji })
			.set(1 << 11, { name: "Blessing 4", cost: null, emoji: blessing3 })
			.set(1 << 12, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.AuroraHeart }),
	},
});
