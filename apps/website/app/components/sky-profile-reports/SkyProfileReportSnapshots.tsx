import { useState } from "react";
import { InfographicPreview } from "~/components/InfographicPreview.js";
import { SKY_PROFILE_REPORT_RETENTION_DAYS } from "~/utility/sky-profile-reports.js";

const SNAPSHOT_LABELS = { banner: "Banner", icon: "Icon" } as const;

type Snapshot = keyof typeof SNAPSHOT_LABELS;

export function SkyProfileReportSnapshots({
	hasBanner,
	hasIcon,
	id,
	snapshotExpired,
}: {
	hasBanner: boolean;
	hasIcon: boolean;
	id: number;
	snapshotExpired: boolean;
}) {
	const [previewing, setPreviewing] = useState<Snapshot | null>(null);
	const snapshots: Snapshot[] = [];

	if (hasIcon) {
		snapshots.push("icon");
	}

	if (hasBanner) {
		snapshots.push("banner");
	}

	if (snapshots.length === 0) {
		return (
			<p className="my-0 text-xs text-gray-600 dark:text-gray-400">
				No icon or banner when reported.
			</p>
		);
	}

	if (snapshotExpired) {
		return (
			<p className="my-0 text-xs text-gray-600 dark:text-gray-400">
				Snapshots expired after {SKY_PROFILE_REPORT_RETENTION_DAYS} days.
			</p>
		);
	}

	return (
		<div className="flex flex-wrap gap-2">
			{snapshots.map((snapshot) => (
				<button
					aria-label={`Open the ${SNAPSHOT_LABELS[snapshot].toLowerCase()} snapshot.`}
					className="flex cursor-pointer flex-col items-center gap-1 rounded-lg border border-gray-300 bg-white p-1 transition-shadow hover:ring-2 hover:ring-blue-500 hover:ring-inset focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset dark:border-gray-600 dark:bg-gray-800 dark:hover:ring-blue-400 dark:focus-visible:ring-blue-400"
					key={snapshot}
					onClick={() => setPreviewing(snapshot)}
					type="button"
				>
					<div
						className="h-16 w-16 bg-contain bg-center bg-no-repeat"
						style={{ backgroundImage: `url(/admin/sky-profile-reports/${id}/${snapshot})` }}
					/>
					<span className="text-[11px] text-gray-600 dark:text-gray-400">
						{SNAPSHOT_LABELS[snapshot]}
					</span>
				</button>
			))}

			{previewing && (
				<InfographicPreview
					acknowledgement={null}
					imageURL={`/admin/sky-profile-reports/${id}/${previewing}`}
					onClose={() => setPreviewing(null)}
					title={`${SNAPSHOT_LABELS[previewing]} snapshot`}
				/>
			)}
		</div>
	);
}
