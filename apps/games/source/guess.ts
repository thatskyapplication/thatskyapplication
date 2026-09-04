export const SOCKET_PATH = "/ws" as const;
export const SENTRY_TUNNEL_PATH = "/sentry" as const;

export const SocketClose = {
	GoingAway: 1_001,
	HandshakeInvalid: 4_000,
	AuthenticationFailed: 4_001,
	AuthenticationTimeout: 4_002,
	NotInInstance: 4_003,
	ConnectionLimit: 4_004,
} as const satisfies Readonly<Record<string, number>>;

export const SOCKET_CLOSE_APPLICATION_MINIMUM = 4_000 as const;
export const SOCKET_CLOSE_APPLICATION_MAXIMUM = 4_999 as const;

import type { Snowflake } from "@discordjs/core/http-only";
import type { GuessTypes } from "@thatskyapplication/utility";

export const GuessOutcome = {
	Incorrect: 1,
	Expired: 2,
	Ended: 3,
} as const satisfies Readonly<Record<string, number>>;

type GuessOutcomes = (typeof GuessOutcome)[keyof typeof GuessOutcome];

export interface GuessOption {
	id: number;
	name: string;
}

export interface GuessSessionView {
	id: string;
	type: GuessTypes;
	streak: number;
	emojiURL: string;
	options: readonly GuessOption[];
	expiresAt: number;
	remainingMilliseconds: number;
	durationMilliseconds: number;
}

export interface GuessGameOver {
	outcome: GuessOutcomes;
	type: GuessTypes;
	emojiURL: string;
	answer: GuessOption;
	option: GuessOption | null;
	streak: number;
	highestStreak: number;
	shareMessage: string;
}

export interface Strings {
	chooseMode: string;
	endGame: string;
	gameOver: string;
	answer: string;
	yourGuess: string;
	tooLate: string;
	tryAgain: string;
	title: string;
	streak: string;
	highest: string;
	nameRequired: string;
	leaderboardNothing: string;
	leaderboardUnnamed: string;
	leaderboardLabel: string;
	giveControl: string;
	takeControl: string;
	host: string;
	presenceSelecting: string;
	share: string;
	skyProfileWebsite: string;
	website: string;
	skyProfile: string;
	supportServer: string;
	navigationBack: string;
	navigationNext: string;
	namePlaceholder: string;
	save: string;
	signIn: string;
	retry: string;
	connectionLost: string;
	connectionRejected: string;
	connectionExpired: string;
	connectionTimedOut: string;
	connectionElsewhere: string;
	connectionLimit: string;
}

export interface Links {
	skyProfile: string;
	sourceCode: string;
	supportServer: string;
	website: string;
}

export interface GuessMode {
	type: GuessTypes;
	name: string;
}

export type StateResponse =
	| { authenticated: false; applicationId: string; locale: string; strings: Strings }
	| {
			authenticated: true;
			applicationId: string;
			nameRequired: true;
			nameMaximumLength: number;
			skyProfileURL: string;
			locale: string;
			strings: Strings;
	  }
	| {
			authenticated: true;
			applicationId: string;
			locale: string;
			nameRequired: false;
			modes: readonly GuessMode[];
			session: GuessSessionView | null;
			gameOver: GuessGameOver | null;
			highestStreak: number;
			claimable: boolean;
			connectedUserIds: readonly Snowflake[];
			isPrimary: boolean;
			links: Links;
			primaryUserId: Snowflake | null;
			spectatorLabel: string | null;
			strings: Strings;
	  };

export interface SessionResponse {
	session: GuessSessionView;
	highestStreak: number;
}

export interface GameOverResponse {
	gameOver: GuessGameOver;
}

interface LeaderboardEntry {
	date: string | null;
	iconURL: string | null;
	name: string | null;
	rank: number;
	streak: number;
	userId: Snowflake;
	you: boolean;
}

export interface LeaderboardResponse {
	entries: readonly LeaderboardEntry[];
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	page: number;
	title: string;
	viewerLabel: string | null;
}
