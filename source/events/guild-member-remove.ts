import { Events } from "discord.js";
import { removeGuildId } from "../services/guess.js";
import type { Event } from "./index.js";

const name = Events.GuildMemberRemove;

export default {
	name,
	async fire(guildMember) {
		await removeGuildId(guildMember.user.id, guildMember.guild.id);
	},
} satisfies Event<typeof name>;
