import { Events } from "discord.js";
import { updateGuildIds } from "../Structures/Guess.js";
import { type Event } from "./index.js";

const name = Events.GuildMemberAdd;

export default {
	name,
	async fire(guildMember) {
		await updateGuildIds(guildMember.user.id, guildMember.guild.id);
	},
} satisfies Event<typeof name>;
