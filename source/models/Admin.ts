import type { LocaleString } from "@discordjs/core";

export interface InteractiveOptions {
	content?: string;
	deferred?: boolean;
	locale: LocaleString;
}
