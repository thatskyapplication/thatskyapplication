import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import type { Snowflake } from "@discordjs/core";
import { type EventIds, skyEvents, spirits } from "@thatskyapplication/utility";
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

const SPIRIT_COSMETIC_EMOJIS = spirits()
	.map((spirit) =>
		spirit.isStandardSpirit() || spirit.isElderSpirit() || spirit.isGuideSpirit()
			? spirit.current
			: spirit.items,
	)
	.reduce((emojis, friendshipTree) => {
		for (const items of friendshipTree) {
			for (const item of items) {
				if (!item) {
					continue;
				}

				const emoji = CosmeticToEmoji[item.cosmetics[0]];

				if (emoji && !emojisToSkip.has(emoji.id)) {
					emojis.add(emoji.id);
				}
			}
		}

		return emojis;
	}, new Set<Snowflake>());

export const SPIRIT_COSMETIC_EMOJIS_ARRAY: readonly Snowflake[] = [...SPIRIT_COSMETIC_EMOJIS];
const events = skyEvents();
export const eventCosmeticEmojis = new Collection<Snowflake, EventIds>();

for (const event of events.values()) {
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
