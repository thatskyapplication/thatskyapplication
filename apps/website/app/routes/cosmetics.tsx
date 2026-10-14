import { Field } from "@base-ui/react/field";
import { Popover } from "@base-ui/react/popover";
import { Switch } from "@base-ui/react/switch";
import { clsx } from "clsx";
import { parseCookie } from "cookie";
import type { TFunction } from "i18next";
import {
	memo,
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useState,
	useSyncExternalStore,
} from "react";
import { useTranslation } from "react-i18next";
import {
	Link,
	type Location,
	type ShouldRevalidateFunctionArgs,
	useLocation,
	useNavigate,
} from "react-router";
import {
	CatalogueCollectionToLocaleKey,
	type CatalogueSearchTargetWithoutEventFamily,
	CatalogueSearchType,
	type Emoji,
	formatEmojiURL,
	spiritOriginTranslationKey,
	WEBSITE_URL,
} from "@thatskyapplication/utility";
import { CatalogueSearchAutocomplete } from "~/components/catalogue/CatalogueSearchAutocomplete.js";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { SitePage } from "~/components/PageLayout";
import { Tooltip } from "~/components/Tooltip";
import database from "~/database.server";
import { getInstance, getLocale } from "~/middleware/i18next.js";
import { getRequestSession } from "~/middleware/session";
import { catalogueTargetQuery } from "~/utility/catalogue.js";
import { WEBSITE_COLOUR, WEBSITE_ICON_URL } from "~/utility/constants.js";
import { cookieStoreSet } from "~/utility/cookie-store.client";
import {
	COSMETIC_ANCHOR_TARGETS,
	COSMETIC_ANCHORS,
	COSMETIC_CATALOGUE,
	cosmeticName,
	COSMETICS_GROUPS,
	COSMETICS_SECTIONS,
	UNLOCKED_BY_DEFAULT_EMOJIS,
} from "~/utility/cosmetics.js";
import { cardContainer } from "~/utility/discord-component-embed.server.js";
import { EventIdToEventTicketEmoji, SeasonIdToSeasonalEmoji } from "~/utility/emojis.js";
import { hexColour } from "~/utility/functions.js";
import { PAGE_TITLE_CLASS, SWITCH_CLASS, SWITCH_THUMB_CLASS } from "~/utility/styles.js";
import type { Route } from "./+types/cosmetics.js";

const COSMETICS_TITLE = "Cosmetics" as const;
const COSMETICS_DESCRIPTION = "View all cosmetics, find out where they're from, and more!" as const;
const COSMETIC_TILE_SELECTOR = "[data-cosmetic-tile]" as const;
const COSMETIC_TILE_IMAGE_SIZE = 32 as const;
const COSMETIC_TILE_PIXEL_DENSITIES = [1, 2, 3] as const;
const HIGHLIGHT_OWNED_COOKIE_NAME = "cosmetics_highlight_owned" as const;
const HIGHLIGHT_OWNED_COOKIE_MAX_AGE = 31536000 as const;

const subscribeToNothing = () => () => {};

export const loader = async ({ context, request, url }: Route.LoaderArgs) => {
	const t = getInstance(context).getFixedT(getLocale(context));
	const pageTitle = t("cosmetics.title", { ns: "features" });

	const discordComponentEmbed = cardContainer({
		colour: WEBSITE_COLOUR,
		description: COSMETICS_DESCRIPTION,
		icon: WEBSITE_ICON_URL,
		title: pageTitle,
		url: new URL(url.pathname, WEBSITE_URL).href,
	});

	const discordUser = getRequestSession(context).get("discord_user");

	if (!discordUser) {
		return { discordComponentEmbed, highlightOwned: false, owned: null, pageTitle };
	}

	const highlightOwned =
		parseCookie(request.headers.get("Cookie") ?? "")[HIGHLIGHT_OWNED_COOKIE_NAME] === "true";

	const cataloguePacket = await database
		.selectFrom("catalogue")
		.select("data")
		.where("user_id", "=", discordUser.id)
		.executeTakeFirst();

	return { discordComponentEmbed, highlightOwned, owned: cataloguePacket?.data ?? [], pageTitle };
};

