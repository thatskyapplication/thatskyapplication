import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import type { Snowflake } from "@discordjs/core";
import { type EventIds, type SpiritIds, skyEvents, spirits } from "@thatskyapplication/utility";
import {
	CosmeticToEmoji,
	FRIEND_ACTION_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "./emojis.js";

const emojisToSkip = new Set<Snowflake>([
	MISCELLANEOUS_EMOJIS.Blessing1.id,
	MISCELLANEOUS_EMOJIS.Blessing2.id,
	MISCELLANEOUS_EMOJIS.Blessing3.id,
	MISCELLANEOUS_EMOJIS.Heart.id,
	MISCELLANEOUS_EMOJIS.MusicSheet.id,
	MISCELLANEOUS_EMOJIS.Quest.id,
	MISCELLANEOUS_EMOJIS.SpellColourTrail.id,
	MISCELLANEOUS_EMOJIS.SpellSharedMemory.id,
	MISCELLANEOUS_EMOJIS.SpellSharedSpace.id,
	MISCELLANEOUS_EMOJIS.WingBuff.id,
	MISCELLANEOUS_EMOJIS.DyeRed.id,
	MISCELLANEOUS_EMOJIS.DyeYellow.id,
	MISCELLANEOUS_EMOJIS.DyeGreen.id,
	MISCELLANEOUS_EMOJIS.DyeCyan.id,
	MISCELLANEOUS_EMOJIS.DyeBlue.id,
	MISCELLANEOUS_EMOJIS.DyePurple.id,
	MISCELLANEOUS_EMOJIS.DyeBlack.id,
	MISCELLANEOUS_EMOJIS.DyeWhite.id,
	MISCELLANEOUS_EMOJIS.Dye.id,
	FRIEND_ACTION_EMOJIS.HighFive.id,
	FRIEND_ACTION_EMOJIS.Hug.id,
]);

for (const [key, { id }] of [
	...Object.entries(MISCELLANEOUS_EMOJIS),
	...Object.entries(SEASON_EMOJIS),
]) {
	if (key.includes("Heart")) {
		emojisToSkip.add(id);
	}
}

const spiritCosmeticEmojis = new Collection<Snowflake, SpiritIds>();

for (const spirit of spirits().values()) {
	for (const items of spirit.isStandardSpirit() || spirit.isElderSpirit() || spirit.isGuideSpirit()
		? spirit.current
		: spirit.items) {
		for (const item of items) {
			if (!item) {
				continue;
			}

			for (const cosmetic of item.cosmetics) {
				const emoji = CosmeticToEmoji[cosmetic];

				if (emoji && !emojisToSkip.has(emoji.id)) {
					spiritCosmeticEmojis.set(emoji.id, spirit.id);
				}
			}
		}
	}
}

export const SPIRIT_COSMETIC_EMOJIS: ReadonlyCollection<Snowflake, SpiritIds> =
	spiritCosmeticEmojis;

const eventCosmeticEmojis = new Collection<Snowflake, EventIds>();

for (const event of skyEvents().values()) {
	for (const offer of event.offer) {
		for (const cosmetic of offer.cosmetics) {
			const emoji = CosmeticToEmoji[cosmetic];

			if (emoji && !emojisToSkip.has(emoji.id)) {
				eventCosmeticEmojis.set(emoji.id, event.id);
			}
		}
	}
}

export const EVENT_COSMETIC_EMOJIS: ReadonlyCollection<Snowflake, EventIds> = eventCosmeticEmojis;
