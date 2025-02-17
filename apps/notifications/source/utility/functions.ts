import { DateTime } from "luxon";
import { type TravellingSpiritsPacket, pg } from "../pg.js";
import { TIME_ZONE, TRAVELLING_SPIRITS_TABLE } from "./constants.js";

export async function getLastTravellingSpirit() {
	const travellingSpirit = await pg<TravellingSpiritsPacket>(TRAVELLING_SPIRITS_TABLE)
		.select("entity", "start")
		.orderBy("visit", "desc")
		.limit(1)
		.first();

	if (!travellingSpirit) {
		throw new Error("No travelling spirit found.");
	}

	return {
		entity: travellingSpirit.entity,
		start: DateTime.fromJSDate(travellingSpirit.start, { zone: TIME_ZONE }),
	};
}