export const meta: Route.MetaFunction = ({ loaderData, location }) => {
	const url = String(new URL(location.pathname, WEBSITE_URL));
	const title = loaderData?.pageTitle ?? COSMETICS_TITLE;

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{ title },
		{ name: "description", content: COSMETICS_DESCRIPTION },
		{ name: "theme-color", content: hexColour(WEBSITE_COLOUR) },
		{ property: "og:title", content: title },
		{ property: "og:description", content: COSMETICS_DESCRIPTION },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{ property: "og:image", content: WEBSITE_ICON_URL },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: COSMETICS_DESCRIPTION },
		{ tagName: "link", rel: "canonical", href: url },
	];
};

export function shouldRevalidate({
	currentUrl,
	defaultShouldRevalidate,
	nextUrl,
}: ShouldRevalidateFunctionArgs) {
	return currentUrl.href !== nextUrl.href &&
		currentUrl.pathname === nextUrl.pathname &&
		currentUrl.search === nextUrl.search
		? false
		: defaultShouldRevalidate;
}

function cosmeticTileImageSourceSet(imageURL: string) {
	return COSMETIC_TILE_PIXEL_DENSITIES.map(
		(density) => `${imageURL}?size=${COSMETIC_TILE_IMAGE_SIZE * density} ${density}x`,
	).join(", ");
}

function withActiveTable(activeTables: readonly string[], groupIndex: number, table: string) {
	return activeTables[groupIndex] === table ? activeTables : activeTables.with(groupIndex, table);
}

interface CosmeticSearchEntry {
	readonly anchor: string;
	readonly emoji: Emoji;
	readonly keywords: readonly string[];
	readonly name: string;
	readonly section: string;
}

function catalogueLocation(target: CatalogueSearchTargetWithoutEventFamily, t: TFunction) {
	const query = catalogueTargetQuery(target);

	switch (target.type) {
		case CatalogueSearchType.Season:
			return {
				query,
				emoji: SeasonIdToSeasonalEmoji[target.season.id],
				name: t(`seasons.${target.season.id}`, { ns: "general" }),
				detail: t("season", { ns: "general" }),
			};
		case CatalogueSearchType.Event:
			return {
				query,
				emoji: EventIdToEventTicketEmoji[target.event.id],
				name: t(target.event.name, { ns: "general" }),
				detail: String(target.event.start.year),
			};
		case CatalogueSearchType.Spirit: {
			const { spirit } = target;
			const seasonal = spirit.isSeasonalSpirit() || spirit.isGuideSpirit();

			return {
				query,
				emoji: seasonal ? SeasonIdToSeasonalEmoji[spirit.seasonId] : null,
				name: t(`spirits.${spirit.id}`, { ns: "general" }),
				detail: t(spiritOriginTranslationKey(spirit), { ns: "general" }),
			};
		}
		case CatalogueSearchType.Collection:
			return {
				query,
				emoji: null,
				name: t(CatalogueCollectionToLocaleKey[target.collection]),
				detail: null,
			};
	}
}

function CosmeticDetails({ emoji }: { emoji: Emoji }) {
	const { i18n, t } = useTranslation();
	const entry = COSMETIC_CATALOGUE.get(emoji.id);
	const sources = entry?.sources.map((source) => catalogueLocation(source, t)) ?? [];
	const reserveEmojiSpace = sources.some((source) => source.emoji);

	return (
		<>
			{entry?.nameKeys && (
				<Popover.Title className="px-2 pt-1 text-base font-semibold text-gray-900 dark:text-gray-100">
					{cosmeticName(entry.nameKeys, i18n, t)}
				</Popover.Title>
			)}
			<h3 className="mt-1 px-2 text-xs font-medium text-gray-500 dark:text-gray-400">
				{t("cosmetics.source", { ns: "features", count: sources.length })}
			</h3>
			{sources.length === 0 ? (
				<p className="px-2 py-1.5 text-sm text-gray-600 dark:text-gray-400">
					{t("cosmetics.no-source", { ns: "features" })}
				</p>
			) : (
				<ul className="flex flex-col">
					{sources.map(({ detail, emoji: sourceEmoji, name, query }) => (
						<li key={query}>
							<Link
								className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
								to={`/me/catalogue${query}`}
							>
								{sourceEmoji ? (
									<EmojiIcon className="size-5 shrink-0" emoji={sourceEmoji} />
								) : (
									reserveEmojiSpace && <span aria-hidden="true" className="size-5 shrink-0" />
								)}
								<span className="flex min-w-0 flex-col">
									<span className="truncate text-sm text-gray-900 dark:text-gray-100">{name}</span>
									{detail && (
										<span className="truncate text-xs text-gray-600 dark:text-gray-300">
											{detail}
										</span>
									)}
								</span>
							</Link>
						</li>
					))}
				</ul>
			)}
		</>
	);
}

