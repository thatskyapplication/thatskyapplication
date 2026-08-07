import { clsx } from "clsx";
import type { TFunction } from "i18next";
import { Search } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import {
	type CatalogueSearchTarget,
	catalogueSearch,
	catalogueSearchEntries,
	CatalogueSearchType,
} from "@thatskyapplication/utility";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { EventIdToEventTicketEmoji, SeasonIdToSeasonalEmoji } from "~/utility/emojis.js";

function targetTo(target: CatalogueSearchTarget) {
	switch (target.type) {
		case CatalogueSearchType.Season:
			return `?view=season&season=${target.season.id}`;
		case CatalogueSearchType.Event:
			return `?view=event&event=${target.event.id}`;
		case CatalogueSearchType.Spirit:
			return `?view=spirit&spirit=${target.spirit.id}`;
	}
}

function targetEmoji(target: CatalogueSearchTarget) {
	switch (target.type) {
		case CatalogueSearchType.Season:
			return SeasonIdToSeasonalEmoji[target.season.id];
		case CatalogueSearchType.Event:
			return EventIdToEventTicketEmoji[target.event.id];
		case CatalogueSearchType.Spirit:
			return target.spirit.isSeasonalSpirit() || target.spirit.isGuideSpirit()
				? SeasonIdToSeasonalEmoji[target.spirit.seasonId]
				: null;
	}
}

function targetDetail(target: CatalogueSearchTarget, t: TFunction) {
	switch (target.type) {
		case CatalogueSearchType.Season:
			return t("season", { ns: "general" });
		case CatalogueSearchType.Event:
			return String(target.event.start.year);
		case CatalogueSearchType.Spirit:
			return target.spirit.isSeasonalSpirit() || target.spirit.isGuideSpirit()
				? t(`seasons.${target.spirit.seasonId}`, { ns: "general" })
				: t(`realms.${target.spirit.realm}`, { ns: "general" });
	}
}

export function CatalogueSearch() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [query, setQuery] = useState("");
	const [expanded, setExpanded] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const inputId = useId();
	const listboxId = useId();

	const entries = useMemo(() => catalogueSearchEntries((key) => t(key, { ns: "general" })), [t]);

	const results = useMemo(() => catalogueSearch(entries, query), [entries, query]);
	const open = expanded && query.trim().length > 0;

	useEffect(() => {
		if (open) {
			document.getElementById(`${listboxId}-${activeIndex}`)?.scrollIntoView({ block: "nearest" });
		}
	}, [activeIndex, listboxId, open]);

	useEffect(() => {
		if (!open) {
			return;
		}

		const onPointerDown = ({ target }: PointerEvent) => {
			if (!containerRef.current?.contains(target as Node)) {
				setExpanded(false);
			}
		};

		document.addEventListener("pointerdown", onPointerDown);
		return () => document.removeEventListener("pointerdown", onPointerDown);
	}, [open]);

	function visit(target: CatalogueSearchTarget) {
		setQuery("");
		setExpanded(false);
		setActiveIndex(0);
		void navigate(targetTo(target));
	}

	return (
		<div className="relative" ref={containerRef}>
			<label className="sr-only" htmlFor={inputId}>
				{t("catalogue.search-label", { ns: "features" })}
			</label>
			<Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-600 dark:text-gray-400" />
			<input
				aria-activedescendant={
					open && results.length > 0 ? `${listboxId}-${activeIndex}` : undefined
				}
				aria-autocomplete="list"
				aria-controls={listboxId}
				aria-expanded={open && results.length > 0}
				autoComplete="off"
				className="w-full rounded-lg border border-gray-200 bg-gray-100 py-2.5 pr-3 pl-9 text-sm text-gray-900 placeholder:text-gray-500 focus:border-gray-400 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-gray-500"
				id={inputId}
				onChange={({ currentTarget }) => {
					setQuery(currentTarget.value);
					setExpanded(true);
					setActiveIndex(0);
				}}
				onFocus={() => setExpanded(true)}
				onKeyDown={(event) => {
					if (event.key === "Escape") {
						setExpanded(false);
						return;
					}

					if (!open || results.length === 0) {
						return;
					}

					if (event.key === "ArrowDown") {
						event.preventDefault();
						setActiveIndex((index) => (index + 1) % results.length);
						return;
					}

					if (event.key === "ArrowUp") {
						event.preventDefault();
						setActiveIndex((index) => (index === 0 ? results.length - 1 : index - 1));
						return;
					}

					if (event.key === "Enter") {
						event.preventDefault();
						const result = results[activeIndex];

						if (result) {
							visit(result.target);
						}
					}
				}}
				placeholder={t("catalogue.search-placeholder", { ns: "features" })}
				role="combobox"
				type="text"
				value={query}
			/>

			{open && (
				<div className="absolute top-full right-0 left-0 z-10 mt-2 max-h-80 overflow-y-auto rounded-lg border border-gray-200 bg-gray-100 shadow-lg dark:border-gray-700 dark:bg-gray-900">
					{results.length === 0 ? (
						<p className="m-0 px-3 py-2.5 text-sm text-gray-600 dark:text-gray-400">
							{t("catalogue.search-no-results", { ns: "features" })}
						</p>
					) : (
						<div id={listboxId} role="listbox">
							{results.map(({ name, target }, index) => {
								const emoji = targetEmoji(target);

								return (
									<button
										aria-selected={index === activeIndex}
										className={clsx(
											"flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-left text-sm transition-colors",
											index === activeIndex && "bg-gray-200 dark:bg-gray-800",
										)}
										id={`${listboxId}-${index}`}
										key={targetTo(target)}
										onClick={() => visit(target)}
										onPointerMove={() => setActiveIndex(index)}
										role="option"
										tabIndex={-1}
										type="button"
									>
										{emoji ? <EmojiIcon emoji={emoji} /> : null}
										<span className="truncate text-gray-900 dark:text-gray-100">{name}</span>
										<span className="ml-auto shrink-0 text-xs text-gray-600 dark:text-gray-400">
											{targetDetail(target, t)}
										</span>
									</button>
								);
							})}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
