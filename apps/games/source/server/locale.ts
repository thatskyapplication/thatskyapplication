import { Locale } from "@discordjs/core/http-only";
import i18next from "i18next";
import {
	de,
	enGB,
	es419,
	esES,
	fr,
	it,
	ja,
	ko,
	ptBR,
	ru,
	th,
	vi,
	zhCN,
	zhTW,
} from "@thatskyapplication/utility";
import type { Strings } from "../guess.js";
import pino from "./pino.js";

const LOCALES = [
	Locale.German,
	Locale.EnglishGB,
	Locale.SpanishLATAM,
	Locale.SpanishES,
	Locale.French,
	Locale.Italian,
	Locale.Japanese,
	Locale.Korean,
	Locale.PortugueseBR,
	Locale.Russian,
	Locale.Thai,
	Locale.Vietnamese,
	Locale.ChineseCN,
	Locale.ChineseTW,
] as const satisfies Readonly<Locale[]>;

export type Locales = (typeof LOCALES)[number];

await i18next.init({
	fallbackLng: Locale.EnglishGB,
	interpolation: { escapeValue: false },
	saveMissing: true,
	missingKeyHandler: (lngs, namespace, key) =>
		pino.error(
			`Locale ${lngs.join(", ")} had a missing translation in namespace ${namespace} for "${key}".`,
		),
	resources: {
		[Locale.German]: de,
		[Locale.EnglishGB]: enGB,
		[Locale.SpanishLATAM]: es419,
		[Locale.SpanishES]: esES,
		[Locale.French]: fr,
		[Locale.Italian]: it,
		[Locale.Japanese]: ja,
		[Locale.Korean]: ko,
		[Locale.PortugueseBR]: ptBR,
		[Locale.Russian]: ru,
		[Locale.Thai]: th,
		[Locale.Vietnamese]: vi,
		[Locale.ChineseCN]: zhCN,
		[Locale.ChineseTW]: zhTW,
	},
	returnEmptyString: false,
});

function isLocale(locale: string): locale is Locales {
	return LOCALES.includes(locale as Locales);
}

export function resolveLocale(...headers: (string | undefined)[]): Locales {
	for (const header of headers) {
		for (const part of header?.split(",") ?? []) {
			const candidate = part.split(";")[0]?.trim();

			if (candidate && isLocale(candidate)) {
				return candidate;
			}
		}
	}

	return Locale.EnglishGB;
}

export function translate(locale: Locales, key: string, options?: Record<string, unknown>) {
	return i18next.t(key, { lng: locale, ...options });
}

const interfaceStringsCache = new Map<Locales, ReturnType<typeof buildInterfaceStrings>>();

export function interfaceStrings(locale: Locales) {
	let strings = interfaceStringsCache.get(locale);

	if (strings === undefined) {
		strings = buildInterfaceStrings(locale);
		interfaceStringsCache.set(locale, strings);
	}

	return strings;
}

function buildInterfaceStrings(locale: Locales) {
	return {
		chooseMode: translate(locale, "games.guess.choose-mode", { ns: "features" }),
		endGame: translate(locale, "games.guess.end-game", { ns: "features" }),
		gameOver: translate(locale, "games.guess.game-over", { ns: "features" }),
		answer: translate(locale, "games.guess.answer", { ns: "features" }),
		yourGuess: translate(locale, "games.guess.your-guess", { ns: "features" }),
		tooLate: translate(locale, "games.guess.too-late", { ns: "features" }),
		tryAgain: translate(locale, "games.guess.try-again", { ns: "features" }),
		title: translate(locale, "games.guess.title", { ns: "features" }),
		streak: translate(locale, "games.guess.streak", { ns: "features" }),
		highest: translate(locale, "games.guess.highest", { ns: "features" }),
		nameRequired: translate(locale, "games.guess.name-required", { ns: "features" }),
		namePlaceholder: translate(locale, "games.guess.name-placeholder", { ns: "features" }),
		save: translate(locale, "save", { ns: "general" }),
		signIn: translate(locale, "sign-in-with-discord", { ns: "general" }),
		leaderboardNothing: translate(locale, "games.guess.leaderboard-nothing", { ns: "features" }),
		leaderboardUnnamed: translate(locale, "games.guess.leaderboard-unnamed", { ns: "features" }),
		leaderboardLabel: translate(locale, "games.guess.leaderboard-label", { ns: "features" }),
		giveControl: translate(locale, "games.guess.give-control", { ns: "features" }),
		takeControl: translate(locale, "games.guess.take-control", { ns: "features" }),
		host: translate(locale, "games.guess.host", { ns: "features" }),
		presenceSelecting: translate(locale, "games.guess.presence-selecting", { ns: "features" }),
		share: translate(locale, "games.guess.share", { ns: "features" }),
		skyProfileWebsite: translate(locale, "games.guess.sky-profile-website", { ns: "features" }),
		website: translate(locale, "games.guess.website", { ns: "features" }),
		skyProfile: translate(locale, "sky-profile.name", { ns: "features" }),
		supportServer: translate(locale, "support-server", { ns: "general" }),
		navigationBack: translate(locale, "navigation-back", { ns: "general" }),
		navigationNext: translate(locale, "navigation-next", { ns: "general" }),
		retry: translate(locale, "games.guess.retry", { ns: "features" }),
		connectionLost: translate(locale, "games.guess.connection-lost", { ns: "features" }),
		connectionRejected: translate(locale, "games.guess.connection-rejected", { ns: "features" }),
		connectionExpired: translate(locale, "games.guess.connection-expired", { ns: "features" }),
		connectionTimedOut: translate(locale, "games.guess.connection-timed-out", { ns: "features" }),
		connectionElsewhere: translate(locale, "games.guess.connection-elsewhere", { ns: "features" }),
		connectionLimit: translate(locale, "games.guess.connection-limit", { ns: "features" }),
	} satisfies Strings;
}