function CosmeticSearch() {
	const { i18n, t } = useTranslation();

	const getEntries = useCallback(() => {
		const entries: CosmeticSearchEntry[] = [];

		for (const section of COSMETICS_SECTIONS) {
			const sectionName = t(section.heading, { ns: "features" });

			for (const emoji of section.emojis) {
				const anchor = COSMETIC_ANCHORS.get(emoji.id);
				const entry = COSMETIC_CATALOGUE.get(emoji.id);
				const sourceNames = entry?.sources.map((source) => catalogueLocation(source, t).name) ?? [];
				const name = entry?.nameKeys ? cosmeticName(entry.nameKeys, i18n, t) : sourceNames[0];

				if (anchor && name) {
					entries.push({
						anchor,
						emoji,
						keywords: [...sourceNames, sectionName],
						name,
						section: sectionName,
					});
				}
			}
		}

		return entries;
	}, [i18n, t]);

	return (
		<CatalogueSearchAutocomplete
			getEntries={getEntries}
			placeholder={t("cosmetics.search-placeholder", { ns: "features" })}
			resolveResult={({ anchor, emoji, section }) => ({
				detail: section,
				emoji,
				replace: true,
				to: `#${anchor}`,
			})}
		/>
	);
}

type CosmeticTileSelect = (emoji: Emoji, tile: HTMLElement, keyboard: boolean) => void;

interface CosmeticSelection {
	readonly emoji: Emoji;
	readonly open: boolean;
	readonly opener: "hash" | "keyboard" | "pointer";
	readonly tile: () => Element | null;
}

const CosmeticTile = memo(function CosmeticTile({
	dimmed,
	emoji,
	name,
	onSelect,
}: {
	dimmed: boolean;
	emoji: Emoji;
	name: string | null;
	onSelect: CosmeticTileSelect;
}) {
	const imageURL = formatEmojiURL(emoji.id);

	const tile = (
		<button
			aria-expanded={false}
			aria-haspopup="dialog"
			aria-label={name ?? emoji.name}
			className={clsx("cosmetic-tile", dimmed && "opacity-30")}
			data-cosmetic-tile=""
			id={COSMETIC_ANCHORS.get(emoji.id)}
			onClick={(event) => onSelect(emoji, event.currentTarget, event.detail === 0)}
			type="button"
		>
			<img
				alt=""
				decoding="async"
				draggable={false}
				height={COSMETIC_TILE_IMAGE_SIZE}
				loading="lazy"
				src={`${imageURL}?size=${COSMETIC_TILE_IMAGE_SIZE}`}
				srcSet={cosmeticTileImageSourceSet(imageURL)}
				width={COSMETIC_TILE_IMAGE_SIZE}
			/>
		</button>
	);

	return name ? <Tooltip content={name}>{tile}</Tooltip> : tile;
});

type CosmeticSection = (typeof COSMETICS_SECTIONS)[number];

function CosmeticSectionLabel({ section }: { section: CosmeticSection }) {
	const { t } = useTranslation();

	return (
		<>
			<EmojiIcon
				className="size-8"
				emoji={section.icon}
				label={t(section.heading, { ns: "features" })}
			/>
			<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
				{section.emojis.length}
			</span>
		</>
	);
}

