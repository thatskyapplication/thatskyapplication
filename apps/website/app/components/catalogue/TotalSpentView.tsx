import {
	type CostEntry,
	catalogueItems,
	type Emoji,
	partitionItemCosts,
	type SeasonIds,
	sumCosts,
} from "@thatskyapplication/utility";
import { DollarSign } from "lucide-react";
import { type ReactNode, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { NOTE_CLASS } from "~/utility/catalogue.js";
import { MISCELLANEOUS_EMOJIS, SeasonIdToSeasonalEmoji } from "~/utility/emojis.js";
import { BackButton } from "./BackButton";
import { Breadcrumb } from "./Breadcrumb";
import { costEntryEmoji } from "./CostList";

function Section({ children, title }: { children: ReactNode; title: string }) {
	return (
		<div className="flex flex-col">
			<h2 className="mt-0 mb-1 text-sm font-semibold text-gray-500 uppercase tracking-wide dark:text-gray-400">
				{title}
			</h2>
			{children}
		</div>
	);
}

function Row({ label, value }: { label: ReactNode; value: ReactNode }) {
	return (
		<div className="flex items-center justify-between gap-3 border-gray-100 border-b py-1.5 text-sm last:border-b-0 dark:border-gray-800">
			<span className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300">
				{label}
			</span>
			<span className="inline-flex items-center gap-4 font-medium text-gray-900 tabular-nums dark:text-gray-100">
				{value}
			</span>
		</div>
	);
}

function CostStat({
	amount,
	emoji,
	locale,
}: {
	amount: number;
	emoji: Emoji | null;
	locale: string;
}) {
	return (
		<span className="inline-flex items-center gap-1">
			{emoji ? <EmojiIcon className="h-4 w-4" emoji={emoji} /> : null}
			{amount.toLocaleString(locale)}
		</span>
	);
}

export function TotalSpentView({ data, locale }: { data: ReadonlySet<number>; locale: string }) {
	const { t } = useTranslation();

	const { ascendedCandles, candles, events, hearts, money, seasons, total } = useMemo(() => {
		const spentCosts = sumCosts(partitionItemCosts(catalogueItems(), data).obtained);

		let money = 0;
		let candles = 0;
		let hearts = 0;
		let ascendedCandles = 0;
		const seasons = new Map<SeasonIds, { candles?: CostEntry; hearts?: CostEntry }>();
		const events: Extract<CostEntry, { type: "eventTickets" }>[] = [];

		for (const entry of spentCosts) {
			switch (entry.type) {
				case "money":
					money = entry.amount;
					break;
				case "candles":
					candles = entry.amount;
					break;
				case "hearts":
					hearts = entry.amount;
					break;
				case "ascendedCandles":
					ascendedCandles = entry.amount;
					break;
				case "seasonalCandles": {
					const season = seasons.get(entry.seasonId) ?? {};
					season.candles = entry;
					seasons.set(entry.seasonId, season);
					break;
				}
				case "seasonalHearts": {
					const season = seasons.get(entry.seasonId) ?? {};
					season.hearts = entry;
					seasons.set(entry.seasonId, season);
					break;
				}
				case "eventTickets":
					events.push(entry);
					break;
			}
		}

		return { ascendedCandles, candles, events, hearts, money, seasons, total: spentCosts.length };
	}, [data]);

	return (
		<>
			<Breadcrumb
				current={t("catalogue.total-spent", { ns: "features" })}
				trail={[{ label: t("catalogue.main-title", { ns: "features" }), to: "/me/catalogue" }]}
			/>

			{total === 0 ? (
				<p className="m-0 text-base text-gray-600 dark:text-gray-400">
					{t("catalogue.main-total-spent-nothing", { ns: "features" })}
				</p>
			) : (
				<>
					<p className={NOTE_CLASS}>
						{t("catalogue.total-spent-subtext", { ns: "features" }).replaceAll("_", "")}
					</p>

					<Section title={t("catalogue.total-spent-file-standard-currency", { ns: "features" })}>
						<Row
							label={
								<>
									<DollarSign className="h-4 w-4" />
									{t("money", { ns: "general" })}
								</>
							}
							value={`$${money.toLocaleString(locale, { minimumFractionDigits: 2 })}`}
						/>
						<Row
							label={
								<>
									<EmojiIcon className="h-4 w-4" emoji={MISCELLANEOUS_EMOJIS.Candle} />
									{t("candles", { ns: "general" })}
								</>
							}
							value={candles.toLocaleString(locale)}
						/>
						<Row
							label={
								<>
									<EmojiIcon className="h-4 w-4" emoji={MISCELLANEOUS_EMOJIS.Heart} />
									{t("hearts", { ns: "general" })}
								</>
							}
							value={hearts.toLocaleString(locale)}
						/>
						<Row
							label={
								<>
									<EmojiIcon className="h-4 w-4" emoji={MISCELLANEOUS_EMOJIS.AscendedCandle} />
									{t("ascended-candles", { ns: "general" })}
								</>
							}
							value={ascendedCandles.toLocaleString(locale)}
						/>
					</Section>

					{seasons.size > 0 && (
						<Section title={t("catalogue.total-spent-file-seasonal-currency", { ns: "features" })}>
							{[...seasons]
								.sort(([a], [b]) => a - b)
								.map(([seasonId, season]) => {
									const seasonEmoji = SeasonIdToSeasonalEmoji[seasonId];

									return (
										<Row
											key={seasonId}
											label={
												<>
													{seasonEmoji ? (
														<EmojiIcon className="h-4 w-4" emoji={seasonEmoji} />
													) : null}
													{t(`seasons.${seasonId}`, { ns: "general" })}
												</>
											}
											value={
												<>
													{season.candles ? (
														<CostStat
															amount={season.candles.amount}
															emoji={costEntryEmoji(season.candles)}
															locale={locale}
														/>
													) : null}
													{season.hearts ? (
														<CostStat
															amount={season.hearts.amount}
															emoji={costEntryEmoji(season.hearts)}
															locale={locale}
														/>
													) : null}
												</>
											}
										/>
									);
								})}
						</Section>
					)}

					{events.length > 0 && (
						<Section title={t("catalogue.events", { ns: "features" })}>
							<div className="flex flex-wrap gap-x-3 gap-y-1.5 py-1 text-sm text-gray-700 dark:text-gray-300">
								{events
									.sort((a, b) => a.eventId - b.eventId)
									.map((entry) => (
										<CostStat
											amount={entry.amount}
											emoji={costEntryEmoji(entry)}
											key={entry.eventId}
											locale={locale}
										/>
									))}
							</div>
						</Section>
					)}
				</>
			)}
			<BackButton to="/me/catalogue" />
		</>
	);
}
