import { ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, EmbedBuilder, formatEmoji } from "discord.js";
import { Emoji, MAXIMUM_WINGED_LIGHT, Realm, WingedLightCount } from "../../Utility/Constants.js";
import type { ChatInputCommand } from "../index.js";

export default class implements ChatInputCommand {
  readonly name = "winged-light";
  readonly type = ApplicationCommandType.ChatInput;

  async chatInput(interaction: ChatInputCommandInteraction): Promise<void> {
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
    let accumulation = wingedLight;
    const me = await interaction.guild?.members.fetchMe();
    const embed = new EmbedBuilder();
    embed.setColor(me?.displayColor ?? 0);
    embed.setDescription(`Started with ${wingedLight} wing buff${wingedLight === 1 ? "" : "s"}.\nReborn with ${accumulation += WingedLightCount.Orbit} winged light (+${WingedLightCount.Orbit}).`);

    for (const realm of path) {
      switch (realm) {
        case Realm.IslesOfDawn:
          embed.addFields({ name: "Isles of Dawn", value: `${accumulation += WingedLightCount.IslesOfDawn} (+${WingedLightCount.IslesOfDawn})` });
          break;
        case Realm.DaylightPrairie:
          embed.addFields({ name: "Daylight Prairie", value: `${accumulation += WingedLightCount.DaylightPrairie} (+${WingedLightCount.DaylightPrairie})` });
          break;
        case Realm.HiddenForest:
          embed.addFields({ name: "Hidden Forest", value: `${accumulation += WingedLightCount.HiddenForest} (+${WingedLightCount.HiddenForest})` });
          break;
        case Realm.ValleyOfTriumph:
          embed.addFields({ name: "Valley of Triumph", value: `${accumulation += WingedLightCount.ValleyOfTriumph} (+${WingedLightCount.ValleyOfTriumph})` });
          break;
        case Realm.GoldenWasteland:
          embed.addFields({ name: "Golden Wasteland", value: `${accumulation += WingedLightCount.GoldenWasteland} (+${WingedLightCount.GoldenWasteland})` });
          break;
        case Realm.VaultOfKnowledge:
          embed.addFields({ name: "Vault of Knowledge", value: `${accumulation += WingedLightCount.VaultOfKnowledge} (+${WingedLightCount.VaultOfKnowledge})` });
          break;
        case Realm.EyeOfEden:
          embed.addFields({ name: "Eye of Eden", value: `${accumulation += WingedLightCount.EyeOfEden} (+${WingedLightCount.EyeOfEden})` });
          break;
        case Realm.AncientMemory:
          embed.addFields({ name: "Ancient Memory", value: `${accumulation += WingedLightCount.AncientMemory} (+${WingedLightCount.AncientMemory})` });
          break;
      }
    }

    embed.addFields({ name: "Total", value: `${formatEmoji(Emoji.SkyGiveLight)} You should have ${accumulation} winged light.` });
    await interaction.reply({ embeds: [embed] });
  }

