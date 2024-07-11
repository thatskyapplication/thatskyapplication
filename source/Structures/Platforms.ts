import { MISCELLANEOUS_EMOJIS, formatEmoji } from "../Utility/emojis.js";

enum PlatformFlags {
	iOS = 1 << 0,
	Android = 1 << 1,
	Mac = 1 << 2,
	NintendoSwitch = 1 << 3,
	PlayStation = 1 << 4,
	Steam = 1 << 5,
}

const PlatformFlagsToString = {
	[PlatformFlags.iOS]: "iOS",
	[PlatformFlags.Android]: "Android",
	[PlatformFlags.Mac]: "Mac",
	[PlatformFlags.NintendoSwitch]: "Nintendo Switch",
	[PlatformFlags.PlayStation]: "PlayStation",
	[PlatformFlags.Steam]: "Steam",
} as const satisfies Readonly<Record<PlatformFlags, string>>;

export const PLATFORM_FLAGS_TO_STRING_ENTRIES = Object.entries(PlatformFlagsToString);

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

export function resolvePlatformToEmoji(
	platform: (typeof PlatformFlagsToString)[keyof typeof PlatformFlagsToString],
) {
	switch (platform) {
		case PlatformFlagsToString[PlatformFlags.iOS]:
			return MISCELLANEOUS_EMOJIS.PlatformIOS;
		case PlatformFlagsToString[PlatformFlags.Android]:
			return MISCELLANEOUS_EMOJIS.PlatformAndroid;
		case PlatformFlagsToString[PlatformFlags.Mac]:
			return MISCELLANEOUS_EMOJIS.PlatformMac;
		case PlatformFlagsToString[PlatformFlags.NintendoSwitch]:
			return MISCELLANEOUS_EMOJIS.PlatformSwitch;
		case PlatformFlagsToString[PlatformFlags.PlayStation]:
			return MISCELLANEOUS_EMOJIS.PlatformPlayStation;
		case PlatformFlagsToString[PlatformFlags.Steam]:
			return MISCELLANEOUS_EMOJIS.PlatformSteam;
	}
}
