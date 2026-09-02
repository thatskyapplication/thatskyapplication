import type { Snowflake } from "@discordjs/core/http-only";
import { SKY_PROFILE_MAXIMUM_NAME_LENGTH, WEBSITE_URL } from "@thatskyapplication/utility";
import type { GuessGameOver, GuessSessionView, StateResponse } from "../guess.js";
import { APPLICATION_ID } from "./config.js";
import {
	currentGuessSession,
	guessModes,
	highestStreak,
	resolveGameOver,
	skyProfileName,
} from "./guess.js";
import {
	canClaimPrimary,
	connectedUserIds,
	finishedRound,
	finishedRoundForUser,
	primaryFor,
} from "./instances.js";
import { interfaceStrings, type Locales, translate } from "./locale.js";

const SKY_PROFILE_WEBSITE_URL = `${WEBSITE_URL}/me/sky-profile` as const;
const SOURCE_CODE_URL = "https://github.com/thatskyapplication/thatskyapplication" as const;
const SUPPORT_SERVER_URL = "https://discord.gg/NuPM4A4NeH" as const;

const LINKS = {
	skyProfile: SKY_PROFILE_WEBSITE_URL,
	sourceCode: SOURCE_CODE_URL,
	supportServer: SUPPORT_SERVER_URL,
	website: WEBSITE_URL,
} as const;

export interface SharedState {
	gameOver: GuessGameOver | null;
	highestStreak: number;
	primaryUserId: Snowflake | null;
	session: GuessSessionView | null;
}

function lastFinishedRound(primaryUserId: Snowflake | null, instanceId: string | null) {
	if (instanceId !== null) {
		return finishedRound(instanceId);
	}

	return primaryUserId === null ? null : finishedRoundForUser(primaryUserId);
}

export async function sharedStateFor(
	primaryUserId: Snowflake | null,
	instanceId: string | null,
	locale: Locales,
): Promise<SharedState> {
	const session = primaryUserId === null ? null : await currentGuessSession(primaryUserId, locale);
	const lastRound = session === null ? lastFinishedRound(primaryUserId, instanceId) : null;

	return {
		gameOver: lastRound === null ? null : resolveGameOver(lastRound, locale),
		highestStreak:
			primaryUserId !== null && session !== null
				? await highestStreak(primaryUserId, session.type)
				: 0,
		primaryUserId,
		session,
	};
}

function resolvePrimaryUserId(userId: Snowflake, instanceId: string | null, shared?: SharedState) {
	if (shared) {
		return shared.primaryUserId;
	}

	return instanceId === null ? userId : primaryFor(instanceId);
}

function spectatorLabelKey(primaryUserId: Snowflake | null, session: GuessSessionView | null) {
	if (primaryUserId === null) {
		return "games.guess.spectating-no-host";
	}

	return session === null ? "games.guess.spectating-waiting" : "games.guess.spectating";
}

export async function buildState(
	userId: Snowflake | null,
	instanceId: string | null,
	locale: Locales,
	shared?: SharedState,
): Promise<StateResponse> {
	const strings = interfaceStrings(locale);

	if (!userId) {
		return { authenticated: false, applicationId: APPLICATION_ID, locale, strings };
	}

	const primaryUserId = resolvePrimaryUserId(userId, instanceId, shared);
	const isPrimary = primaryUserId === userId;
	const claimCandidate = !isPrimary && instanceId !== null && canClaimPrimary(instanceId, userId);

	const skyProfileNameMissing =
		(isPrimary || claimCandidate) && (await skyProfileName(userId)) === null;

	if (skyProfileNameMissing && (isPrimary || primaryUserId === null)) {
		return {
			authenticated: true,
			applicationId: APPLICATION_ID,
			nameRequired: true,
			nameMaximumLength: SKY_PROFILE_MAXIMUM_NAME_LENGTH,
			skyProfileURL: SKY_PROFILE_WEBSITE_URL,
			locale,
			strings,
		};
	}

	const {
		gameOver,
		highestStreak: best,
		session,
	} = shared ?? (await sharedStateFor(primaryUserId, instanceId, locale));

	let spectatorLabel: string | null = null;

	if (!isPrimary) {
		spectatorLabel = translate(locale, spectatorLabelKey(primaryUserId, session), {
			ns: "features",
		});
	}

	return {
		authenticated: true,
		applicationId: APPLICATION_ID,
		nameRequired: false,
		locale,
		modes: guessModes(locale),
		session,
		highestStreak: best,
		connectedUserIds: instanceId === null ? [] : [...connectedUserIds(instanceId)],
		claimable: claimCandidate && !skyProfileNameMissing && session === null,
		gameOver,
		isPrimary,
		links: LINKS,
		primaryUserId,
		spectatorLabel,
		strings,
	};
}
