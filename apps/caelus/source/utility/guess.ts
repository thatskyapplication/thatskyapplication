import type { Snowflake } from "@discordjs/core";
import { spirits } from "../data/spirits/index.js";
import { FRIEND_ACTION_EMOJIS, MISCELLANEOUS_EMOJIS, SEASON_EMOJIS } from "./emojis.js";

const HEART_EMOJIS = [
	...Object.entries(MISCELLANEOUS_EMOJIS),
	...Object.entries(SEASON_EMOJIS),
].reduce((emojis, [key, { id }]) => {
	if (key.includes("Heart")) {
		emojis.add(id);
	}

	return emojis;
}, new Set<Snowflake>());

const SPIRIT_COSMETIC_EMOJIS = spirits()
	.map((spirit) =>
		spirit.isStandardSpirit() || spirit.isElderSpirit() || spirit.isGuideSpirit()
			? spirit.current
			: spirit.items,
	)
	.reduce((emojis, items) => {
		for (const item of items) {
			if (
				item.emoji &&
				item.emoji.id !== MISCELLANEOUS_EMOJIS.Blessing1.id &&
				item.emoji.id !== MISCELLANEOUS_EMOJIS.Blessing2.id &&
				item.emoji.id !== MISCELLANEOUS_EMOJIS.Blessing3.id &&
				item.emoji.id !== MISCELLANEOUS_EMOJIS.Heart.id &&
				item.emoji.id !== MISCELLANEOUS_EMOJIS.MusicSheet.id &&
				item.emoji.id !== MISCELLANEOUS_EMOJIS.Quest.id &&
				item.emoji.id !== MISCELLANEOUS_EMOJIS.SpellColourTrail.id &&
				item.emoji.id !== MISCELLANEOUS_EMOJIS.SpellSharedMemory.id &&
				item.emoji.id !== MISCELLANEOUS_EMOJIS.SpellSharedSpace.id &&
				item.emoji.id !== MISCELLANEOUS_EMOJIS.WingBuff.id &&
				item.emoji.id !== FRIEND_ACTION_EMOJIS.HoldHand.id &&
				item.emoji.id !== FRIEND_ACTION_EMOJIS.HighFive.id &&
				item.emoji.id !== FRIEND_ACTION_EMOJIS.Hug.id &&
				item.emoji.id !== FRIEND_ACTION_EMOJIS.FistBump.id &&
				!HEART_EMOJIS.has(item.emoji.id)
			) {
				emojis.add(item.emoji.id);
			}
		}

		return emojis;
	}, new Set<Snowflake>());

export const SPIRIT_COSMETIC_EMOJIS_ARRAY = [...SPIRIT_COSMETIC_EMOJIS];
