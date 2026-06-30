import { CDN } from "@thatskyapplication/utility";
import { useMemo } from "react";
import { useMatches } from "react-router";
import { getCDNURLFromMatches } from "~/utility/cdn.js";

export function useCDNURL() {
	return getCDNURLFromMatches(useMatches());
}

export function useCDN() {
	const cdnURL = useCDNURL();
	return useMemo(() => new CDN(cdnURL), [cdnURL]);
}
