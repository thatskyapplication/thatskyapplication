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
				.sort((a, b) => a - b)
				.map((platform) => (
					<div
						className="items-center justify-center rounded-full bg-gray-200 p-2 shadow-sm dark:bg-gray-100"
						key={platform}
					>
						{PlatformToIcon[platform]}
					</div>
				))}
		</div>
	);
}
