import { API } from "@discordjs/core/http-only";
import { REST } from "@discordjs/rest";
import { DISCORD_TOKEN } from "./config.server";

export default new API(new REST({ version: "10" }).setToken(DISCORD_TOKEN));
