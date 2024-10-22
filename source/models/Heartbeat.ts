import { setInterval } from "node:timers";
import type { Client } from "discord.js";
import { distribute, reset } from "../services/daily-guides.js";
import { skyNow } from "../utility/dates.js";
import DailyGuides from "./DailyGuides.js";

async function dailyReset(client: Client<true>) {
	await DailyGuides.reset();
	await reset();
	await distribute(client);
}

export default function heartbeat(client: Client<true>): void {
	setInterval(() => {
		const now = skyNow();
		const { hour, minute, second } = now;

		if (hour === 0 && minute === 0 && second === 0) {
			void dailyReset(client);
		}
	}, 1_000);
}
