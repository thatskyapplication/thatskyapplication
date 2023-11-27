import {
	type ChatInputCommandInteraction,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	EmbedBuilder,
	Locale,
	time,
	TimestampStyles,
} from "discord.js";
import { t } from "i18next";
import { resolveEvent } from "../../Structures/Event.js";
import {
	SEASONAL_CANDLES_PER_DAY,
	SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS,
	resolveSeason,
} from "../../Structures/Season.js";
import {
	AREA_TO_WINGED_LIGHT_COUNT_VALUES,
	AreaToWingedLightCount,
	ASCENDED_CANDLES_PER_WEEK,
	DEFAULT_EMBED_COLOUR,
	LOCALES,
	Map,
	MAXIMUM_WINGED_LIGHT,
	Realm,
	WINGED_LIGHT_AREAS,
	WingedLightAreasToSpanish,
} from "../../Utility/Constants.js";
import { isWingedLightArea, notNull, shardEruption } from "../../Utility/Utility.js";
import {
	DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE,
	DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE,
	todayDate,
} from "../../Utility/dates.js";
import { cannotUseCustomEmojis, EMOJI, resolveCurrencyEmoji } from "../../Utility/emojis.js";
import type { ChatInputCommand } from "../index.js";

const doubleSeasonalLightEventStart = time(
	DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE.toUnixInteger(),
	TimestampStyles.ShortDate,
);

const doubleSeasonalLightEventEnd = time(
	DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE.toUnixInteger(),
	TimestampStyles.ShortDate,
);

const ASCENDED_CANDLE_MINIMUM_TIME_EYE_OF_EDEN_TEXT =
	`all statues in the ${Realm.EyeOfEden} were gifted winged light` as const;

const ASCENDED_CANDLE_MINIMUM_TIME_SHARD_ERUPTIONS_TEXT = "all shard eruptions were cleansed" as const;

const wingedLightInAreas = AREA_TO_WINGED_LIGHT_COUNT_VALUES.reduce(
	(wingedLightCount, wingedLight) => wingedLightCount + wingedLight,
	0,
);

const wingedLightAreaChoices = WINGED_LIGHT_AREAS.map((area) => ({
	name: area,
	nameLocalizations: { [Locale.SpanishES]: WingedLightAreasToSpanish[area] },
	value: area,
}));

