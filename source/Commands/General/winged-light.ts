import { ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
import { MAXIMUM_WINGED_LIGHT, WingedLightRealm } from "../../Utility/Constants.js";
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
    const realm1 = options.getString("realm-1");
    const realm2 = options.getString("realm-2");
    const realm3 = options.getString("realm-3");
    const realm4 = options.getString("realm-4");
    const realm5 = options.getString("realm-5");
    const realm6 = options.getString("realm-6");
    const realm7 = options.getString("realm-7");
    const realm8 = options.getString("realm-8");

    if ([realm1, realm2, realm3, realm4, realm5, realm6, realm7, realm8].every(realm => realm === null)) {
      // TODO: Implement realm logic.
    }

    let calculation = `Started with ${wingedLight} wing buff${wingedLight === 1 ? "" : "s"}.\n`;
    let accumulation = wingedLight;
    calculation += `Isles of Dawn: ${accumulation += WingedLightRealm.IslesOfDawn}\n`;
    calculation += `Daylight Prairie: ${accumulation += WingedLightRealm.DaylightPrairie}\n`;
    calculation += `Hidden Forest: ${accumulation += WingedLightRealm.HiddenForest}\n`;
    calculation += `Valley of Triumph: ${accumulation += WingedLightRealm.ValleyOfTriumph}\n`;
    calculation += `Golden Wasteland: ${accumulation += WingedLightRealm.GoldenWasteland}\n`;
    calculation += `Vault of Knowledge: ${accumulation += WingedLightRealm.VaultOfKnowledge}\n`;
    calculation += `Eye of Eden: ${accumulation += WingedLightRealm.EyeOfEden}\n`;
    calculation += `Orbit: ${accumulation += WingedLightRealm.Orbit}\n\n`;
    calculation += `You should have ${accumulation} winged light.`;
    await interaction.reply(calculation);
  }

  get commandData(): ApplicationCommandData {
    const realms = Object.keys(WingedLightRealm);
    const wingedLightInRealms = Object.values(WingedLightRealm).reduce((wingedLightRealm, wingedLight) => wingedLightRealm + wingedLight, 0);

    const choices = realms.map(realm => ({
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
          minValue: 0
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
