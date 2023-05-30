/* eslint-disable @typescript-eslint/prefer-literal-enum-member, unicorn/prefer-math-trunc */
import { formatEmoji, type GuildMember } from "discord.js";
import { Emoji } from "../Utility/Constants.js";
import { resolveCurrencyEmoji } from "../Utility/Utility.js";

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

type Platform = (typeof PlatformFlagsToString)[keyof typeof PlatformFlagsToString];

export function resolveBitsToPlatform(bits: number, member: GuildMember | undefined) {
	const platforms = [];

	for (const [bit, platform] of Object.entries(PlatformFlagsToString)) {
		const _bit = Number(bit);

		if ((bits & _bit) === _bit) {
			switch (platform) {
				case PlatformFlagsToString[PlatformFlags.iOS]:
					platforms.push(resolvePlatformToProfilePlatform(platform, member, Emoji.iOS));
					break;
				case PlatformFlagsToString[PlatformFlags.Android]:
					platforms.push(resolvePlatformToProfilePlatform(platform, member, Emoji.Android));
					break;
				case PlatformFlagsToString[PlatformFlags.Mac]:
					platforms.push(resolvePlatformToProfilePlatform(platform, member, Emoji.Mac));
					break;
				case PlatformFlagsToString[PlatformFlags.NintendoSwitch]:
					platforms.push(resolvePlatformToProfilePlatform(platform, member, Emoji.Switch));
					break;
				case PlatformFlagsToString[PlatformFlags.PlayStation]:
					platforms.push(resolvePlatformToProfilePlatform(platform, member, Emoji.PlayStation));
					break;
			}
		}
	}

	return platforms;
}

export function resolvePlatformToProfilePlatform(platform: Platform, member: GuildMember | undefined, emoji: Emoji) {
	const emojiString = member ? resolveCurrencyEmoji({ member, emoji }) : formatEmoji(emoji);
	return emojiString.length > 1 ? `${emojiString} ${platform}` : platform;
}
