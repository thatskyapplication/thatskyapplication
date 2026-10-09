import {
	type APIButtonComponent,
	type APIComponentInContainer,
	type APIContainerComponent,
	ComponentType,
	SeparatorSpacingSize,
} from "discord-api-types/v10";
import { resolveCostToString } from "./catalogue.js";
import { epochSeconds, skyNow } from "./dates.js";
import { formatEmoji } from "./emojis/emoji.js";
import {
	RETURNING_DATES,
	TRAVELLING_DATES,
	VISITS_ABSENT,
	visitsForSpirit,
} from "./kingdom/seasons/index.js";
import type { SeasonalSpiritVisitTravellingErrorData, Spirit } from "./models/spirits.js";
import type { MessageFormatting } from "./types/index.js";
import {
	SPIRITS_HISTORY_TITLE_KEYS,
	type SpiritIds,
	SpiritsHistoryOrderType,
	type SpiritsHistoryOrderTypes,
	spiritNotReturnedTranslationKey,
} from "./utility/spirits.js";

export const SPIRITS_HISTORY_PAGE_SIZE = 10 as const;

export function spiritsHistoryData(type: SpiritsHistoryOrderTypes) {
	const visits = type === SpiritsHistoryOrderType.Natural ? TRAVELLING_DATES : VISITS_ABSENT;
	return { maximumPage: Math.max(1, Math.ceil(visits.size / SPIRITS_HISTORY_PAGE_SIZE)), visits };
}

function visitField(seasonalSpiritVisit: typeof TRAVELLING_DATES | typeof RETURNING_DATES) {
	const maxLength = seasonalSpiritVisit.lastKey()!.toString().length;
	const visits = [];

	for (const [visit, { start }] of seasonalSpiritVisit) {
		const startUnix = epochSeconds(start);
		visits.push(
			`\`#${String(visit).padStart(maxLength, "0")}\` <t:${startUnix}:s> (<t:${startUnix}:R>)`,
		);
	}

	return visits.join("\n");
}

function visitErrorField(
	seasonalSpiritVisit: SeasonalSpiritVisitTravellingErrorData,
	{ locale, t }: Pick<MessageFormatting, "locale" | "t">,
) {
	return seasonalSpiritVisit
		.reduce<string[]>((visits, start) => {
			const startUnix = epochSeconds(start);
			visits.push(
				`\`${t("spirits.visit-error", { lng: locale, ns: "features" })}\` <t:${startUnix}:s> (<t:${startUnix}:R>)`,
			);
			return visits;
		}, [])
		.join("\n");
}

interface SpiritContainerData extends MessageFormatting {
	spirit: Spirit;
}