function CosmeticGroup({
	activeTable,
	cosmeticNames,
	dimmedEmojiIds,
	onSelectTable,
	onSelectTile,
	sections,
}: {
	activeTable: string;
	cosmeticNames: ReadonlyMap<string, string>;
	dimmedEmojiIds: ReadonlySet<string>;
	onSelectTable: (table: string) => void;
	onSelectTile: CosmeticTileSelect;
	sections: readonly CosmeticSection[];
}) {
	const tabbed = sections.length > 1;

	return (
		<div>
			{tabbed && (
				<div className="mb-2 flex justify-center gap-1 lg:hidden">
					{sections.map((section) => (
						<button
							aria-pressed={section.table === activeTable}
							className={clsx(
								"flex cursor-pointer items-center gap-1.5 border-b-2 px-3 pb-1 transition-opacity",
								section.table === activeTable
									? "border-gray-500 dark:border-gray-300"
									: "border-transparent opacity-50 hover:opacity-80",
							)}
							key={section.table}
							onClick={() => onSelectTable(section.table)}
							type="button"
						>
							<CosmeticSectionLabel section={section} />
						</button>
					))}
				</div>
			)}
			{sections.map((section) => (
				<section
					className={clsx(
						"mx-auto mb-6 max-w-[26.75rem] break-inside-avoid",
						tabbed && section.table !== activeTable && "max-lg:hidden",
					)}
					key={section.table}
				>
					<h2 className={clsx("mb-2 flex justify-center", tabbed && "max-lg:hidden")}>
						<span className="flex items-center gap-1.5 border-b-2 border-gray-500 px-3 pb-1 dark:border-gray-300">
							<CosmeticSectionLabel section={section} />
						</span>
					</h2>
					<ul className="flex flex-wrap justify-center gap-1">
						{section.emojis.map((emoji) => (
							<li key={emoji.id}>
								<CosmeticTile
									dimmed={dimmedEmojiIds.has(emoji.id)}
									emoji={emoji}
									name={cosmeticNames.get(emoji.id) ?? null}
									onSelect={onSelectTile}
								/>
							</li>
						))}
					</ul>
				</section>
			))}
		</div>
	);
}

