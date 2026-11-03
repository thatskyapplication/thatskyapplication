import { useFetcher } from "react-router";
import type { ChecklistColumn } from "@thatskyapplication/utility";

export function useChecklistToggle(column: ChecklistColumn, value: boolean) {
	const fetcher = useFetcher({ key: `checklist:${column}` });
	return [fetcher, fetcher.formData ? fetcher.formData.get(column) === "0" : value] as const;
}
