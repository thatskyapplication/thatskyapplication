/* eslint-disable @typescript-eslint/prefer-literal-enum-member, unicorn/prefer-math-trunc */
import type { BaseInteraction } from "discord.js";
import { Season } from "../Utility/Constants.js";
import { resolveEmoji, resolveSeasonsToEmoji } from "../Utility/Utility.js";

enum SeasonFlags {
	Gratitude = 1 << 0,
	Lightseekers = 1 << 1,
	Belonging = 1 << 2,
	Rhythm = 1 << 3,
	Enchantment = 1 << 4,
	Sanctuary = 1 << 5,
	Prophecy = 1 << 6,
	Dreams = 1 << 7,
	Assembly = 1 << 8,
	LittlePrince = 1 << 9,
	Flight = 1 << 10,
	Abyss = 1 << 11,
	Performance = 1 << 12,
	Shattering = 1 << 13,
	Aurora = 1 << 14,
	Remembrance = 1 << 15,
	Passage = 1 << 16,
}

export const SeasonFlagsToString = {
	[SeasonFlags.Gratitude]: Season.Gratitude,
	[SeasonFlags.Lightseekers]: Season.Lightseekers,
	[SeasonFlags.Belonging]: Season.Belonging,
	[SeasonFlags.Rhythm]: Season.Rhythm,
	[SeasonFlags.Enchantment]: Season.Enchantment,
	[SeasonFlags.Sanctuary]: Season.Sanctuary,
	[SeasonFlags.Prophecy]: Season.Prophecy,
	[SeasonFlags.Dreams]: Season.Dreams,
	[SeasonFlags.Assembly]: Season.Assembly,
	[SeasonFlags.LittlePrince]: Season.LittlePrince,
	[SeasonFlags.Flight]: Season.Flight,
	[SeasonFlags.Abyss]: Season.Abyss,
	[SeasonFlags.Performance]: Season.Performance,
	[SeasonFlags.Shattering]: Season.Shattering,
	[SeasonFlags.Aurora]: Season.Aurora,
	[SeasonFlags.Remembrance]: Season.Remembrance,
	[SeasonFlags.Passage]: Season.Passage,
} as const;

export function resolveBitsToSeasons(bits: number, interaction: BaseInteraction) {
	const platforms = [];

	for (const [bit, season] of Object.entries(SeasonFlagsToString)) {
		const _bit = Number(bit);
		if ((bits & _bit) === _bit) platforms.push(resolveEmoji(interaction, resolveSeasonsToEmoji(season)));
	}

	return platforms;
}
