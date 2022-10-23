import type { ApplicationCommandData, ChatInputCommandInteraction } from "discord.js";
import { ApplicationCommandOptionType, ApplicationCommandType, EmbedBuilder } from "discord.js";
import { MAXIMUM_WINGED_LIGHT, Realm, SEASONAL_CANDLES_PER_DAY, SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS, WingedLightCount } from "../../Utility/Constants.js";
import { isRealm, notNull } from "../../Utility/Utility.js";
import type { ChatInputCommand } from "../index.js";

export default class implements ChatInputCommand {
	public readonly name = "calculate";

	public readonly type = ApplicationCommandType.ChatInput;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "seasonal-candle":
				await this.seasonalCandles(interaction);
				return;
			case "winged-light":
				await this.wingedLight(interaction);
		}
	}

	public async seasonalCandles(interaction: ChatInputCommandInteraction) {
		const { options } = interaction;
		const start = options.getInteger("start", true);
		const goal = options.getInteger("goal", true);

		if (start >= goal) {
			await interaction.reply({
				content: "The goal has already been achieved.",
				ephemeral: true,
			});

			return;
		}

		const amountRequired = goal - start;
		const amountRequiredString = `${amountRequired} seasonal candle${amountRequired === 1 ? "" : "s"}`;
		const resultWithoutSeasonPass = Math.ceil(amountRequired / SEASONAL_CANDLES_PER_DAY);
		const resultWithoutSeasonPassString = `${resultWithoutSeasonPass} day${resultWithoutSeasonPass === 1 ? "" : "s"}`;
		const resultWithSeasonPass = Math.ceil(amountRequired / SEASONAL_CANDLES_PER_DAY_WITH_SEASON_PASS);
		const resultWithSeasonPassString = `${resultWithSeasonPass} day${resultWithSeasonPass === 1 ? "" : "s"}`;
		await interaction.reply(`Start: ${start}\nGoal: ${goal}\n\nIt would take ${resultWithoutSeasonPassString} to receive ${amountRequiredString}.\nWith a Season Pass, it would take ${resultWithSeasonPassString} to receive ${amountRequiredString}.`);
	}

	public async wingedLight(interaction: ChatInputCommandInteraction) {
		const { options } = interaction;
		const wingedLight = options.getInteger("winged-light", true);
		const realm1 = options.getString("realm-1");
		const realm2 = options.getString("realm-2");
		const realm3 = options.getString("realm-3");
		const realm4 = options.getString("realm-4");
		const realm5 = options.getString("realm-5");
		const realm6 = options.getString("realm-6");
		const realm7 = options.getString("realm-7");
		const realm8 = options.getString("realm-8");
		const realms = [realm1, realm2, realm3, realm4, realm5, realm6, realm7, realm8].filter(notNull);

		if (!realms.every(isRealm)) {
			void interaction.client.log("Received an unknown realm.", realms);
			await interaction.reply("Unknown realm detected. How odd? We can't do anything about this...");
			return;
		}

		if (new Set(realms).size !== realms.length) {
			await interaction.reply("Duplicate realms detected. Make sure to only provide unique realms!");
			return;
		}

		const path = realms.length === 0 ? Object.values(Realm) : realms;
		let accumulation = wingedLight;
		const me = await interaction.guild?.members.fetchMe();
		const embed = new EmbedBuilder();
		embed.setColor(me?.displayColor ?? 0);
		embed.setDescription(`Started with ${wingedLight} wing buff${wingedLight === 1 ? "" : "s"}.\nReborn with ${accumulation += WingedLightCount.Orbit} winged light (+${WingedLightCount.Orbit}).`);

		for (const realm of path) {
			switch (realm) {
				case Realm.IslesOfDawn:
					embed.addFields({
						name: realm,
						value: `${accumulation += WingedLightCount.IslesOfDawn} (+${WingedLightCount.IslesOfDawn})`,
					});

					break;
				case Realm.DaylightPrairie:
					embed.addFields({
						name: Realm.DaylightPrairie,
						value: `${accumulation += WingedLightCount.DaylightPrairie} (+${WingedLightCount.DaylightPrairie})`,
					});

					break;
				case Realm.HiddenForest:
					embed.addFields({
						name: realm,
						value: `${accumulation += WingedLightCount.HiddenForest} (+${WingedLightCount.HiddenForest})`,
					});

					break;
				case Realm.ValleyOfTriumph:
					embed.addFields({
						name: realm,
						value: `${accumulation += WingedLightCount.ValleyOfTriumph} (+${WingedLightCount.ValleyOfTriumph})`,
					});

					break;
				case Realm.GoldenWasteland:
					embed.addFields({
						name: realm,
						value: `${accumulation += WingedLightCount.GoldenWasteland} (+${WingedLightCount.GoldenWasteland})`,
					});

					break;
				case Realm.VaultOfKnowledge:
					embed.addFields({
						name: realm,
						value: `${accumulation += WingedLightCount.VaultOfKnowledge} (+${WingedLightCount.VaultOfKnowledge})`,
					});

					break;
				case Realm.EyeOfEden:
					embed.addFields({
						name: realm,
						value: `${accumulation += WingedLightCount.EyeOfEden} (+${WingedLightCount.EyeOfEden})`,
					});

					break;
				case Realm.AncientMemory:
					embed.addFields({
						name: realm,
						value: `${accumulation += WingedLightCount.AncientMemory} (+${WingedLightCount.AncientMemory})`,
					});

					break;
			}
		}

		embed.addFields({
			name: "Total",
			value: `You should have ${accumulation} winged light.`,
		});

		await interaction.reply({ embeds: [embed] });
	}

	public get commandData(): ApplicationCommandData {
		const wingedLightInRealms = Object.values(WingedLightCount).reduce((wingedLightCount, wingedLight) => wingedLightCount + wingedLight, 0);

		const choices = Object.values(Realm).map((realm) => ({
			name: realm,
			value: realm,
		}));

		return {
			name: this.name,
			description: "The command containing various calculators.",
			type: this.type,
			options: [
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "seasonal-candles",
					description: "A calculator for seasonal candles.",
					options: [
						{
							type: ApplicationCommandOptionType.Integer,
							name: "start",
							description: "The starting number of seasonal candles.",
							minValue: 0,
							required: true,
						},
						{
							type: ApplicationCommandOptionType.Integer,
							name: "goal",
							description: "The desired number of seasonal candles.",
							minValue: 0,
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
							name: "winged-light",
							description: "The winged light one has after death in Eden, before being reborn.",
							maxValue: MAXIMUM_WINGED_LIGHT - wingedLightInRealms,
							minValue: 0,
							required: true,
						},
						{
							type: ApplicationCommandOptionType.String,
							name: "realm-1",
							description: "The first realm to calculate winged light from.",
							choices,
						},
						{
							type: ApplicationCommandOptionType.String,
							name: "realm-2",
							description: "The second realm to calculate winged light from.",
							choices,
						},
						{
							type: ApplicationCommandOptionType.String,
							name: "realm-3",
							description: "The third realm to calculate winged light from.",
							choices,
						},
						{
							type: ApplicationCommandOptionType.String,
							name: "realm-4",
							description: "The fourth realm to calculate winged light from.",
							choices,
						},
						{
							type: ApplicationCommandOptionType.String,
							name: "realm-5",
							description: "The fifth realm to calculate winged light from.",
							choices,
						},
						{
							type: ApplicationCommandOptionType.String,
							name: "realm-6",
							description: "The sixth realm to calculate winged light from.",
							choices,
						},
						{
							type: ApplicationCommandOptionType.String,
							name: "realm-7",
							description: "The seventh realm to calculate winged light from.",
							choices,
						},
						{
							type: ApplicationCommandOptionType.String,
							name: "realm-8",
							description: "The eighth realm to calculate winged light from.",
							choices,
						},
					],
				},
			],
		};
	}
}
