import { randomUUID } from "node:crypto";
import type { Snowflake } from "@discordjs/core/http-only";
import type { Transaction } from "kysely";
import { sql } from "kysely";
import {
	type DB,
	type EventIds,
	generateGuessRound,
	GUESS_TIMEOUT,
	formatEmojiURL,
	GUESS_RANK_SQL,
	GUESS_TYPE_VALUES,
	GuessType,
	GuessTypeToLocaleKey,
	type GuessTypes,
	SKY_PROFILE_MAXIMUM_NAME_LENGTH,
	skyEvents,
} from "@thatskyapplication/utility";
import {
	type GuessGameOver,
	GuessOutcome,
	type GuessOption,
	type GuessSessionView,
} from "../guess.js";
import { skyProfileIconURL } from "./cdn.js";
import database from "./database.js";
import { EMOJIS } from "./emojis.js";
import { type Locales, translate } from "./locale.js";

const GUESS_RANK_RAW = sql.raw<number>(GUESS_RANK_SQL);
const LEADERBOARD_PAGE_SIZE = 10 as const;
const SESSION_COLUMNS = ["id", "type", "streak", "emoji_id", "options", "expires_at"] as const;
const GAME_SESSION_ADVISORY_LOCK_NAMESPACE = 1 as const;

function resolveOptions(type: GuessTypes, ids: readonly number[], locale: Locales) {
	const events = type === GuessType.Events ? skyEvents() : undefined;
	return ids.map((id) => resolveOption(type, id, locale, events));
}

function resolveOption(
	type: GuessTypes,
	id: number,
	locale: Locales,
	events?: ReturnType<typeof skyEvents>,
): GuessOption {
	const key =
		type === GuessType.Events ? (events ?? skyEvents()).get(id as EventIds)!.name : `spirits.${id}`;

	return { id, name: translate(locale, key, { ns: "general" }) };
}

export function guessModes(locale: Locales) {
	return GUESS_TYPE_VALUES.map((type) => ({
		type,
		name: translate(locale, GuessTypeToLocaleKey[type]),
	}));
}

function toView(
	session: {
		id: string;
		type: number;
		streak: number;
		emoji_id: string;
		options: readonly number[];
		expires_at: Date;
	},
	locale: Locales,
): GuessSessionView {
	const type = session.type as GuessTypes;

	return {
		id: session.id,
		type,
		streak: session.streak,
		emojiURL: formatEmojiURL(session.emoji_id as `${bigint}`),
		options: resolveOptions(type, session.options, locale),
		expiresAt: session.expires_at.getTime(),
		remainingMilliseconds: Math.max(0, session.expires_at.getTime() - Date.now()),
		durationMilliseconds: GUESS_TIMEOUT,
	};
}

export async function highestStreak(userId: Snowflake, type: GuessTypes) {
	return (
		(
			await database
				.selectFrom("guess")
				.select("streak")
				.where("user_id", "=", userId)
				.where("type", "=", type)
				.executeTakeFirst()
		)?.streak ?? 0
	);
}

async function recordGuessResult(
	transaction: Transaction<DB>,
	userId: Snowflake,
	type: GuessTypes,
	streak: number,
) {
	await transaction
		.insertInto("guess")
		.values({ user_id: userId, streak, type, date: new Date() })
		.onConflict((oc) =>
			oc
				.columns(["user_id", "type"])
				.doUpdateSet((eb) => ({
					streak: eb.ref("excluded.streak"),
					date: eb.ref("excluded.date"),
				}))
				.where("guess.streak", "<", streak),
		)
		.execute();
}

export async function currentGuessSession(userId: Snowflake, locale: Locales) {
	const session = await database
		.selectFrom("game_sessions")
		.select(SESSION_COLUMNS)
		.where("user_id", "=", userId)
		.where("expires_at", ">", new Date())
		.orderBy("updated_at", "desc")
		.executeTakeFirst();

	return session ? toView(session, locale) : null;
}

