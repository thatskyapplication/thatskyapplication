export const THIS_MONTH_IN_SKY_REGEX = /^tmis(\d{4})(\d{2})$/;

export const PATCH_NOTES_SECTION_REDIRECT =
	"https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/section/110-patch-notes" as const;

export const KNOWN_ISSUES_SECTION_REDIRECT =
	"https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/section/111-known-issues" as const;

export const STORE_REDIRECT = "https://store.thatskygame.com" as const;

export const THIS_MONTH_IN_SKY_MONTH_NAMES = [
	"january",
	"february",
	"march",
	"april",
	"may",
	"june",
	"july",
	"august",
	"september",
	"october",
	"november",
	"december",
] as const satisfies readonly string[];
