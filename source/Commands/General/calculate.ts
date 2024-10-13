import {
	type ChatInputCommandInteraction,
	EmbedBuilder,
	type EmbedFooterOptions,
	Locale,
	MessageFlags,
	PermissionFlagsBits,
	TimestampStyles,
	time,
} from "discord.js";
import { t } from "i18next";
import type { Event } from "../../Structures/Event.js";
import {
	ASCENDED_CANDLES_PER_WEEK,
	AreaToWingedLightCount,
	DEFAULT_EMBED_COLOUR,
	RealmName,
	SkyMap,
	WINGED_LIGHT_AREAS,
	WINGED_LIGHT_THRESHOLDS,
} from "../../Utility/Constants.js";
import {
	SEASONAL_CANDLES_PER_DAY,
	SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS,
} from "../../Utility/catalogue.js";
import {
	DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE,
	DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE,
	isDuring,
	skyNow,
	skyToday,
} from "../../Utility/dates.js";
import {
	MISCELLANEOUS_EMOJIS,
	formatEmoji,
	formatEmojiURL,
	resolveCurrencyEmoji,
} from "../../Utility/emojis.js";
import { cannotUsePermissions } from "../../Utility/permissionChecks.js";
import { shardEruption } from "../../Utility/shardEruption.js";
import { skyCurrentEvents } from "../../catalogue/events/index.js";
import { skyCurrentSeason } from "../../catalogue/spirits/seasons/index.js";
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
	`all statues in the ${RealmName.EyeOfEden} were gifted winged light` as const;

const ASCENDED_CANDLE_MINIMUM_TIME_SHARD_ERUPTIONS_TEXT =
	"all shard eruptions were cleansed" as const;

