import type { Snowflake } from "discord.js";
import type { HeartPacket } from "../Commands/Fun/heart.js";
import pg, { Table } from "../pg.js";

export async function total(gifteeId: Snowflake) {
	return Number(
		(await pg<HeartPacket>(Table.Hearts).count().where({ giftee_id: gifteeId }))[0]!.count,
	);
}
