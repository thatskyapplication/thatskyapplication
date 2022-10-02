import { ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, AutocompleteInteraction, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import Spirits from "../../Structures/Spirit.js";
import { realmToString } from "../../Utility/Utility.js";
import type { AutocompleteCommand } from "../index.js";

export default class implements AutocompleteCommand {
  readonly name = "spirit";
  readonly type = ApplicationCommandType.ChatInput;

  async chatInput(interaction: ChatInputCommandInteraction): Promise<void> {
    const query = interaction.options.getString("query", true);
    const spirit = Spirits.find(({ name }) => name === query);

    if (!spirit) {
      return void await interaction.reply({
        content: "Woah, it seems we have not encountered that spirit yet. How strange!",
        ephemeral: true
      });
    }

    const me = await interaction.guild?.members.fetchMe();
    const spiritAttachmentName = spirit.name.replaceAll(" ", "_");
    const files = [];
    const embed = new EmbedBuilder();
    embed.setColor(me?.displayColor ?? 0);

    if (spirit.attachment === null) {
      if (spirit.isSeasonalSpirit()) embed.setDescription("⚠️ This spirit has not yet returned.");
    } else {
      files.push({ attachment: spirit.attachment, name: `${spiritAttachmentName}.webp` });
    }

    embed.setFields(
      {
        name: "Realm",
        value: realmToString(spirit.realm),
        inline: true
      },
      {
        name: "Season",
        value: spirit.isSeasonalSpirit() ? spirit.season.name : "None",
        inline: true
      },
      {
        name: "Offer",
        value: spirit.offer === null ? "Unknown" : `${spirit.offer.candles} candle${spirit.offer.candles > 1 ? "s" : ""}\n${spirit.offer.hearts} heart${spirit.offer.hearts > 1 ? "s" : ""}\n${spirit.offer.ascendedCandles} ascended candle${spirit.offer.ascendedCandles > 1 ? "s" : ""}`,
        inline: true
      },
      {
        name: "Expression",
        value: spirit.expression ?? "None",
        inline: true
      },
      {
        name: "Stance",
        value: spirit.stance ?? "None",
        inline: true
      },
      {
        name: "Call",
        value: spirit.call ?? "None",
        inline: true
      }
    );

    embed.setImage(`attachment://${spiritAttachmentName}.webp`);
    embed.setTitle(spirit.name);
    embed.setURL(spirit.url);
    await interaction.reply({ embeds: [embed], files });
  }

  async autocomplete(interaction: AutocompleteInteraction): Promise<void> {
    const focused = interaction.options.getFocused().toUpperCase();

    await interaction.respond(focused === "" ? [] : Spirits.filter(spirit => {
      const { name, keywords, expression, stance, call } = spirit;
      const seasonName = spirit.isSeasonalSpirit() ? spirit.season.name.toUpperCase() : null;
      return name.toUpperCase().includes(focused) || keywords.some(keyword => keyword.toUpperCase().includes(focused)) || expression?.toUpperCase().includes(focused) || stance?.toUpperCase().includes(focused) || call?.toUpperCase().includes(focused) || seasonName?.includes(focused);
    }).map(({ name }) => ({ name, value: name })).slice(0, 25));
  }

  get commandData(): ApplicationCommandData {
    return {
      name: this.name,
      description: "Returns the friendship tree of a spirit.",
      type: this.type,
      options: [
        {
          type: ApplicationCommandOptionType.String,
          name: "query",
          description: "The name, season, expression, stance or call of the spirit.",
          required: true,
          autocomplete: true
        }
      ]
    };
  }
}
