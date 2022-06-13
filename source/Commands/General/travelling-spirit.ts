import { ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, AutocompleteInteraction, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import Caelus from "../../Client/Client.js";
import { travellingSpirits } from "../../Utility/Constants.js";
import type { AutocompleteCommand } from "../index.js";

const travellingSpiritsValues = Object.values(travellingSpirits);

export default class implements AutocompleteCommand {
  readonly name = "travelling-spirit";
  readonly type = ApplicationCommandType.ChatInput;

  async handle(interaction: ChatInputCommandInteraction<"cached">): Promise<void> {
    return await this.execute(interaction);
  }

  async execute(interaction: ChatInputCommandInteraction<"cached">): Promise<void> {
    const name = interaction.options.getString("name", true);
    const travellingSpirit = travellingSpiritsValues.find(travellingSpirit => travellingSpirit.name === name);

    if (!travellingSpirit) {
      await interaction.reply({
        content: "Woah, it seems we have not encountered that Travelling Spirit yet. How strange!",
        ephemeral: true
      });

      return;
    }

    const embed = new EmbedBuilder();
    embed.setColor((await interaction.guild.members.fetch(Caelus.user.id)).displayColor);
    embed.setImage(travellingSpirit.image);
    embed.setTitle(name);
    embed.setURL(travellingSpirit.url);
    await interaction.reply({ embeds: [embed], ephemeral: true });
  }

  async autocomplete(interaction: AutocompleteInteraction<"cached">): Promise<void> {
    const focused = interaction.options.getFocused();

    await interaction.respond(travellingSpiritsValues.filter(({ name, season }) => {
      // @ts-expect-error `focused` should only be a string. The type is incorrect.
      return name.toUpperCase().startsWith(focused.toUpperCase()) || season.toUpperCase().startsWith(focused.toUpperCase());
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
          description: "The name of the Travelling Spirit.",
          required: true,
          autocomplete: true
        }
      ]
    };
  }
}
