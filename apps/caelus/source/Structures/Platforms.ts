/* eslint-disable @typescript-eslint/prefer-literal-enum-member, unicorn/prefer-math-trunc */
import type { BaseInteraction } from "discord.js";
import { Emoji } from "../Utility/Constants.js";
import { resolveEmoji } from "../Utility/Utility.js";

enum PlatformFlags {
	iOS = 1 << 0,
	Android = 1 << 1,
	Mac = 1 << 2,
	NintendoSwitch = 1 << 3,
	PlayStation = 1 << 4,
}

export const PlatformFlagsToString = {
	[PlatformFlags.iOS]: "iOS",
	[PlatformFlags.Android]: "Android",
	[PlatformFlags.Mac]: "Mac",
	[PlatformFlags.NintendoSwitch]: "Nintendo Switch",
	[PlatformFlags.PlayStation]: "PlayStation",
} as const;

export function resolveBitsToPlatform(bits: number, interaction: BaseInteraction) {
	const platforms = [];

	for (const [bit, platform] of Object.entries(PlatformFlagsToString)) {
		const _bit = Number(bit);

		if ((bits & _bit) === _bit) {
			let emoji;

			switch (platform) {
				case PlatformFlagsToString[PlatformFlags.iOS]:
					emoji = Emoji.iOS;
					break;
				case PlatformFlagsToString[PlatformFlags.Android]:
					emoji = Emoji.Android;
					break;
				case PlatformFlagsToString[PlatformFlags.Mac]:
					emoji = Emoji.Mac;
					break;
				case PlatformFlagsToString[PlatformFlags.NintendoSwitch]:
					emoji = Emoji.Switch;
					break;
				case PlatformFlagsToString[PlatformFlags.PlayStation]:
					emoji = Emoji.PlayStation;
					break;
			}

			platforms.push(`${resolveEmoji(interaction, emoji)} ${platform}`);
		}
	}

	return platforms;
}
