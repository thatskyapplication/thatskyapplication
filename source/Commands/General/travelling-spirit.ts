import { EmbedBuilder } from "@discordjs/builders";
import { ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
import Caelus from "../../Client/Client.js";
import { travellingSpirits } from "../../Utility/Constants.js";
import type { Command } from "../index.js";

export default class implements Command {
  readonly name = "travelling-spirit";
  readonly type = ApplicationCommandType.ChatInput;

  async handle(interaction: ChatInputCommandInteraction<"cached">): Promise<void> {
    return await this.execute(interaction);
  }

  async execute(interaction: ChatInputCommandInteraction<"cached">): Promise<void> {
    const name = interaction.options.getString("name", true);
    const embed = new EmbedBuilder();

    switch (name) {
      case "Sassy Drifter":
        embed.setImage(travellingSpirits.sassyDrifter.image);
        embed.setURL(travellingSpirits.sassyDrifter.url);
        break;
      case "Stretching Guru":
        embed.setImage(travellingSpirits.stretchingGuru.image);
        embed.setURL(travellingSpirits.stretchingGuru.url);
        break;
      default:
        await interaction.reply({ content: "Woah, it seems we have not encountered that Travelling Spirit yet. How strange!" });
        Caelus.log(`Encountered \`${name}\` as a Travelling Spirit, but had no record of it.`);
        return;
    }

    embed.setColor((await interaction.guild.members.fetch(Caelus.user.id)).displayColor);
    embed.setTitle(name);
    await interaction.reply({ embeds: [embed], ephemeral: true });
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
          choices: [
            {
              name: "Sassy Drifter",
              value: "Sassy Drifter"
            },
            {
              name: "Stretching Guru",
              value: "Stretching Guru"
            }
          ]
        }
      ]
    };
  }
}
