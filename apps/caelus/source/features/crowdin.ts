import type { Snowflake } from "@discordjs/core";
import { Table, type UsersPacket } from "@thatskyapplication/utility";
import pg from "../pg.js";

export async function crowdinUserProfile(userId: Snowflake) {
	const user = await pg<UsersPacket>(Table.Users)
		.select("crowdin_user_id")
		.where({ discord_user_id: userId })
		.first();

	return user?.crowdin_user_id ? crowdinUserRoute(user.crowdin_user_id) : null;
}

function crowdinUserRoute(userId: number) {
	return `https://thatskyapplication.crowdin.com/u/users#${userId}`;
}
