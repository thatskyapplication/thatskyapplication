import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { SkeletonText } from "~/components/SkeletonText";

const SHARD_ERUPTION_TIMESTAMP_VARIANT_CLASS_NAMES = {
	"daily-guides": {
		base: "text-xs",
		past: "text-gray-400 line-through dark:text-gray-500",
		upcoming: "text-gray-600 dark:text-gray-300",
	},
	"shard-eruption": {
		base: "bg-inherit text-xs",
		past: "text-black/50 line-through dark:text-white/50",
		upcoming: "",
	},
} as const;

type ShardEruptionTimestampVariant = keyof typeof SHARD_ERUPTION_TIMESTAMP_VARIANT_CLASS_NAMES;

interface ShardEruptionTimestampProps {
	currentUnix: number;
	end: { format: string; unix: number };
	start: { format: string; unix: number };
	timeZoneEstimated: boolean;
	variant: ShardEruptionTimestampVariant;
}

export function ShardEruptionTimestamp({
	currentUnix,
	end,
	start,
	timeZoneEstimated,
	variant,
}: ShardEruptionTimestampProps) {
	const { t } = useTranslation();
	const { base, past, upcoming } = SHARD_ERUPTION_TIMESTAMP_VARIANT_CLASS_NAMES[variant];
	const isPast = currentUnix >= end.unix;
	const isActive = !isPast && currentUnix >= start.unix;
	const range = t("time-range", { ns: "general", start: start.format, end: end.format });

	return (
		<span aria-current={isActive ? "time" : undefined} className="block">
			<span className="relative inline-flex">
				{isActive && (
					<span
						aria-hidden="true"
						className="absolute top-1/2 -left-3 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-green-700 dark:bg-green-400"
					/>
				)}
				<code className={clsx(base, isPast ? past : [upcoming, isActive && "font-semibold"])}>
					{timeZoneEstimated ? <SkeletonText>{range}</SkeletonText> : range}
				</code>
			</span>
		</span>
	);
}
