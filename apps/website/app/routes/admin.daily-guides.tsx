import { ArrowLeft, Pencil } from "lucide-react";
import type { ReactNode } from "react";
import { data, Link, type ShouldRevalidateFunctionArgs } from "react-router";
import {
	type APIDailyGuidesUser,
	currentNestingWorkshop,
	DAILY_QUEST_VALUES,
	DailyGuidesModificationType,
	type DailyQuests,
	dailyQuestLabel,
	fetchDailyGuides,
	fetchNestingWorkshop,
	isDailyQuest,
	isValidImageAsset,
	itemName,
	NESTING_WORKSHOP_MAXIMUM_PROPS,
	NESTING_WORKSHOP_ROTATION_CATEGORY_VALUES,
	NESTING_WORKSHOP_ROTATION_COSMETICS,
	NestingWorkshopRotationCategoryToCosmetics,
	resolveNestingWorkshopItems,
	skyNow,
	TIME_ZONE,
	updateDailyGuides,
	updateNestingWorkshop,
} from "@thatskyapplication/utility";
import { DailyGuidesCard } from "~/components/daily-guides/DailyGuidesCard.js";
import { DailyGuidesDistributeForm } from "~/components/daily-guides/DailyGuidesDistributeForm.js";
import {
	type DailyGuidesNestingWorkshop,
	DailyGuidesNestingWorkshopForm,
} from "~/components/daily-guides/DailyGuidesNestingWorkshopForm.js";
import {
	type DailyGuidesQuests,
	DailyGuidesQuestsForm,
} from "~/components/daily-guides/DailyGuidesQuestsForm.js";
import {
	type DailyGuidesTravellingRock,
	DailyGuidesTravellingRockForm,
	MAXIMUM_TRAVELLING_ROCK_SIZE,
	TRAVELLING_ROCK_INVALID_IMAGE_ERROR,
} from "~/components/daily-guides/DailyGuidesTravellingRockForm.js";
import { SitePage } from "~/components/PageLayout";
import { CDN_URL } from "~/config.server.js";
import database from "~/database.server.js";
import { useCurrentTimestamp, useSkyDailyResetRevalidator } from "~/hooks/use-current-timestamp.js";
import { getInstance, getLocale } from "~/middleware/i18next.js";
import pino from "~/pino.js";
import { distributeDailyGuides, logDailyGuidesModification } from "~/utility/caelus.server.js";
import { cdnAssetURL } from "~/utility/cdn.js";
import { dailyGuidesCardData } from "~/utility/daily-guides.server.js";
import { itemEmoji, MISCELLANEOUS_EMOJIS } from "~/utility/emojis.js";
import { requireAdminAccess } from "~/utility/functions.server.js";
import { fetchNestingWorkshopProps } from "~/utility/nesting-workshop.server.js";
import { getTimePreferences } from "~/utility/time.server.js";
import { uploadTravellingRock } from "~/utility/travelling-rock.server.js";
import type { Route } from "./+types/admin.daily-guides.js";

const QUEST_FIELDS = ["quest-1", "quest-2", "quest-3", "quest-4"] as const;
const DATE_RESET_ERROR = "The Sky day has reset since this page was loaded." as const;
const INVALID_REQUEST_ERROR = "Invalid request." as const;
const NO_CHANGES_ERROR = "No changes were made." as const;
const SAVE_FAILED_ERROR = "Caelus logged this, but saving it failed." as const;

const LOG_ERRORS = {
	refused: "Caelus couldn't log this, so nothing was saved.",
	unconfirmed:
		"Caelus didn't confirm the log entry, so nothing was saved. Check the log channel before trying again.",
} as const;

const NESTING_WORKSHOP_ROTATION_COSMETIC_SET = new Set<number>(NESTING_WORKSHOP_ROTATION_COSMETICS);

function failure<Intent extends string>(intent: Intent, error: string, status: number) {
	return data({ error, intent, ok: false } as const, { status });
}

