import { dailyGuidesWidgetUpdate } from "../../features/daily-guides.js";

export async function postSchedulerDailyGuides() {
	await dailyGuidesWidgetUpdate();
}
