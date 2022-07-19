import { ChatInputCommandInteraction, Collection, EmbedBuilder, Guild, ModalSubmitInteraction } from "discord.js";
import { Maria } from "../Client/Client.js";
import { SKY_PROFILE_TEXT_INPUT_DESCRIPTION } from "../Commands/General/sky-profile.js";

interface ProfileData {
  No: number;
  "User ID": string;
  Name: string | null;
  Description: string | null;
}

interface ProfileSetData {
  name?: string;
  description?: string;
}

export default class Profile {
  static readonly cache = new Collection<number, Profile>();
  readonly No: ProfileData["No"];
  readonly userId: ProfileData["User ID"];
  name: ProfileData["Name"];
  description: ProfileData["Description"];

  constructor(profile: ProfileData) {
    this.No = profile.No;
    this.userId = profile["User ID"];
    this.name = profile.Name;
    this.description = profile.Description;
  }

  static async set(interaction: ChatInputCommandInteraction | ModalSubmitInteraction, data: ProfileSetData): Promise<void> {
    let profile = this.cache.find(({ userId }) => userId === interaction.user.id);
    const name = data.name ?? profile?.name ?? null;
    const description = data.description ?? profile?.description ?? null;

    if (profile) {
      await Maria.query("UPDATE `Profiles` SET `Name` = ?, `Description` = ? WHERE `No` = ?;", [
        name,
        description,
        profile.No
      ]);

      profile.name = name;
      profile.description = description;
    } else {
      const { insertId } = await Maria.query("INSERT INTO `Profiles` SET `User ID` = ?, `Name` = ?, `Description` = ?;", [
        interaction.user.id,
        name,
        description
      ]);

      profile = new this({
        No: insertId,
        "User ID": interaction.user.id,
        Name: name,
        Description: description
      });

      this.cache.set(profile.No, profile);
    }

    await interaction.reply({
      content: "Your profile has been updated!",
      ephemeral: true
    });
  }

  static async setDescription(interaction: ModalSubmitInteraction): Promise<void> {
    const description = interaction.fields.getTextInputValue(SKY_PROFILE_TEXT_INPUT_DESCRIPTION).trim();
    return this.set(interaction, { description });
  }

  async show(guild: Guild | null): Promise<EmbedBuilder> {
    const embed = new EmbedBuilder();
    const me = await guild?.members.fetchMe();
    embed.setColor(me?.displayColor ?? 0);
    embed.setDescription(this.description);
    return embed;
  }
}
