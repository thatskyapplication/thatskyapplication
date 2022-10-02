import type { ApplicationCommandData, ChatInputCommandInteraction } from "discord.js";
import { ApplicationCommandOptionType, ApplicationCommandType, EmbedBuilder } from "discord.js";
import { MAXIMUM_WINGED_LIGHT, Realm, RealmString, WingedLightCount } from "../../Utility/Constants.js";
import { isRealm, notNull } from "../../Utility/Utility.js";
import type { ChatInputCommand } from "../index.js";

export default class implements ChatInputCommand {
	public readonly name = "winged-light";

	public readonly type = ApplicationCommandType.ChatInput;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { options } = interaction;
		const wingedLight = options.getInteger("winged-light", true);
		const realm1 = options.getInteger("realm-1");
		const realm2 = options.getInteger("realm-2");
		const realm3 = options.getInteger("realm-3");
		const realm4 = options.getInteger("realm-4");
		const realm5 = options.getInteger("realm-5");
		const realm6 = options.getInteger("realm-6");
		const realm7 = options.getInteger("realm-7");
		const realm8 = options.getInteger("realm-8");
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
						name: RealmString.IslesOfDawn,
						value: `${accumulation += WingedLightCount.IslesOfDawn} (+${WingedLightCount.IslesOfDawn})`,
					});

					break;
				case Realm.DaylightPrairie:
					embed.addFields({
						name: RealmString.DaylightPrairie,
						value: `${accumulation += WingedLightCount.DaylightPrairie} (+${WingedLightCount.DaylightPrairie})`,
					});

					break;
				case Realm.HiddenForest:
					embed.addFields({
						name: RealmString.HiddenForest,
						value: `${accumulation += WingedLightCount.HiddenForest} (+${WingedLightCount.HiddenForest})`,
					});

					break;
				case Realm.ValleyOfTriumph:
					embed.addFields({
						name: RealmString.ValleyOfTriumph,
						value: `${accumulation += WingedLightCount.ValleyOfTriumph} (+${WingedLightCount.ValleyOfTriumph})`,
					});

					break;
				case Realm.GoldenWasteland:
					embed.addFields({
						name: RealmString.GoldenWasteland,
						value: `${accumulation += WingedLightCount.GoldenWasteland} (+${WingedLightCount.GoldenWasteland})`,
					});

					break;
				case Realm.VaultOfKnowledge:
					embed.addFields({
						name: RealmString.VaultOfKnowledge,
						value: `${accumulation += WingedLightCount.VaultOfKnowledge} (+${WingedLightCount.VaultOfKnowledge})`,
					});

					break;
				case Realm.EyeOfEden:
					embed.addFields({
						name: RealmString.EyeOfEden,
						value: `${accumulation += WingedLightCount.EyeOfEden} (+${WingedLightCount.EyeOfEden})`,
					});

					break;
				case Realm.AncientMemory:
					embed.addFields({
						name: RealmString.AncientMemory,
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

		const choices = Object.values(RealmString).map((realm, No) => ({
			name: realm,
			value: No,
		}));

		return {
			name: this.name,
			description: "Calculates how much winged light one should possess.",
			type: this.type,
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
					type: ApplicationCommandOptionType.Integer,
					name: "realm-1",
					description: "The first realm to calculate winged light from.",
					choices,
				},
				{
					type: ApplicationCommandOptionType.Integer,
					name: "realm-2",
					description: "The second realm to calculate winged light from.",
					choices,
				},
				{
					type: ApplicationCommandOptionType.Integer,
					name: "realm-3",
					description: "The third realm to calculate winged light from.",
					choices,
				},
				{
					type: ApplicationCommandOptionType.Integer,
					name: "realm-4",
					description: "The fourth realm to calculate winged light from.",
					choices,
				},
				{
					type: ApplicationCommandOptionType.Integer,
					name: "realm-5",
					description: "The fifth realm to calculate winged light from.",
					choices,
				},
				{
					type: ApplicationCommandOptionType.Integer,
					name: "realm-6",
					description: "The sixth realm to calculate winged light from.",
					choices,
				},
				{
					type: ApplicationCommandOptionType.Integer,
					name: "realm-7",
					description: "The seventh realm to calculate winged light from.",
					choices,
				},
				{
					type: ApplicationCommandOptionType.Integer,
					name: "realm-8",
					description: "The eighth realm to calculate winged light from.",
					choices,
				},
			],
		};
	}
}
