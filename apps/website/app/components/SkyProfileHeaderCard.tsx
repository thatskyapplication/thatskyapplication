import { Edit } from "lucide-react";
import type { ReactNode } from "react";

interface SkyProfileHeaderCardProps {
	bannerURL: string | null;
	bannerUploadInputId?: string;
	children: ReactNode;
	iconURL: string | null;
	iconUploadInputId?: string;
	name: string | null;
}

export default function SkyProfileHeaderCard({
	bannerURL,
	bannerUploadInputId,
	children,
	iconURL,
	iconUploadInputId,
	name,
}: SkyProfileHeaderCardProps) {
	const interactiveBanner = Boolean(bannerUploadInputId);
	const interactiveIcon = Boolean(iconUploadInputId);

	return (
		<div className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
			<div className="relative h-60 w-full">
				<div className="w-full h-full rounded-md overflow-hidden">
					{bannerURL ? (
						<div
							aria-label={name ? `Banner of ${name}.` : "Sky profile banner."}
							className="w-full h-full bg-cover bg-center"
							role="img"
							style={{ backgroundImage: `url(${bannerURL})` }}
						/>
					) : (
						<div className="w-full h-full bg-gray-200 dark:bg-gray-600" />
					)}
				</div>
				{interactiveBanner ? (
					<label
						aria-label={bannerURL ? "Change banner" : "Upload banner"}
						className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/85 text-white shadow-lg transition-colors hover:bg-black"
						htmlFor={bannerUploadInputId}
					>
						<Edit className="h-4 w-4" />
					</label>
				) : null}
				<div className="absolute -bottom-8 left-4 h-20 w-20">
					{interactiveIcon ? (
						<label
							aria-label={iconURL ? "Change icon" : "Upload icon"}
							className="group block h-20 w-20 cursor-pointer"
							htmlFor={iconUploadInputId}
						>
							{iconURL ? (
								<div
									aria-label={name ? `Icon of ${name}.` : "Sky profile icon."}
									className="h-20 w-20 rounded-full border-4 border-white bg-cover bg-center transition-transform duration-200 group-hover:scale-105"
									role="img"
									style={{ backgroundImage: `url(${iconURL})` }}
								/>
							) : (
								<div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gray-300 px-2 text-center text-xs font-medium text-white transition-colors duration-200 group-hover:bg-gray-400 dark:bg-gray-500 dark:group-hover:bg-gray-400">
									Add icon
								</div>
							)}
						</label>
					) : iconURL ? (
						<div
							aria-label={name ? `Icon of ${name}.` : "Sky profile icon."}
							className="h-20 w-20 rounded-full border-4 border-white bg-cover bg-center"
							role="img"
							style={{ backgroundImage: `url(${iconURL})` }}
						/>
					) : null}
				</div>
			</div>
			<div className="px-4 pt-10 pb-2">{children}</div>
		</div>
	);
}
