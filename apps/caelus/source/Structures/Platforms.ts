/* eslint-disable unicorn/prefer-math-trunc */
import { BitField } from "@sapphire/bitfield";
import { formatEmoji, type GuildMember } from "discord.js";
import type { Emoji } from "../Utility/Constants.js";
import { Platform } from "../Utility/Constants.js";
import { resolveCurrencyEmoji } from "../Utility/Utility.js";

export const PlatformFlags = new BitField({
	iOS: 1 << 0,
	Android: 1 << 1,
	Mac: 1 << 2,
	NintendoSwitch: 1 << 3,
	PlayStation: 1 << 4,
} as const);

export function isPlatform(platform: string): platform is Platform {
	return Object.values(Platform).includes(platform as Platform);
}

export function resolvePlatformToBits(platform: Platform) {
	let bit = 0;

	switch (platform) {
		case Platform.iOS:
			bit = PlatformFlags.flags.iOS;
			break;
		case Platform.Android:
			bit = PlatformFlags.flags.Android;
			break;
		case Platform.Mac:
			bit = PlatformFlags.flags.Mac;
			break;
		case Platform.NintendoSwitch:
			bit = PlatformFlags.flags.NintendoSwitch;
			break;
		case Platform.PlayStation:
			bit = PlatformFlags.flags.PlayStation;
			break;
	}

	return bit;
}

export function resolveBitsToPlatform(bits: (typeof PlatformFlags)["mask"]) {
	// eslint-disable-next-line array-callback-return
	return PlatformFlags.toArray(bits).map((platformFlag) => {
		switch (platformFlag) {
			case "iOS":
				return Platform.iOS;
			case "Android":
				return Platform.Android;
			case "Mac":
				return Platform.Mac;
			case "NintendoSwitch":
				return Platform.NintendoSwitch;
			case "PlayStation":
				return Platform.PlayStation;
		}
	});
}

export function resolvePlatformToProfilePlatform(platform: Platform, member: GuildMember | undefined, emoji: Emoji) {
	const emojiString = member ? resolveCurrencyEmoji({ member, emoji }) : formatEmoji(emoji);
	return emojiString.length > 1 ? `${emojiString} ${platform}` : platform;
}
