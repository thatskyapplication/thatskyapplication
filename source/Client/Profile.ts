import { ChatInputCommandInteraction, Collection, EmbedBuilder, ModalSubmitInteraction } from "discord.js";
import { Maria } from "../Client/Client.js";
import { SKY_PROFILE_TEXT_INPUT_DESCRIPTION } from "../Commands/General/sky-profile.js";

interface ProfileData {
  No: number;
  "User ID": string;
  Description: string | null;
}

export default class Profile {
  static readonly cache = new Collection<number, Profile>();
  readonly No: ProfileData["No"];
  readonly userId: ProfileData["User ID"];
  readonly description: ProfileData["Description"];

  constructor(notification: ProfileData) {
    this.No = notification.No;
    this.userId = notification["User ID"];
    this.description = notification.Description;
  }

  static async set(interaction: ModalSubmitInteraction): Promise<void> {
    let profile = this.cache.find(({ userId }) => userId === interaction.user.id);
    const description = interaction.fields.getTextInputValue(SKY_PROFILE_TEXT_INPUT_DESCRIPTION).trim();

    if (profile) {
      await Maria.query("UPDATE `Profiles` SET `Description` = ? WHERE `No` = ?;", [
        description,
        profile.No
      ]);
    } else {
      const { insertId } = await Maria.query("INSERT INTO `Profiles` SET `User ID` = ?, `Description` = ?;", [
        interaction.user.id,
        description
      ]);

      profile = new this({
        No: insertId,
        "User ID": interaction.user.id,
        Description: description
      });

      this.cache.set(profile.No, profile);
    }

    await interaction.reply({
      content: "Your profile has been updated!",
      ephemeral: true
    });
  }

  async show(interaction: ChatInputCommandInteraction): Promise<EmbedBuilder> {
    const embed = new EmbedBuilder();
    const me = await interaction.guild?.members.fetchMe();
    embed.setColor(me?.displayColor ?? 0);
    embed.setDescription(this.description);
    return embed;
  }
}
