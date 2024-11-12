import {
	type APIChatInputApplicationCommandInteraction,
	type APIEmbed,
	type APIEmbedFooter,
	Locale,
	MessageFlags,
	PermissionFlagsBits,
} from "@discordjs/core";
import { t } from "i18next";
import { skyCurrentEvents } from "../data/events/index.js";
import { skyCurrentSeason } from "../data/spirits/seasons/index.js";
import { client } from "../discord.js";
import type { Event } from "../models/Event.js";
import {
	SEASONAL_CANDLES_PER_DAY,
	SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS,
} from "../utility/catalogue.js";
import {
	APPLICATION_ID,
	ASCENDED_CANDLES_PER_WEEK,
	AreaToWingedLightCount,
	DEFAULT_EMBED_COLOUR,
	SkyMap,
	WINGED_LIGHT_AREAS,
	WINGED_LIGHT_THRESHOLDS,
} from "../utility/constants.js";
import {
	DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE,
	DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE_MARKDOWN,
	DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE,
	DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE_MARKDOWN,
	isDuring,
	skyNow,
	skyToday,
} from "../utility/dates.js";
import {
	MISCELLANEOUS_EMOJIS,
	formatEmoji,
	formatEmojiURL,
	resolveCurrencyEmoji,
} from "../utility/emojis.js";
import type { OptionResolver } from "../utility/option-resolver.js";
import { cannotUsePermissions } from "../utility/permissions.js";
import { shardEruption } from "../utility/shard-eruption.js";

export async function ascendedCandles(
	interaction: APIChatInputApplicationCommandInteraction,
	options: OptionResolver,
) {
	const start = options.getInteger("start", true);
	const goal = options.getInteger("goal", true);
	const eyeOfEden = options.getBoolean("eye-of-eden") ?? true;
	const shardEruptions = options.getBoolean("shard-eruptions") ?? true;

	if (start >= goal) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "The goal has already been achieved.",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (eyeOfEden === false && shardEruptions === false) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "You must have a source for gaining ascended candles!",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
		return;
	}

	// Defer in case of long loops.
	await client.api.interactions.defer(interaction.id, interaction.token);

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
	let minimumTimeText: string;

	if (eyeOfEden && shardEruptions) {
		minimumTimeText = t("calculate.ascended-candles.minimum-time-eye-of-eden-and-shard-eruptions", {
			lng: Locale.EnglishGB,
			ns: "commands",
		});
	} else if (eyeOfEden) {
		minimumTimeText = t("calculate.ascended-candles.minimum-time-eye-of-eden", {
			lng: Locale.EnglishGB,
			ns: "commands",
		});
	} else {
		minimumTimeText = t("calculate.ascended-candles.minimum-time-shard-eruptions", {
			lng: Locale.EnglishGB,
			ns: "commands",
		});
	}

	await client.api.interactions.editReply(APPLICATION_ID, interaction.token, {
		embeds: [
			{
				color: DEFAULT_EMBED_COLOUR,
				description: `Start: ${resolveCurrencyEmoji({
					emoji: MISCELLANEOUS_EMOJIS.AscendedCandle,
					number: start,
				})}\nGoal: ${resolveCurrencyEmoji({
					emoji: MISCELLANEOUS_EMOJIS.AscendedCandle,
					number: goal,
				})}\nRequired: ${resolveCurrencyEmoji({
					emoji: MISCELLANEOUS_EMOJIS.AscendedCandle,
					number: amountRequired,
				})}`,
				fields: [
					{
						name: "Result",
						value: `This goal is first achievable at <t:${timestamp}:D> (<t:${timestamp}:R>).`,
					},
				],
				footer: { text: minimumTimeText },
				title: "Ascended Candle Calculator",
			},
		],
	});
}