export default new (class implements ChatInputCommand {
	public get data() {
		return {
			name: t("calculate.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
			nameLocalizations: Object.fromEntries(
				LOCALES.map((locale) => [locale, t("calculate.command-name", { lng: locale, ns: "commands" })]),
			),
			description: t("calculate.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
			descriptionLocalizations: Object.fromEntries(
				LOCALES.map((locale) => [locale, t("calculate.command-description", { lng: locale, ns: "commands" })]),
			),
			type: ApplicationCommandType.ChatInput,
			options: [
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "ascended-candles",
					description: "Calculates the number of days it would take to achieve a number of ascended candles.",
					options: [
						{
							type: ApplicationCommandOptionType.Integer,
							name: "start",
							description: "The starting number of ascended candles.",
							minValue: 0,
							required: true,
						},
						{
							type: ApplicationCommandOptionType.Integer,
							name: "goal",
							description: "The desired number of ascended candles.",
							maxValue: 10_000,
							minValue: 1,
							required: true,
						},
						{
							type: ApplicationCommandOptionType.Boolean,
							name: "eye-of-eden",
							description: "Whether to include the Eye of Eden in the calculation.",
							required: false,
						},
						{
							type: ApplicationCommandOptionType.Boolean,
							name: "shard-eruptions",
							description: "Whether to include shard eruptions in the calculation.",
							required: false,
						},
					],
				},
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "event-currency",
					description: "Calculates the number of days it would take to achieve a number of event currency.",
					options: [
						{
							type: ApplicationCommandOptionType.Integer,
							name: "start",
							description: "The starting number of event currency.",
							minValue: 0,
							required: true,
						},
						{
							type: ApplicationCommandOptionType.Integer,
							name: "goal",
							description: "The desired number of event currency.",
							maxValue: 250,
							minValue: 1,
							required: true,
						},
					],
				},
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "seasonal-candles",
					description: "Calculates the number of days it would take to achieve a number of seasonal candles.",
					options: [
						{
							type: ApplicationCommandOptionType.Integer,
							name: "start",
							description: "The starting number of seasonal candles.",
							minValue: 0,
							maxValue: 1_000,
							required: true,
						},
						{
							type: ApplicationCommandOptionType.Integer,
							name: "goal",
							description: "The desired number of seasonal candles.",
							minValue: 1,
							maxValue: 1_000,
							required: true,
						},
					],
				},
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: t("calculate.winged-light.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
					nameLocalizations: Object.fromEntries(
						LOCALES.map((locale) => [
							locale,
							t("calculate.winged-light.command-name", { lng: locale, ns: "commands" }),
						]),
					),
					description: t("calculate.winged-light.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
					descriptionLocalizations: Object.fromEntries(
						LOCALES.map((locale) => [
							locale,
							t("calculate.winged-light.command-description", { lng: locale, ns: "commands" }),
						]),
					),
					options: [
						{
							type: ApplicationCommandOptionType.Integer,
							name: "wing-buffs",
							description: "The number of wing buffs (total amount collected from ascended spirits).",
							maxValue: MAXIMUM_WINGED_LIGHT - wingedLightInAreas,
							minValue: 0,
							required: true,
						},
						{
							type: ApplicationCommandOptionType.String,
							name: t("calculate.winged-light.area", { lng: Locale.EnglishGB, ns: "commands", area: 1 }),
							nameLocalizations: Object.fromEntries(
								LOCALES.map((locale) => [
									locale,
									t("calculate.winged-light.area", { lng: locale, ns: "commands", area: 1 }),
								]),
							),
							description: "The first area to calculate winged light from.",
							choices: wingedLightAreaChoices,
						},
						{
							type: ApplicationCommandOptionType.String,
							name: t("calculate.winged-light.area", { lng: Locale.EnglishGB, ns: "commands", area: 2 }),
							nameLocalizations: Object.fromEntries(
								LOCALES.map((locale) => [
									locale,
									t("calculate.winged-light.area", { lng: locale, ns: "commands", area: 2 }),
								]),
							),
							description: "The second area to calculate winged light from.",
							choices: wingedLightAreaChoices,
						},
						{
							type: ApplicationCommandOptionType.String,
							name: t("calculate.winged-light.area", { lng: Locale.EnglishGB, ns: "commands", area: 3 }),
							nameLocalizations: Object.fromEntries(
								LOCALES.map((locale) => [
									locale,
									t("calculate.winged-light.area", { lng: locale, ns: "commands", area: 3 }),
								]),
							),
							description: "The third area to calculate winged light from.",
							choices: wingedLightAreaChoices,
						},
						{
							type: ApplicationCommandOptionType.String,
							name: t("calculate.winged-light.area", { lng: Locale.EnglishGB, ns: "commands", area: 4 }),
							nameLocalizations: Object.fromEntries(
								LOCALES.map((locale) => [
									locale,
									t("calculate.winged-light.area", { lng: locale, ns: "commands", area: 4 }),
								]),
							),
							description: "The fourth area to calculate winged light from.",
							choices: wingedLightAreaChoices,
						},
						{
							type: ApplicationCommandOptionType.String,
							name: t("calculate.winged-light.area", { lng: Locale.EnglishGB, ns: "commands", area: 5 }),
							nameLocalizations: Object.fromEntries(
								LOCALES.map((locale) => [
									locale,
									t("calculate.winged-light.area", { lng: locale, ns: "commands", area: 5 }),
								]),
							),
							description: "The fifth area to calculate winged light from.",
							choices: wingedLightAreaChoices,
						},
						{
							type: ApplicationCommandOptionType.String,
							name: t("calculate.winged-light.area", { lng: Locale.EnglishGB, ns: "commands", area: 6 }),
							nameLocalizations: Object.fromEntries(
								LOCALES.map((locale) => [
									locale,
									t("calculate.winged-light.area", { lng: locale, ns: "commands", area: 6 }),
								]),
							),
							description: "The sixth area to calculate winged light from.",
							choices: wingedLightAreaChoices,
						},
						{
							type: ApplicationCommandOptionType.String,
							name: t("calculate.winged-light.area", { lng: Locale.EnglishGB, ns: "commands", area: 7 }),
							nameLocalizations: Object.fromEntries(
								LOCALES.map((locale) => [
									locale,
									t("calculate.winged-light.area", { lng: locale, ns: "commands", area: 7 }),
								]),
							),
							description: "The seventh area to calculate winged light from.",
							choices: wingedLightAreaChoices,
						},
						{
							type: ApplicationCommandOptionType.String,
							name: t("calculate.winged-light.area", { lng: Locale.EnglishGB, ns: "commands", area: 8 }),
							nameLocalizations: Object.fromEntries(
								LOCALES.map((locale) => [
									locale,
									t("calculate.winged-light.area", { lng: locale, ns: "commands", area: 8 }),
								]),
							),
							description: "The eighth area to calculate winged light from.",
							choices: wingedLightAreaChoices,
						},
					],
				},
			],
		} as const;
	}

	public async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "ascended-candles":
				await this.ascendedCandles(interaction);
				return;
			case "event-currency":
				await this.eventCurrency(interaction);
				return;
			case "seasonal-candles":
				await this.seasonalCandles(interaction);
				return;
			case "winged-light":
				await this.wingedLight(interaction);
		}
	}

	public async ascendedCandles(interaction: ChatInputCommandInteraction) {
		const { options } = interaction;
		const start = options.getInteger("start", true);
		const goal = options.getInteger("goal", true);
		const eyeOfEden = options.getBoolean("eye-of-eden") ?? true;
		const shardEruptions = options.getBoolean("shard-eruptions") ?? true;

		if (start >= goal) {
			await interaction.reply({ content: "The goal has already been achieved.", ephemeral: true });
			return;
		}

		if (eyeOfEden === false && shardEruptions === false) {
			await interaction.reply({ content: "You must have a source for gaining ascended candles!", ephemeral: true });
			return;
		}

		if (await cannotUseCustomEmojis(interaction)) return;
		const amountRequired = goal - start;
		let day = todayDate();
		let result = 0;

		for (let index = 0; ; index++) {
			if (shardEruptions) {
				const shardEruptionToday = shardEruption(index);

				if (shardEruptionToday) {
					const { strong, reward } = shardEruptionToday;
					if (strong) result += reward;
				}
			}

			if (eyeOfEden && day.weekday === 7) result += ASCENDED_CANDLES_PER_WEEK;
			if (result >= amountRequired) break;
			day = day.plus({ day: 1 });
		}

		const timestamp = day.toUnixInteger();
		let minimumTimeText = "Minimum time derived by assuming ";

		if (eyeOfEden && shardEruptions) {
			minimumTimeText += `${ASCENDED_CANDLE_MINIMUM_TIME_EYE_OF_EDEN_TEXT} and ${ASCENDED_CANDLE_MINIMUM_TIME_SHARD_ERUPTIONS_TEXT}`;
		} else if (eyeOfEden) {
			minimumTimeText += ASCENDED_CANDLE_MINIMUM_TIME_EYE_OF_EDEN_TEXT;
		} else if (shardEruptions) {
			minimumTimeText += ASCENDED_CANDLE_MINIMUM_TIME_SHARD_ERUPTIONS_TEXT;
		}

		minimumTimeText += ".";

		await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setColor(DEFAULT_EMBED_COLOUR)
					.setDescription(
						`Start: ${resolveCurrencyEmoji({
							emoji: EMOJI.AscendedCandle,
							number: start,
						})}\nGoal: ${resolveCurrencyEmoji({
							emoji: EMOJI.AscendedCandle,
							number: goal,
						})}\nRequired: ${resolveCurrencyEmoji({
							emoji: EMOJI.AscendedCandle,
							number: amountRequired,
						})}`,
					)
					.setFields({
						name: "Result",
						value: `This goal is first achievable at ${time(timestamp, TimestampStyles.LongDate)} (${time(
							timestamp,
							TimestampStyles.RelativeTime,
						)}).`,
					})
					.setFooter({ text: minimumTimeText })
					.setTitle("Ascended Candle Calculator"),
			],
		});
	}

	public async eventCurrency(interaction: ChatInputCommandInteraction) {
		const { options } = interaction;
		const start = options.getInteger("start", true);
		const goal = options.getInteger("goal", true);

		if (start >= goal) {
			await interaction.reply({ content: "The goal has already been achieved.", ephemeral: true });
			return;
		}

		// This calculator may only be used during events.
		const today = todayDate();
		const event = resolveEvent(today);

		if (!event) {
			await interaction.reply({ content: "There is no event currently active.", ephemeral: true });
			return;
		}

		if (today > event.eventCurrencyEnd) {
			await interaction.reply({ content: "There are no more event currency in this event.", ephemeral: true });
			return;
		}

		if (await cannotUseCustomEmojis(interaction)) return;
		const amountRequired = goal - start;
		const { eventCurrencyEmoji, eventCurrencyPerDay } = event;
		const days = Math.ceil(amountRequired / eventCurrencyPerDay);

		await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setColor(DEFAULT_EMBED_COLOUR)
					.setDescription(
						`Start: ${resolveCurrencyEmoji({
							emoji: eventCurrencyEmoji,
							number: start,
						})}\nGoal: ${resolveCurrencyEmoji({
							emoji: eventCurrencyEmoji,
							number: goal,
						})}\nRequired: ${resolveCurrencyEmoji({
							emoji: eventCurrencyEmoji,
							number: amountRequired,
						})}`,
					)
					.setFields({ name: "Result", value: `${days} day${days === 1 ? "" : "s"}` })
					.setFooter({ text: `Calculations assume ${eventCurrencyPerDay} event currency per day.` })
					.setTitle("Event Currency Calculator"),
			],
		});
	}

	public async seasonalCandles(interaction: ChatInputCommandInteraction) {
		const { locale: lng, options } = interaction;
		const start = options.getInteger("start", true);
		const goal = options.getInteger("goal", true);

		if (start >= goal) {
			await interaction.reply({
				content: t("calculate.seasonal-candles.goal-achieved", { lng, ns: "commands" }),
				ephemeral: true,
			});

			return;
		}

		if (await cannotUseCustomEmojis(interaction)) return;
		const today = todayDate();
		const season = resolveSeason(today);
		const remainingCandles = season?.remainingSeasonalCandles(today);
		const emoji = season?.candleEmoji ?? EMOJI.SeasonalCandle;
		const amountRequired = goal - start;
		let result = 0;
		let days = 0;
		let resultWithSeasonPass = 0;
		let daysWithSeasonPass = 1;
		let includedDoubleLight = false;

		for (let day = today; result < amountRequired; day = day.plus({ day: 1 }), days++) {
			result += SEASONAL_CANDLES_PER_DAY;
			resultWithSeasonPass += SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS;

			if (day >= DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE && day <= DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE) {
				includedDoubleLight = true;
				result += 1;
				resultWithSeasonPass += 1;
			}

			if (resultWithSeasonPass < amountRequired) daysWithSeasonPass++;
		}

		const resultString = `${days} day${days === 1 ? "" : "s"}`;
		const resultWithSeasonPassString = `${daysWithSeasonPass} day${daysWithSeasonPass === 1 ? "" : "s"}`;

		const embed = new EmbedBuilder()
			.setColor(DEFAULT_EMBED_COLOUR)
			.setDescription(
				`Start: ${resolveCurrencyEmoji({ emoji, number: start })}\nGoal: ${resolveCurrencyEmoji({
					emoji,
					number: goal,
				})}\nRequired: ${resolveCurrencyEmoji({ emoji, number: amountRequired })}`,
			)
			.setFields({
				name: "Result",
				value: `${resultString}${
					days === daysWithSeasonPass ? "" : ` (${resultWithSeasonPassString} with a Season Pass).`
				}`,
			})
			.setTitle("Seasonal Candle Calculator");

		if (remainingCandles) {
			const { seasonalCandlesLeft, seasonalCandlesLeftWithSeasonPass } = remainingCandles;

			embed.addFields({
				name: "Season Calculations",
				value: `${resolveCurrencyEmoji({
					emoji,
					number: seasonalCandlesLeft,
				})} remain in the season.\n${resolveCurrencyEmoji({
					emoji,
					number: seasonalCandlesLeftWithSeasonPass,
				})} remain in the season with a Season Pass.`,
			});
		}

		if (includedDoubleLight) {
			embed.addFields({
				name: "Notes",
				value: `Double Seasonal Light event included in calculation.\n${doubleSeasonalLightEventStart} - ${doubleSeasonalLightEventEnd}`,
			});
		}

		await interaction.reply({ embeds: [embed] });
	}

	public async wingedLight(interaction: ChatInputCommandInteraction) {
		if (await cannotUseCustomEmojis(interaction)) return;
		const { locale: lng, options } = interaction;
		const wingBuffs = options.getInteger("wing-buffs", true);
		const area1 = options.getString("area-1");
		const area2 = options.getString("area-2");
		const area3 = options.getString("area-3");
		const area4 = options.getString("area-4");
		const area5 = options.getString("area-5");
		const area6 = options.getString("area-6");
		const area7 = options.getString("area-7");
		const area8 = options.getString("area-8");
		const areas = [area1, area2, area3, area4, area5, area6, area7, area8].filter(notNull);

		if (!areas.every(isWingedLightArea)) {
			void interaction.client.log({ content: "Received an unknown area.", error: areas });

			await interaction.reply({
				content: t("calculate.winged-light.unknown", { lng, ns: "commands" }),
				ephemeral: true,
			});

			return;
		}

		if (new Set(areas).size !== areas.length) {
			await interaction.reply({
				content: t("calculate.winged-light.duplicate-areas", { lng, ns: "commands" }),
				ephemeral: true,
			});

			return;
		}

		let accumulation = wingBuffs;

		await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setColor(DEFAULT_EMBED_COLOUR)
					.setDescription(
						`${t("calculate.winged-light.started-with", { lng, ns: "commands" })} ${resolveCurrencyEmoji({
							emoji: EMOJI.WingedLight,
							number: wingBuffs,
							includeSpaceInEmoji: true,
						})}.\n${t("calculate.winged-light.reborn-with", { lng, ns: "commands" })} ${resolveCurrencyEmoji({
							emoji: EMOJI.WingedLight,
							number: (accumulation += AreaToWingedLightCount[Map.Orbit]),
							includeSpaceInEmoji: true,
						})} (+${AreaToWingedLightCount[Map.Orbit]}).`,
					)
					.setFields(
						...(areas.length === 0 ? WINGED_LIGHT_AREAS : areas).map((area) => ({
							name: t(`${area === Map.AncientMemory ? "maps" : "realms"}.${area}`, { lng, ns: "general" }),
							value: `${(accumulation += AreaToWingedLightCount[area])} (+${AreaToWingedLightCount[area]})`,
						})),
						{
							name: "Total",
							value: `${t("calculate.winged-light.you-should-have", { lng, ns: "commands" })} ${resolveCurrencyEmoji({
								emoji: EMOJI.WingedLight,
								number: accumulation,
								includeSpaceInEmoji: true,
							})}.`,
						},
					)
					.setTitle(t("calculate.winged-light.winged-light-calculator", { lng, ns: "commands" })),
			],
		});
	}
})();
