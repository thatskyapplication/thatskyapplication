import { Field } from "@base-ui/react/field";
import { Switch } from "@base-ui/react/switch";
import {
	type APIComponentInContainer,
	type APIContainerComponent,
	type APITextDisplayComponent,
	ComponentType,
} from "@discordjs/core/http-only";
import { clsx } from "clsx";
import { parseCookie } from "cookie";
import type { TFunction } from "i18next";
import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";
import {
	type Location,
	redirect,
	type ShouldRevalidateFunctionArgs,
	useLocation,
} from "react-router";
import {
	CatalogueSearchType,
	type Cosmetic,
	type Emoji,
	formatEmoji,
	formatEmojiURL,
	resolveCostToString,
	WEBSITE_URL,
} from "@thatskyapplication/utility";
import { CatalogueSearchAutocomplete } from "~/components/catalogue/CatalogueSearchAutocomplete.js";
import { CosmeticPopover } from "~/components/cosmetics/CosmeticPopover.js";
import { CosmeticTile, type CosmeticTileSelect } from "~/components/cosmetics/CosmeticTile.js";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { SitePage } from "~/components/PageLayout";
import database from "~/database.server";
import { useCosmeticSelection } from "~/hooks/use-cosmetic-selection.js";
import { getInstance, getLocale } from "~/middleware/i18next.js";
import { getRequestSession } from "~/middleware/session";
import { WEBSITE_COLOUR, WEBSITE_ICON_URL } from "~/utility/constants.js";
import { cookieStoreSet } from "~/utility/cookie-store.client";
import {
	catalogueLocation,
	cosmeticAnchor,
	cosmeticName,
	cosmeticSources,
	type CosmeticsSection,
	type CosmeticTileData,
	releasedCosmetics,
	UNLOCKED_BY_DEFAULT_COSMETICS,
} from "~/utility/cosmetics.js";
import {
	cardContainer,
	fitsDiscordComponentEmbed,
	linkButtonRows,
} from "~/utility/discord-component-embed.server.js";
import { EMOJIS, MISCELLANEOUS_EMOJIS } from "~/utility/emojis.js";
import { hexColour } from "~/utility/functions.js";
import { PAGE_TITLE_CLASS, SWITCH_CLASS, SWITCH_THUMB_CLASS } from "~/utility/styles.js";
import type { Route } from "./+types/cosmetics.js";

const COSMETICS_TITLE = "Cosmetics" as const;
const COSMETICS_DESCRIPTION = "View all cosmetics, find out where they're from, and more!" as const;
const COSMETIC_SEARCH_PARAMETER = "cosmetic" as const;
const HIGHLIGHT_OWNED_COOKIE_NAME = "cosmetics_highlight_owned" as const;
const HIGHLIGHT_OWNED_COOKIE_MAX_AGE = 31536000 as const;

const subscribeToNothing = () => () => {};

function cosmeticParameterTarget(searchParams: URLSearchParams) {
	const cosmetic = searchParams.get(COSMETIC_SEARCH_PARAMETER);
	return cosmetic === null
		? undefined
		: releasedCosmetics().anchorTargets.get(cosmeticAnchor(cosmetic));
}

