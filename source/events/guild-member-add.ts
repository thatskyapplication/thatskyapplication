import { Events } from "discord.js";
import { updateGuildIds } from "../services/guess.js";
import type { Event } from "./index.js";

const name = Events.GuildMemberAdd;

export default {
	name,
	async fire(guildMember) {
		await updateGuildIds(guildMember.user.id, guildMember.guild.id);
	},
} satisfies Event<typeof name>;