export async function hasActiveGuessSession(userId: Snowflake) {
	const session = await database
		.selectFrom("game_sessions")
		.select("id")
		.where("user_id", "=", userId)
		.where("expires_at", ">", new Date())
		.executeTakeFirst();

	return session !== undefined;
}

async function lockGameSessions(transaction: Transaction<DB>, userId: Snowflake) {
	await sql`select pg_advisory_xact_lock(${GAME_SESSION_ADVISORY_LOCK_NAMESPACE}::int4, hashtext(${userId}))`.execute(
		transaction,
	);
}

export async function startGuessSession(
	userId: Snowflake,
	type: GuessTypes,
	instanceId: string | null,
	locale: Locales,
) {
	const { emojiId, answer, options } = generateGuessRound(type, EMOJIS);
	const expiresAt = new Date(Date.now() + GUESS_TIMEOUT);
	const id = randomUUID();

	const started = await database.transaction().execute(async (transaction) => {
		await lockGameSessions(transaction, userId);

		const sessions = await transaction
			.selectFrom("game_sessions")
			.selectAll()
			.where("user_id", "=", userId)
			.orderBy("type")
			.forUpdate()
			.execute();

		const now = Date.now();

		if (sessions.some((session) => session.expires_at.getTime() > now)) {
			return false;
		}

		for (const session of sessions) {
			await finishGuessSession(
				transaction,
				userId,
				session.type as GuessTypes,
				session.id,
				GuessOutcome.Expired,
				session.emoji_id,
				session.answer,
				null,
				session.streak,
			);
		}

		const inserted = await transaction
			.insertInto("game_sessions")
			.values({
				id,
				user_id: userId,
				instance_id: instanceId,
				type,
				streak: 0,
				emoji_id: emojiId,
				answer,
				options: [...options],
				expires_at: expiresAt,
			})
			.onConflict((oc) => oc.columns(["user_id", "type"]).doNothing())
			.returning("id")
			.executeTakeFirst();

		return inserted !== undefined;
	});

	if (!started) {
		return null;
	}

	return {
		id,
		type,
		streak: 0,
		emojiURL: formatEmojiURL(emojiId),
		options: resolveOptions(type, options, locale),
		expiresAt: expiresAt.getTime(),
		remainingMilliseconds: Math.max(0, expiresAt.getTime() - Date.now()),
		durationMilliseconds: GUESS_TIMEOUT,
	} satisfies GuessSessionView;
}

export interface FinishedRound {
	answer: number;
	emojiId: string;
	highestStreak: number;
	option: number | null;
	outcome: GuessGameOver["outcome"];
	streak: number;
	type: GuessTypes;
}

async function finishGuessSession(
	transaction: Transaction<DB>,
	userId: Snowflake,
	type: GuessTypes,
	sessionId: string,
	outcome: GuessGameOver["outcome"],
	emojiId: string,
	answer: number,
	option: number | null,
	streak: number,
) {
	await recordGuessResult(transaction, userId, type, streak);

	const recordedHighestStreak =
		(
			await transaction
				.selectFrom("guess")
				.select("streak")
				.where("user_id", "=", userId)
				.where("type", "=", type)
				.executeTakeFirst()
		)?.streak ?? streak;

	await transaction.deleteFrom("game_sessions").where("id", "=", sessionId).execute();

	return {
		answer,
		emojiId,
		highestStreak: recordedHighestStreak,
		option,
		outcome,
		streak,
		type,
	} satisfies FinishedRound;
}

export function resolveGameOver(round: FinishedRound, locale: Locales) {
	const events = round.type === GuessType.Events ? skyEvents() : undefined;

	return {
		outcome: round.outcome,
		type: round.type,
		emojiURL: formatEmojiURL(round.emojiId as `${bigint}`),
		answer: resolveOption(round.type, round.answer, locale, events),
		option: round.option === null ? null : resolveOption(round.type, round.option, locale, events),
		streak: round.streak,
		highestStreak: round.highestStreak,
		shareMessage: translate(locale, "games.guess.share-message", {
			ns: "features",
			count: round.streak,
			mode: translate(locale, GuessTypeToLocaleKey[round.type]),
		}),
	} satisfies GuessGameOver;
}

