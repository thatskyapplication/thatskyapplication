import { clsx } from "clsx";
import { Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCDNURL } from "~/hooks/use-cdn-url.js";
import { cdnAssetURL } from "~/utility/cdn.js";

interface TimeTopBarProps {
	className?: string | undefined;
	localTime: string;
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
			<div className="flex-1 flex items-center gap-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg px-3 py-2">
				<Clock className="h-4 w-4 text-gray-500 dark:text-gray-400 shrink-0" />
				<div>
					<div className="text-sm font-mono font-medium text-gray-900 dark:text-gray-100 leading-tight">
						{localTime}
					</div>
					<div className="text-[11px] text-gray-400 dark:text-gray-500 leading-tight">
						{t("schedule.local-time-notice", { ns: "features" })}
					</div>
				</div>
			</div>
			<div
				className="flex items-center gap-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg px-3 py-2"
				title={t("schedule.sky-time", { ns: "features" })}
			>
				<div
					className="h-4 w-4 shrink-0 rounded-[22.37%] bg-cover bg-center"
					style={{
						backgroundImage: `url(${cdnAssetURL(cdnURL, "assets/sky_logo.webp")})`,
					}}
				/>
				<div className="text-xs font-mono text-gray-500 dark:text-gray-400">{skyTime}</div>
			</div>
		</div>
	);
}