export async function eventCurrency(
	interaction: APIChatInputApplicationCommandInteraction,
	options: OptionResolver,
) {
	const { locale } = interaction;
	const start = options.getInteger("start", true);
	const goal = options.getInteger("goal", true);

	if (start >= goal) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "The goal has already been achieved.",
			flags: MessageFlags.Ephemeral,
		});

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
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "There is no event currently active with event currency.",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (events.every(({ eventCurrency }) => now >= eventCurrency.end)) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: "There is no more event currency.",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
		return;
	}

	const amountRequired = goal - start;

	const suffix = events
		.map((event) =>
			event.eventCurrency.emoji
				? formatEmoji(event.eventCurrency.emoji)
				: t(`events.${event.id}`, { lng: locale, ns: "general" }),
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
		return `${event.eventCurrency.emoji ? formatEmoji(event.eventCurrency.emoji) : `${t(`events.${event.id}`, { lng: locale, ns: "general" })}: `} A total of ${dailyRemaining} remains daily.${pool ? ` There is currently a pool of ${pool.amount}!` : ""}`;
	});

	const embed: APIEmbed = {
		color: DEFAULT_EMBED_COLOUR,
		description: `Start: ${startEmojis}\nGoal: ${goalEmojis}\nRequired: ${amountRequiredEmojis}`,
		fields: [{ name: "Result", value: result.join("\n") }],
		title: "Event Currency Calculator",
	};

	const footer: APIEmbedFooter = {
		text: events.map((event) => event.daysText(now, locale)).join("\n"),
	};

	const event0 = events[0];

	if (events.length === 1 && event0?.eventCurrency.emoji) {
		footer.icon_url = formatEmojiURL(event0.eventCurrency.emoji.id);
	}

	embed.footer = footer;
	await client.api.interactions.reply(interaction.id, interaction.token, { embeds: [embed] });
}

export async function seasonalCandles(
	interaction: APIChatInputApplicationCommandInteraction,
	options: OptionResolver,
) {
	const { locale } = interaction;
	const start = options.getInteger("start", true);
	const goal = options.getInteger("goal", true);

	if (start >= goal) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: t("calculate.seasonal-candles.goal-achieved", { lng: locale, ns: "commands" }),
			flags: MessageFlags.Ephemeral,
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

	const embed: APIEmbed = {
		color: DEFAULT_EMBED_COLOUR,
		description: `${t("calculate.seasonal-candles.start", { lng: locale, ns: "commands" })}: ${resolveCurrencyEmoji(
			{
				emoji,
				number: start,
			},
		)}\n${t("calculate.seasonal-candles.goal", { lng: locale, ns: "commands" })}: ${resolveCurrencyEmoji(
			{
				emoji,
				number: goal,
			},
		)}\n${t("calculate.seasonal-candles.required", { lng: locale, ns: "commands" })}: ${resolveCurrencyEmoji(
			{
				emoji,
				number: amountRequired,
			},
		)}`,
		title: t("calculate.seasonal-candles.seasonal-candle-calculator", {
			lng: locale,
			ns: "commands",
		}),
	};

	const fields = [
		{
			name: t("calculate.seasonal-candles.result", { lng: locale, ns: "commands" }),
			value: `${t("calculate.seasonal-candles.day", { lng: locale, ns: "commands", count: days })}${
				days === daysWithSeasonPass
					? ""
					: ` ${t("calculate.seasonal-candles.day-season-pass", {
							lng: locale,
							ns: "commands",
							count: daysWithSeasonPass,
						})}`
			}`,
		},
	];

	if (season) {
		const { seasonalCandlesLeft, seasonalCandlesLeftWithSeasonPass } =
			season.remainingSeasonalCandles(today);

		const daysLeft = season.daysText(today, locale);

		fields.push({
			name: t("calculate.seasonal-candles.season-calculations", { lng: locale, ns: "commands" }),
			value: `${resolveCurrencyEmoji({
				emoji,
				number: seasonalCandlesLeft,
			})} ${t("calculate.seasonal-candles.remain-in-the-season", { lng: locale, ns: "commands" })}\n${resolveCurrencyEmoji(
				{
					emoji,
					number: seasonalCandlesLeftWithSeasonPass,
				},
			)} ${t("calculate.seasonal-candles.remain-in-the-season-with-a-season-pass", { lng: locale, ns: "commands" })}`,
		});

		embed.footer = { icon_url: formatEmojiURL(season.emoji.id), text: daysLeft };
	}

	if (includedDoubleLight) {
		fields.push({
			name: t("calculate.seasonal-candles.notes", { lng: locale, ns: "commands" }),
			value: `${t("calculate.seasonal-candles.double-seasonal-light-calculation", {
				lng: locale,
				ns: "commands",
			})}\n${DOUBLE_SEASONAL_LIGHT_EVENT_START_DATE_MARKDOWN} - ${DOUBLE_SEASONAL_LIGHT_EVENT_END_DATE_MARKDOWN}`,
		});
	}

	embed.fields = fields;
	await client.api.interactions.reply(interaction.id, interaction.token, { embeds: [embed] });
}

