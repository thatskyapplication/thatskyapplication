import { Locale } from "discord-api-types/v10";

const SKY_WEB_STORE_URL = "https://store.thatskygame.com" as const;

// English is at the root.
const SKY_WEB_STORE_LOCALES: Readonly<Partial<Record<string, string>>> = {
	[Locale.German]: "de-DE",
	[Locale.SpanishLATAM]: "es-ES",
	[Locale.SpanishES]: "es-ES",
	[Locale.French]: "fr-FR",
	[Locale.Indonesian]: "id-ID",
	[Locale.Italian]: "it-IT",
	[Locale.Japanese]: "ja-JP",
	[Locale.Korean]: "ko-KR",
	[Locale.PortugueseBR]: "pt-BR",
	[Locale.Russian]: "ru-RU",
	[Locale.Thai]: "th-TH",
	[Locale.Vietnamese]: "vi-VN",
	[Locale.ChineseCN]: "zh-CN",
	[Locale.ChineseTW]: "zh-TW",
};

export function skyWebStoreURL(locale: string) {
	return String(new URL(SKY_WEB_STORE_LOCALES[locale] ?? "", SKY_WEB_STORE_URL));
}
