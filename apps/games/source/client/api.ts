import type { Snowflake } from "@discordjs/core/http-only";
import type { GuessTypes } from "@thatskyapplication/utility";
import type {
	GameOverResponse,
	LeaderboardResponse,
	SessionResponse,
	StateResponse,
} from "../guess.js";
import { RequestError } from "./models/request-error.js";

export type { GuessMode, LeaderboardResponse, Links, StateResponse, Strings } from "../guess.js";
export { RequestError } from "./models/request-error.js";

const STATE_PATH = "/api/state" as const;
const TOKEN_PATH = "/api/token" as const;
const NAME_PATH = "/api/name" as const;
const START_PATH = "/api/start" as const;
const ANSWER_PATH = "/api/answer" as const;
const END_PATH = "/api/end" as const;
const LEADERBOARD_PATH = "/api/leaderboard" as const;
const PRIMARY_PATH = "/api/primary" as const;
const CLAIM_PATH = "/api/claim" as const;
const JSON_HEADERS = { "Content-Type": "application/json" } as const;
const LOCALE_HEADER = "X-Games-Locale" as const;

let activityLocale: string | null = null;
let accessToken: string | null = null;
let tokenOnly = false;

export function identifyByToken() {
	tokenOnly = true;
}

export function setAccessToken(token: string) {
	accessToken = token;
}

export function currentLocale() {
	return activityLocale;
}

export function currentAccessToken() {
	return accessToken;
}

function credentials(): RequestCredentials {
	return tokenOnly ? "omit" : "same-origin";
}

export function setActivityLocale(locale: string) {
	activityLocale = locale;
}

function headers(base: Record<string, string> = {}) {
	return {
		...base,
		...(activityLocale === null ? {} : { [LOCALE_HEADER]: activityLocale }),
		...(accessToken === null ? {} : { Authorization: `Bearer ${accessToken}` }),
	};
}

function errorMessage(payload: unknown, status: number) {
	return typeof payload === "object" &&
		payload !== null &&
		"error" in payload &&
		typeof payload.error === "string"
		? payload.error
		: `The request failed with status ${status}.`;
}

async function payloadOrNull(response: Response): Promise<unknown> {
	try {
		return await response.json();
	} catch {
		return null;
	}
}

async function unwrap(response: Response): Promise<unknown> {
	const payload = await payloadOrNull(response);

	if (!response.ok || payload === null) {
		throw new RequestError(errorMessage(payload, response.status), response.status);
	}

	return payload;
}

async function request(path: string, body: unknown): Promise<unknown> {
	return unwrap(
		await fetch(path, {
			method: "POST",
			credentials: credentials(),
			headers: headers(JSON_HEADERS),
			body: JSON.stringify(body),
		}),
	);
}

async function query(path: string): Promise<unknown> {
	return unwrap(await fetch(path, { credentials: credentials(), headers: headers() }));
}

export async function fetchState(instanceId: string | null) {
	const path =
		instanceId === null
			? STATE_PATH
			: `${STATE_PATH}?${new URLSearchParams({ instanceId }).toString()}`;

	return (await query(path)) as StateResponse;
}

export async function exchangeToken(code: string) {
	return (await request(TOKEN_PATH, { code })) as { access_token: string };
}

export async function saveName(name: string) {
	await request(NAME_PATH, { name });
}

export async function startSession(type: GuessTypes, instanceId: string | null) {
	return (await request(START_PATH, { type, instanceId })) as SessionResponse;
}

export async function answerSession(
	type: GuessTypes,
	option: number,
	instanceId: string | null,
	sessionId: string,
) {
	return (await request(ANSWER_PATH, { type, option, instanceId, sessionId })) as
		| SessionResponse
		| GameOverResponse;
}

export async function endSession(type: GuessTypes, instanceId: string | null, sessionId: string) {
	return (await request(END_PATH, { type, instanceId, sessionId })) as GameOverResponse;
}

export async function givePrimary(instanceId: string, userId: Snowflake) {
	await request(PRIMARY_PATH, { instanceId, userId });
}

export async function claimPrimary(instanceId: string) {
	await request(CLAIM_PATH, { instanceId });
}

export async function fetchLeaderboard(type: GuessTypes, page: number) {
	const search = new URLSearchParams({ type: String(type), page: String(page) });
	return (await query(`${LEADERBOARD_PATH}?${search.toString()}`)) as LeaderboardResponse;
}
