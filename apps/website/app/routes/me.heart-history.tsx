import type { Snowflake } from "@discordjs/core/http-only";
import {
	DELETED_USER_TEXT,
	type HeartPacket,
	type SkyProfilePacket,
	Table,
} from "@thatskyapplication/utility";
import { ArrowLeft, HandHeart, HeartPlus } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { LoaderFunctionArgs } from "react-router";
import { Link, useLoaderData } from "react-router";
import { SitePage } from "~/components/PageLayout";
import Pagination from "~/components/Pagination";
import { Tooltip } from "~/components/Tooltip";
import pg from "~/pg.server";
import { discordEmojiURL } from "~/utility/cdn.js";
import { MISCELLANEOUS_EMOJIS } from "~/utility/emojis.js";
import { requireDiscordAuthentication } from "~/utility/functions.server.js";
import { getPreferredTimeZone } from "~/utility/time-zone.server.js";

const HEART_HISTORY_MAXIMUM_DISPLAY_NUMBER = 30 as const;

type RelatedProfile = Pick<SkyProfilePacket, "name" | "user_id">;

async function totalHearts(column: "giftee_id" | "user_id", userId: Snowflake) {
	const result = (await pg<HeartPacket>(Table.Hearts)
		.where({ [column]: userId })
		.sum("count")
		.first()) as unknown as { sum: string | null };

	return Number(result.sum ?? 0);
}

function parsePage(request: Request) {
	const page = Number(new URL(request.url).searchParams.get("page") ?? 1);
	return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { discordUser } = await requireDiscordAuthentication(request);
	const userId = discordUser.id;
	const requestedPage = parsePage(request);

	const [gifted, received, totalRows] = await Promise.all([
		totalHearts("user_id", userId),
		totalHearts("giftee_id", userId),
		pg<HeartPacket>(Table.Hearts)
			.where({ user_id: userId })
			.orWhere({ giftee_id: userId })
			.count({ totalRows: "*" })
			.first()
			.then((result) => Number(result?.totalRows ?? 0)),
	]);

	const maximumPage = Math.max(Math.ceil(totalRows / HEART_HISTORY_MAXIMUM_DISPLAY_NUMBER), 1);
	const currentPage = Math.min(requestedPage, maximumPage);
	const offset = (currentPage - 1) * HEART_HISTORY_MAXIMUM_DISPLAY_NUMBER;

	const heartPackets = await pg<HeartPacket>(Table.Hearts)
		.where({ user_id: userId })
		.orWhere({ giftee_id: userId })
		.orderBy("timestamp", "desc")
		.limit(HEART_HISTORY_MAXIMUM_DISPLAY_NUMBER)
		.offset(offset);

	const relatedUserIds = new Set<Snowflake>();

	for (const heartPacket of heartPackets) {
		if (heartPacket.user_id && heartPacket.user_id !== userId) {
			relatedUserIds.add(heartPacket.user_id);
		}

		if (heartPacket.giftee_id && heartPacket.giftee_id !== userId) {
			relatedUserIds.add(heartPacket.giftee_id);
		}
	}

	const relatedProfiles =
		relatedUserIds.size === 0
			? []
			: await pg<RelatedProfile>(Table.Profiles)
					.select("name", "user_id")
					.whereIn("user_id", [...relatedUserIds]);

	return {
		currentPage,
		gifted,
		heartPackets,
		maximumPage,
		received,
		relatedProfiles,
		timeZone: await getPreferredTimeZone(request),
		userId,
	};
};

function ProfileName({
	profileName,
	userId,
}: {
	profileName: string | null;
	userId: Snowflake | null;
}) {
	if (!userId) {
		return (
			<span className="block truncate font-medium text-gray-900 dark:text-gray-100">
				{DELETED_USER_TEXT}
			</span>
		);
	}

	if (!profileName) {
		return <NoProfileUserId userId={userId} />;
	}

	return (
		<Link
			className="block truncate font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 transition-colors hover:text-blue-700 hover:decoration-blue-400 dark:text-gray-100 dark:decoration-gray-600 dark:hover:text-blue-300"
			to={`/sky-profiles/${userId}`}
		>
			{profileName}
		</Link>
	);
}

