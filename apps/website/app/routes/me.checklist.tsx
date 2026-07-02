import {
	AreaName,
	type ChecklistPacket,
	type ChecklistSetData,
	checklistResetPayload,
	shardEruption,
	skyCurrentEvents,
	skyCurrentSeason,
	skyNow,
	Table,
	TIME_ZONE,
} from "@thatskyapplication/utility";
import { clsx } from "clsx";
import { ArrowLeft, CheckCircle, Circle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Form, Link } from "react-router";
import { SitePage } from "~/components/PageLayout";
import { TimeTopBar } from "~/components/TimeTopBar";
import { useCurrentTimestamp, useSkyDailyResetRevalidator } from "~/hooks/use-current-timestamp.js";
import { getLocale } from "~/middleware/i18next.js";
import pg from "~/pg.server";
import { requireDiscordAuthentication } from "~/utility/functions.server.js";
import { getPreferredTimeZone } from "~/utility/time-zone.server";
import type { Route } from "./+types/me.checklist.js";

const CHECKLIST_CARD_BASE_CLASS =
	"flex h-full w-full items-center gap-3 rounded-lg border p-3.5 transition-all duration-200" as const;
const CHECKLIST_INTERACTIVE_CARD_CLASS = clsx(
	CHECKLIST_CARD_BASE_CLASS,
	"cursor-pointer hover:shadow-md",
);
const CHECKLIST_COMPLETE_CARD_CLASS =
	"border-green-200 bg-green-50 hover:bg-green-100 dark:border-green-700 dark:bg-green-900/20 dark:hover:bg-green-900/30" as const;
const CHECKLIST_INCOMPLETE_CARD_CLASS =
	"border-gray-200 bg-gray-100 hover:bg-gray-100/50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-900/50" as const;
const CHECKLIST_UNAVAILABLE_CARD_CLASS =
	"border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-900" as const;
const CHECKLIST_VIEW_LINK_CLASS =
	"shrink-0 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" as const;
const CHECKLIST_LABEL_CLASS = "font-medium transition-colors" as const;
const CHECKLIST_COMPLETE_LABEL_CLASS = "text-green-800 line-through dark:text-green-200" as const;
const CHECKLIST_INCOMPLETE_LABEL_CLASS = "text-gray-900 dark:text-gray-100" as const;
const CHECKLIST_UNAVAILABLE_LABEL_CLASS = "text-gray-400 dark:text-gray-600" as const;

async function checklistRefresh(checklistPacket: ChecklistPacket) {
	const payload = checklistResetPayload(checklistPacket.last_updated_at, new Date());

	if (Object.keys(payload).length === 1) {
		return;
	}

	const [updatedChecklistPacket] = await pg<ChecklistPacket>(Table.Checklist)
		.update(payload, "*")
		.where({ user_id: checklistPacket.user_id });

	return updatedChecklistPacket!;
}

export const loader = async ({ request, context, url }: Route.LoaderArgs) => {
	const locale = getLocale(context);
	const timeZone = await getPreferredTimeZone(request);
	const { discordUser } = await requireDiscordAuthentication(request, url);

	let checklistPacket = await pg<ChecklistPacket>(Table.Checklist)
		.where({ user_id: discordUser.id })
		.first();

	if (checklistPacket) {
		const updatedChecklistPacket = await checklistRefresh(checklistPacket);

		if (updatedChecklistPacket) {
			checklistPacket = updatedChecklistPacket;
		}
	}

	const now = skyNow();
	const initialTimestamp = now.epochMilliseconds;
	const shard = shardEruption();
	const season = skyCurrentSeason(now);

	const isAnyEventWithEventTickets = skyCurrentEvents(now).some(
		({ eventTickets }) => eventTickets && Temporal.ZonedDateTime.compare(now, eventTickets.end) < 0,
	);

	return {
		checklistPacket,
		discordUser,
		initialTimestamp,
		locale,
		shard,
		season,
		timeZone,
		isAnyEventWithEventTickets,
		isDoubleSeasonalLight: season?.isDuringDoubleSeasonalLightEvent(now) ?? false,
	};
};

export const action = async ({ request, url }: Route.ActionArgs) => {
	const { discordUser } = await requireDiscordAuthentication(request, url);
	const formData = await request.formData();
	const dailyQuests = formData.get("daily_quests");
	const seasonalCandles = formData.get("seasonal_candles");
	const eyeOfEden = formData.get("eye_of_eden");
	const shardEruptions = formData.get("shard_eruptions");
	const eventTickets = formData.get("event_tickets");

	const checklistPacket = await pg<ChecklistPacket>(Table.Checklist)
		.where({ user_id: discordUser.id })
		.first();

	const payload: ChecklistSetData = checklistPacket
		? checklistResetPayload(checklistPacket.last_updated_at, new Date())
		: { last_updated_at: new Date() };

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
		.insert({ user_id: discordUser.id, ...payload })
		.onConflict("user_id")
		.merge();
	return;
};