export default new (class implements ChatInputCommand {
	public readonly name = t("calculate.command-name", { lng: Locale.EnglishGB, ns: "commands" });

	public async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "ascended-candles": {
				await this.ascendedCandles(interaction);
				return;
			}
			case "event-currency": {
				await this.eventCurrency(interaction);
				return;
			}
			case "seasonal-candles": {
				await this.seasonalCandles(interaction);
				return;
			}
			case "winged-light": {
				await this.wingedLight(interaction);
			}
		}
	}

	public async ascendedCandles(interaction: ChatInputCommandInteraction) {
		const { options } = interaction;
		const start = options.getInteger("start", true);
		const goal = options.getInteger("goal", true);
		const eyeOfEden = options.getBoolean("eye-of-eden") ?? true;
		const shardEruptions = options.getBoolean("shard-eruptions") ?? true;

		if (start >= goal) {
			await interaction.reply({
				content: "The goal has already been achieved.",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		if (eyeOfEden === false && shardEruptions === false) {
			await interaction.reply({
				content: "You must have a source for gaining ascended candles!",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		// Defer in case of long loops.
		await interaction.deferReply();

		const amountRequired = goal - start;
		let day = skyToday();
		let result = 0;

		for (let index = 0; ; index++) {
			if (shardEruptions) {
				const shardEruptionToday = shardEruption(index);

				if (shardEruptionToday) {
					const { strong, reward } = shardEruptionToday;
					if (strong) {
						result += reward;
					}
				}
			}

			if (eyeOfEden && day.weekday === 7) {
				result += ASCENDED_CANDLES_PER_WEEK;
			}

			if (result >= amountRequired) {
				break;
			}

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

		await interaction.editReply({
			embeds: [
				new EmbedBuilder()
					.setColor(DEFAULT_EMBED_COLOUR)
					.setDescription(
						`Start: ${resolveCurrencyEmoji({
							emoji: MISCELLANEOUS_EMOJIS.AscendedCandle,
							number: start,
						})}\nGoal: ${resolveCurrencyEmoji({
							emoji: MISCELLANEOUS_EMOJIS.AscendedCandle,
							number: goal,
						})}\nRequired: ${resolveCurrencyEmoji({
							emoji: MISCELLANEOUS_EMOJIS.AscendedCandle,
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
		const { locale, options } = interaction;
		const start = options.getInteger("start", true);
		const goal = options.getInteger("goal", true);

		if (start >= goal) {
			await interaction.reply({ content: "The goal has already been achieved.", ephemeral: true });
			return;
		}

		// This calculator may only be used during events.
		const now = skyNow();

		// Filter out events that do not have event currency.
		const events = skyCurrentEvents(now).filter(
			(event): event is Event & { readonly eventCurrency: NonNullable<Event["eventCurrency"]> } =>
				event.eventCurrency !== null,
		);

		if (events.length === 0) {
			await interaction.reply({
				content: "There is no event currently active with event currency.",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		if (events.every(({ eventCurrency }) => now >= eventCurrency.end)) {
			await interaction.reply({ content: "There is no more event currency.", ephemeral: true });
			return;
		}

		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const amountRequired = goal - start;

		const suffix = events
			.map((event) =>
				event.eventCurrency.emoji ? formatEmoji(event.eventCurrency.emoji) : event.name,
			)
			.join("");

		const startEmojis = `${start} ${suffix}`;
		const goalEmojis = `${goal} ${suffix}`;
		const amountRequiredEmojis = `${amountRequired} ${suffix}`;

		const result = events.map((event) => {
			const today = now.startOf("day");

			// Collect daily event currency.
			const dailyRemaining = event.eventCurrency.amount.reduce(
				(remaining, eventCurrency) =>
					eventCurrency.date >= today ? remaining + eventCurrency.amount : remaining,
				0,
			);

			// Collect pools, if any.
			const pool = event.eventCurrency.pool?.find((pool) => isDuring(pool.start, pool.end, today));
			return `${event.eventCurrency.emoji ? formatEmoji(event.eventCurrency.emoji) : `${event.name}: `} A total of ${dailyRemaining} remains daily.${pool ? ` There is currently a pool of ${pool.amount}!` : ""}`;
		});

		const embed = new EmbedBuilder()
			.setColor(DEFAULT_EMBED_COLOUR)
			.setDescription(
				`Start: ${startEmojis}\nGoal: ${goalEmojis}\nRequired: ${amountRequiredEmojis}`,
			)
			.setFields({ name: "Result", value: result.join("\n") })
			.setTitle("Event Currency Calculator");

		const footer: EmbedFooterOptions = {
			text: events.map((event) => event.daysText(now, locale)).join("\n"),
		};

		const event0 = events[0];

		if (events.length === 1 && event0?.eventCurrency.emoji) {
			footer.iconURL = formatEmojiURL(event0.eventCurrency.emoji.id);
		}

		embed.setFooter(footer);
		await interaction.reply({ embeds: [embed] });
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

		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const today = skyToday();
		const season = skyCurrentSeason(today);
		const emoji = season?.candleEmoji ?? MISCELLANEOUS_EMOJIS.SeasonalCandle;
		const amountRequired = goal - start;
		let result = 0;
		let days = 0;
		let resultWithSeasonPass = 0;
		let daysWithSeasonPass = 1;
		let includedDoubleLight = false;

		for (let day = today; result < amountRequired; day = day.plus({ day: 1 }), days++) {
			result += SEASONAL_CANDLES_PER_DAY;
			resultWithSeasonPass += SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS;

			if (
				day >= DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE &&
				day <= DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE
			) {
				includedDoubleLight = true;
				result += 1;
				resultWithSeasonPass += 1;
			}

			if (resultWithSeasonPass < amountRequired) {
				daysWithSeasonPass++;
			}
		}

		const embed = new EmbedBuilder()
			.setColor(DEFAULT_EMBED_COLOUR)
			.setDescription(
				`${t("calculate.seasonal-candles.start", { lng, ns: "commands" })}: ${resolveCurrencyEmoji({
					emoji,
					number: start,
				})}\n${t("calculate.seasonal-candles.goal", { lng, ns: "commands" })}: ${resolveCurrencyEmoji(
					{
						emoji,
						number: goal,
					},
				)}\n${t("calculate.seasonal-candles.required", { lng, ns: "commands" })}: ${resolveCurrencyEmoji(
					{
						emoji,
						number: amountRequired,
					},
				)}`,
			)
			.setFields({
				name: t("calculate.seasonal-candles.result", { lng, ns: "commands" }),
				value: `${t("calculate.seasonal-candles.day", { lng, ns: "commands", count: days })}${
					days === daysWithSeasonPass
						? ""
						: ` ${t("calculate.seasonal-candles.day-season-pass", {
								lng,
								ns: "commands",
								count: daysWithSeasonPass,
							})}`
				}`,
			})
			.setTitle(
				t("calculate.seasonal-candles.seasonal-candle-calculator", { lng, ns: "commands" }),
			);

		if (season) {
			const { seasonalCandlesLeft, seasonalCandlesLeftWithSeasonPass } =
				season.remainingSeasonalCandles(today);

			const daysLeft = season.daysText(today, lng);

			embed.addFields({
				name: t("calculate.seasonal-candles.season-calculations", { lng, ns: "commands" }),
				value: `${resolveCurrencyEmoji({
					emoji,
					number: seasonalCandlesLeft,
				})} ${t("calculate.seasonal-candles.remain-in-the-season", { lng, ns: "commands" })}\n${resolveCurrencyEmoji(
					{
						emoji,
						number: seasonalCandlesLeftWithSeasonPass,
					},
				)} ${t("calculate.seasonal-candles.remain-in-the-season-with-a-season-pass", { lng, ns: "commands" })}`,
			});

			embed.setFooter({ iconURL: formatEmojiURL(season.emoji.id), text: daysLeft });
		}

		if (includedDoubleLight) {
			embed.addFields({
				name: t("calculate.seasonal-candles.notes", { lng, ns: "commands" }),
				value: `${t("calculate.seasonal-candles.double-seasonal-light-calculation", {
					lng,
					ns: "commands",
				})}\n${doubleSeasonalLightEventStart} - ${doubleSeasonalLightEventEnd}`,
			});
		}

		await interaction.reply({ embeds: [embed] });
	}

	public async wingedLight(interaction: ChatInputCommandInteraction) {
		if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
			return;
		}

		const { locale: lng, options } = interaction;
		const wingBuffs = options.getInteger("wing-buffs", true);
		let accumulation = wingBuffs;

		const embed = new EmbedBuilder()
			.setColor(DEFAULT_EMBED_COLOUR)
			.setDescription(
				`${t("calculate.winged-light.started-with", { lng, ns: "commands" })} ${resolveCurrencyEmoji(
					{
						emoji: MISCELLANEOUS_EMOJIS.WingedLight,
						number: wingBuffs,
						includeSpaceInEmoji: true,
					},
				)}.\n${t("calculate.winged-light.reborn-with", { lng, ns: "commands" })} ${resolveCurrencyEmoji(
					{
						emoji: MISCELLANEOUS_EMOJIS.WingedLight,
						// biome-ignore lint/suspicious/noAssignInExpressions: It's fine.
						number: (accumulation += AreaToWingedLightCount[SkyMap.Orbit]),
						includeSpaceInEmoji: true,
					},
				)} (+${AreaToWingedLightCount[SkyMap.Orbit]}).`,
			)
			.setTitle(t("calculate.winged-light.winged-light-calculator", { lng, ns: "commands" }));

		const fields = WINGED_LIGHT_AREAS.map((area) => ({
			name: t(`${area === SkyMap.AncientMemory ? "maps" : "realms"}.${area}`, {
				lng,
				ns: "general",
			}),
			value: `${
				// biome-ignore lint/suspicious/noAssignInExpressions: It's fine.
				(accumulation += AreaToWingedLightCount[area])
			} (+${AreaToWingedLightCount[area]})`,
		}));

		const wedge = WINGED_LIGHT_THRESHOLDS.findIndex((threshold) => accumulation < threshold);
		const nextThreshold = WINGED_LIGHT_THRESHOLDS[wedge];

		const wedgeTotal = t("calculate.winged-light.wedge-total", {
			lng,
			ns: "commands",
			count: wedge,
		});

		const nextWedge = nextThreshold
			? `${t("calculate.winged-light.wedge-next", { lng, ns: "commands", count: nextThreshold })} ${formatEmoji(MISCELLANEOUS_EMOJIS.WingedLight)}`
			: null;

		fields.push({
			name: t("calculate.winged-light.total", { lng, ns: "commands" }),
			value: `${resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.WingedLight, number: accumulation, includeSpaceInEmoji: true })} | ${wedgeTotal}${nextThreshold ? `\n${nextWedge}` : ""}`,
		});

		embed.setFields(fields);
		await interaction.reply({ embeds: [embed] });
	}
})();
