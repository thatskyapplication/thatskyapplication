import { ChatInputCommandInteraction, Collection, EmbedAuthorOptions, EmbedBuilder, Guild, ModalSubmitInteraction } from "discord.js";
import { Maria } from "../Client/Client.js";
import { SKY_PROFILE_TEXT_INPUT_DESCRIPTION } from "../Commands/General/sky-profile.js";
import { Emoji } from "../Utility/Constants.js";

interface ProfileData {
  No: number;
  "User ID": string;
  Name: string | null;
  "Icon": string | null;
  Thumbnail: string | null;
  Description: string | null;
}

interface ProfileSetData {
  name?: string;
  icon?: string;
  thumbnail?: string;
  description?: string;
}

export default class Profile {
  static readonly cache = new Collection<number, Profile>();
  readonly No: ProfileData["No"];
  readonly userId: ProfileData["User ID"];
  name: ProfileData["Name"];
  icon: ProfileData["Icon"];
  thumbnail: ProfileData["Thumbnail"];
  description: ProfileData["Description"];

  constructor(profile: ProfileData) {
    this.No = profile.No;
    this.userId = profile["User ID"];
    this.name = profile.Name;
    this.icon = profile.Icon;
    this.thumbnail = profile.Thumbnail;
    this.description = profile.Description;
  }

  static async set(interaction: ChatInputCommandInteraction | ModalSubmitInteraction, data: ProfileSetData): Promise<void> {
    let profile = this.cache.find(({ userId }) => userId === interaction.user.id);
    const name = data.name ?? profile?.name ?? null;
    const icon = data.icon ?? profile?.icon ?? null;
    const thumbnail = data.thumbnail ?? profile?.thumbnail ?? null;
    const description = data.description ?? profile?.description ?? null;

    if (profile) {
      await Maria.query("UPDATE `Profiles` SET `Name` = ?, `Icon` = ?, `Thumbnail` = ?, `Description` = ? WHERE `No` = ?;", [
        name,
        icon,
        thumbnail,
        description,
        profile.No
      ]);

      profile.name = name;
      profile.icon = icon;
      profile.thumbnail = thumbnail;
      profile.description = description;
    } else {
      const { insertId } = await Maria.query("INSERT INTO `Profiles` SET `User ID` = ?, `Name` = ?, `Icon` = ?, `Thumbnail` = ?, `Description` = ?;", [
        interaction.user.id,
        name,
        icon,
        thumbnail,
        description
      ]);

      profile = new this({
        No: insertId,
        "User ID": interaction.user.id,
        Name: name,
        Icon: icon,
        Thumbnail: thumbnail,
        Description: description
      });

      this.cache.set(profile.No, profile);
    }

    await interaction.reply({
      content: "Your profile has been updated!",
      embeds: [await profile.show(interaction.guild)],
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

    if (this.name) {
      const embedAuthorOptions: EmbedAuthorOptions = { name: this.name };
      if (this.icon) embedAuthorOptions.iconURL = this.icon;
      embed.setAuthor(embedAuthorOptions);
    }

    embed.setColor(me?.displayColor ?? 0);
    embed.setDescription(this.description || `Hi! I'm an amazing Skykid. ${Emoji.TGCBlueSparkles}`);
    embed.setThumbnail(this.thumbnail);
    return embed;
  }
}