function dailyQuests({
	quest1,
	quest2,
	quest3,
	quest4,
}: Awaited<ReturnType<typeof fetchDailyGuides>>) {
	return [quest1, quest2, quest3, quest4];
}

function dailyQuestsObject(quests: readonly (number | null)[]) {
	const [quest1 = null, quest2 = null, quest3 = null, quest4 = null] = quests;
	return { quest1, quest2, quest3, quest4 };
}

function dailyGuidesState({
	quest1,
	quest2,
	quest3,
	quest4,
	travelling_rock,
	travelling_rock_not_spawned,
}: Awaited<ReturnType<typeof fetchDailyGuides>>) {
	return {
		quest1,
		quest2,
		quest3,
		quest4,
		travellingRock: travelling_rock,
		travellingRockNotSpawned: travelling_rock_not_spawned,
	};
}

function travellingRockLoaded({
	travelling_rock,
	travelling_rock_not_spawned,
}: Awaited<ReturnType<typeof fetchDailyGuides>>) {
	return JSON.stringify([travelling_rock, travelling_rock_not_spawned]);
}

function parseQuests(formData: FormData) {
	const quests: (DailyQuests | null)[] = [];

	for (const field of QUEST_FIELDS) {
		const value = formData.get(field);

		if (value === "") {
			quests.push(null);
			continue;
		}

		const quest = typeof value === "string" ? Number(value) : Number.NaN;

		if (!isDailyQuest(quest)) {
			return null;
		}

		quests.push(quest);
	}

	return quests;
}

function parseCosmetics(formData: FormData) {
	const cosmetics: number[] = [];

	for (const value of formData.getAll("cosmetic")) {
		const cosmetic = typeof value === "string" ? Number(value) : Number.NaN;

		if (!NESTING_WORKSHOP_ROTATION_COSMETIC_SET.has(cosmetic) || cosmetics.includes(cosmetic)) {
			return null;
		}

		cosmetics.push(cosmetic);
	}

	return cosmetics;
}

export const loader = async ({ context, request, url }: Route.LoaderArgs) => {
	const { discordUser } = await requireAdminAccess({ context, request, url });
	const { locale, timeZone, timeZoneEstimated, hour12 } = getTimePreferences(request, context);
	const t = getInstance(context).getFixedT(getLocale(context));
	const now = skyNow();
	const today = now.toPlainDate();
	const nestingWorkshopStart = currentNestingWorkshop(now);

	const [dailyGuides, nestingWorkshopPacket, nestingWorkshopProps] = await Promise.all([
		fetchDailyGuides(database, today),
		fetchNestingWorkshop(database, today),
		fetchNestingWorkshopProps(today, discordUser.id),
	]);

	const fullDateFormat = new Intl.DateTimeFormat(locale, {
		dateStyle: "full",
		timeZone: TIME_ZONE,
	});
	const currentQuests = dailyQuests(dailyGuides);
	const currentCosmetics = nestingWorkshopPacket?.cosmetics ?? [];

	const quests: DailyGuidesQuests = {
		loaded: JSON.stringify(currentQuests),
		options: DAILY_QUEST_VALUES.map((quest) => ({
			label: dailyQuestLabel(quest, t),
			value: String(quest),
		})),
		values: currentQuests.map((quest) =>
			quest === null || !isDailyQuest(quest) ? "" : String(quest),
		),
	};

	const travellingRock: DailyGuidesTravellingRock = {
		imageURL:
			dailyGuides.travelling_rock === null
				? null
				: cdnAssetURL(CDN_URL, `daily_guides/travelling_rocks/${dailyGuides.travelling_rock}.webp`),
		loaded: travellingRockLoaded(dailyGuides),
		notSpawned: dailyGuides.travelling_rock_not_spawned === true,
	};

	const nestingWorkshop: DailyGuidesNestingWorkshop | null = nestingWorkshopStart
		? {
				categories: NESTING_WORKSHOP_ROTATION_CATEGORY_VALUES.map((category) => ({
					category,
					props: NestingWorkshopRotationCategoryToCosmetics[category].map((cosmetic) => {
						const [item] = resolveNestingWorkshopItems([cosmetic]);
						const emoji = item ? itemEmoji(item) : null;

						return {
							cosmetic,
							emoji: emoji ?? MISCELLANEOUS_EMOJIS.QuestionMark,
							name: item ? itemName(item, t) : String(cosmetic),
						};
					}),
				})),
				cosmetics: currentCosmetics,
				loaded: JSON.stringify(currentCosmetics),
				rotation: nestingWorkshopStart.toPlainDate().toString(),
				rotationLabel: fullDateFormat.format(nestingWorkshopStart.epochMilliseconds),
			}
		: null;

	return {
		card: dailyGuidesCardData({
			dailyGuides,
			date: today,
			hour12,
			locale,
			nestingWorkshop: nestingWorkshopProps,
			t,
			timeZone,
			timeZoneEstimated,
			today,
		}),
		initialTimestamp: now.epochMilliseconds,
		nestingWorkshop,
		quests,
		travellingRock,
	};
};