export default function Cosmetics({ loaderData }: Route.ComponentProps) {
	const { i18n, t } = useTranslation();
	const location = useLocation();
	const navigate = useNavigate();
	const hydrated = useSyncExternalStore(
		subscribeToNothing,
		() => true,
		() => false,
	);
	const [highlightOwned, setHighlightOwned] = useState(loaderData.highlightOwned);
	const [activeTables, setActiveTables] = useState<readonly string[]>(() =>
		COSMETICS_GROUPS.map((sections) => sections[0]!.table),
	);
	const [selection, setSelection] = useState<CosmeticSelection | null>(null);
	const [adoptedLocation, setAdoptedLocation] = useState<Location | null>(null);

	const cosmeticNames = useMemo(() => {
		const names = new Map<string, string>();

		for (const section of COSMETICS_SECTIONS) {
			for (const emoji of section.emojis) {
				const nameKeys = COSMETIC_CATALOGUE.get(emoji.id)?.nameKeys;

				if (nameKeys) {
					names.set(emoji.id, cosmeticName(nameKeys, i18n, t));
				}
			}
		}

		return names;
	}, [i18n, t]);

	const dimmedEmojiIds = useMemo(() => {
		const dimmed = new Set<string>();

		if (!highlightOwned || loaderData.owned === null) {
			return dimmed;
		}

		const owned = new Set(loaderData.owned);

		for (const section of COSMETICS_SECTIONS) {
			for (const emoji of section.emojis) {
				const entry = COSMETIC_CATALOGUE.get(emoji.id);

				if (
					entry
						? !entry.cosmetics.some((cosmetic) => owned.has(cosmetic))
						: !UNLOCKED_BY_DEFAULT_EMOJIS.has(emoji.id)
				) {
					dimmed.add(emoji.id);
				}
			}
		}

		return dimmed;
	}, [highlightOwned, loaderData.owned]);

	const anchorTarget = hydrated ? COSMETIC_ANCHOR_TARGETS.get(location.hash.slice(1)) : undefined;

	if (anchorTarget && adoptedLocation !== location) {
		setAdoptedLocation(location);
		setActiveTables((previous) =>
			withActiveTable(previous, anchorTarget.groupIndex, anchorTarget.table),
		);
		setSelection({
			emoji: anchorTarget.emoji,
			open: true,
			opener: "hash",
			tile: () => document.getElementById(anchorTarget.anchor),
		});
	}

	useEffect(() => {
		if (selection?.open && selection.opener === "hash") {
			selection.tile()?.scrollIntoView({ block: "center" });
		}
	}, [selection]);

	useLayoutEffect(() => {
		const tile = selection?.open ? selection.tile() : null;
		tile?.setAttribute("aria-expanded", "true");
		return () => tile?.setAttribute("aria-expanded", "false");
	}, [selection]);

	const clearAnchor = useCallback(() => {
		if (window.location.hash) {
			void navigate(
				{ pathname: window.location.pathname, search: window.location.search },
				{ preventScrollReset: true, replace: true },
			);
		}
	}, [navigate]);

	const selectTile = useCallback<CosmeticTileSelect>(
		(emoji, tile, keyboard) => {
			const target = COSMETIC_ANCHOR_TARGETS.get(tile.id);

			setSelection((current) =>
				current?.open && current.emoji.id === emoji.id
					? { ...current, open: false }
					: { emoji, open: true, opener: keyboard ? "keyboard" : "pointer", tile: () => tile },
			);

			if (target) {
				setActiveTables((previous) => withActiveTable(previous, target.groupIndex, target.table));
			}

			clearAnchor();
		},
		[clearAnchor],
	);

	const onOpenChange = (open: boolean, eventDetails: Popover.Root.ChangeEventDetails) => {
		const { event, reason } = eventDetails;

		if (
			open ||
			(reason === "outside-press" &&
				event.target instanceof Element &&
				event.target.closest(COSMETIC_TILE_SELECTOR))
		) {
			return;
		}

		setSelection((current) => current && { ...current, open: false });
		clearAnchor();
	};

	const onHighlightOwnedChange = (checked: boolean) => {
		setHighlightOwned(checked);

		void cookieStoreSet({
			maxAge: HIGHLIGHT_OWNED_COOKIE_MAX_AGE,
			name: HIGHLIGHT_OWNED_COOKIE_NAME,
			value: String(checked),
		});
	};

	return (
		<SitePage>
			<div className="space-y-4">
				<h1 className={clsx(PAGE_TITLE_CLASS, "mb-6")}>
					{t("cosmetics.title", { ns: "features" })}
				</h1>
				<hr />
				<div className="flex flex-wrap items-center gap-x-6 gap-y-3">
					<div className="w-full max-w-xl">
						<CosmeticSearch />
					</div>
					{loaderData.owned !== null && (
						<Field.Root className="flex items-center gap-2">
							<Switch.Root
								checked={highlightOwned}
								className={SWITCH_CLASS}
								onCheckedChange={onHighlightOwnedChange}
							>
								<Switch.Thumb className={SWITCH_THUMB_CLASS} />
							</Switch.Root>
							<Field.Label className="cursor-pointer text-sm text-gray-600 dark:text-gray-400">
								{t("cosmetics.highlight-owned", { ns: "features" })}
							</Field.Label>
						</Field.Root>
					)}
				</div>

				<div className="columns-[26.75rem] gap-8">
					{COSMETICS_GROUPS.map((sections, groupIndex) => (
						<CosmeticGroup
							activeTable={activeTables[groupIndex]!}
							cosmeticNames={cosmeticNames}
							dimmedEmojiIds={dimmedEmojiIds}
							key={sections[0]!.table}
							onSelectTable={(table) =>
								setActiveTables((previous) => withActiveTable(previous, groupIndex, table))
							}
							onSelectTile={selectTile}
							sections={sections}
						/>
					))}
				</div>
			</div>

			<Popover.Root onOpenChange={onOpenChange} open={selection?.open ?? false}>
				<Popover.Portal>
					<Popover.Positioner
						align="center"
						anchor={selection?.tile}
						className="z-50"
						collisionPadding={8}
						key={selection?.emoji.id}
						side="bottom"
						sideOffset={6}
					>
						<Popover.Popup
							className="max-h-(--available-height) w-72 max-w-[calc(100vw-1rem)] overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-900"
							finalFocus={selection?.opener === "keyboard"}
							initialFocus={selection?.opener === "keyboard"}
						>
							{selection && <CosmeticDetails emoji={selection.emoji} />}
						</Popover.Popup>
					</Popover.Positioner>
				</Popover.Portal>
			</Popover.Root>
		</SitePage>
	);
}
