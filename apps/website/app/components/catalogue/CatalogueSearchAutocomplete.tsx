import { Autocomplete } from "@base-ui/react/autocomplete";
import { clsx } from "clsx";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
	type CatalogueSearchEntry,
	catalogueSearch,
	type Emoji,
} from "@thatskyapplication/utility";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { PASSWORD_MANAGER_IGNORE_ATTRIBUTES } from "~/utility/password-manager.js";

const CATALOGUE_SEARCH_RESULT_LIMIT = 100 as const;

export interface CatalogueSearchResult {
	readonly detail: string;
	readonly emoji: Emoji | null;
	readonly replace?: boolean;
	readonly state?: unknown;
	readonly to: string;
}

export function CatalogueSearchAutocomplete<Entry extends CatalogueSearchEntry>({
	getEntries,
	placeholder,
	resolveResult,
}: {
	getEntries: () => readonly Entry[];
	placeholder: string;
	resolveResult: (entry: Entry) => CatalogueSearchResult;
}) {
	const { t } = useTranslation();
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	const hasQuery = query.trim().length > 0;
	const entries = useMemo(() => (hasQuery ? getEntries() : []), [getEntries, hasQuery]);
	const results = useMemo(
		() => catalogueSearch(entries, query, CATALOGUE_SEARCH_RESULT_LIMIT),
		[entries, query],
	);

	return (
		<Autocomplete.Root
			autoHighlight
			filter={null}
			items={results}
			itemToStringValue={({ name }: Entry) => name}
			onOpenChange={setOpen}
			onValueChange={(value, { reason }) => setQuery(reason === "item-press" ? "" : value)}
			open={open && hasQuery}
			openOnInputClick
			value={query}
		>
			<div className="relative">
				<Search className="pointer-events-none absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-gray-600 dark:text-gray-400" />
				<Autocomplete.Input
					aria-label={t("search-label", { ns: "general" })}
					className="w-full rounded-lg border border-gray-200 bg-gray-100 py-2.5 pr-3 pl-9 text-sm text-gray-900 placeholder:text-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-400"
					placeholder={placeholder}
					{...PASSWORD_MANAGER_IGNORE_ATTRIBUTES}
				/>
			</div>
			<Autocomplete.Portal>
				<Autocomplete.Positioner
					align="start"
					className="z-50"
					collisionPadding={12}
					side="bottom"
					sideOffset={8}
				>
					<Autocomplete.Popup className="max-h-[min(20rem,var(--available-height))] w-[var(--anchor-width)] overflow-y-auto rounded-lg border border-gray-200 bg-gray-100 shadow-lg dark:border-gray-700 dark:bg-gray-900">
						<Autocomplete.Empty>
							<p className="m-0 px-3 py-2.5 text-sm text-gray-600 dark:text-gray-400">
								{t("catalogue.search-no-results", { ns: "features" })}
							</p>
						</Autocomplete.Empty>
						<Autocomplete.List>
							{(entry: Entry) => {
								const { detail, emoji, replace, state, to } = resolveResult(entry);

								return (
									<Autocomplete.Item
										aria-label={t("catalogue.search-result-detail", {
											ns: "features",
											name: entry.name,
											detail,
										})}
										className={(itemState) =>
											clsx(
												"flex cursor-pointer items-center gap-2 px-3 py-2.5 text-sm transition-colors",
												itemState.highlighted && "bg-gray-300 font-medium dark:bg-gray-700",
											)
										}
										key={`${to}${entry.name}`}
										render={
											<Link
												onClick={(event) => {
													if (
														event.button === 0 &&
														!event.altKey &&
														!event.ctrlKey &&
														!event.metaKey &&
														!event.shiftKey
													) {
														setQuery("");
														setOpen(false);
													}
												}}
												replace={replace ?? false}
												state={state}
												tabIndex={-1}
												to={to}
											/>
										}
										value={entry}
									>
										{emoji ? <EmojiIcon emoji={emoji} /> : null}
										<span className="truncate text-gray-900 dark:text-gray-100">{entry.name}</span>
										<span className="ml-auto max-w-[45%] shrink-0 truncate text-xs text-gray-600 dark:text-gray-300">
											{detail}
										</span>
									</Autocomplete.Item>
								);
							}}
						</Autocomplete.List>
					</Autocomplete.Popup>
				</Autocomplete.Positioner>
			</Autocomplete.Portal>
		</Autocomplete.Root>
	);
}