async function saveQuests(formData: FormData, user: APIDailyGuidesUser, today: Temporal.PlainDate) {
	if (formData.get("date") !== today.toString()) {
		return failure("quests", DATE_RESET_ERROR, 409);
	}

	const nextQuests = parseQuests(formData);

	if (!nextQuests) {
		return failure("quests", INVALID_REQUEST_ERROR, 400);
	}

	const nextMembers = nextQuests.filter((quest) => quest !== null);

	if (new Set(nextMembers).size !== nextMembers.length) {
		return failure("quests", "Duplicate quests detected.", 422);
	}

	const dailyGuides = await fetchDailyGuides(database, today);
	const previousQuests = dailyQuests(dailyGuides);

	if (formData.get("loaded") !== JSON.stringify(previousQuests)) {
		return failure("quests", "The quests changed since this page was loaded.", 409);
	}

	if (previousQuests.every((quest, index) => quest === nextQuests[index])) {
		return failure("quests", NO_CHANGES_ERROR, 422);
	}

	const previousMembers = new Set(previousQuests.filter((quest) => quest !== null));
	const previous = dailyQuestsObject(previousQuests);
	const next = dailyQuestsObject(nextQuests);
	const previousState = dailyGuidesState(dailyGuides);

	const reordered =
		nextMembers.length === previousMembers.size &&
		nextMembers.every((quest) => previousMembers.has(quest));

	const logged = await logDailyGuidesModification(
		reordered
			? { type: DailyGuidesModificationType.QuestsReorder, user, previous, next }
			: {
					type: DailyGuidesModificationType.Set,
					user,
					previous: previousState,
					next: { ...previousState, ...next },
				},
	);

	if (logged !== "logged") {
		return failure("quests", LOG_ERRORS[logged], 503);
	}

	try {
		await updateDailyGuides(database, today, {
			...next,
			last_updated_at: new Date(),
			last_updated_user_id: user.id,
		});
	} catch (error) {
		pino.error(error, "Failed to save the daily quests.");
		return failure("quests", SAVE_FAILED_ERROR, 500);
	}

	return data({ intent: "quests", ok: true, reordered } as const);
}

