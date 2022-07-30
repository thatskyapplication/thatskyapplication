import { ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, AutocompleteInteraction, ChatInputCommandInteraction, EmbedBuilder, Formatters } from "discord.js";
import Spirits from "../../Client/Spirit.js";
import type { AutocompleteCommand } from "../index.js";

export default class implements AutocompleteCommand {
  readonly name = "spirit";
  readonly type = ApplicationCommandType.ChatInput;

  async handle(interaction: ChatInputCommandInteraction): Promise<void> {
    return await this.execute(interaction);
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
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
      embed.setDescription("⚠️ This spirit has not yet returned.");
    } else {
      files.push({ attachment: spirit.attachment, name: `${spiritAttachmentName}.webp` });
    }

    embed.setImage(`attachment://${spiritAttachmentName}.webp`);
    embed.setTitle(`${Formatters.formatEmoji(spirit.season.emoji)} ${spirit.name}`);
    embed.setURL(spirit.url);
    await interaction.reply({ embeds: [embed], files });
  }

  async autocomplete(interaction: AutocompleteInteraction): Promise<void> {
    const focused = interaction.options.getFocused().toUpperCase();

    await interaction.respond(focused === "" ? [] : Spirits.filter(({ name, season, expression, stance, call }) => {
      return name.toUpperCase().startsWith(focused) || expression?.toUpperCase().startsWith(focused) || stance?.toUpperCase().startsWith(focused) || call?.toUpperCase().startsWith(focused) || season.name.toUpperCase().startsWith(focused);
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
