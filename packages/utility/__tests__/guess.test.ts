import { equal, ok } from "node:assert/strict";
import { test } from "node:test";
import { productionEmojis } from "../source/emojis/index.js";
import { skyEvents } from "../source/events/index.js";
import {
	generateGuessRound,
	GUESS_OPTION_COUNT,
	GUESS_TYPE_VALUES,
	GuessType,
	type GuessTypes,
} from "../source/guess.js";
import { KINGDOM } from "../source/kingdom/index.js";
import type { EventIds } from "../source/utility/event.js";
import type { SpiritIds } from "../source/utility/spirits.js";

const ROUNDS = 500 as const;
const EMOJIS = productionEmojis();

function rounds(type: GuessTypes) {
	return Array.from({ length: ROUNDS }, () => generateGuessRound(type, EMOJIS));
}

for (const type of GUESS_TYPE_VALUES) {
	test(`Guessing game rounds of type ${type} offer ${GUESS_OPTION_COUNT} distinct options.`, () => {
		for (const round of rounds(type)) {
			equal(round.options.length, GUESS_OPTION_COUNT);
			equal(new Set(round.options).size, GUESS_OPTION_COUNT);
		}
	});

	test(`Guessing game rounds of type ${type} always include the answer.`, () => {
		for (const round of rounds(type)) {
			ok(
				(round.options as readonly number[]).includes(round.answer),
				`The answer ${round.answer} was missing from the options.`,
			);
		}
	});

	test(`Guessing game rounds of type ${type} place the answer in every position.`, () => {
		const positions = new Set(
			rounds(type).map((round) => (round.options as readonly number[]).indexOf(round.answer)),
		);

		equal(positions.size, GUESS_OPTION_COUNT);
	});
}

test("Guessing game event rounds never repeat an event family.", () => {
	const events = skyEvents();

	for (const round of rounds(GuessType.Events)) {
		const families = (round.options as readonly EventIds[]).map(
			(option) => events.get(option)!.family,
		);

		equal(new Set(families).size, families.length);
	}
});

test("Guessing game hard rounds prefer options from the answer's realm.", () => {
	let sameRealm = 0;
	let total = 0;

	for (const round of rounds(GuessType.SpiritsHard)) {
		const realm = KINGDOM.groupFor(round.answer)!;

		for (const option of round.options as readonly SpiritIds[]) {
			if (option !== round.answer) {
				total++;

				if (realm.has(option)) {
					sameRealm++;
				}
			}
		}
	}

	ok(
		sameRealm / total > 0.5,
		`Only ${sameRealm} of ${total} hard mode options shared the answer's realm.`,
	);
});