  get commandData(): ApplicationCommandData {
    const wingedLightInRealms = Object.values(WingedLightCount).reduce((wingedLightCount, wingedLight) => wingedLightCount + wingedLight, 0);

    const choices = Object.values(Realm).map(realm => ({
      name: realm,
      value: realm
    }));

    return {
      name: this.name,
      nameLocalizations: {
        "en-GB": this.name,
        "en-US": this.name,
        "es-ES": "luz-alada"
      },
      description: "Calculates how much winged light one should possess.",
      descriptionLocalizations: {
        "en-GB": this.name,
        "en-US": this.name,
        "es-ES": "Calcula cuántas luces aladas debería poseer alguien."
      },
      type: this.type,
      options: [
        {
          type: ApplicationCommandOptionType.Integer,
          name: "winged-light",
          nameLocalizations: {
            "en-GB": "winged-light",
            "en-US": "winged-light",
            "es-ES": "luz-alada"
          },
          description: "The winged light one has after death in Eden, before being reborn.",
          descriptionLocalizations: {
            "en-GB": "The winged light one has after death in Eden, before being reborn.",
            "en-US": "The winged light one has after death in Eden, before being reborn.",
            "es-ES": "La luz alada que alguien tiene después de morir en Edén, antes de renacer"
          },
          maxValue: MAXIMUM_WINGED_LIGHT - wingedLightInRealms,
          minValue: 0,
          required: true
        },
        {
          type: ApplicationCommandOptionType.String,
          name: "realm-1",
          nameLocalizations: {
            "en-GB": "realm-1",
            "en-US": "realm-1",
            "es-ES": "reino-1"
          },
          description: "The first realm to calculate winged light from.",
          descriptionLocalizations: {
            "en-GB": "The first realm to calculate winged light from.",
            "en-US": "The first realm to calculate winged light from.",
            "es-ES": "El primer reino a partir del cual calculamos la luz alada"
          },
          choices
        },
        {
          type: ApplicationCommandOptionType.String,
          name: "realm-2",
          nameLocalizations: {
            "en-GB": "realm-2",
            "en-US": "realm-2",
            "es-ES": "reino-2"
          },
          description: "The second realm to calculate winged light from.",
          descriptionLocalizations: {
            "en-GB": "The second realm to calculate winged light from.",
            "en-US": "The second realm to calculate winged light from.",
            "es-ES": "El segundo reino a partir del cual calculamos la luz alada"
          },
          choices
        },
        {
          type: ApplicationCommandOptionType.String,
          name: "realm-3",
          nameLocalizations: {
            "en-GB": "realm-3",
            "en-US": "realm-3",
            "es-ES": "reino-3"
          },
          description: "The third realm to calculate winged light from.",
          descriptionLocalizations: {
            "en-GB": "The third realm to calculate winged light from.",
            "en-US": "The third realm to calculate winged light from.",
            "es-ES": "El tercer reino a partir del cual calculamos la luz alada"
          },
          choices
        },
        {
          type: ApplicationCommandOptionType.String,
          name: "realm-4",
          nameLocalizations: {
            "en-GB": "realm-4",
            "en-US": "realm-4",
            "es-ES": "reino-4"
          },
          description: "The fourth realm to calculate winged light from.",
          descriptionLocalizations: {
            "en-GB": "The fourth realm to calculate winged light from.",
            "en-US": "The fourth realm to calculate winged light from.",
            "es-ES": "El cuarto reino a partir del cual calculamos la luz alada"
          },
          choices
        },
        {
          type: ApplicationCommandOptionType.String,
          name: "realm-5",
          nameLocalizations: {
            "en-GB": "realm-5",
            "en-US": "realm-5",
            "es-ES": "reino-5"
          },
          description: "The fifth realm to calculate winged light from.",
          descriptionLocalizations: {
            "en-GB": "The fifth realm to calculate winged light from.",
            "en-US": "The fifth realm to calculate winged light from.",
            "es-ES": "El quinto reino a partir del cual calculamos la luz alada"
          },
          choices
        },
        {
          type: ApplicationCommandOptionType.String,
          name: "realm-6",
          nameLocalizations: {
            "en-GB": "realm-6",
            "en-US": "realm-6",
            "es-ES": "reino-6"
          },
          description: "The sixth realm to calculate winged light from.",
          descriptionLocalizations: {
            "en-GB": "The sixth realm to calculate winged light from.",
            "en-US": "The sixth realm to calculate winged light from.",
            "es-ES": "El sexto reino a partir del cual calculamos la luz alada"
          },
          choices
        },
        {
          type: ApplicationCommandOptionType.String,
          name: "realm-7",
          nameLocalizations: {
            "en-GB": "realm-7",
            "en-US": "realm-7",
            "es-ES": "reino-7"
          },
          description: "The seventh realm to calculate winged light from.",
          descriptionLocalizations: {
            "en-GB": "The seventh realm to calculate winged light from.",
            "en-US": "The seventh realm to calculate winged light from.",
            "es-ES": "El séptimo reino a partir del cual calculamos la luz alada"
          },
          choices
        },
        {
          type: ApplicationCommandOptionType.String,
          name: "realm-8",
          nameLocalizations: {
            "en-GB": "realm-8",
            "en-US": "realm-8",
            "es-ES": "reino-8"
          },
          description: "The eighth realm to calculate winged light from.",
          descriptionLocalizations: {
            "en-GB": "The eighth realm to calculate winged light from.",
            "en-US": "The eighth realm to calculate winged light from.",
            "es-ES": "El octavo reino a partir del cual calculamos la luz alada"
          },
          choices
        }
      ]
    };
  }
}