async function saveTravellingRock(
	formData: FormData,
	user: APIDailyGuidesUser,
	today: Temporal.PlainDate,
) {
	if (formData.get("date") !== today.toString()) {
		return failure("travelling-rock", DATE_RESET_ERROR, 409);
	}

	const image = formData.get("travelling-rock");
	const file = image instanceof File && image.size > 0 ? image : null;
	const notSpawned = formData.get("travelling-rock-not-spawned") === "true";

	if (file && notSpawned) {
		return failure(
			"travelling-rock",
			"The travelling rock cannot have an image and be marked as not spawned.",
			422,
		);
	}

	if (file && !isValidImageAsset(file, MAXIMUM_TRAVELLING_ROCK_SIZE)) {
		return failure("travelling-rock", TRAVELLING_ROCK_INVALID_IMAGE_ERROR, 422);
	}

	const dailyGuides = await fetchDailyGuides(database, today);

	if (formData.get("loaded") !== travellingRockLoaded(dailyGuides)) {
		return failure(
			"travelling-rock",
			"The travelling rock changed since this page was loaded.",
			409,
		);
	}

	if (!file && notSpawned === dailyGuides.travelling_rock_not_spawned) {
		return failure("travelling-rock", NO_CHANGES_ERROR, 422);
	}

	let travellingRock = notSpawned ? null : dailyGuides.travelling_rock;

	if (file) {
		try {
			travellingRock = await uploadTravellingRock(file);
		} catch (error) {
			pino.error(error, "Failed to upload a travelling rock.");
			return failure("travelling-rock", "The image couldn't be processed or uploaded.", 500);
		}
	}

	const previousState = dailyGuidesState(dailyGuides);

	const logged = await logDailyGuidesModification({
		type: DailyGuidesModificationType.Set,
		user,
		previous: previousState,
		next: { ...previousState, travellingRock, travellingRockNotSpawned: notSpawned },
	});

	if (logged !== "logged") {
		return failure("travelling-rock", LOG_ERRORS[logged], 503);
	}

	try {
		await updateDailyGuides(database, today, {
			last_updated_at: new Date(),
			last_updated_user_id: user.id,
			travelling_rock: travellingRock,
			travelling_rock_not_spawned: notSpawned,
		});
	} catch (error) {
		pino.error(error, "Failed to save the travelling rock.");
		return failure("travelling-rock", SAVE_FAILED_ERROR, 500);
	}

	return data({ intent: "travelling-rock", ok: true } as const);
}

async function saveNestingWorkshop(
	formData: FormData,
	user: APIDailyGuidesUser,
	now: Temporal.ZonedDateTime,
) {
	const start = currentNestingWorkshop(now);

	if (!start || formData.get("rotation") !== start.toPlainDate().toString()) {
		return failure(
			"nesting-workshop",
			"The Nesting Workshop has reset since this page was loaded.",
			409,
		);
	}

	const cosmetics = parseCosmetics(formData);

	if (!cosmetics) {
		return failure("nesting-workshop", INVALID_REQUEST_ERROR, 400);
	}

	if (cosmetics.length === 0) {
		return failure("nesting-workshop", "No props were selected.", 422);
	}

	if (cosmetics.length > NESTING_WORKSHOP_MAXIMUM_PROPS) {
		return failure(
			"nesting-workshop",
			`The maximum limit is ${NESTING_WORKSHOP_MAXIMUM_PROPS}.`,
			422,
		);
	}

	const today = now.toPlainDate();
	const previous = (await fetchNestingWorkshop(database, today))?.cosmetics ?? [];

	if (formData.get("loaded") !== JSON.stringify(previous)) {
		return failure(
			"nesting-workshop",
			"The Nesting Workshop props changed since this page was loaded.",
			409,
		);
	}

	if (
		previous.length === cosmetics.length &&
		cosmetics.every((cosmetic, index) => cosmetic === previous[index])
	) {
		return failure("nesting-workshop", NO_CHANGES_ERROR, 422);
	}

	const reordered =
		previous.length === cosmetics.length &&
		cosmetics.every((cosmetic) => previous.includes(cosmetic));

	const logged = await logDailyGuidesModification({
		type: reordered
			? DailyGuidesModificationType.NestingWorkshopReorder
			: DailyGuidesModificationType.NestingWorkshopSet,
		user,
		previous,
		next: cosmetics,
	});

	if (logged !== "logged") {
		return failure("nesting-workshop", LOG_ERRORS[logged], 503);
	}

	try {
		await updateNestingWorkshop(database, today, {
			cosmetics,
			last_updated_at: new Date(),
			last_updated_user_id: user.id,
		});
	} catch (error) {
		pino.error(error, "Failed to save the Nesting Workshop props.");
		return failure("nesting-workshop", SAVE_FAILED_ERROR, 500);
	}

	return data({ intent: "nesting-workshop", ok: true, reordered } as const);
}