export function spiritContainer({
	emojis,
	locale,
	spirit,
	t,
}: SpiritContainerData): APIContainerComponent {
	const isSeasonalSpirit = spirit.isSeasonalSpirit();
	const isGuideSpirit = spirit.isGuideSpirit();
	const spiritSeason = isSeasonalSpirit || isGuideSpirit ? spirit.seasonId : null;
	const description = [];
	const visits = [];

	if (isSeasonalSpirit) {
		const { travellingErrors } = spirit.visits;
		const { returning, travelling } = visitsForSpirit(spirit.id);
		const travellingValue = [];

		if (travelling.size > 0) {
			travellingValue.push(visitField(travelling));
		}

		if (travellingErrors.size > 0) {
			travellingValue.push(visitErrorField(travellingErrors, { locale, t }));
		}

		if (travellingValue.length > 0) {
			visits.push(
				`### ${t("spirits.travelling", { lng: locale, ns: "features" })}\n${travellingValue.join("\n")}`,
			);
		}

		if (returning.size > 0) {
			visits.push(
				`### ${t("spirits.returning", { lng: locale, ns: "features" })}\n${visitField(returning)}`,
			);
		}

		const notReturnedKey = spiritNotReturnedTranslationKey(spirit, skyNow());

		if (notReturnedKey) {
			description.push(`⚠️ ${t(notReturnedKey, { lng: locale, ns: "features" })}`);
		}
	}

	const totalOffer = [];

	if (isSeasonalSpirit) {
		totalOffer.push(resolveCostToString(spirit.totalCostSeasonal, { emojis, locale }).join(""));
	}

	const totalCostString = resolveCostToString(spirit.totalCost, { emojis, locale }).join("");

	if (totalCostString.length > 0) {
		totalOffer.push(totalCostString);
	}

	if (totalOffer.length > 0) {
		description.push(totalOffer.join("\n"));
	}

	const seasonEmoji = spiritSeason === null ? null : emojis.SeasonIdToSeasonalEmoji[spiritSeason];

	const components: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: `##${seasonEmoji ? ` ${formatEmoji(seasonEmoji)}` : ""} [${t(`spirits.${spirit.id}`, { lng: locale, ns: "general" })}](${t(`spirit-wiki.${spirit.id}`, { lng: locale, ns: "general" })})`,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	if (description.length > 0) {
		components.push({
			type: ComponentType.TextDisplay,
			content: description.join("\n"),
		});
	}

	if (visits.length > 0) {
		components.push({
			type: ComponentType.TextDisplay,
			content: visits.join("\n"),
		});
	}

	const mediaItems = [isSeasonalSpirit && spirit.imageURLSeasonal, spirit.imageURL]
		.filter((url) => typeof url === "string")
		.map((url) => ({ media: { url } }));

	if (mediaItems.length > 0) {
		components.push({
			type: ComponentType.MediaGallery,
			items: mediaItems,
		});
	}

	if (isGuideSpirit && spirit.inProgress) {
		components.push({
			type: ComponentType.TextDisplay,
			content: `-# ${t(`catalogue.spirit-kind-not-fully-revealed.${spirit.kind}`, { lng: locale, ns: "features" })}`,
		});
	}

	return { type: ComponentType.Container, components };
}

interface SpiritsHistoryContainerData extends Pick<MessageFormatting, "locale" | "t"> {
	page: number;
	type: SpiritsHistoryOrderTypes;
	viewButton: (spiritId: SpiritIds, index: number) => APIButtonComponent;
}

export function spiritsHistoryContainer({
	locale,
	page,
	t,
	type,
	viewButton,
}: SpiritsHistoryContainerData) {
	const offset = (page - 1) * SPIRITS_HISTORY_PAGE_SIZE;
	const limit = offset + SPIRITS_HISTORY_PAGE_SIZE;
	const { maximumPage, visits } = spiritsHistoryData(type);

	const components: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: `## ${t(SPIRITS_HISTORY_TITLE_KEYS[type], { lng: locale, ns: "features" })}`,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	for (let index = offset; index < limit; index++) {
		const visit = visits.at(index);

		if (!visit) {
			break;
		}

		const { spiritId, start } = visit;
		const visitNumber =
			type === SpiritsHistoryOrderType.Natural ? TRAVELLING_DATES.keyAt(index) : null;

		// Need to escape # otherwise Discord will not render the heading correctly.
		const heading = `###${visitNumber === null || visitNumber === undefined ? "" : ` \\#${visitNumber}`} ${t(`spirits.${spiritId}`, { lng: locale, ns: "general" })}`;

		const startUnix = epochSeconds(start);
		const lastVisited = `<t:${startUnix}:s> (<t:${startUnix}:R>)`;

		components.push({
			type: ComponentType.Section,
			accessory: viewButton(spiritId, index),
			components: [{ type: ComponentType.TextDisplay, content: `${heading}\n\n${lastVisited}` }],
		});
	}

	components.push(
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.TextDisplay,
			content: `-# ${t("page", { lng: locale, ns: "general" })} ${page}/${maximumPage}`,
		},
	);

	const container: APIContainerComponent = { type: ComponentType.Container, components };
	return { container, maximumPage };
}
