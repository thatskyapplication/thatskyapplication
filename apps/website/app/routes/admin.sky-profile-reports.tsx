import { ArrowLeft } from "lucide-react";
import { data, Link } from "react-router";
import { SitePage } from "~/components/PageLayout";
import {
	type SkyProfileReport,
	SkyProfileReportCard,
} from "~/components/sky-profile-reports/SkyProfileReportCard.js";
import database from "~/database.server.js";
import { requireAdminAccess } from "~/utility/functions.server.js";
import { SKY_PROFILE_REPORT_RETENTION_DAYS } from "~/utility/sky-profile-reports.js";
import { SECTION_HEADING_CLASS } from "~/utility/styles.js";
import { dateTimeFormatter } from "~/utility/time.js";
import { getTimePreferences } from "~/utility/time.server.js";
import { resolveUserChips } from "~/utility/users.server.js";
import type { Route } from "./+types/admin.sky-profile-reports.js";

export const loader = async ({ context, request, url }: Route.LoaderArgs) => {
	await requireAdminAccess({ context, request, url });
	const { locale, timeZone, timeZoneEstimated, hour12 } = getTimePreferences(request, context);

	const packets = await database
		.selectFrom("sky_profile_reports")
		.selectAll()
		.orderBy("created_at", "desc")
		.execute();

	const userIds = [
		...new Set(
			packets.flatMap((packet) =>
				packet.actioned_by_user_id === null
					? [packet.reported_user_id, packet.reporter_user_id]
					: [packet.reported_user_id, packet.reporter_user_id, packet.actioned_by_user_id],
			),
		),
	];

	const userChips = await resolveUserChips(userIds);
	const dateTimeFormat = dateTimeFormatter({ locale, timeZone, hour12 });

	const snapshotCutoff = Date.now() - SKY_PROFILE_REPORT_RETENTION_DAYS * 86_400_000;

	const reports: SkyProfileReport[] = packets.map((packet) => ({
		hasBanner: packet.banner !== null,
		hasIcon: packet.icon !== null,
		snapshotExpired: packet.created_at.getTime() < snapshotCutoff,
		actionedBy:
			packet.actioned_by_user_id === null ? null : userChips.get(packet.actioned_by_user_id)!,
		actionedLabel: packet.actioned_at === null ? null : dateTimeFormat.format(packet.actioned_at),
		createdLabel: dateTimeFormat.format(packet.created_at),
		id: packet.id,
		reason: packet.reason,
		reportedUser: userChips.get(packet.reported_user_id)!,
		reporter: userChips.get(packet.reporter_user_id)!,
	}));

	return {
		pendingReports: reports.filter((report) => report.actionedLabel === null),
		actionedReports: reports.filter((report) => report.actionedLabel !== null),
		timeZoneEstimated,
	};
};

export const action = async ({ context, request, url }: Route.ActionArgs) => {
	const { discordUser } = await requireAdminAccess({ context, request, url });
	const formData = await request.formData();

	const rawId = formData.get("id");
	const id = typeof rawId === "string" ? Number.parseInt(rawId, 10) : Number.NaN;

	if (!Number.isSafeInteger(id) || id <= 0) {
		return data({ error: "Invalid request.", ok: false } as const);
	}

	const result = await database
		.updateTable("sky_profile_reports")
		.set({ actioned_at: new Date(), actioned_by_user_id: discordUser.id })
		.where("id", "=", id)
		.where("actioned_at", "is", null)
		.executeTakeFirst();

	if (result.numUpdatedRows === 0n) {
		return data({ error: "That report is no longer pending.", ok: false } as const);
	}

	return data({ ok: true } as const);
};

export default function AdminSkyProfileReports({ loaderData }: Route.ComponentProps) {
	const { actionedReports, pendingReports, timeZoneEstimated } = loaderData;

	return (
		<SitePage>
			<div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
				<Link
					className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
					to="/admin"
				>
					<ArrowLeft className="h-4 w-4" />
					<span>Back</span>
				</Link>

				<div>
					<h1 className="mb-1 text-4xl font-bold">Sky profile reports</h1>
					<p className="mb-0 text-base text-gray-600 dark:text-gray-400">
						{pendingReports.length === 1
							? "1 pending report."
							: `${pendingReports.length} pending reports.`}
					</p>
				</div>

				<div className="flex flex-col gap-3">
					<h2 className={SECTION_HEADING_CLASS}>Pending ({pendingReports.length})</h2>

					{pendingReports.length === 0 ? (
						<p className="my-0 text-sm text-gray-600 dark:text-gray-400">Nothing to review.</p>
					) : (
						<ul className="m-0 flex list-none flex-col gap-3 p-0">
							{pendingReports.map((report) => (
								<li key={report.id}>
									<SkyProfileReportCard report={report} timeZoneEstimated={timeZoneEstimated} />
								</li>
							))}
						</ul>
					)}
				</div>

				{actionedReports.length > 0 && (
					<div className="flex flex-col gap-3">
						<h2 className={SECTION_HEADING_CLASS}>Actioned ({actionedReports.length})</h2>
						<ul className="m-0 flex list-none flex-col gap-3 p-0">
							{actionedReports.map((report) => (
								<li key={report.id}>
									<SkyProfileReportCard report={report} timeZoneEstimated={timeZoneEstimated} />
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</SitePage>
	);
}
