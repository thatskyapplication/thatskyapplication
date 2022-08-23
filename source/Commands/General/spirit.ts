import { ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, AutocompleteInteraction, ChatInputCommandInteraction, EmbedBuilder, formatEmoji } from "discord.js";
import Spirits from "../../Structures/Spirit.js";
import { Emoji } from "../../Utility/Constants.js";
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
        value: realmToString(spirit.realm, interaction.locale),
        inline: true
      },
      {
        name: "Season",
        value: spirit.isSeasonalSpirit() ? `${formatEmoji(spirit.season.emoji)} ${spirit.season.name}` : "None",
        inline: true
      },
      {
        name: "Offer",
        value: spirit.offer === null ? "Unknown" : `${formatEmoji(Emoji.Candle)}${spirit.offer.candles} ${formatEmoji(Emoji.Heart)}${spirit.offer.hearts} ${formatEmoji(Emoji.AscendedCandle)}${spirit.offer.ascendedCandles}`,
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
      return name.toUpperCase().startsWith(focused) || keywords.some(keyword => keyword.toUpperCase() === focused) || expression?.toUpperCase().startsWith(focused) || stance?.toUpperCase().startsWith(focused) || call?.toUpperCase().startsWith(focused) || seasonName?.startsWith(focused);
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
