import { type DerivedEmojis, deriveEmojis } from "./derive.js";
import { DEVELOPMENT_TABLES } from "./development.js";
import { PRODUCTION_TABLES } from "./production.js";

export function productionEmojis(): typeof PRODUCTION_TABLES & DerivedEmojis {
	return deriveEmojis(PRODUCTION_TABLES);
}

function developmentEmojis(): typeof DEVELOPMENT_TABLES & DerivedEmojis {
	return deriveEmojis(DEVELOPMENT_TABLES);
}

export function emojiConstants(production: boolean) {
	return production ? productionEmojis() : developmentEmojis();
}

export type { DerivedEmojis, EmojiTables } from "./derive.js";
export { type Emoji, formatEmoji, formatEmojiURL, resolveCurrencyEmoji } from "./emoji.js";
