import {
	type APIComponentInContainer,
	type APIContainerComponent,
	type APITextDisplayComponent,
	ComponentType,
	SeparatorSpacingSize,
} from "discord-api-types/v10";
import { catalogueItems, cataloguePercentage, catalogueProgress } from "./catalogue.js";
import { CDN } from "./cdn.js";
import { CountryToEmoji, isCountry } from "./country.js";
import { formatEmoji, resolveCurrencyEmoji } from "./emojis/emoji.js";
import { computeMaximumWingedLight } from "./kingdom/winged-light.js";
import { isPlatformId } from "./platforms.js";
import type { SeasonIds } from "./season.js";
import {
	isSkyProfilePersonalityType,
	type SkyProfileData,
	SkyProfilePersonalityToMBTI,
	SkyProfileWingedLightType,
} from "./sky-profile.js";
import type { MessageFormatting } from "./types/index.js";

const DISCORD_MARKUP_PATTERN =
	/<(?:a?:\w+:\d+|@[!&]?\d+|#\d+|t:-?\d+(?::[A-Za-z])?|\/[^\n>]+:\d+|https?:\/\/[^\s>]+)>|\[[^\]\n]*\]\([^)\s]*\)|https?:\/\/[^\s<]+/g;

const PAIRED_MARKDOWN_MARKERS = new Set(["||", "**", "__", "~~"]);
const MAXIMUM_WORD_BOUNDARY_DISTANCE = 24 as const;

type SkyProfileMaximumWingedLight =
	| { capeless: true }
	| { capeless: false; count: number; isMax: boolean };

export function skyProfileCatalogueStatistics(
	{
		catalogue_progression: catalogueProgression,
		winged_light: wingedLight,
	}: Pick<SkyProfileData, "catalogue_progression" | "winged_light">,
	catalogue: ReadonlySet<number> | null,
) {
	let maximumWingedLight: SkyProfileMaximumWingedLight | null = null;

	if (wingedLight === SkyProfileWingedLightType.Capeless) {
		maximumWingedLight = { capeless: true };
	} else if (wingedLight === SkyProfileWingedLightType.InferFromCatalogue && catalogue) {
		maximumWingedLight = { capeless: false, ...computeMaximumWingedLight(catalogue) };
	}

	return {
		catalogueProgression: catalogueProgression
			? (cataloguePercentage(catalogueProgress(catalogueItems(), catalogue ?? undefined)) ?? 0)
			: null,
		maximumWingedLight,
	};
}

function markdownClosers(text: string, markupEnds: ReadonlyMap<number, number>) {
	const open: string[] = [];
	let code: string | null = null;
	let index = 0;

	while (index < text.length) {
		if (code !== null) {
			if (text.startsWith(code, index)) {
				index += code.length;
				code = null;
			} else {
				index++;
			}

			continue;
		}

		const markupEnd = markupEnds.get(index);

		if (markupEnd !== undefined) {
			index = markupEnd;
			continue;
		}

		if (text[index] === "\\") {
			index += 2;
			continue;
		}

		if (text.startsWith("`", index)) {
			code = text.startsWith("```", index) ? "```" : "`";
			index += code.length;
			continue;
		}

		const pair = text.slice(index, index + 2);

		if (PAIRED_MARKDOWN_MARKERS.has(pair)) {
			const position = open.lastIndexOf(pair);

			if (position === -1) {
				open.push(pair);
			} else {
				open.splice(position, 1);
			}

			index += 2;
			continue;
		}

		index++;
	}

	return `${code ?? ""}${open.reverse().join("")}`;
}

function trimMarkdown(text: string, locale: string, fits: (content: string) => boolean) {
	const markupEnds = new Map<number, number>();
	const insideMarkup = new Set<number>();

	for (const { 0: markup, index } of text.matchAll(DISCORD_MARKUP_PATTERN)) {
		markupEnds.set(index, index + markup.length);

		for (let offset = index + 1; offset < index + markup.length; offset++) {
			insideMarkup.add(offset);
		}
	}

	const cuts = Array.from(
		new Intl.Segmenter(locale, { granularity: "grapheme" }).segment(text),
		({ index }) => index,
	).filter((index) => !insideMarkup.has(index));

	const wordBoundaries = new Set(
		Array.from(
			new Intl.Segmenter(locale, { granularity: "word" }).segment(text),
			({ index }) => index,
		),
	);

	const trimmed = (cut: number) => {
		const prefix = text.slice(0, cut).trimEnd();
		return `${prefix}…${markdownClosers(prefix, markupEnds)}`;
	};

	let low = 0;
	let high = cuts.length - 1;

	while (low < high) {
		const middle = Math.ceil((low + high) / 2);

		if (fits(trimmed(cuts[middle]!))) {
			low = middle;
		} else {
			high = middle - 1;
		}
	}

	for (let index = low; index > 0 && low - index < MAXIMUM_WORD_BOUNDARY_DISTANCE; index--) {
		const cut = cuts[index]!;

		if (wordBoundaries.has(cut) && fits(trimmed(cut))) {
			return trimmed(cut);
		}
	}

	return trimmed(cuts[low]!);
}

interface SkyProfileContainerData extends MessageFormatting {
	catalogueProgression: number | null;
	cdnURL: string;
	data: SkyProfileData;
	guessRank: { events: number | null; spirits: number | null; spiritsHard: number | null } | null;
	hearts: number;
	maximumWingedLight: SkyProfileMaximumWingedLight | null;
	url: string;
}

interface SkyProfileContainerOptions {
	fits?: (container: APIContainerComponent) => boolean;
}

export function skyProfileContainer(
	{
		catalogueProgression,
		cdnURL,
		data,
		emojis,
		guessRank,
		hearts,
		locale,
		maximumWingedLight,
		t,
		url,
	}: SkyProfileContainerData,
	{ fits = () => true }: SkyProfileContainerOptions = {},
): APIContainerComponent {
	const {
		MISCELLANEOUS_EMOJIS,
		PlatformIdToEmoji,
		SeasonIdToSeasonalEmoji,
		SkyProfilePersonalityToEmoji,
	} = emojis;

	const {
		user_id: userId,
		name,
		icon,
		description,
		country,
		seasons,
		platform,
		spirit,
		hangout,
		personality,
	} = data;

	const components: APIComponentInContainer[] = [];
	let seasonsComponent: APITextDisplayComponent | undefined;
	let platformsComponent: APITextDisplayComponent | undefined;
	let descriptionComponent: APITextDisplayComponent | undefined;

	const seasonEmojis = [];

	for (const season of seasons?.toSorted((a, b) => a - b) ?? []) {
		const seasonEmoji = SeasonIdToSeasonalEmoji[season as SeasonIds];

		if (seasonEmoji) {
			seasonEmojis.push(formatEmoji(seasonEmoji));
		}
	}

	if (seasonEmojis.length > 0) {
		seasonsComponent = { type: ComponentType.TextDisplay, content: seasonEmojis.join(" ") };
	}

	const platformIds = platform?.filter((platformId) => isPlatformId(platformId)) ?? [];

	if (platformIds.length > 0) {
		platformsComponent = {
			type: ComponentType.TextDisplay,
			content: platformIds
				.sort((a, b) => a - b)
				.map((platformId) => formatEmoji(PlatformIdToEmoji[platformId]))
				.join(" "),
		};
	}

	if (name) {
		let nameText = `## [${name}](${url})`;

		if (personality !== null && isSkyProfilePersonalityType(personality)) {
			nameText += `\n\n${formatEmoji(SkyProfilePersonalityToEmoji[personality])} ${t("sky-profile.personality-with-mbti", { lng: locale, ns: "features", personality, mbti: SkyProfilePersonalityToMBTI[personality] })}`;
		}

		const textDisplay: APITextDisplayComponent = {
			type: ComponentType.TextDisplay,
			content: nameText,
		};

		if (icon) {
			const mediaComponents = [textDisplay];

			if (seasonsComponent) {
				mediaComponents.push(seasonsComponent);
			}

			if (platformsComponent) {
				mediaComponents.push(platformsComponent);
			}

			components.push({
				type: ComponentType.Section,
				accessory: {
					type: ComponentType.Thumbnail,
					media: { url: new CDN(cdnURL).skyProfileIconURL(userId, icon) },
				},
				components: mediaComponents,
			});
		} else {
			components.push(textDisplay);

			if (seasonsComponent) {
				components.push(seasonsComponent);
			}

			if (platformsComponent) {
				components.push(platformsComponent);
			}
		}
	} else if (icon && (seasonsComponent || platformsComponent)) {
		const mediaComponents = [];

		if (seasonsComponent) {
			mediaComponents.push(seasonsComponent);
		}

		if (platformsComponent) {
			mediaComponents.push(platformsComponent);
		}

		components.push({
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Thumbnail,
				media: { url: new CDN(cdnURL).skyProfileIconURL(userId, icon) },
			},
			components: mediaComponents,
		});
	} else {
		if (seasonsComponent) {
			components.push(seasonsComponent);
		}

		if (platformsComponent) {
			components.push(platformsComponent);
		}
	}

	if (components.length > 0) {
		components.push({
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		});
	}

	if (description) {
		descriptionComponent = { type: ComponentType.TextDisplay, content: description };
		components.push(descriptionComponent);
	}

	const miscellaneous = [];

	if (country && isCountry(country)) {
		miscellaneous.push(
			`**${t("sky-profile.country", { lng: locale, ns: "features" })}** ${CountryToEmoji[country]} ${new Intl.DisplayNames(locale, { type: "region", style: "long" }).of(country)!}`,
		);
	}

	if (maximumWingedLight?.capeless) {
		miscellaneous.push(
			`**${t("sky-profile.winged-light", { lng: locale, ns: "features" })}** ${t(`sky-profile-winged-light-types.${SkyProfileWingedLightType.Capeless}`, { lng: locale, ns: "general" })}`,
		);
	} else if (maximumWingedLight) {
		const { count, isMax } = maximumWingedLight;

		miscellaneous.push(
			`**${t("sky-profile.winged-light", { lng: locale, ns: "features" })}** ${
				isMax
					? `${count} (${t("sky-profile.winged-light-max", { lng: locale, ns: "features" })} ${formatEmoji(MISCELLANEOUS_EMOJIS.WingedLight)})`
					: count.toString()
			}`,
		);
	}

	if (typeof spirit === "number") {
		miscellaneous.push(
			`**${t("sky-profile.favourite-spirit", { lng: locale, ns: "features" })}** ${t(`spirits.${spirit}`, { lng: locale, ns: "general" })}`,
		);
	}

	if (hangout) {
		miscellaneous.push(
			`**${t("sky-profile.favourite-hangout", { lng: locale, ns: "features" })}** ${hangout}`,
		);
	}

	if (catalogueProgression !== null) {
		miscellaneous.push(
			`**${t("sky-profile.catalogue-progression", { lng: locale, ns: "features" })}** ${catalogueProgression}%`,
		);
	}

	if (guessRank) {
		const unranked = t("sky-profile.guess-rank-unranked", { lng: locale, ns: "features" });

		miscellaneous.push(
			`**${t("sky-profile.guess-rank-spirits", { lng: locale, ns: "features" })}** ${guessRank.spirits === null ? unranked : `#${guessRank.spirits}`}`,
		);

		miscellaneous.push(
			`**${t("sky-profile.guess-rank-spirits-hard", { lng: locale, ns: "features" })}** ${guessRank.spiritsHard === null ? unranked : `#${guessRank.spiritsHard}`}`,
		);

		miscellaneous.push(
			`**${t("sky-profile.guess-rank-events", { lng: locale, ns: "features" })}** ${guessRank.events === null ? unranked : `#${guessRank.events}`}`,
		);
	}

	if (miscellaneous.length > 0) {
		components.push({
			type: ComponentType.TextDisplay,
			content: miscellaneous.join("\n"),
		});
	}

	if (description || miscellaneous.length > 0) {
		components.push({
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		});
	}

	components.push({
		type: ComponentType.TextDisplay,
		content: `-# ${resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.Heart, amount: hearts.toLocaleString(locale) })}`,
	});

	const container: APIContainerComponent = { type: ComponentType.Container, components };

	if (descriptionComponent && !fits(container)) {
		const component = descriptionComponent;

		component.content = trimMarkdown(component.content, locale, (content) => {
			component.content = content;
			return fits(container);
		});
	}

	return container;
}