export default function Checklist({ loaderData }: Route.ComponentProps) {
	const {
		checklistPacket,
		discordUser,
		initialTimestamp,
		locale,
		shard,
		season,
		timeZone,
		isAnyEventWithEventTickets,
		isDoubleSeasonalLight,
	} = loaderData;

	const { t } = useTranslation();
	const currentTimestamp = useCurrentTimestamp(initialTimestamp);
	useSkyDailyResetRevalidator(currentTimestamp);

	const localTime = new Intl.DateTimeFormat(locale, {
		hour: "2-digit",
		minute: "2-digit",
		timeZone,
		timeZoneName: "short",
	}).format(currentTimestamp);

	const skyTime = new Intl.DateTimeFormat(locale, {
		timeZone: TIME_ZONE,
		hour: "2-digit",
		minute: "2-digit",
		timeZoneName: "short",
	}).format(currentTimestamp);

	const dailyQuestsComplete = checklistPacket?.daily_quests ?? false;
	const seasonalCandlesComplete = checklistPacket?.seasonal_candles ?? false;
	const eyeOfEdenComplete = checklistPacket?.eye_of_eden ?? false;
	const shardEruptionsComplete = checklistPacket?.shard_eruptions ?? false;
	const eventTicketsComplete = checklistPacket?.event_tickets ?? false;
	const shardUnavailable = shard === null;

	return (
		<SitePage>
			<div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
				<Link
					className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
					to="/me"
				>
					<ArrowLeft className="h-4 w-4" />
					<span>{t("navigation-back", { ns: "general" })}</span>
				</Link>

				<div>
					<h1 className="mb-1 text-4xl font-bold text-gray-900 dark:text-gray-100">
						{t("checklist.title", { ns: "features" })}
					</h1>
					<p className="mb-0 text-base text-gray-600 dark:text-gray-400">
						{t("checklist.description", { ns: "features", user: discordUser.username })}
					</p>
				</div>

				<TimeTopBar localTime={localTime} skyTime={skyTime} />

				<div className="flex flex-wrap items-stretch gap-4 *:flex *:w-full md:*:w-[calc(50%_-_0.5rem)] md:[&>*:last-child]:w-full">
					<div>
						<Form className="flex h-full w-full" method="post">
							<input name="daily_quests" type="hidden" value={Number(dailyQuestsComplete)} />
							<button
								className={clsx(
									CHECKLIST_INTERACTIVE_CARD_CLASS,
									dailyQuestsComplete
										? CHECKLIST_COMPLETE_CARD_CLASS
										: CHECKLIST_INCOMPLETE_CARD_CLASS,
								)}
								type="submit"
							>
								<div className="shrink-0">
									{dailyQuestsComplete ? (
										<CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
									) : (
										<Circle className="w-6 h-6 text-gray-400 dark:text-gray-500" />
									)}
								</div>
								<div className="text-left flex-1 min-w-0">
									<div
										className={clsx(
											CHECKLIST_LABEL_CLASS,
											dailyQuestsComplete
												? CHECKLIST_COMPLETE_LABEL_CLASS
												: CHECKLIST_INCOMPLETE_LABEL_CLASS,
										)}
									>
										{t("daily-quests", { ns: "general" })}
									</div>
									<div className="text-xs text-gray-500 dark:text-gray-400">
										{dailyQuestsComplete
											? t("checklist.daily-quests-message-complete", { ns: "features" })
											: t("checklist.daily-quests-message-incomplete", { ns: "features" })}
									</div>
								</div>
								<Link
									className={CHECKLIST_VIEW_LINK_CLASS}
									onClick={(event) => event.stopPropagation()}
									to="/daily-guides"
								>
									{t("view", { ns: "general" })}
								</Link>
							</button>
						</Form>
					</div>

					{season && (
						<div>
							<Form className="flex h-full w-full" method="post">
								<input
									name="seasonal_candles"
									type="hidden"
									value={Number(seasonalCandlesComplete)}
								/>
								<button
									className={clsx(
										CHECKLIST_INTERACTIVE_CARD_CLASS,
										seasonalCandlesComplete
											? CHECKLIST_COMPLETE_CARD_CLASS
											: CHECKLIST_INCOMPLETE_CARD_CLASS,
									)}
									type="submit"
								>
									<div className="shrink-0">
										{seasonalCandlesComplete ? (
											<CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
										) : (
											<Circle className="w-6 h-6 text-gray-400 dark:text-gray-500" />
										)}
									</div>
									<div className="text-left flex-1 min-w-0">
										<div
											className={clsx(
												CHECKLIST_LABEL_CLASS,
												seasonalCandlesComplete
													? CHECKLIST_COMPLETE_LABEL_CLASS
													: CHECKLIST_INCOMPLETE_LABEL_CLASS,
											)}
										>
											{t("daily-guides.seasonal-candles", { ns: "features" })}
										</div>
										<div className="text-xs text-gray-500 dark:text-gray-400">
											{seasonalCandlesComplete
												? t("checklist.seasonal-candles-message-complete", { ns: "features" })
												: isDoubleSeasonalLight
													? t("checklist.seasonal-candles-message-incomplete-double", {
															ns: "features",
														})
													: t("checklist.seasonal-candles-message-incomplete", {
															ns: "features",
														})}
										</div>
									</div>
								</button>
							</Form>
						</div>
					)}

					<div>
						<Form className="flex h-full w-full" method="post">
							<input name="eye_of_eden" type="hidden" value={Number(eyeOfEdenComplete)} />
							<button
								className={clsx(
									CHECKLIST_INTERACTIVE_CARD_CLASS,
									eyeOfEdenComplete
										? CHECKLIST_COMPLETE_CARD_CLASS
										: CHECKLIST_INCOMPLETE_CARD_CLASS,
								)}
								type="submit"
							>
								<div className="shrink-0">
									{eyeOfEdenComplete ? (
										<CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
									) : (
										<Circle className="w-6 h-6 text-gray-400 dark:text-gray-500" />
									)}
								</div>
								<div className="text-left flex-1 min-w-0">
									<div
										className={clsx(
											CHECKLIST_LABEL_CLASS,
											eyeOfEdenComplete
												? CHECKLIST_COMPLETE_LABEL_CLASS
												: CHECKLIST_INCOMPLETE_LABEL_CLASS,
										)}
									>
										{t(`areas.${AreaName.EyeOfEden}`, { ns: "general" })}
									</div>
									<div className="text-xs text-gray-500 dark:text-gray-400">
										{eyeOfEdenComplete
											? t("checklist.eye-of-eden-message-complete", { ns: "features" })
											: t("checklist.eye-of-eden-message-incomplete", { ns: "features" })}
									</div>
								</div>
							</button>
						</Form>
					</div>

					<div>
						<Form className="flex h-full w-full" method="post">
							<input name="shard_eruptions" type="hidden" value={Number(shardEruptionsComplete)} />
							<div
								className={clsx(
									CHECKLIST_CARD_BASE_CLASS,
									shardUnavailable
										? CHECKLIST_UNAVAILABLE_CARD_CLASS
										: [
												"cursor-pointer hover:shadow-md",
												shardEruptionsComplete
													? CHECKLIST_COMPLETE_CARD_CLASS
													: CHECKLIST_INCOMPLETE_CARD_CLASS,
											],
								)}
							>
								<button
									className="flex min-w-0 flex-1 items-center gap-3 text-left"
									disabled={shardUnavailable}
									type="submit"
								>
									<div className="shrink-0">
										{shardEruptionsComplete ? (
											<CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
										) : (
											<Circle
												className={clsx(
													"w-6 h-6",
													shardUnavailable
														? "text-gray-300 dark:text-gray-600"
														: "text-gray-400 dark:text-gray-500",
												)}
											/>
										)}
									</div>
									<div className="text-left flex-1 min-w-0">
										<div
											className={clsx(
												CHECKLIST_LABEL_CLASS,
												shardEruptionsComplete
													? CHECKLIST_COMPLETE_LABEL_CLASS
													: shardUnavailable
														? CHECKLIST_UNAVAILABLE_LABEL_CLASS
														: CHECKLIST_INCOMPLETE_LABEL_CLASS,
											)}
										>
											{t("shard-eruption.name-plural", { ns: "features" })}
										</div>
										<div
											className={clsx(
												"text-xs",
												shardUnavailable
													? CHECKLIST_UNAVAILABLE_LABEL_CLASS
													: "text-gray-500 dark:text-gray-400",
											)}
										>
											{shardEruptionsComplete
												? t("checklist.shard-eruptions-message-complete", {
														ns: "features",
													})
												: shard
													? t("checklist.shard-eruptions-message-incomplete", {
															ns: "features",
														})
													: t("checklist.shard-eruptions-message-none", {
															ns: "features",
														})}
										</div>
									</div>
								</button>
								<Link className={CHECKLIST_VIEW_LINK_CLASS} to="/shard-eruption">
									{t("view", { ns: "general" })}
								</Link>
							</div>
						</Form>
					</div>

					{isAnyEventWithEventTickets && (
						<div>
							<Form className="flex h-full w-full" method="post">
								<input name="event_tickets" type="hidden" value={Number(eventTicketsComplete)} />
								<button
									className={clsx(
										CHECKLIST_INTERACTIVE_CARD_CLASS,
										eventTicketsComplete
											? CHECKLIST_COMPLETE_CARD_CLASS
											: CHECKLIST_INCOMPLETE_CARD_CLASS,
									)}
									type="submit"
								>
									<div className="shrink-0">
										{eventTicketsComplete ? (
											<CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
										) : (
											<Circle className="w-6 h-6 text-gray-400 dark:text-gray-500" />
										)}
									</div>
									<div className="text-left flex-1 min-w-0">
										<div
											className={clsx(
												CHECKLIST_LABEL_CLASS,
												eventTicketsComplete
													? CHECKLIST_COMPLETE_LABEL_CLASS
													: CHECKLIST_INCOMPLETE_LABEL_CLASS,
											)}
										>
											{t("event-tickets", { ns: "general" })}
										</div>
										<div className="text-xs text-gray-500 dark:text-gray-400">
											{eventTicketsComplete
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
		</SitePage>
	);
}
