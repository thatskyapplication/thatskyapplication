import { isPlatformId } from "@thatskyapplication/utility";
import { PlatformToIcon } from "~/utility/platform-icons.js";

export function PlatformBadges({
	className,
	platforms,
}: {
	className: string;
	platforms: readonly number[];
}) {
	return (
		<div className={className}>
			{platforms
				.filter((platform) => isPlatformId(platform))
				.toSorted((a, b) => a - b)
				.map((platform) => (
					<div
						className="bg-gray-200 dark:bg-gray-100 p-2 rounded-full shadow-sm items-center justify-center"
						key={platform}
					>
						{PlatformToIcon[platform]}
					</div>
				))}
		</div>
	);
}
