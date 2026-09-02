import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import type { DerivedEmojis, EmojiTables } from "./emojis/derive.js";
import { skyEvents } from "./events/index.js";
import { KINGDOM } from "./kingdom/index.js";
import { spirits } from "./kingdom/spirits.js";
import type { Snowflake } from "./types/index.js";
import type { EventIds } from "./utility/event.js";
import { friendshipTreeToItems, type SpiritIds } from "./utility/spirits.js";

export const GUESS_RANK_SQL =
	"row_number() over (partition by type order by streak desc, date asc nulls first, user_id)::int" as const;

export const GUESS_TIMEOUT = 30_000 as const;
export const GUESS_OPTION_COUNT = 4 as const;
const UNSIGNED_32_BIT_RANGE = 0x1_0000_0000 as const;

export const GuessType = {
	Spirits: 0,
	SpiritsHard: 1,
	Events: 2,
} as const satisfies Readonly<Record<string, number>>;

export type GuessTypes = (typeof GuessType)[keyof typeof GuessType];
export const GUESS_TYPE_VALUES = Object.values(GuessType);

export const GuessTypeToLocaleKey = {
	[GuessType.Spirits]: "general:spirit-plural",
	[GuessType.SpiritsHard]: `features:games.guess.type.${GuessType.SpiritsHard}`,
	[GuessType.Events]: "general:events",
} as const satisfies Readonly<Record<GuessTypes, string>>;

export type GuessEmojis = Pick<
	EmojiTables,
	"FRIEND_ACTION_EMOJIS" | "MISCELLANEOUS_EMOJIS" | "SEASON_EMOJIS"
> &
	Pick<DerivedEmojis, "CosmeticToEmoji">;

interface GuessSpiritRound {
	type: typeof GuessType.Spirits | typeof GuessType.SpiritsHard;
	emojiId: Snowflake;
	answer: SpiritIds;
	options: readonly SpiritIds[];
}

interface GuessEventRound {
	type: typeof GuessType.Events;
	emojiId: Snowflake;
	answer: EventIds;
	options: readonly EventIds[];
}

export type GuessRound = GuessEventRound | GuessSpiritRound;

function randomIndex(length: number) {
	const limit = Math.floor(UNSIGNED_32_BIT_RANGE / length) * length;
	const buffer = new Uint32Array(1);
	let value: number;

	do {
		crypto.getRandomValues(buffer);
		value = buffer[0]!;
	} while (value >= limit);

	return value % length;
}

function pick<T>(values: readonly T[]) {
	return values[randomIndex(values.length)]!;
}

function shuffle<T>(array: T[]) {
	for (let index = array.length - 1; index > 0; index--) {
		const swapIndex = randomIndex(index + 1);
		const temporary = array[index]!;
		array[index] = array[swapIndex]!;
		array[swapIndex] = temporary;
	}

	return array;
}

function emojisToSkip({
	FRIEND_ACTION_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
}: GuessEmojis): ReadonlySet<Snowflake> {
	const skipped = new Set<Snowflake>([
		MISCELLANEOUS_EMOJIS.Blessing1.id,
		MISCELLANEOUS_EMOJIS.Blessing2.id,
		MISCELLANEOUS_EMOJIS.Blessing3.id,
		MISCELLANEOUS_EMOJIS.Heart.id,
		MISCELLANEOUS_EMOJIS.MusicSheet.id,
		MISCELLANEOUS_EMOJIS.Quest.id,
		MISCELLANEOUS_EMOJIS.SpellColourTrail.id,
		MISCELLANEOUS_EMOJIS.SpellSharedMemory.id,
		MISCELLANEOUS_EMOJIS.SpellSharedSpace.id,
		MISCELLANEOUS_EMOJIS.WingBuff.id,
		MISCELLANEOUS_EMOJIS.DyeRed.id,
		MISCELLANEOUS_EMOJIS.DyeYellow.id,
		MISCELLANEOUS_EMOJIS.DyeGreen.id,
		MISCELLANEOUS_EMOJIS.DyeCyan.id,
		MISCELLANEOUS_EMOJIS.DyeBlue.id,
		MISCELLANEOUS_EMOJIS.DyePurple.id,
		MISCELLANEOUS_EMOJIS.DyeBlack.id,
		MISCELLANEOUS_EMOJIS.DyeWhite.id,
		MISCELLANEOUS_EMOJIS.Dye.id,
		FRIEND_ACTION_EMOJIS.HighFive.id,
		FRIEND_ACTION_EMOJIS.Hug.id,
	]);

	for (const [key, { id }] of [
		...Object.entries(MISCELLANEOUS_EMOJIS),
		...Object.entries(SEASON_EMOJIS),
	]) {
		if (key.includes("Heart")) {
			skipped.add(id);
		}
	}

	return skipped;
}