async function startDistribution(user: APIDailyGuidesUser) {
	const result = await distributeDailyGuides({ user });

	if (result === "in-progress") {
		return failure("distribute", "A distribution is already in progress.", 409);
	}

	if (result === "unavailable") {
		return failure(
			"distribute",
			"Caelus couldn't start a distribution. Try again in a moment.",
			503,
		);
	}

	return data({ intent: "distribute", ok: true } as const);
}

export const action = async ({ context, request, url }: Route.ActionArgs) => {
	const { discordUser } = await requireAdminAccess({ context, request, url });
	const formData = await request.formData();
	const intent = formData.get("intent");
	const now = skyNow();

	const user: APIDailyGuidesUser = {
		discriminator: discordUser.discriminator,
		id: discordUser.id,
		username: discordUser.username,
	};

	if (intent === "quests") {
		return saveQuests(formData, user, now.toPlainDate());
	}

	if (intent === "travelling-rock") {
		return saveTravellingRock(formData, user, now.toPlainDate());
	}

	if (intent === "nesting-workshop") {
		return saveNestingWorkshop(formData, user, now);
	}

	if (intent === "distribute") {
		return startDistribution(user);
	}

	throw new Response("Unknown intent.", { status: 400 });
};

export function shouldRevalidate({
	actionStatus,
	defaultShouldRevalidate,
}: ShouldRevalidateFunctionArgs) {
	return actionStatus === 409 || defaultShouldRevalidate;
}

function DailyGuidesEditDisclosure({ children, label }: { children: ReactNode; label: string }) {
	return (
		<details className="mt-3">
			<summary className="regular-link inline-flex cursor-pointer list-none items-center gap-1 text-xs font-medium [&::-webkit-details-marker]:hidden">
				<Pencil className="h-3 w-3" />
				<span>{label}</span>
			</summary>
			<div className="mt-3">{children}</div>
		</details>
	);
}

export default function AdminDailyGuides({ loaderData }: Route.ComponentProps) {
	const { card, initialTimestamp, nestingWorkshop, quests, travellingRock } = loaderData;

	const currentTimestamp = useCurrentTimestamp(initialTimestamp);
	useSkyDailyResetRevalidator(currentTimestamp, initialTimestamp);

	return (
		<SitePage>
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
				<Link
					className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
					to="/admin"
				>
					<ArrowLeft className="h-4 w-4" />
					<span>Back</span>
				</Link>

				<DailyGuidesCard
					card={card}
					currentTimestamp={currentTimestamp}
					editors={{
						nestingWorkshop: nestingWorkshop && (
							<DailyGuidesEditDisclosure label="Edit Nesting Workshop">
								<DailyGuidesNestingWorkshopForm
									key={nestingWorkshop.rotation}
									nestingWorkshop={nestingWorkshop}
								/>
							</DailyGuidesEditDisclosure>
						),
						quests: (
							<DailyGuidesEditDisclosure label="Edit quests">
								<DailyGuidesQuestsForm date={card.date} key={card.date} quests={quests} />
							</DailyGuidesEditDisclosure>
						),
						travellingRock: (
							<DailyGuidesEditDisclosure label="Edit travelling rock">
								<DailyGuidesTravellingRockForm
									date={card.date}
									key={card.date}
									travellingRock={travellingRock}
								/>
							</DailyGuidesEditDisclosure>
						),
					}}
				/>

				<div className="mx-auto w-full max-w-lg">
					<DailyGuidesDistributeForm key={card.date} />
				</div>
			</div>
		</SitePage>
	);
}
