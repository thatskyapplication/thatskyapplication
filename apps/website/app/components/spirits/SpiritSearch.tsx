import { Autocomplete } from "@base-ui/react/autocomplete";
import { clsx } from "clsx";
import type { TFunction } from "i18next";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router";
import {
	type CatalogueSearchEntry,
	type CatalogueSearchTarget,
	catalogueSearch,
	CatalogueSearchType,
	spiritOriginTranslationKey,
	spirits,
} from "@thatskyapplication/utility";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { SeasonIdToSeasonalEmoji } from "~/utility/emojis.js";
import { PASSWORD_MANAGER_IGNORE_ATTRIBUTES } from "~/utility/password-manager.js";

const SPIRIT_SEARCH_RESULT_LIMIT = 100 as const;

type SpiritSearchTarget = Extract<
	CatalogueSearchTarget,
	{ readonly type: CatalogueSearchType.Spirit }
>;

type SpiritSearchEntry = CatalogueSearchEntry<SpiritSearchTarget>;

const NO_RESULTS: readonly SpiritSearchEntry[] = [];

function searchEntries(t: TFunction): readonly SpiritSearchEntry[] {
	return spirits().map((spirit) => {
		const keywords = [...spirit.keywords, t(spiritOriginTranslationKey(spirit), { ns: "general" })];

		if (spirit.isStandardSpirit() || spirit.isSeasonalSpirit()) {
			if (spirit.emote) {
				keywords.push(spirit.emote);
			}

			if (spirit.stance) {
				keywords.push(t(`cosmetic-names.${spirit.stance}`, { ns: "general" }));
			}

			if (spirit.call) {
				keywords.push(t(`cosmetic-names.${spirit.call}`, { ns: "general" }));
			}

			if (spirit.action) {
				keywords.push(spirit.action);
			}
		}

		return {
			name: t(`spirits.${spirit.id}`, { ns: "general" }),
			keywords,
			cosmeticDisplay: null,
			target: { type: CatalogueSearchType.Spirit, spirit },
		};
	});
}

export function SpiritSearch() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	const hasQuery = query.trim().length > 0;

	const entries = useMemo(() => (hasQuery ? searchEntries(t) : NO_RESULTS), [hasQuery, t]);

	const results = useMemo(
		() => catalogueSearch(entries, query, SPIRIT_SEARCH_RESULT_LIMIT),
		[entries, query],
	);

	return (
		<Autocomplete.Root
			autoHighlight
			filter={null}
			items={results}
			itemToStringValue={({ name }: SpiritSearchEntry) => name}
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
					placeholder={t("spirits.search-placeholder", { ns: "features" })}
					{...PASSWORD_MANAGER_IGNORE_ATTRIBUTES}
				/>
			</div>
			<Autocomplete.Portal>
				<Autocomplete.Positioner align="start" collisionPadding={12} side="bottom" sideOffset={8}>
					<Autocomplete.Popup className="max-h-[min(20rem,var(--available-height))] w-[var(--anchor-width)] overflow-y-auto rounded-lg border border-gray-200 bg-gray-100 shadow-lg dark:border-gray-700 dark:bg-gray-900">
						<Autocomplete.Empty>
							<p className="m-0 px-3 py-2.5 text-sm text-gray-600 dark:text-gray-400">
								{t("catalogue.search-no-results", { ns: "features" })}
							</p>
						</Autocomplete.Empty>
						<Autocomplete.List>
							{(entry: SpiritSearchEntry) => {
								const { spirit } = entry.target;
								const seasonal = spirit.isSeasonalSpirit() || spirit.isGuideSpirit();
								const emoji = seasonal ? SeasonIdToSeasonalEmoji[spirit.seasonId] : null;
								const detail = t(spiritOriginTranslationKey(spirit), { ns: "general" });
								const parameters = new URLSearchParams(searchParams);
								parameters.set("spirit", spirit.id.toString());

								return (
									<Autocomplete.Item
										aria-label={t("catalogue.search-result-detail", {
											ns: "features",
											name: entry.name,
											detail,
										})}
										className={(state) =>
											clsx(
												"flex cursor-pointer items-center gap-2 px-3 py-2.5 text-sm transition-colors",
												state.highlighted && "bg-gray-300 font-medium dark:bg-gray-700",
											)
										}
										key={spirit.id}
										onClick={() => void navigate(`?${parameters.toString()}`)}
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
