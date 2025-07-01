import { CDN_URL } from "@thatskyapplication/utility";

export const DEFAULT_LOCALE = "en-GB" as const;
export const APPLICATION_NAME = "Caelus" as const;
export const CROWDIN_URL = "https://thatskyapplication.crowdin.com" as const;
export const WIKI_URL = "https://sky-children-of-the-light.fandom.com" as const;

export const APPLICATION_DESCRIPTION =
	`${APPLICATION_NAME} is a Discord application for Sky: Children of the Light. Comes equipped with fun, hugs, and smiles. Share the love with your community!` as const;

export const APPLICATION_ICON_URL = String(
	new URL(`avatar_icons/${APPLICATION_NAME.toLowerCase()}.webp`, CDN_URL),
);

export const SHARD_ERUPTION_DESCRIPTION =
	"See today's shard eruption, and view a schedule of future shard eruptions." as const;

export const SHARD_ERUPTION_ICON_URL = String(new URL("assets/shard_strong.webp", CDN_URL));
export const SKY_KID_ICON_URL = String(new URL("assets/sky_kid.webp", CDN_URL));

export const SKY_PROFILES_DESCRIPTION = "See the Sky Profiles of the community!" as const;

export const INVITE_APPLICATION_URL =
	"https://discord.com/oauth2/authorize?client_id=982740693070012506" as const;

export const INVITE_SUPPORT_SERVER_URL = "https://discord.gg/dFJms52NgB" as const;
export const SEASONAL_CANDLE_ICON = String(new URL("icons/seasonal_candle.webp", CDN_URL));
export const SKY_PROFILES_PAGE_LIMIT = 24 as const;
