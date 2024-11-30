import { Cron } from "croner";
import DailyGuides from "./models/DailyGuides.js";
import { distribute, reset } from "./services/daily-guides.js";
import { TIME_ZONE } from "./utility/dates.js";

export default function croner() {
	new Cron("0 0 0 * * *", { timezone: TIME_ZONE }, async () => {
		await Promise.all([DailyGuides.reset(), reset()]);
		await distribute();
	});
}