export const loader = async ({ context, request, url }: Route.LoaderArgs) => {
	const locale = getLocale(context);
	const t = getInstance(context).getFixedT(locale);
	const pageTitle = t("cosmetics.title", { ns: "features" });
	const cosmeticTarget = cosmeticParameterTarget(url.searchParams);

	if (url.searchParams.has(COSMETIC_SEARCH_PARAMETER) && !cosmeticTarget) {
		throw redirect(url.pathname);
	}

	const cosmeticCard = cosmeticTarget
		? cosmeticContainer({ locale, t, tile: cosmeticTarget.tile })
		: null;

	const discordComponentEmbed =
		cosmeticCard && fitsDiscordComponentEmbed(cosmeticCard)
			? cosmeticCard
			: cardContainer({
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

function loaderSearchParameters(url: URL) {
	const parameters = new URLSearchParams(url.search);
	parameters.delete(COSMETIC_SEARCH_PARAMETER);
	return parameters.toString();
}

export function shouldRevalidate({
	currentUrl,
	defaultShouldRevalidate,
	nextUrl,
}: ShouldRevalidateFunctionArgs) {
	return currentUrl.href !== nextUrl.href &&
		currentUrl.pathname === nextUrl.pathname &&
		loaderSearchParameters(currentUrl) === loaderSearchParameters(nextUrl)
		? false
		: defaultShouldRevalidate;
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

interface CosmeticContainerOptions {
	locale: string;
	t: TFunction;
	tile: CosmeticTileData;
}

function cosmeticContainer({ locale, t, tile }: CosmeticContainerOptions): APIContainerComponent {
	const sources = cosmeticSources(releasedCosmetics().catalogue.get(tile.cosmetic), t);
	const thumbnail = {
		type: ComponentType.Thumbnail,
		media: { url: formatEmojiURL(tile.emoji.id) },
	} as const;
	const components: APIComponentInContainer[] = [];

	if (sources.length === 0) {
		components.push({
			type: ComponentType.Section,
			components: [
				{ type: ComponentType.TextDisplay, content: t("cosmetics.no-source", { ns: "features" }) },
			],
			accessory: thumbnail,
		});
	}

	for (const [index, source] of sources.entries()) {
		const heading = source.type === CatalogueSearchType.Spirit ? source.detail : source.name;
		const lines = [source.emoji ? `## ${formatEmoji(source.emoji)} ${heading}` : `## ${heading}`];

		if (source.type === CatalogueSearchType.Spirit) {
			lines.push(source.name);
		} else if (source.type === CatalogueSearchType.Event) {
			lines.push(source.detail);
		}

		const price = `${resolveCostToString(source.costs, { emojis: EMOJIS, locale }).join("")}${
			source.seasonPass ? formatEmoji(MISCELLANEOUS_EMOJIS.SeasonPass) : ""
		}`;

		if (price.length > 0) {
			lines.push(price);
		}

		const textDisplay: APITextDisplayComponent = {
			type: ComponentType.TextDisplay,
			content: lines.join("\n"),
		};

		components.push(
			index === 0
				? { type: ComponentType.Section, components: [textDisplay], accessory: thumbnail }
				: textDisplay,
		);

		const links = [];

		if (source.pageURL) {
			links.push({ label: t("view", { ns: "general" }), to: source.pageURL });
		}

		links.push({
			label: t("catalogue.main-title", { ns: "features" }),
			to: `/me/catalogue${source.query}`,
		});

		if (source.wikiURL) {
			links.push({ label: t("wiki", { ns: "general" }), to: source.wikiURL });
		}

		components.push(...linkButtonRows(links));
	}

	return { type: ComponentType.Container, accent_color: WEBSITE_COLOUR, components };
}

function CosmeticSearch() {
	const { i18n, t } = useTranslation();

	const getEntries = useCallback(() => {
		const { catalogue, sections } = releasedCosmetics();
		const entries: CosmeticSearchEntry[] = [];

		for (const section of sections) {
			const sectionName = t(section.heading, { ns: "features" });

			for (const { anchor, cosmetic, emoji } of section.tiles) {
				const entry = catalogue.get(cosmetic);
				const sourceNames =
					entry?.sources.map(({ target }) => catalogueLocation(target, t).name) ?? [];
				const name = entry?.nameKeys ? cosmeticName(entry.nameKeys, i18n, t) : sourceNames[0];

				if (name) {
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

function CosmeticSectionLabel({ section }: { section: CosmeticsSection }) {
	const { t } = useTranslation();

	return (
		<>
			<EmojiIcon
				className="size-8"
				emoji={section.icon}
				label={t(section.heading, { ns: "features" })}
			/>
			<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
				{section.tiles.length}
			</span>
		</>
	);
}

function CosmeticGroup({
	activeTable,
	cosmeticNames,
	dimmedCosmetics,
	onSelectTable,
	onSelectTile,
	sections,
}: {
	activeTable: string;
	cosmeticNames: ReadonlyMap<Cosmetic, string>;
	dimmedCosmetics: ReadonlySet<Cosmetic>;
	onSelectTable: (table: string) => void;
	onSelectTile: CosmeticTileSelect;
	sections: readonly CosmeticsSection[];
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
						"mx-auto mb-6 max-w-107 break-inside-avoid",
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
						{section.tiles.map((tile) => (
							<li key={tile.anchor}>
								<CosmeticTile
									dimmed={dimmedCosmetics.has(tile.cosmetic)}
									name={cosmeticNames.get(tile.cosmetic) ?? null}
									onSelect={onSelectTile}
									tile={tile}
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
	const { groups } = releasedCosmetics();
	const hydrated = useSyncExternalStore(
		subscribeToNothing,
		() => true,
		() => false,
	);
	const [highlightOwned, setHighlightOwned] = useState(loaderData.highlightOwned);
	const [activeTables, setActiveTables] = useState<readonly string[]>(() =>
		groups.map((groupSections) => groupSections[0]!.table),
	);
	const {
		onOpenChange,
		selectTile: selectCosmetic,
		selection,
		setSelection,
	} = useCosmeticSelection();
	const [adoptedLocation, setAdoptedLocation] = useState<Location | null>(null);

	const cosmeticNames = useMemo(() => {
		const { catalogue, sections } = releasedCosmetics();
		const names = new Map<Cosmetic, string>();

		for (const section of sections) {
			for (const { cosmetic } of section.tiles) {
				const nameKeys = catalogue.get(cosmetic)?.nameKeys;

				if (nameKeys) {
					names.set(cosmetic, cosmeticName(nameKeys, i18n, t));
				}
			}
		}

		return names;
	}, [i18n, t]);

	const dimmedCosmetics = useMemo(() => {
		const dimmed = new Set<Cosmetic>();

		if (!highlightOwned || loaderData.owned === null) {
			return dimmed;
		}

		const owned = new Set([...loaderData.owned, ...UNLOCKED_BY_DEFAULT_COSMETICS]);

		for (const section of releasedCosmetics().sections) {
			for (const { cosmetic } of section.tiles) {
				if (!owned.has(cosmetic)) {
					dimmed.add(cosmetic);
				}
			}
		}

		return dimmed;
	}, [highlightOwned, loaderData.owned]);

	const anchorTarget = hydrated
		? (releasedCosmetics().anchorTargets.get(location.hash.slice(1)) ??
			cosmeticParameterTarget(new URLSearchParams(location.search)))
		: undefined;

	if (anchorTarget && adoptedLocation !== location) {
		setAdoptedLocation(location);
		setActiveTables((previous) =>
			withActiveTable(previous, anchorTarget.groupIndex, anchorTarget.table),
		);
		setSelection({
			element: () => document.getElementById(anchorTarget.tile.anchor),
			open: true,
			opener: "location",
			tile: anchorTarget.tile,
		});
	}

	useEffect(() => {
		if (selection?.open && selection.opener === "location") {
			selection.element()?.scrollIntoView({ block: "center" });
		}
	}, [selection]);

	useEffect(() => {
		if (!selection) {
			return;
		}

		const url = new URL(window.location.href);
		url.hash = "";

		if (selection.open) {
			url.searchParams.set(COSMETIC_SEARCH_PARAMETER, String(selection.tile.cosmetic));
		} else {
			url.searchParams.delete(COSMETIC_SEARCH_PARAMETER);
		}

		if (url.href !== window.location.href) {
			window.history.replaceState(window.history.state, "", url);
		}
	}, [selection]);

	const selectTile = useCallback<CosmeticTileSelect>(
		(tile, element, keyboard) => {
			const target = releasedCosmetics().anchorTargets.get(tile.anchor);

			selectCosmetic(tile, element, keyboard);

			if (target) {
				setActiveTables((previous) => withActiveTable(previous, target.groupIndex, target.table));
			}
		},
		[selectCosmetic],
	);

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

				<div className="cosmetic-grid columns-[26.75rem] gap-8">
					{groups.map((groupSections, groupIndex) => (
						<CosmeticGroup
							activeTable={activeTables[groupIndex]!}
							cosmeticNames={cosmeticNames}
							dimmedCosmetics={dimmedCosmetics}
							key={groupSections[0]!.table}
							onSelectTable={(table) =>
								setActiveTables((previous) => withActiveTable(previous, groupIndex, table))
							}
							onSelectTile={selectTile}
							sections={groupSections}
						/>
					))}
					<span className="cosmetic-grid-end" hidden />
				</div>
			</div>

			<CosmeticPopover onOpenChange={onOpenChange} selection={selection} />
		</SitePage>
	);
}