function NoProfileUserId({ userId }: { userId: Snowflake }) {
	const { t } = useTranslation();
	const tooltip = t("sky-profile.no-sky-profile-sky-kid", {
		ns: "features",
	});

	return (
		<Tooltip content={tooltip}>
			<button
				className="block max-w-full cursor-help truncate border-0 bg-transparent p-0 text-left font-medium text-gray-900 dark:text-gray-100"
				type="button"
			>
				{userId}
			</button>
		</Tooltip>
	);
}

export default function HeartHistory() {
	const {
		currentPage,
		gifted,
		heartPackets,
		maximumPage,
		received,
		relatedProfiles,
		timeZone,
		userId,
	} = useLoaderData<typeof loader>();
	const { i18n, t } = useTranslation();
	const heartEmojiURL = discordEmojiURL(MISCELLANEOUS_EMOJIS.Heart.id);
	const profileByUserId = new Map(relatedProfiles.map((profile) => [profile.user_id, profile]));

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
						{t("heart.history-title", { ns: "features" })}
					</h1>
					<p className="mb-0 text-base text-gray-600 dark:text-gray-400">
						Review the hearts you have gifted and received.
					</p>
				</div>

				<div className="flex flex-wrap justify-center gap-3">
					<div className="flex min-w-40 flex-col items-center px-4 py-2">
						<p className="my-0 text-sm text-gray-600 dark:text-gray-400">Gifted</p>
						<p className="my-0 flex items-center gap-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
							<HandHeart className="h-5 w-5 shrink-0 text-gray-700 dark:text-gray-200" />
							{gifted.toLocaleString(i18n.language)}
						</p>
					</div>

					<div className="flex min-w-40 flex-col items-center px-4 py-2">
						<p className="my-0 text-sm text-gray-600 dark:text-gray-400">Received</p>
						<p className="my-0 flex items-center gap-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
							<HeartPlus className="h-5 w-5 shrink-0 text-gray-700 dark:text-gray-200" />
							{received.toLocaleString(i18n.language)}
						</p>
					</div>
				</div>

				{heartPackets.length === 0 ? (
					<div className="rounded-lg border border-gray-200 bg-gray-100 p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
						<div
							aria-label="Heart icon."
							className="discord-emoji mx-auto mb-3 h-8 w-8"
							role="img"
							style={{ backgroundImage: `url(${heartEmojiURL})` }}
						/>
						<p className="my-0 font-medium text-gray-900 dark:text-gray-100">
							No hearts have been gifted or received yet.
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-3 md:grid-cols-3">
						{heartPackets.map((heartPacket) => {
							const gifted = heartPacket.user_id === userId;
							const relatedUserId = gifted ? heartPacket.giftee_id : heartPacket.user_id;
							const relatedProfile = relatedUserId ? profileByUserId.get(relatedUserId) : undefined;
							const timestamp = heartPacket.timestamp.toISOString();

							return (
								<div
									className="flex min-w-0 items-center gap-2 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900"
									key={`${timestamp}-${gifted ? "gifted" : "received"}-${relatedUserId ?? "deleted"}`}
								>
									{gifted ? (
										<HandHeart className="h-5 w-5 shrink-0 text-gray-700 dark:text-gray-200" />
									) : (
										<HeartPlus className="h-5 w-5 shrink-0 text-gray-700 dark:text-gray-200" />
									)}

									<div className="flex min-w-0 flex-1 self-stretch flex-col justify-between gap-2">
										<div className="min-w-0">
											<p className="my-0 text-sm text-gray-700 dark:text-gray-300">
												{gifted ? "Gifted" : "Received"}{" "}
												{heartPacket.count.toLocaleString(i18n.language)}
												<span
													aria-label="Heart icon."
													className="discord-emoji mx-1 inline-block h-4 w-4 align-text-bottom"
													role="img"
													style={{ backgroundImage: `url(${heartEmojiURL})` }}
												/>
											</p>
											<p className="my-0 min-w-0 text-sm">
												<ProfileName
													profileName={relatedProfile?.name ?? null}
													userId={relatedUserId}
												/>
											</p>
										</div>
										<time className="text-xs text-gray-500 dark:text-gray-400" dateTime={timestamp}>
											{new Intl.DateTimeFormat(i18n.language, {
												dateStyle: "medium",
												timeStyle: "short",
												timeZone,
											}).format(heartPacket.timestamp)}
										</time>
									</div>
								</div>
							);
						})}
					</div>
				)}

				{maximumPage > 1 && <Pagination currentPage={currentPage} maximumPage={maximumPage} />}
			</div>
		</SitePage>
	);
}
