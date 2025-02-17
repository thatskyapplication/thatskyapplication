import knex from "knex";
import { DATABASE_URL } from "./utility/configuration.js";

export interface TravellingSpiritsPacket {
	visit: number;
	entity: string;
	start: Date;
	end: Date;
}

export const pg = knex({
	client: "pg",
	connection: DATABASE_URL,
	pool: { min: 0 },
});
