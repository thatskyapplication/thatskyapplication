import { type Country, CountryToEmoji } from "@thatskyapplication/utility";

export function formatCountryLabel(country: Country, displayNames: Intl.DisplayNames) {
	return `${CountryToEmoji[country]} ${displayNames.of(country)}`;
}
