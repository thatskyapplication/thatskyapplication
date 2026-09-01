import { clsx } from "clsx";
import { Check } from "lucide-react";
import { useFetcher } from "react-router";
import { ActionButton } from "~/components/ActionButton.js";
import { SkeletonText } from "~/components/SkeletonText.js";
import { SkyProfileReportSnapshots } from "~/components/sky-profile-reports/SkyProfileReportSnapshots.js";
import { UserChip, type UserChipUser } from "~/components/UserChip.js";
import type { action } from "~/routes/admin.sky-profile-reports.js";
import { FIELD_ERROR_CLASS, SECTION_CARD_CLASS } from "~/utility/styles.js";

export interface SkyProfileReport {
	actionedBy: UserChipUser | null;
	actionedLabel: string | null;
	createdLabel: string;
	hasBanner: boolean;
	hasIcon: boolean;
	id: number;
	snapshotExpired: boolean;
	reason: string;
	reportedUser: UserChipUser;
	reporter: UserChipUser;
}

export function SkyProfileReportCard({
	report,
	timeZoneEstimated,
}: {
	report: SkyProfileReport;
	timeZoneEstimated: boolean;
}) {
	const {
		actionedBy,
		actionedLabel,
		createdLabel,
		hasBanner,
		hasIcon,
		id,
		reason,
		reportedUser,
		reporter,
		snapshotExpired,
	} = report;
	const fetcher = useFetcher<typeof action>();
	const isSaving = fetcher.state !== "idle";

	const pending = actionedLabel === null;
	const actioned = isSaving || !pending;
	const error = fetcher.data?.ok === false ? fetcher.data.error : null;
	const errorId = `sky-profile-report-error-${id}`;

	return (
		<div className={SECTION_CARD_CLASS}>
			<div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
				<h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Report #{id}</h3>
				<span
					className={clsx(
						"shrink-0 font-mono text-xs tracking-widest uppercase",
						actioned ? "text-green-800 dark:text-green-400" : "text-amber-700 dark:text-amber-400",
					)}
				>
					{actioned ? "Actioned" : "Pending"}
				</span>
			</div>

			<div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
				<UserChip user={reportedUser} />
				<span>reported by</span>
				<UserChip user={reporter} />
			</div>

			<p className="text-sm whitespace-pre-wrap text-gray-900 dark:text-gray-100">{reason}</p>

			<SkyProfileReportSnapshots
				hasBanner={hasBanner}
				hasIcon={hasIcon}
				id={id}
				snapshotExpired={snapshotExpired}
			/>

			<div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-2">
				<div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-600 dark:text-gray-400">
					<span>
						{timeZoneEstimated ? <SkeletonText>{createdLabel}</SkeletonText> : createdLabel}
					</span>
					{actionedLabel !== null && (
						<>
							<span aria-hidden="true">&middot;</span>
							<span className="flex items-center gap-1">
								Actioned{" "}
								{timeZoneEstimated ? <SkeletonText>{actionedLabel}</SkeletonText> : actionedLabel}
								{actionedBy && <UserChip user={actionedBy} />}
							</span>
						</>
					)}
				</div>

				{pending && (
					<fetcher.Form method="post">
						<input name="id" type="hidden" value={id} />
						<ActionButton
							aria-describedby={error ? errorId : undefined}
							disabled={isSaving}
							type="submit"
							variant="primary"
						>
							<Check className="h-4 w-4" />
							<span>{isSaving ? "Actioning..." : "Actioned"}</span>
						</ActionButton>
					</fetcher.Form>
				)}
			</div>

			{error && (
				<p className={FIELD_ERROR_CLASS} id={errorId}>
					{error}
				</p>
			)}

			<span className="sr-only" role="status">
				{isSaving ? "Actioning the report." : (error ?? "")}
			</span>
		</div>
	);
}
