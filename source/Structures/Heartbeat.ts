import { setInterval } from "node:timers";
import type { Client } from "discord.js";
import { now } from "../Utility/dates.js";
import DailyGuides from "./DailyGuides.js";
import DailyGuidesDistribution from "./DailyGuidesDistribution.js";

async function dailyReset(client: Client<true>) {
	await DailyGuides.reset();
	await DailyGuidesDistribution.reset();
	await DailyGuidesDistribution.distribute(client);
}

export default function heartbeat(client: Client<true>): void {
	setInterval(() => {
		const date = now();
		const { hour, minute, second } = date;

		if (hour === 0 && minute === 0 && second === 0) {
			void dailyReset(client);
		}
	}, 1_000);
}
