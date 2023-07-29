/* eslint-disable @typescript-eslint/prefer-literal-enum-member, unicorn/prefer-math-trunc */
import { EMOJI, formatEmoji } from "../Utility/emojis.js";

enum PlatformFlags {
	iOS = 1 << 0,
	Android = 1 << 1,
	Mac = 1 << 2,
	NintendoSwitch = 1 << 3,
	PlayStation = 1 << 4,
	Steam = 1 << 5,
}

export const PlatformFlagsToString = {
	[PlatformFlags.iOS]: "iOS",
	[PlatformFlags.Android]: "Android",
	[PlatformFlags.Mac]: "Mac",
	[PlatformFlags.NintendoSwitch]: "Nintendo Switch",
	[PlatformFlags.PlayStation]: "PlayStation",
	[PlatformFlags.Steam]: "Steam",
} as const satisfies Readonly<Record<PlatformFlags, string>>;

export function resolveBitsToPlatform(bits: number) {
	const platforms = [];

	for (const [bit, platform] of Object.entries(PlatformFlagsToString)) {
		const _bit = Number(bit);

		if ((bits & _bit) === _bit) {
			platforms.push(`${formatEmoji(resolvePlatformToEmoji(platform))} ${platform}`);
		}
	}

	return platforms;
}

export function resolvePlatformToEmoji(platform: (typeof PlatformFlagsToString)[keyof typeof PlatformFlagsToString]) {
	switch (platform) {
		case PlatformFlagsToString[PlatformFlags.iOS]:
			return EMOJI.PlatformIOS;
		case PlatformFlagsToString[PlatformFlags.Android]:
			return EMOJI.PlatformAndroid;
		case PlatformFlagsToString[PlatformFlags.Mac]:
			return EMOJI.PlatformMac;
		case PlatformFlagsToString[PlatformFlags.NintendoSwitch]:
			return EMOJI.PlatformSwitch;
		case PlatformFlagsToString[PlatformFlags.PlayStation]:
			return EMOJI.PlatformPlayStation;
		case PlatformFlagsToString[PlatformFlags.Steam]:
			return EMOJI.PlatformSteam;
	}
}
