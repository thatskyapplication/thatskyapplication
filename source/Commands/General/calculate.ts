import {
	type ChatInputCommandInteraction,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	EmbedBuilder,
	time,
	TimestampStyles,
} from "discord.js";
import DailyGuides from "../../Structures/DailyGuides.js";
import {
	Emoji,
	MAXIMUM_WINGED_LIGHT,
	Realm,
	SEASONAL_CANDLES_PER_DAY,
	SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS,
	doubleSeasonalLightEventEndDate,
	doubleSeasonalLightEventStartDate,
	WingedLightCount,
	ASCENDED_CANDLES_PER_WEEK,
	Map,
	WINGED_LIGHT_AREAS,
} from "../../Utility/Constants.js";
import {
	cannotUseCustomEmojis,
	isWingedLightArea,
	notNull,
	remainingSeasonalCandles,
	resolveCurrencyEmoji,
	resolveCurrentSeasonalCandleEmoji,
	resolveEmbedColor,
	todayDate,
} from "../../Utility/Utility.js";
import type { ChatInputCommand } from "../index.js";

const doubleSeasonalLightEventStart = time(doubleSeasonalLightEventStartDate.unix(), TimestampStyles.ShortDate);
const doubleSeasonalLightEventEnd = time(doubleSeasonalLightEventEndDate.unix(), TimestampStyles.ShortDate);

const wingedLightInAreas = Object.values(WingedLightCount).reduce(
	(wingedLightCount, wingedLight) => wingedLightCount + wingedLight,
	0,
);

const wingedLightAreaChoices = WINGED_LIGHT_AREAS.map((area) => ({ name: area, value: area }));

