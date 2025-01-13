import type { Locale } from "@discordjs/core";

export interface InteractiveOptions {
	content?: string;
	deferred?: boolean;
	locale: Locale;
}