let spiritEmojiIndex: {
	emojis: GuessEmojis;
	index: ReadonlyCollection<Snowflake, SpiritIds>;
	source: ReturnType<typeof spirits>;
} | null = null;

function guessSpiritEmojis(emojis: GuessEmojis): ReadonlyCollection<Snowflake, SpiritIds> {
	const source = spirits();

	if (
		spiritEmojiIndex !== null &&
		spiritEmojiIndex.source === source &&
		spiritEmojiIndex.emojis === emojis
	) {
		return spiritEmojiIndex.index;
	}

	const skipped = emojisToSkip(emojis);
	const spiritCosmeticEmojis = new Collection<Snowflake, SpiritIds>();

	for (const spirit of source.values()) {
		for (const item of friendshipTreeToItems(spirit.displayFriendshipTree)) {
			for (const cosmetic of item.cosmetics) {
				const emoji = emojis.CosmeticToEmoji[cosmetic];

				if (emoji && !skipped.has(emoji.id)) {
					spiritCosmeticEmojis.set(emoji.id, spirit.id);
				}
			}
		}
	}

	spiritEmojiIndex = { emojis, index: spiritCosmeticEmojis, source };
	return spiritCosmeticEmojis;
}

let eventEmojiIndex: {
	emojis: GuessEmojis;
	index: ReadonlyCollection<Snowflake, EventIds>;
	source: ReturnType<typeof skyEvents>;
} | null = null;

function guessEventEmojis(emojis: GuessEmojis): ReadonlyCollection<Snowflake, EventIds> {
	const source = skyEvents();

	if (
		eventEmojiIndex !== null &&
		eventEmojiIndex.source === source &&
		eventEmojiIndex.emojis === emojis
	) {
		return eventEmojiIndex.index;
	}

	const skipped = emojisToSkip(emojis);
	const eventCosmeticEmojis = new Collection<Snowflake, EventIds>();

	for (const event of source.values()) {
		for (const offer of event.offer) {
			for (const cosmetic of offer.cosmetics) {
				const emoji = emojis.CosmeticToEmoji[cosmetic];

				if (emoji && !skipped.has(emoji.id)) {
					eventCosmeticEmojis.set(emoji.id, event.id);
				}
			}
		}
	}

	eventEmojiIndex = { emojis, index: eventCosmeticEmojis, source };
	return eventCosmeticEmojis;
}

function generateSpiritRound(
	type: typeof GuessType.Spirits | typeof GuessType.SpiritsHard,
	emojis: GuessEmojis,
): GuessSpiritRound {
	const spiritCosmeticEmojis = guessSpiritEmojis(emojis);
	const emojiId = pick([...spiritCosmeticEmojis.keys()]);
	const answer = spiritCosmeticEmojis.get(emojiId)!;
	const options = new Set<SpiritIds>([answer]);

	if (type === GuessType.SpiritsHard) {
		const guessableSpiritIds = new Set(spiritCosmeticEmojis.values());

		const realm = KINGDOM.groupFor(answer)!.filter((spirit) => guessableSpiritIds.has(spirit.id));
		const realmSpirits = [...realm.values()];

		while (options.size < Math.min(GUESS_OPTION_COUNT, realm.size)) {
			options.add(pick(realmSpirits).id);
		}
	}

	const guessableSpirits = [...spiritCosmeticEmojis.values()];

	while (options.size < GUESS_OPTION_COUNT) {
		options.add(pick(guessableSpirits));
	}

	return { type, emojiId, answer, options: shuffle([...options]) };
}

function generateEventRound(emojis: GuessEmojis): GuessEventRound {
	const eventCosmeticEmojis = guessEventEmojis(emojis);
	const emojiId = pick([...eventCosmeticEmojis.keys()]);
	const answer = eventCosmeticEmojis.get(emojiId)!;
	const events = skyEvents();
	const options = new Set<EventIds>([answer]);
	const families = new Set([events.get(answer)!.family]);

	const guessableEvents = [...eventCosmeticEmojis.values()];

	while (options.size < GUESS_OPTION_COUNT) {
		const option = pick(guessableEvents);
		const { family } = events.get(option)!;

		if (families.has(family)) {
			continue;
		}

		families.add(family);
		options.add(option);
	}

	return { type: GuessType.Events, emojiId, answer, options: shuffle([...options]) };
}

export function generateGuessRound(
	type: typeof GuessType.Spirits | typeof GuessType.SpiritsHard,
	emojis: GuessEmojis,
): GuessSpiritRound;
export function generateGuessRound(
	type: typeof GuessType.Events,
	emojis: GuessEmojis,
): GuessEventRound;
export function generateGuessRound(type: GuessTypes, emojis: GuessEmojis): GuessRound;
export function generateGuessRound(type: GuessTypes, emojis: GuessEmojis): GuessRound {
	return type === GuessType.Events ? generateEventRound(emojis) : generateSpiritRound(type, emojis);
}
