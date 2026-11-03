import { clsx } from "clsx";
import { AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SkeletonText } from "~/components/SkeletonText";
import { WARNING_BANNER_CLASS } from "~/utility/styles.js";

export function MaintenanceBanner({
	className,
	maintenances,
	timeZoneEstimated,
}: {
	className?: string | undefined;
	maintenances: readonly { end: string; key: number; start: string }[];
	timeZoneEstimated: boolean;
}) {
	const { t } = useTranslation();

	const description =
		maintenances.length === 1
			? t("maintenance-description-singular", {
					ns: "general",
					start: maintenances[0]!.start,
					end: maintenances[0]!.end,
				})
			: null;

	return (
		<div className={clsx(WARNING_BANNER_CLASS, "flex items-center gap-3", className)}>
			<AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
			<div>
				<p className="text-sm font-medium text-amber-800 dark:text-amber-200">
					{t("maintenance", { ns: "general" })}
				</p>
				{description ? (
					<p className="text-xs text-amber-700 dark:text-amber-300">
						{timeZoneEstimated ? <SkeletonText>{description}</SkeletonText> : description}
					</p>
				) : (
					<>
						<p className="text-xs text-amber-700 dark:text-amber-300">
							{t("maintenance-description-many", { ns: "general" })}
						</p>
						<ul className="m-0 list-disc ps-4 text-xs text-amber-600 dark:text-amber-400">
							{maintenances.map(({ end, key, start }) => {
								const range = t("time-range", { ns: "general", start, end });

								return (
									<li key={key}>
										{timeZoneEstimated ? <SkeletonText>{range}</SkeletonText> : range}
									</li>
								);
							})}
						</ul>
					</>
				)}
			</div>
		</div>
	);
}
