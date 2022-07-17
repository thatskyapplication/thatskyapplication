import { ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
import { MAXIMUM_WINGED_LIGHT, Realm, WingedLightRealm } from "../../Utility/Constants.js";
import type { Command } from "../index.js";

export default class implements Command {
  readonly name = "winged-light";
  readonly type = ApplicationCommandType.ChatInput;

  async handle(interaction: ChatInputCommandInteraction): Promise<void> {
    return await this.execute(interaction);
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const { options } = interaction;
    const wingedLight = options.getInteger("winged-light", true);
    const realm1 = options.getString("realm-1") as Realm | null;
    const realm2 = options.getString("realm-2") as Realm | null;
    const realm3 = options.getString("realm-3") as Realm | null;
    const realm4 = options.getString("realm-4") as Realm | null;
    const realm5 = options.getString("realm-5") as Realm | null;
    const realm6 = options.getString("realm-6") as Realm | null;
    const realm7 = options.getString("realm-7") as Realm | null;
    const realm8 = options.getString("realm-8") as Realm | null;
    const realms = [realm1, realm2, realm3, realm4, realm5, realm6, realm7, realm8];
    const realmsFiltered = realms.filter(Boolean) as Realm[];
    if (realms.some(realm => realm !== null) && new Set(realmsFiltered).size !== realmsFiltered.length) return void await interaction.reply("Duplicate realms detected. Make sure to only provide unique realms!");
    const path = (realmsFiltered.length === 0 ? Object.values(Realm) : realmsFiltered);
    let calculation = `Started with ${wingedLight} wing buff${wingedLight === 1 ? "" : "s"}.\n`;
    let accumulation = wingedLight;

    for (const realm of path) {
      switch (realm) {
        case Realm.IslesOfDawn:
          calculation += `Isles of Dawn: ${accumulation += WingedLightRealm.IslesOfDawn}\n`;
          break;
        case Realm.DaylightPrairie:
          calculation += `Daylight Prairie: ${accumulation += WingedLightRealm.DaylightPrairie}\n`;
          break;
        case Realm.HiddenForest:
          calculation += `Hidden Forest: ${accumulation += WingedLightRealm.HiddenForest}\n`;
          break;
        case Realm.ValleyOfTriumph:
          calculation += `Valley of Triumph: ${accumulation += WingedLightRealm.ValleyOfTriumph}\n`;
          break;
        case Realm.GoldenWasteland:
          calculation += `Golden Wasteland: ${accumulation += WingedLightRealm.GoldenWasteland}\n`;
          break;
        case Realm.VaultOfKnowledge:
          calculation += `Vault of Knowledge: ${accumulation += WingedLightRealm.VaultOfKnowledge}\n`;
          break;
        case Realm.EyeOfEden:
          calculation += `Eye of Eden: ${accumulation += WingedLightRealm.EyeOfEden}\n`;
          break;
        case Realm.Orbit:
          calculation += `Orbit: ${accumulation += WingedLightRealm.Orbit}\n`;
          break;
      }
    }

    calculation += `You should have ${accumulation} winged light.`;
    await interaction.reply(calculation);
  }

  get commandData(): ApplicationCommandData {
    const wingedLightInRealms = Object.values(WingedLightRealm).reduce((wingedLightRealm, wingedLight) => wingedLightRealm + wingedLight, 0);

    const choices = Object.values(Realm).map(realm => ({
      name: realm,
      value: realm
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
          required: true
        },
        {
          type: ApplicationCommandOptionType.String,
          name: "realm-1",
          description: "The first realm to calculate winged light from.",
          choices
        },
        {
          type: ApplicationCommandOptionType.String,
          name: "realm-2",
          description: "The second realm to calculate winged light from.",
          choices
        },
        {
          type: ApplicationCommandOptionType.String,
          name: "realm-3",
          description: "The third realm to calculate winged light from.",
          choices
        },
        {
          type: ApplicationCommandOptionType.String,
          name: "realm-4",
          description: "The fourth realm to calculate winged light from.",
          choices
        },
        {
          type: ApplicationCommandOptionType.String,
          name: "realm-5",
          description: "The fifth realm to calculate winged light from.",
          choices
        },
        {
          type: ApplicationCommandOptionType.String,
          name: "realm-6",
          description: "The sixth realm to calculate winged light from.",
          choices
        },
        {
          type: ApplicationCommandOptionType.String,
          name: "realm-7",
          description: "The seventh realm to calculate winged light from.",
          choices
        },
        {
          type: ApplicationCommandOptionType.String,
          name: "realm-8",
          description: "The eight realm to calculate winged light from.",
          choices
        }
      ]
    };
  }
}
