import { ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, AutocompleteInteraction, ChatInputCommandInteraction, EmbedBuilder, formatEmoji } from "discord.js";
import Caelus from "../../Client/Client.js";
import { travellingSpirits } from "../../Utility/Constants.js";
import type { AutocompleteCommand } from "../index.js";

const travellingSpiritsValues = Object.values(travellingSpirits);

export default class implements AutocompleteCommand {
  readonly name = "travelling-spirit";
  readonly type = ApplicationCommandType.ChatInput;

  async handle(interaction: ChatInputCommandInteraction): Promise<void> {
    return await this.execute(interaction);
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const name = interaction.options.getString("name", true);
    const travellingSpirit = travellingSpiritsValues.find(travellingSpirit => travellingSpirit.name === name);

    if (!travellingSpirit) {
      await interaction.reply({
        content: "Woah, it seems we have not encountered that Travelling Spirit yet. How strange!",
        ephemeral: true
      });

      return;
    }

    const me = await interaction.guild?.members.fetch(Caelus.user.id);
    const embed = new EmbedBuilder();
    embed.setColor(me?.displayColor ?? 0);
    embed.setImage(`${travellingSpirit.image}?cb=${Date.now()}`);
    embed.setTitle(`${formatEmoji(travellingSpirit.season.emoji)} ${name}`);
    embed.setURL(travellingSpirit.url);
    await interaction.reply({ embeds: [embed] });
  }

  async autocomplete(interaction: AutocompleteInteraction): Promise<void> {
    const focused = interaction.options.getFocused().toUpperCase();

    await interaction.respond(travellingSpiritsValues.filter(({ name, season, expression, stance, call }) => {
      return name.toUpperCase().startsWith(focused) || expression?.toUpperCase().startsWith(focused) || stance?.toUpperCase().startsWith(focused) || call?.toUpperCase().startsWith(focused) || season.name.toUpperCase().startsWith(focused);
    }).map(({ name }) => ({ name, value: name })));
  }

  get commandData(): ApplicationCommandData {
    return {
      name: this.name,
      description: "Returns the friendship tree of a Travelling Spirit.",
      type: this.type,
      options: [
        {
          type: ApplicationCommandOptionType.String,
          name: "name",
          description: "The name, season, expression, stance or call of the Travelling Spirit.",
          required: true,
          autocomplete: true
        }
      ]
    };
  }
}
