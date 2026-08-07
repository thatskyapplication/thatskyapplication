import { Autocomplete } from "@base-ui/react/autocomplete";
import { clsx } from "clsx";
import type { TFunction } from "i18next";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import {
	CatalogueCollection,
	type CatalogueSearchEntry,
	type CatalogueSearchTarget,
	catalogueSearch,
	catalogueSearchEntries,
	CatalogueSearchType,
} from "@thatskyapplication/utility";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import {
	CosmeticToEmoji,
	EventIdToEventTicketEmoji,
	SeasonIdToSeasonalEmoji,
} from "~/utility/emojis.js";

const CATALOGUE_COLLECTIONS = {
	[CatalogueCollection.StarterPacks]: {
		view: "starter-packs",
		translationKey: "catalogue.starter-packs",
	},
	[CatalogueCollection.SecretArea]: {
		view: "secret-area",
		translationKey: "catalogue.secret-area",
	},
	[CatalogueCollection.ClothingShop]: {
		view: "clothing-shop",
		translationKey: "catalogue.clothing-shop",
	},
	[CatalogueCollection.NestingWorkshop]: {
		view: "nesting-workshop",
		translationKey: "catalogue.nesting-workshop",
	},
} as const satisfies Readonly<
	Record<CatalogueCollection, { view: string; translationKey: string }>
>;

function targetResult(target: CatalogueSearchTarget, t: TFunction) {
	switch (target.type) {
		case CatalogueSearchType.Season:
			return {
				to: `?view=season&season=${target.season.id}`,
				emoji: SeasonIdToSeasonalEmoji[target.season.id],
				detail: t("season", { ns: "general" }),
			};
		case CatalogueSearchType.Event:
			return {
				to: `?view=event&event=${target.event.id}`,
				emoji: EventIdToEventTicketEmoji[target.event.id],
				detail: String(target.event.start.year),
			};
		case CatalogueSearchType.Spirit: {
			const { spirit } = target;
			const seasonal = spirit.isSeasonalSpirit() || spirit.isGuideSpirit();

			return {
				to: `?view=spirit&spirit=${spirit.id}`,
				emoji: seasonal ? SeasonIdToSeasonalEmoji[spirit.seasonId] : null,
				detail: seasonal
					? t(`seasons.${spirit.seasonId}`, { ns: "general" })
					: t(`realms.${spirit.realm}`, { ns: "general" }),
			};
		}
		case CatalogueSearchType.Collection: {
			const { view, translationKey } = CATALOGUE_COLLECTIONS[target.collection];
			return { to: `?view=${view}`, emoji: null, detail: t(translationKey, { ns: "features" }) };
		}
	}
}

export function CatalogueSearch() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);

	const entries = useMemo(() => catalogueSearchEntries((key) => t(key, { ns: "general" })), [t]);
	const results = useMemo(() => catalogueSearch(entries, query), [entries, query]);

	return (
		<Autocomplete.Root
			autoHighlight
			filter={null}
			items={results}
			itemToStringValue={({ name }: CatalogueSearchEntry) => name}
			onOpenChange={setOpen}
			onValueChange={(value, { reason }) => setQuery(reason === "item-press" ? "" : value)}
			open={open && query.trim().length > 0}
			openOnInputClick
			value={query}
		>
			<div className="relative">
				<Search className="pointer-events-none absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-gray-600 dark:text-gray-400" />
				<Autocomplete.Input
					aria-label={t("catalogue.search-label", { ns: "features" })}
					className="w-full rounded-lg border border-gray-200 bg-gray-100 py-2.5 pr-3 pl-9 text-sm text-gray-900 placeholder:text-gray-500 focus:border-gray-400 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-gray-500"
					placeholder={t("catalogue.search-placeholder", { ns: "features" })}
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
							{(entry: CatalogueSearchEntry) => {
								const { to, emoji, detail } = targetResult(entry.target, t);

								const resolvedEmoji =
									entry.cosmeticDisplay === null ? emoji : CosmeticToEmoji[entry.cosmeticDisplay];

								return (
									<Autocomplete.Item
										className={(state) =>
											clsx(
												"flex cursor-pointer items-center gap-2 px-3 py-2.5 text-sm transition-colors",
												state.highlighted && "bg-gray-200 dark:bg-gray-700",
											)
										}
										key={`${to}${entry.name}`}
										onClick={() => void navigate(to)}
										value={entry}
									>
										{resolvedEmoji ? <EmojiIcon emoji={resolvedEmoji} /> : null}
										<span className="truncate text-gray-900 dark:text-gray-100">{entry.name}</span>
										<span className="ml-auto max-w-[45%] shrink-0 truncate text-xs text-gray-600 dark:text-gray-400">
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
