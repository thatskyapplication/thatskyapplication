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
import type { PlatformIds } from "./platforms.js";
import type { SeasonIds } from "./season.js";
import {
	isSkyProfilePersonalityType,
	type SkyProfileData,
	SkyProfilePersonalityToMBTI,
	SkyProfileWingedLightType,
} from "./sky-profile.js";
import type { MessageFormatting } from "./types/index.js";

interface SkyProfileContainerData extends MessageFormatting {
	catalogue: ReadonlySet<number> | null;
	cdnURL: string;
	data: SkyProfileData;
	guessRank: { events: number | null; spirits: number | null; spiritsHard: number | null } | null;
	hearts: number;
	url: string;
}

interface SkyProfileContainerOptions {
	fits?: (container: APIContainerComponent) => boolean;
}

export function skyProfileContainer(
	{ catalogue, cdnURL, data, emojis, guessRank, hearts, locale, t, url }: SkyProfileContainerData,
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
		winged_light: wingedLight,
		seasons,
		platform,
		spirit,
		hangout,
		catalogue_progression: catalogueProgression,
		personality,
	} = data;

	const components: APIComponentInContainer[] = [];
	let seasonsComponent: APITextDisplayComponent | undefined;
	let platformsComponent: APITextDisplayComponent | undefined;
	let descriptionComponent: APITextDisplayComponent | undefined;

	if (seasons && seasons.length > 0) {
		seasonsComponent = {
			type: ComponentType.TextDisplay,
			content: seasons
				.toSorted((a, b) => a - b)
				.reduce<string[]>((seasonEmojis, season) => {
					const seasonEmoji = SeasonIdToSeasonalEmoji[season as SeasonIds];

					if (seasonEmoji) {
						seasonEmojis.push(formatEmoji(seasonEmoji));
					}

					return seasonEmojis;
				}, [])
				.join(" "),
		};
	}

	if (platform && platform.length > 0) {
		platformsComponent = {
			type: ComponentType.TextDisplay,
			content: platform
				.toSorted((a, b) => a - b)
				.map((platformId) => formatEmoji(PlatformIdToEmoji[platformId as PlatformIds]))
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

	if (typeof wingedLight === "number") {
		if (wingedLight === SkyProfileWingedLightType.Capeless) {
			miscellaneous.push(
				`**${t("sky-profile.winged-light", { lng: locale, ns: "features" })}** ${t(`sky-profile-winged-light-types.${SkyProfileWingedLightType.Capeless}`, { lng: locale, ns: "general" })}`,
			);
		} else if (catalogue) {
			const { count, isMax } = computeMaximumWingedLight(catalogue);

			miscellaneous.push(
				`**${t("sky-profile.winged-light", { lng: locale, ns: "features" })}** ${
					isMax
						? `${count} (${t("sky-profile.winged-light-max", { lng: locale, ns: "features" })} ${formatEmoji(MISCELLANEOUS_EMOJIS.WingedLight)})`
						: count.toString()
				}`,
			);
		}
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

	if (catalogueProgression) {
		const allProgressResult =
			cataloguePercentage(catalogueProgress(catalogueItems(), catalogue ?? undefined)) ?? 0;

		miscellaneous.push(
			`**${t("sky-profile.catalogue-progression", { lng: locale, ns: "features" })}** ${allProgressResult}%`,
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
		const words = Array.from(
			new Intl.Segmenter(locale, { granularity: "word" }).segment(descriptionComponent.content),
			({ segment }) => segment,
		);

		let low = 0;
		let high = words.length - 1;

		while (low < high) {
			const middle = Math.ceil((low + high) / 2);
			descriptionComponent.content = `${words.slice(0, middle).join("").trimEnd()}…`;

			if (fits(container)) {
				low = middle;
			} else {
				high = middle - 1;
			}
		}

		descriptionComponent.content = `${words.slice(0, low).join("").trimEnd()}…`;
	}

	return container;
}
