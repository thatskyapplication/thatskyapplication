import { type Country, countryToEmoji } from "@thatskyapplication/utility";

export function formatCountryLabel(country: Country, displayNames: Intl.DisplayNames) {
	return `${countryToEmoji(country)} ${displayNames.of(country)}`;
}
