import { Meter } from "@base-ui/react/meter";

export function ProgressBar({ label, percentage }: { label: string; percentage: number }) {
	return (
		<Meter.Root aria-label={label} className="w-full" value={percentage}>
			<Meter.Track className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
				<Meter.Indicator className="h-full rounded-full bg-blue-500 transition-all" />
			</Meter.Track>
		</Meter.Root>
	);
}