export async function answerGuessSession(
	userId: Snowflake,
	type: GuessTypes,
	option: number,
	sessionId: string | null | undefined,
	locale: Locales,
) {
	return database.transaction().execute(async (transaction) => {
		const session = await transaction
			.selectFrom("game_sessions")
			.selectAll()
			.where("user_id", "=", userId)
			.where("type", "=", type)
			.$if(typeof sessionId === "string", (builder) => builder.where("id", "=", sessionId!))
			.forUpdate()
			.executeTakeFirst();

		if (!session || !session.options.includes(option)) {
			return null;
		}

		if (session.expires_at.getTime() <= Date.now()) {
			const round = await finishGuessSession(
				transaction,
				userId,
				type,
				session.id,
				GuessOutcome.Expired,
				session.emoji_id,
				session.answer,
				option,
				session.streak,
			);

			return { ...round, instanceId: session.instance_id };
		}

		if (option !== session.answer) {
			const round = await finishGuessSession(
				transaction,
				userId,
				type,
				session.id,
				GuessOutcome.Incorrect,
				session.emoji_id,
				session.answer,
				option,
				session.streak,
			);

			return { ...round, instanceId: session.instance_id };
		}

		const round = generateGuessRound(type, EMOJIS);
		const nextSessionId = randomUUID();
		const streak = session.streak + 1;
		const expiresAt = new Date(Date.now() + GUESS_TIMEOUT);

		await transaction
			.updateTable("game_sessions")
			.set({
				id: nextSessionId,
				streak,
				emoji_id: round.emojiId,
				answer: round.answer,
				options: [...round.options],
				expires_at: expiresAt,
				updated_at: new Date(),
			})
			.where("id", "=", session.id)
			.execute();

		return {
			id: nextSessionId,
			type,
			streak,
			emojiURL: formatEmojiURL(round.emojiId),
			options: resolveOptions(type, round.options, locale),
			expiresAt: expiresAt.getTime(),
			remainingMilliseconds: Math.max(0, expiresAt.getTime() - Date.now()),
			durationMilliseconds: GUESS_TIMEOUT,
		} satisfies GuessSessionView;
	});
}

export interface ExpiredRound extends FinishedRound {
	instanceId: string | null;
	userId: Snowflake;
}

async function expireGuessSession(sessionId: string, expiredBy: Date) {
	return database.transaction().execute(async (transaction) => {
		const session = await transaction
			.selectFrom("game_sessions")
			.selectAll()
			.where("id", "=", sessionId)
			.where("expires_at", "<=", expiredBy)
			.forUpdate()
			.executeTakeFirst();

		if (!session) {
			return null;
		}

		const userId = session.user_id;

		const round = await finishGuessSession(
			transaction,
			userId,
			session.type as GuessTypes,
			session.id,
			GuessOutcome.Expired,
			session.emoji_id,
			session.answer,
			null,
			session.streak,
		);

		return { ...round, instanceId: session.instance_id, userId } satisfies ExpiredRound;
	});
}

export async function expireGuessSessions(): Promise<readonly ExpiredRound[]> {
	const expiredBy = new Date();

	const sessions = await database
		.selectFrom("game_sessions")
		.select("id")
		.where("expires_at", "<=", expiredBy)
		.orderBy("expires_at")
		.orderBy("id")
		.execute();

	const expired: ExpiredRound[] = [];

	for (const { id } of sessions) {
		const round = await expireGuessSession(id, expiredBy);

		if (round !== null) {
			expired.push(round);
		}
	}

	return expired;
}

export async function abandonGuessSessions(
	userId: Snowflake,
	instanceId: string | null,
): Promise<readonly ExpiredRound[]> {
	const sessions = await database
		.selectFrom("game_sessions")
		.select(["id", "type"])
		.where("user_id", "=", userId)
		.$if(instanceId !== null, (builder) => builder.where("instance_id", "=", instanceId!))
		.execute();

	const abandoned: ExpiredRound[] = [];

	for (const { id, type } of sessions) {
		const round = await endGuessSession(userId, type as GuessTypes, id);

		if (round !== null) {
			abandoned.push({ ...round, userId });
		}
	}

	return abandoned;
}

