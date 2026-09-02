import { Panel, SPLIT_ASIDE_CLASS, SPLIT_CLASS } from "./Panel.js";
import { Shimmer } from "./Shimmer.js";

export function GuessSkeleton() {
	return (
		<Panel>
			<Shimmer className="short:h-4 short:w-40 mx-auto h-5 w-48" />
			<div className={SPLIT_CLASS}>
				<Shimmer className="short:size-24 tiny:size-16 mx-auto size-32 sm:size-40" />
				<div className={SPLIT_ASIDE_CLASS}>
					<Shimmer className="h-1.5 w-full rounded-full" />
					<div className="flex flex-col gap-2">
						<Shimmer className="short:h-9 tiny:h-8 h-11 w-full" />
						<Shimmer className="short:h-9 tiny:h-8 h-11 w-full" />
						<Shimmer className="short:h-9 tiny:h-8 h-11 w-full" />
					</div>
				</div>
			</div>
			<Shimmer className="short:h-3 short:w-32 mx-auto h-4 w-40" />
		</Panel>
	);
}