export async function wingedLight(
	interaction: APIChatInputApplicationCommandInteraction,
	options: OptionResolver,
) {
	if (await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis)) {
		return;
	}

	const { locale } = interaction;
	const wingBuffs = options.getInteger("wing-buffs", true);
	let accumulation = wingBuffs;

	const embed: APIEmbed = {
		color: DEFAULT_EMBED_COLOUR,
		description: `${t("calculate.winged-light.started-with", { lng: locale, ns: "commands" })} ${resolveCurrencyEmoji(
			{
				emoji: MISCELLANEOUS_EMOJIS.WingedLight,
				number: wingBuffs,
				includeSpaceInEmoji: true,
			},
		)}.\n${t("calculate.winged-light.reborn-with", { lng: locale, ns: "commands" })} ${resolveCurrencyEmoji(
			{
				emoji: MISCELLANEOUS_EMOJIS.WingedLight,
				// biome-ignore lint/suspicious/noAssignInExpressions: This is fine.
				number: (accumulation += AreaToWingedLightCount[SkyMap.Orbit]),
				includeSpaceInEmoji: true,
			},
		)} (+${AreaToWingedLightCount[SkyMap.Orbit]}).`,
		title: t("calculate.winged-light.winged-light-calculator", { lng: locale, ns: "commands" }),
	};

	const fields = WINGED_LIGHT_AREAS.map((area) => ({
		name: t(`${area === SkyMap.AncientMemory ? "maps" : "realms"}.${area}`, {
			lng: locale,
			ns: "general",
		}),
		value: `${
			// biome-ignore lint/suspicious/noAssignInExpressions: This is fine.
			(accumulation += AreaToWingedLightCount[area])
		} (+${AreaToWingedLightCount[area]})`,
	}));

	const wedge = WINGED_LIGHT_THRESHOLDS.findIndex((threshold) => accumulation < threshold);
	const nextThreshold = WINGED_LIGHT_THRESHOLDS[wedge];

	const wedgeTotal = t("calculate.winged-light.wedge-total", {
		lng: locale,
		ns: "commands",
		count: wedge,
	});

	const nextWedge = nextThreshold
		? `${t("calculate.winged-light.wedge-next", { lng: locale, ns: "commands", count: nextThreshold })} ${formatEmoji(MISCELLANEOUS_EMOJIS.WingedLight)}`
		: null;

	fields.push({
		name: t("calculate.winged-light.total", { lng: locale, ns: "commands" }),
		value: `${resolveCurrencyEmoji({ emoji: MISCELLANEOUS_EMOJIS.WingedLight, number: accumulation, includeSpaceInEmoji: true })} | ${wedgeTotal}${nextThreshold ? `\n${nextWedge}` : ""}`,
	});

	embed.fields = fields;
	await client.api.interactions.reply(interaction.id, interaction.token, { embeds: [embed] });
}