export async function endGuessSession(
	userId: Snowflake,
	type: GuessTypes,
	sessionId?: string | null,
) {
	return database.transaction().execute(async (transaction) => {
		const session = await transaction
			.selectFrom("game_sessions")
			.selectAll()
			.where("user_id", "=", userId)
			.where("type", "=", type)
			.$if(typeof sessionId === "string", (builder) => builder.where("id", "=", sessionId!))
			.forUpdate()
			.executeTakeFirst();

		if (!session) {
			return null;
		}

		const round = await finishGuessSession(
			transaction,
			userId,
			type,
			session.id,
			session.expires_at.getTime() <= Date.now() ? GuessOutcome.Expired : GuessOutcome.Ended,
			session.emoji_id,
			session.answer,
			null,
			session.streak,
		);

		return { ...round, instanceId: session.instance_id };
	});
}

export async function skyProfileName(userId: Snowflake) {
	return (
		(
			await database
				.selectFrom("sky_profiles")
				.select("name")
				.where("user_id", "=", userId)
				.executeTakeFirst()
		)?.name ?? null
	);
}

export async function saveSkyProfileName(userId: Snowflake, name: string) {
	const trimmed = name.replaceAll("\n", " ").trim();

	if (trimmed.length === 0 || trimmed.length > SKY_PROFILE_MAXIMUM_NAME_LENGTH) {
		return false;
	}

	const lastUpdatedAt = new Date();

	await database
		.insertInto("sky_profiles")
		.values({ user_id: userId, name: trimmed, last_updated_at: lastUpdatedAt })
		.onConflict((oc) =>
			oc.column("user_id").doUpdateSet({ name: trimmed, last_updated_at: lastUpdatedAt }),
		)
		.execute();

	return true;
}

function rankedGuesses(type: GuessTypes) {
	return database.selectFrom((eb) =>
		eb
			.selectFrom("guess as ranked_guess_base")
			.select([
				"ranked_guess_base.user_id",
				"ranked_guess_base.type",
				"ranked_guess_base.streak",
				"ranked_guess_base.date",
				GUESS_RANK_RAW.as("rank"),
			])
			.where("ranked_guess_base.type", "=", type)
			.where("ranked_guess_base.streak", ">", 0)
			.as("ranked_guess"),
	);
}

export async function guessLeaderboard(type: GuessTypes, page: number, userId: Snowflake) {
	const offset = (page - 1) * LEADERBOARD_PAGE_SIZE;

	const rows = await rankedGuesses(type)
		.leftJoin("sky_profiles", "sky_profiles.user_id", "ranked_guess.user_id")
		.select([
			"ranked_guess.user_id",
			"ranked_guess.streak",
			"ranked_guess.rank",
			"ranked_guess.date",
			"sky_profiles.name",
			"sky_profiles.icon",
		])
		.$narrowType<{ streak: number }>()
		.orderBy("ranked_guess.rank")
		.limit(LEADERBOARD_PAGE_SIZE + 1)
		.offset(offset)
		.execute();

	const hasNextPage = rows.length > LEADERBOARD_PAGE_SIZE;

	const viewer = await rankedGuesses(type)
		.select(["ranked_guess.rank", "ranked_guess.streak"])
		.$narrowType<{ streak: number }>()
		.where("ranked_guess.user_id", "=", userId)
		.executeTakeFirst();

	return {
		entries: rows.slice(0, LEADERBOARD_PAGE_SIZE).map((row) => ({
			date: row.date?.toISOString() ?? null,
			iconURL: row.icon ? skyProfileIconURL(row.user_id, row.icon) : null,
			name: row.name,
			rank: row.rank,
			streak: row.streak,
			userId: row.user_id,
			you: row.user_id === userId,
		})),
		hasNextPage,
		hasPreviousPage: page > 1,
		page,
		viewer: viewer ?? null,
	};
}