export default new (class implements ChatInputCommand {
	public readonly data = {
		name: "calculate",
		description: "The command containing various calculators.",
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
				name: "winged-light",
				description: "Calculates how much winged light one should possess.",
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
						name: "area-1",
						description: "The first area to calculate winged light from.",
						choices: wingedLightAreaChoices,
					},
					{
						type: ApplicationCommandOptionType.String,
						name: "area-2",
						description: "The second area to calculate winged light from.",
						choices: wingedLightAreaChoices,
					},
					{
						type: ApplicationCommandOptionType.String,
						name: "area-3",
						description: "The third area to calculate winged light from.",
						choices: wingedLightAreaChoices,
					},
					{
						type: ApplicationCommandOptionType.String,
						name: "area-4",
						description: "The fourth area to calculate winged light from.",
						choices: wingedLightAreaChoices,
					},
					{
						type: ApplicationCommandOptionType.String,
						name: "area-5",
						description: "The fifth area to calculate winged light from.",
						choices: wingedLightAreaChoices,
					},
					{
						type: ApplicationCommandOptionType.String,
						name: "area-6",
						description: "The sixth area to calculate winged light from.",
						choices: wingedLightAreaChoices,
					},
					{
						type: ApplicationCommandOptionType.String,
						name: "area-7",
						description: "The seventh area to calculate winged light from.",
						choices: wingedLightAreaChoices,
					},
					{
						type: ApplicationCommandOptionType.String,
						name: "area-8",
						description: "The eighth area to calculate winged light from.",
						choices: wingedLightAreaChoices,
					},
				],
			},
		],
	} as const;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "ascended-candles":
				await this.ascendedCandles(interaction);
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

		if (start >= goal) {
			await interaction.reply({ content: "The goal has already been achieved.", ephemeral: true });
			return;
		}

		if (await cannotUseCustomEmojis(interaction)) return;
		const amountRequired = goal - start;
		let day = todayDate();
		let result = 0;

		for (let index = 0; ; index++) {
			const shardEruptionToday = DailyGuides.shardEruption(index);

			if (shardEruptionToday) {
				const { dangerous, reward } = shardEruptionToday;
				if (dangerous) result += reward;
			}

			if (day.day() === 0) result += ASCENDED_CANDLES_PER_WEEK;
			if (result >= amountRequired) break;
			day = day.add(1, "day");
		}

		const timestamp = day.unix();

		await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setColor(await resolveEmbedColor(interaction.guild))
					.setDescription(
						`Start: ${resolveCurrencyEmoji({
							emoji: Emoji.AscendedCandle,
							number: start,
						})}\nGoal: ${resolveCurrencyEmoji({
							emoji: Emoji.AscendedCandle,
							number: goal,
						})}\nRequired: ${resolveCurrencyEmoji({
							emoji: Emoji.AscendedCandle,
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
					.setFooter({
						text: "This calculator derives the minimum time by assuming all statues in the Eye of Eden were gifted winged light and all shard eruptions were cleansed.",
					})
					.setTitle("Ascended Candle Calculator"),
			],
		});
	}

	public async seasonalCandles(interaction: ChatInputCommandInteraction) {
		const { options } = interaction;
		const start = options.getInteger("start", true);
		const goal = options.getInteger("goal", true);

		if (start >= goal) {
			await interaction.reply({ content: "The goal has already been achieved.", ephemeral: true });
			return;
		}

		if (await cannotUseCustomEmojis(interaction)) return;
		const today = todayDate();
		const remainingCandles = remainingSeasonalCandles();
		let seasonalCandlesLeft;
		let seasonalCandlesLeftWithSeasonPass;
		if (remainingCandles) ({ seasonalCandlesLeft, seasonalCandlesLeftWithSeasonPass } = remainingCandles);

		const amountRequired = goal - start;
		let result = 0;
		let days = 0;
		let resultWithSeasonPass = 0;
		let daysWithSeasonPass = 1;
		let includedDoubleLight = false;

		for (let day = today; result < amountRequired; day = day.add(1, "day"), days++) {
			result += SEASONAL_CANDLES_PER_DAY;
			resultWithSeasonPass += SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS;

			if (day >= doubleSeasonalLightEventStartDate && day <= doubleSeasonalLightEventEndDate) {
				includedDoubleLight = true;
				result += 1;
				resultWithSeasonPass += 1;
			}

			if (resultWithSeasonPass < amountRequired) daysWithSeasonPass++;
		}

		const resultString = `${days} day${days === 1 ? "" : "s"}`;
		const resultWithSeasonPassString = `${daysWithSeasonPass} day${daysWithSeasonPass === 1 ? "" : "s"}`;
		const emoji = resolveCurrentSeasonalCandleEmoji();

		const embed = new EmbedBuilder()
			.setColor(await resolveEmbedColor(interaction.guild))
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

		if (typeof seasonalCandlesLeft === "number" && typeof seasonalCandlesLeftWithSeasonPass === "number") {
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
		const { options } = interaction;
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
				content: "Unknown area detected. How odd? We can't do anything about this...",
				ephemeral: true,
			});

			return;
		}

		if (new Set(areas).size !== areas.length) {
			await interaction.reply({
				content: "Duplicate areas detected. Make sure to only provide unique areas!",
				ephemeral: true,
			});

			return;
		}

		const path = areas.length === 0 ? WINGED_LIGHT_AREAS : areas;
		let accumulation = wingBuffs;

		const embed = new EmbedBuilder()
			.setColor(await resolveEmbedColor(interaction.guild))
			.setDescription(
				`Started with ${resolveCurrencyEmoji({
					emoji: Emoji.WingedLight,
					number: wingBuffs,
					includeSpaceInEmoji: true,
				})}.\nReborn with ${resolveCurrencyEmoji({
					emoji: Emoji.WingedLight,
					number: (accumulation += WingedLightCount.Orbit),
					includeSpaceInEmoji: true,
				})} (+${WingedLightCount.Orbit}).`,
			)
			.setTitle("Winged Light Calculator");

		for (const area of path) {
			switch (area) {
				case Realm.IslesOfDawn:
					embed.addFields({
						name: area,
						value: `${(accumulation += WingedLightCount.IslesOfDawn)} (+${WingedLightCount.IslesOfDawn})`,
					});

					break;
				case Realm.DaylightPrairie:
					embed.addFields({
						name: area,
						value: `${(accumulation += WingedLightCount.DaylightPrairie)} (+${WingedLightCount.DaylightPrairie})`,
					});

					break;
				case Realm.HiddenForest:
					embed.addFields({
						name: area,
						value: `${(accumulation += WingedLightCount.HiddenForest)} (+${WingedLightCount.HiddenForest})`,
					});

					break;
				case Realm.ValleyOfTriumph:
					embed.addFields({
						name: area,
						value: `${(accumulation += WingedLightCount.ValleyOfTriumph)} (+${WingedLightCount.ValleyOfTriumph})`,
					});

					break;
				case Realm.GoldenWasteland:
					embed.addFields({
						name: area,
						value: `${(accumulation += WingedLightCount.GoldenWasteland)} (+${WingedLightCount.GoldenWasteland})`,
					});

					break;
				case Realm.VaultOfKnowledge:
					embed.addFields({
						name: area,
						value: `${(accumulation += WingedLightCount.VaultOfKnowledge)} (+${WingedLightCount.VaultOfKnowledge})`,
					});

					break;
				case Realm.EyeOfEden:
					embed.addFields({
						name: area,
						value: `${(accumulation += WingedLightCount.EyeOfEden)} (+${WingedLightCount.EyeOfEden})`,
					});

					break;
				case Map.AncientMemory:
					embed.addFields({
						name: area,
						value: `${(accumulation += WingedLightCount.AncientMemory)} (+${WingedLightCount.AncientMemory})`,
					});

					break;
			}
		}

		embed.addFields({
			name: "Total",
			value: `You should have ${resolveCurrencyEmoji({
				emoji: Emoji.WingedLight,
				number: accumulation,
				includeSpaceInEmoji: true,
			})}.`,
		});

		await interaction.reply({ embeds: [embed] });
	}
})();
