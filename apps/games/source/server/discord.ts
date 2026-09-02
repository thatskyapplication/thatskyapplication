import { API } from "@discordjs/core/http-only";
import { REST } from "@discordjs/rest";
import { DISCORD_TOKEN } from "./config.js";

export const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

export default new API(rest);
