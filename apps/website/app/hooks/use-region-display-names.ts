import { useMemo } from "react";

export function useRegionDisplayNames(locale: string) {
	return useMemo(() => new Intl.DisplayNames(locale, { type: "region", style: "long" }), [locale]);
}
