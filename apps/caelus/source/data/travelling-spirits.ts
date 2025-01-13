import { Collection } from "@discordjs/collection";
import { DateTime } from "luxon";
import type { TravellingSpiritsDates, TravellingSpiritsPacket } from "../models/Spirits.js";
import pg, { Table } from "../pg.js";
import { TIME_ZONE } from "../utility/dates.js";

export const TRAVELLING_DATES = (
	await pg<TravellingSpiritsPacket>(Table.TravellingSpirits).select("visit", "start", "end")
).reduce(
	(travellingSpirits, { visit, start, end }) =>
		travellingSpirits.set(visit, {
			start: DateTime.fromJSDate(start, { zone: TIME_ZONE }),
			end: DateTime.fromJSDate(end, { zone: TIME_ZONE }),
		}),
	new Collection<number, TravellingSpiritsDates>(),
);
