import type { Toast } from "@devvit/web/shared";
import type { Request, Response } from "express";
import { dailyGuidesWidgetUpdate } from "../../features/daily-guides.js";

export async function postMenuDailyGuides(_: Request, res: Response) {
	await dailyGuidesWidgetUpdate();

	res.json({
		showToast: {
			text: "Updated. Reload to see the changes!",
			appearance: "success",
		} satisfies Toast,
	});
}
