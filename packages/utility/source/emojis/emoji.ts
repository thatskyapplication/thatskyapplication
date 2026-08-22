import type { Snowflake } from "../types/index.js";

export interface Emoji {
	id: Snowflake;
	name: string;
	animated?: boolean;
}

export function formatEmoji(emoji: Emoji) {
	return emoji.animated ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`;
}

export function formatEmojiURL(id: Snowflake) {
	return `https://cdn.discordapp.com/emojis/${id}.webp`;
}

interface CurrencyEmojiOptions {
	emoji: Emoji;
	amount: number | string;
	includeSpaceInEmoji?: boolean;
}

export function resolveCurrencyEmoji({
	emoji,
	amount,
	includeSpaceInEmoji = false,
}: CurrencyEmojiOptions) {
	return `${amount}${includeSpaceInEmoji ? " " : ""}${formatEmoji(emoji)}`;
}
