import { type DerivedEmojis, deriveEmojis, type EmojiTables } from "./derive.js";
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

export function emojiTables(production: boolean): EmojiTables {
	return production ? PRODUCTION_TABLES : DEVELOPMENT_TABLES;
}

export { type Emoji, formatEmoji, formatEmojiURL, resolveCurrencyEmoji } from "./emoji.js";
