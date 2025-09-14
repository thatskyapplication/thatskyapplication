import {
	type ChecklistPacket,
	type ChecklistSetData,
	RealmName,
	shardEruption,
	skyCurrentEvents,
	skyCurrentSeason,
	skyNow,
	Table,
} from "@thatskyapplication/utility";
import { CheckCircle, Circle } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { Form, Link, redirect, useLoaderData } from "react-router";
import pg from "~/pg.server";
import { getSession } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get("Cookie"));
	const user = session.get("user");

	if (!user) {
		const returnTo = encodeURIComponent(request.url);
		return redirect(`/login?returnTo=${returnTo}`);
	}

	const checklistPacket = await pg<ChecklistPacket>(Table.Checklist)
		.where({ user_id: user.id })
		.first();
	const now = skyNow();
	const shard = shardEruption();
	const season = skyCurrentSeason(now);

	const isAnyEventWithEventTickets = skyCurrentEvents(now).some(
		({ eventTickets }) => eventTickets && now < eventTickets.end,
	);

	return {
		checklistPacket,
		user,
		shard,
		season,
		isAnyEventWithEventTickets,
		isDoubleSeasonalLight: season?.isDuringDoubleSeasonalLightEvent(now) ?? false,
	};
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const session = await getSession(request.headers.get("Cookie"));
	const user = session.get("user");

	if (!user) {
		const returnTo = encodeURIComponent(request.url);
		return redirect(`/login?returnTo=${returnTo}`);
	}

	const formData = await request.formData();
	const dailyQuests = formData.get("daily_quests");
	const seasonalCandles = formData.get("seasonal_candles");
	const eyeOfEden = formData.get("eye_of_eden");
	const shardEruptions = formData.get("shard_eruptions");
	const eventTickets = formData.get("event_tickets");
	const payload: ChecklistSetData = {};

	if (dailyQuests !== null) {
		payload.daily_quests = dailyQuests === "0";
	}

	if (seasonalCandles !== null) {
		payload.seasonal_candles = seasonalCandles === "0";
	}

	if (eyeOfEden !== null) {
		payload.eye_of_eden = eyeOfEden === "0";
	}

	if (shardEruptions !== null) {
		payload.shard_eruptions = shardEruptions === "0";
	}

	if (eventTickets !== null) {
		payload.event_tickets = eventTickets === "0";
	}

	await pg<ChecklistPacket>(Table.Checklist)
		.insert({ user_id: user.id, ...payload })
		.onConflict("user_id")
		.merge();

	return;
};

