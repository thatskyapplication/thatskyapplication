import type { Snowflake } from "@discordjs/core";
import { spirits } from "@thatskyapplication/utility";
import {
	CosmeticToEmoji,
	FRIEND_ACTION_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "./emojis.js";

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
			const emoji = CosmeticToEmoji[item.cosmetics[0]];

			if (
				emoji &&
				emoji.id !== MISCELLANEOUS_EMOJIS.Blessing1.id &&
				emoji.id !== MISCELLANEOUS_EMOJIS.Blessing2.id &&
				emoji.id !== MISCELLANEOUS_EMOJIS.Blessing3.id &&
				emoji.id !== MISCELLANEOUS_EMOJIS.Heart.id &&
				emoji.id !== MISCELLANEOUS_EMOJIS.MusicSheet.id &&
				emoji.id !== MISCELLANEOUS_EMOJIS.Quest.id &&
				emoji.id !== MISCELLANEOUS_EMOJIS.SpellColourTrail.id &&
				emoji.id !== MISCELLANEOUS_EMOJIS.SpellSharedMemory.id &&
				emoji.id !== MISCELLANEOUS_EMOJIS.SpellSharedSpace.id &&
				emoji.id !== MISCELLANEOUS_EMOJIS.WingBuff.id &&
				emoji.id !== MISCELLANEOUS_EMOJIS.DyeRed.id &&
				emoji.id !== MISCELLANEOUS_EMOJIS.DyeYellow.id &&
				emoji.id !== MISCELLANEOUS_EMOJIS.DyeGreen.id &&
				emoji.id !== MISCELLANEOUS_EMOJIS.DyeCyan.id &&
				emoji.id !== MISCELLANEOUS_EMOJIS.DyeBlue.id &&
				emoji.id !== MISCELLANEOUS_EMOJIS.DyePurple.id &&
				emoji.id !== MISCELLANEOUS_EMOJIS.DyeBlack.id &&
				emoji.id !== MISCELLANEOUS_EMOJIS.DyeWhite.id &&
				emoji.id !== MISCELLANEOUS_EMOJIS.Dye.id &&
				emoji.id !== FRIEND_ACTION_EMOJIS.HighFive.id &&
				emoji.id !== FRIEND_ACTION_EMOJIS.Hug.id &&
				!HEART_EMOJIS.has(emoji.id)
			) {
				emojis.add(emoji.id);
			}
		}

		return emojis;
	}, new Set<Snowflake>());

export const SPIRIT_COSMETIC_EMOJIS_ARRAY = [...SPIRIT_COSMETIC_EMOJIS];
