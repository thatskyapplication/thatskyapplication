import { Edit } from "lucide-react";
import type { ReactNode } from "react";

interface SkyProfileHeaderCardProps {
	bannerURL: string | null;
	children: ReactNode;
	disabled?: boolean;
	iconURL: string | null;
	name: string | null;
	onBannerUploadClick?: () => void;
	onIconUploadClick?: () => void;
}

export default function SkyProfileHeaderCard({
	bannerURL,
	children,
	disabled = false,
	iconURL,
	name,
	onBannerUploadClick,
	onIconUploadClick,
}: SkyProfileHeaderCardProps) {
	const interactiveBanner = Boolean(onBannerUploadClick) && !disabled;
	const interactiveIcon = Boolean(onIconUploadClick) && !disabled;

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-100 shadow-lg dark:border-gray-600 dark:bg-gray-700">
			<div className="relative aspect-17/6 w-full">
				<div className="h-full w-full overflow-hidden rounded-t-lg">
					{bannerURL ? (
						<img
							alt={name ? `Banner of ${name}.` : "Sky profile banner."}
							className="pointer-events-none h-full w-full object-cover"
							fetchPriority="high"
							src={bannerURL}
						/>
					) : (
						<div className="h-full w-full bg-gray-200 dark:bg-gray-600" />
					)}
				</div>
				{interactiveBanner ? (
					<button
						aria-label={bannerURL ? "Change banner" : "Upload banner"}
						className="absolute top-3 right-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/85 text-white shadow-lg transition-colors hover:bg-black focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 focus-visible:outline-none"
						onClick={onBannerUploadClick}
						type="button"
					>
						<Edit className="h-4 w-4" />
					</button>
				) : null}
				{interactiveIcon || iconURL ? (
					<div className="absolute -bottom-8 left-4 h-20 w-20">
						{interactiveIcon ? (
							<button
								aria-label={iconURL ? "Change icon" : "Upload icon"}
								className="group block h-20 w-20 rounded-full focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 focus-visible:outline-none dark:focus-visible:ring-blue-300 dark:focus-visible:ring-offset-gray-700"
								onClick={onIconUploadClick}
								type="button"
							>
								{iconURL ? (
									<img
										alt={name ? `Icon of ${name}.` : "Sky profile icon."}
										className="pointer-events-none h-20 w-20 rounded-full border-4 border-white object-cover transition-transform duration-200 group-hover:scale-105"
										src={iconURL}
									/>
								) : (
									<div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gray-300 px-2 text-center text-xs font-medium text-white transition-colors duration-200 group-hover:bg-gray-400 dark:bg-gray-500 dark:group-hover:bg-gray-400">
										Add icon
									</div>
								)}
							</button>
						) : iconURL ? (
							<img
								alt={name ? `Icon of ${name}.` : "Sky profile icon."}
								className="pointer-events-none h-20 w-20 rounded-full border-4 border-white object-cover"
								src={iconURL}
							/>
						) : null}
					</div>
				) : null}
			</div>
			<div className="px-4 pt-10 pb-2">{children}</div>
		</div>
	);
}