export default function Checklist() {
	const {
		checklistPacket,
		user,
		shard,
		season,
		isAnyEventWithEventTickets,
		isDoubleSeasonalLight,
	} = useLoaderData<typeof loader>();

	const { t } = useTranslation();

	return (
		<div className="min-h-screen flex items-center justify-center pt-20 lg:pt-0 pb-4 lg:pb-0 px-4">
			<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-8 w-full max-w-lg">
				<div className="text-center mb-6">
					<h1 className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2">
						{t("checklist.title", { ns: "features" })}
					</h1>
					<p className="text-gray-600 dark:text-gray-300 text-sm">
						{t("checklist.description", { ns: "features", user: user.username })}
					</p>
				</div>
				<div className="space-y-4 mb-6">
					{/* Daily quests. */}
					<div className="space-y-2">
						<Form className="w-full" method="post">
							<input
								name="daily_quests"
								type="hidden"
								value={Number(checklistPacket?.daily_quests ?? false)}
							/>
							<button
								className={`cursor-pointer w-full flex items-center gap-3 p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
									checklistPacket?.daily_quests
										? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-900/30"
										: "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900/30"
								}`}
								type="submit"
							>
								<div className="shrink-0">
									{checklistPacket?.daily_quests ? (
										<CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
									) : (
										<Circle className="w-6 h-6 text-gray-400 dark:text-gray-500" />
									)}
								</div>
								<div className="text-left flex-1 min-w-0">
									<div
										className={`font-medium transition-colors ${
											checklistPacket?.daily_quests
												? "text-green-800 dark:text-green-200 line-through"
												: "text-gray-900 dark:text-gray-100"
										}`}
									>
										{t("daily-quests", { ns: "general" })}
									</div>
									<div className="text-xs text-gray-500 dark:text-gray-400">
										{checklistPacket?.daily_quests
											? t("checklist.daily-quests-message-complete", { ns: "features" })
											: t("checklist.daily-quests-message-incomplete", { ns: "features" })}
									</div>
								</div>
								<Link
									className="shrink-0 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
									onClick={(event) => event.stopPropagation()}
									to="/daily-guides"
								>
									{t("view", { ns: "general" })}
								</Link>
							</button>
						</Form>
					</div>

					{/* Seasonal Candles. */}
					{season && (
						<div>
							<Form className="w-full" method="post">
								<input
									name="seasonal_candles"
									type="hidden"
									value={Number(checklistPacket?.seasonal_candles ?? false)}
								/>
								<button
									className={`cursor-pointer w-full flex items-center gap-3 p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
										checklistPacket?.seasonal_candles
											? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-900/30"
											: "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900/30"
									}`}
									type="submit"
								>
									<div className="shrink-0">
										{checklistPacket?.seasonal_candles ? (
											<CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
										) : (
											<Circle className="w-6 h-6 text-gray-400 dark:text-gray-500" />
										)}
									</div>
									<div className="text-left flex-1 min-w-0">
										<div
											className={`font-medium transition-colors ${
												checklistPacket?.seasonal_candles
													? "text-green-800 dark:text-green-200 line-through"
													: "text-gray-900 dark:text-gray-100"
											}`}
										>
											{t("daily-guides.seasonal-candles", { ns: "features" })}
										</div>
										<div className="text-xs text-gray-500 dark:text-gray-400">
											{checklistPacket?.seasonal_candles
												? t("checklist.seasonal-candles-message-complete", { ns: "features" })
												: isDoubleSeasonalLight
													? t("checklist.seasonal-candles-message-incomplete-double", {
															ns: "features",
														})
													: t("checklist.seasonal-candles-message-incomplete", { ns: "features" })}
										</div>
									</div>
								</button>
							</Form>
						</div>
					)}

					{/* Eye of Eden. */}
					<div>
						<Form className="w-full" method="post">
							<input
								name="eye_of_eden"
								type="hidden"
								value={Number(checklistPacket?.eye_of_eden ?? false)}
							/>
							<button
								className={`cursor-pointer w-full flex items-center gap-3 p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
									checklistPacket?.eye_of_eden
										? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-900/30"
										: "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900/30"
								}`}
								type="submit"
							>
								<div className="shrink-0">
									{checklistPacket?.eye_of_eden ? (
										<CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
									) : (
										<Circle className="w-6 h-6 text-gray-400 dark:text-gray-500" />
									)}
								</div>
								<div className="text-left flex-1 min-w-0">
									<div
										className={`font-medium transition-colors ${
											checklistPacket?.eye_of_eden
												? "text-green-800 dark:text-green-200 line-through"
												: "text-gray-900 dark:text-gray-100"
										}`}
									>
										{t(`realms.${RealmName.EyeOfEden}`, { ns: "general" })}
									</div>
									<div className="text-xs text-gray-500 dark:text-gray-400">
										{checklistPacket?.eye_of_eden
											? t("checklist.eye-of-eden-message-complete", { ns: "features" })
											: t("checklist.eye-of-eden-message-incomplete", { ns: "features" })}
									</div>
								</div>
							</button>
						</Form>
					</div>

					{/* Shard eruptions. */}
					<div className="space-y-2">
						<Form className="w-full" method="post">
							<input
								name="shard_eruptions"
								type="hidden"
								value={Number(checklistPacket?.shard_eruptions ?? false)}
							/>
							<button
								className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all duration-200 ${
									shard === null
										? "opacity-75 cursor-not-allowed bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
										: checklistPacket?.shard_eruptions
											? "cursor-pointer bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-900/30 hover:shadow-md"
											: "cursor-pointer bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900/30 hover:shadow-md"
								}`}
								disabled={shard === null}
								type="submit"
							>
								<div className="shrink-0">
									{checklistPacket?.shard_eruptions ? (
										<CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
									) : (
										<Circle
											className={`w-6 h-6 ${shard === null ? "text-gray-300 dark:text-gray-600" : "text-gray-400 dark:text-gray-500"}`}
										/>
									)}
								</div>
								<div className="text-left flex-1 min-w-0">
									<div
										className={`font-medium transition-colors ${
											checklistPacket?.shard_eruptions
												? "text-green-800 dark:text-green-200 line-through"
												: shard === null
													? "text-gray-400 dark:text-gray-600"
													: "text-gray-900 dark:text-gray-100"
										}`}
									>
										{t("shard-eruptions", { ns: "general" })}
									</div>
									<div
										className={`text-xs ${shard === null ? "text-gray-400 dark:text-gray-600" : "text-gray-500 dark:text-gray-400"}`}
									>
										{checklistPacket?.shard_eruptions
											? t("checklist.shard-eruptions-message-complete", { ns: "features" })
											: shard
												? t("checklist.shard-eruptions-message-incomplete", { ns: "features" })
												: t("checklist.shard-eruptions-message-none", { ns: "features" })}
									</div>
								</div>
								<Link
									className="shrink-0 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
									onClick={(event) => event.stopPropagation()}
									to="/shard-eruption"
								>
									{t("view", { ns: "general" })}
								</Link>
							</button>
						</Form>
					</div>

					{/* Event tickets. */}
					{isAnyEventWithEventTickets && (
						<div>
							<Form className="w-full" method="post">
								<input
									name="event_tickets"
									type="hidden"
									value={Number(checklistPacket?.event_tickets ?? false)}
								/>
								<button
									className={`cursor-pointer w-full flex items-center gap-3 p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
										checklistPacket?.event_tickets
											? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-900/30"
											: "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900/30"
									}`}
									type="submit"
								>
									<div className="shrink-0">
										{checklistPacket?.event_tickets ? (
											<CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
										) : (
											<Circle className="w-6 h-6 text-gray-400 dark:text-gray-500" />
										)}
									</div>
									<div className="text-left flex-1 min-w-0">
										<div
											className={`font-medium transition-colors ${
												checklistPacket?.event_tickets
													? "text-green-800 dark:text-green-200 line-through"
													: "text-gray-900 dark:text-gray-100"
											}`}
										>
											{t("event-tickets", { ns: "general" })}
										</div>
										<div className="text-xs text-gray-500 dark:text-gray-400">
											{checklistPacket?.event_tickets
												? t("checklist.event-tickets-message-complete", { ns: "features" })
												: t("checklist.event-tickets-message-incomplete", { ns: "features" })}
										</div>
									</div>
								</button>
							</Form>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
