import { useMatches } from "react-router";
import { getCDNURLFromMatches } from "~/utility/cdn.js";

export function useCDNURL() {
	return getCDNURLFromMatches(useMatches());
}
