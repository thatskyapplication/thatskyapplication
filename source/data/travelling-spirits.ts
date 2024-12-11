import { Collection } from "@discordjs/collection";
import { DateTime } from "luxon";
import type { TravellingSpiritsPacket } from "../models/Spirits.js";
import pg from "../pg.js";

export const TRAVELLING_DATES = (
	await pg<TravellingSpiritsPacket>("travelling_spirits").select("visit", "start")
).reduce(
	(travellingSpirits, { visit, start }) => travellingSpirits.set(visit, DateTime.fromJSDate(start)),
	new Collection<number, DateTime>(),
);
