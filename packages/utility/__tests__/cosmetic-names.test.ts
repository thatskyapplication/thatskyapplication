import { deepStrictEqual, equal, ok } from "node:assert/strict";
import { test } from "node:test";
import { Cosmetic, CosmeticCommon, EXPRESSION_LEVELS, MUSIC_SHEETS } from "../source/cosmetics.js";
import { type Emoji, productionEmojis } from "../source/emojis/index.js";
import { skyEvents } from "../source/events/index.js";
import { spirits } from "../source/kingdom/spirits.js";
import enGB from "../source/locales/en-gb.js";
import {
	friendshipTreeToItems,
	type ItemWithoutChildren,
	SpiritId,
} from "../source/utility/spirits.js";

const EXPRESSION_KEYS = new Set<string>([
	`cosmetic-common-names.${CosmeticCommon.Expression}`,
	`cosmetic-common-names.${CosmeticCommon.ExpressionLevel}`,
	`cosmetic-common-names.${CosmeticCommon.ExpressionMultiple}`,
	`cosmetic-common-names.${CosmeticCommon.ExpressionMultipleLevel}`,
]);

const LEVEL_KEYS = new Set<string>([
	`cosmetic-common-names.${CosmeticCommon.ExpressionLevel}`,
	`cosmetic-common-names.${CosmeticCommon.ExpressionMultipleLevel}`,
]);

const { CALL_EMOJIS, CosmeticToEmoji, EMOTE_EMOJIS, MISCELLANEOUS_EMOJIS, STANCE_EMOJIS } =
	productionEmojis();

const OFFERED_ITEMS: readonly (readonly [string, ItemWithoutChildren])[] = [
	...spirits()
		.values()
		.flatMap((spirit) =>
			(spirit.isSeasonalSpirit() ? [spirit.current, spirit.seasonal] : [spirit.current])
				.flatMap((friendshipTree) => friendshipTreeToItems(friendshipTree))
				.map((item) => [`Spirit ${spirit.id}`, item] as const),
		),
	...skyEvents()
		.values()
		.flatMap((event) => event.offer.map((item) => [`Event ${event.id}`, item] as const)),
];

function englishName(key: string) {
	let current: unknown = enGB.general;

	for (const part of key.split(".")) {
		current = (current as Record<string, unknown> | undefined)?.[part];
	}

	return current;
}

function isExpression(item: ItemWithoutChildren) {
	return item.cosmetics.length === 1 && EXPRESSION_LEVELS.has(item.cosmetics[0]);
}

test("Expression cosmetics are exactly those drawn with an expression emoji.", () => {
	const expressionEmojis = new Set<Emoji>(Object.values(EMOTE_EMOJIS));

	const drawnAsExpressions = new Set(
		Object.entries(CosmeticToEmoji)
			.filter(([, emoji]) => emoji && expressionEmojis.has(emoji))
			.map(([cosmetic]) => Number(cosmetic)),
	);

	deepStrictEqual(drawnAsExpressions, new Set(EXPRESSION_LEVELS.keys()));
});

test("Music sheet cosmetics are exactly those drawn with the music sheet emoji.", () => {
	const drawnAsMusicSheets = new Set(
		Object.entries(CosmeticToEmoji)
			.filter(([, emoji]) => emoji === MISCELLANEOUS_EMOJIS.MusicSheet)
			.map(([cosmetic]) => Number(cosmetic)),
	);

	deepStrictEqual(drawnAsMusicSheets, MUSIC_SHEETS);
});

test("An expression's level comes from its cosmetic.", () => {
	equal(EXPRESSION_LEVELS.get(Cosmetic.EmoteSit), 1);
	equal(EXPRESSION_LEVELS.get(Cosmetic.EmoteShowDance1), 1);
	equal(EXPRESSION_LEVELS.get(Cosmetic.EmoteShowDance3), 3);
	equal(EXPRESSION_LEVELS.get(Cosmetic.EmoteHeartGesture4), 4);
	equal(EXPRESSION_LEVELS.get(Cosmetic.AURORAMask), undefined);
});

test("Expressions are named by their level, never by a name of their own.", () => {
	for (const [source, item] of OFFERED_ITEMS) {
		const { key, level } = item.translation;
		const expression = isExpression(item);
		equal(
			EXPRESSION_KEYS.has(key),
			expression,
			`${source} names ${item.cosmetics[0]} with ${key}.`,
		);

		if (expression) {
			const expressionLevel = EXPRESSION_LEVELS.get(item.cosmetics[0]) ?? 1;
			equal(LEVEL_KEYS.has(key), expressionLevel > 1, `${source} mislabels ${item.cosmetics[0]}.`);
			equal(
				level,
				expressionLevel > 1 ? expressionLevel : undefined,
				`${source} drops the level of ${item.cosmetics[0]}.`,
			);
		}
	}
});

test("AURORA numbers each of its expressions.", () => {
	const aurora = spirits().get(SpiritId.AURORA);
	ok(aurora, "Expected AURORA.");
	const numbersByExpression = new Map<Emoji | null, Set<number | undefined>>();

	for (const item of friendshipTreeToItems(aurora.current).filter(isExpression)) {
		const emoji = CosmeticToEmoji[item.cosmetics[0]];
		const numbers = numbersByExpression.get(emoji) ?? new Set();
		numbers.add(item.translation.number);
		numbersByExpression.set(emoji, numbers);
	}

	deepStrictEqual(
		Array.from(numbersByExpression.values(), (numbers) => Array.from(numbers)),
		[[1], [2], [3]],
	);
});

test("Stances and calls are never named.", () => {
	const labels = new Map<Emoji, string>();

	for (const emoji of Object.values(STANCE_EMOJIS)) {
		labels.set(emoji, `cosmetic-common-names.${CosmeticCommon.Stance}`);
	}

	for (const emoji of Object.values(CALL_EMOJIS)) {
		labels.set(emoji, `cosmetic-common-names.${CosmeticCommon.Call}`);
	}

	const found = new Set<string>();

	for (const [source, item] of OFFERED_ITEMS) {
		const emoji = item.cosmetics.length === 1 ? CosmeticToEmoji[item.cosmetics[0]] : null;
		const label = emoji ? labels.get(emoji) : undefined;

		if (label) {
			found.add(label);
			equal(item.translation.key, label, `${source} names ${item.cosmetics[0]}.`);
		}
	}

	equal(found.size, 2, "Expected stances and calls on offer.");
});

test("Every offered item has an English name.", () => {
	for (const [source, item] of OFFERED_ITEMS) {
		equal(
			typeof englishName(item.translation.key),
			"string",
			`${source} offers ${item.cosmetics[0]} without an English name for ${item.translation.key}.`,
		);
	}
});
