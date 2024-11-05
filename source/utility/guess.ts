import type { Snowflake } from "@discordjs/core";
import { spirits } from "../data/spirits/index.js";
import { FRIEND_ACTION_EMOJIS, MISCELLANEOUS_EMOJIS } from "./emojis.js";

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
				!item.emoji.name.endsWith("_heart")
			) {
				emojis.add(item.emoji.id);
			}
		}

		return emojis;
	}, new Set<Snowflake>());

export const SPIRIT_COSMETIC_EMOJIS_ARRAY = [...SPIRIT_COSMETIC_EMOJIS];
