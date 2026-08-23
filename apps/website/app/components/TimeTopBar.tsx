import { clsx } from "clsx";
import { Clock } from "lucide-react";
import type React from "react";
import { useTranslation } from "react-i18next";
import { useCDNURL } from "~/hooks/use-cdn-url.js";
import { cdnAssetURL } from "~/utility/cdn.js";

interface TimeTopBarProps {
	className?: string | undefined;
	localTime: React.ReactNode;
	skyTime: string;
}

export function TimeTopBar({ className, localTime, skyTime }: TimeTopBarProps) {
	const cdnURL = useCDNURL();
	const { t } = useTranslation();

	return (
		<div
			className={clsx("sticky z-20 flex gap-3", className)}
			style={{ top: "calc(var(--site-top-bar-height, 0px) + 0.5rem)" }}
		>
			<div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/90">
				<Clock className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" />
				<div>
					<div className="font-mono text-sm leading-tight font-medium text-gray-900 dark:text-gray-100">
						{localTime}
					</div>
					<div className="text-[11px] leading-tight text-gray-400 dark:text-gray-500">
						{t("schedule.local-time-notice", { ns: "features" })}
					</div>
				</div>
			</div>
			<div
				className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/90"
				title={t("schedule.sky-time", { ns: "features" })}
			>
				<div
					className="h-4 w-4 shrink-0 rounded-[22.37%] bg-cover bg-center"
					style={{
						backgroundImage: `url(${cdnAssetURL(cdnURL, "assets/sky_logo.webp")})`,
					}}
				/>
				<div className="font-mono text-xs text-gray-500 dark:text-gray-400">{skyTime}</div>
			</div>
		</div>
	);
}
