import { ApplicationCommandData, ApplicationCommandType, CacheType, UserContextMenuCommandInteraction } from "discord.js";
import type { UserContextMenuCommand } from "../index.js";
import commands from "../index.js";

export default class implements UserContextMenuCommand {
  readonly name = "Sky Profile";
  readonly type = ApplicationCommandType.User;

  async userContextMenu(interaction: UserContextMenuCommandInteraction<CacheType>): Promise<void> {
    return await commands["sky-profile"].show(interaction);
  }

  get commandData(): ApplicationCommandData {
    return {
      name: this.name,
      type: this.type
    };
  }
}
