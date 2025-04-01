import { SiDiscord } from "@icons-pack/react-simple-icons";
import { Link } from "@remix-run/react";
import { ChevronLeftIcon, LinkIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocale } from "~/contexts/LocaleContext";
import { INVITE_APPLICATION_URL, INVITE_SUPPORT_SERVER_URL } from "~/utility/constants";
import { timeString } from "~/utility/functions";

interface TopBarOptions {
	back?: string | undefined;
	hideBack?: boolean | undefined;
}

export default function TopBar({ back, hideBack }: TopBarOptions) {
	const locale = useLocale();
	const [currentTime, setCurrentTime] = useState(timeString(locale));

	useEffect(() => {
		const updateTime = () => {
			const time = timeString(locale);
			setCurrentTime(time);
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	}, [locale]);

	return (
		<div className="fixed top-4 left-0 z-50 w-full px-4">
			<div className="max-w mx-auto p-4 rounded bg-gray-100/75 dark:bg-gray-900/75 shadow backdrop-blur-sm border border-gray-300 dark:border-gray-700">
				<div className="flex justify-between items-center">
					<div>
						{!hideBack && (
							<Link
								to={back ?? "/"}
								className="flex hover:text-gray-400 text-sm hover:outline-none items-center"
								aria-label="Back"
							>
								<ChevronLeftIcon className="h-5 w-5 mr-2" />
								Back
							</Link>
						)}
					</div>
					<div className="flex space-x-2">
						<a
							href={INVITE_APPLICATION_URL}
							className="flex hover:text-gray-400 hover:outline-none"
							target="_blank"
							rel="noopener noreferrer"
						>
							<LinkIcon className="h-5 w-5 mr-2" />
						</a>
						<a
							href={INVITE_SUPPORT_SERVER_URL}
							className="flex hover:text-gray-400 hover:outline-none"
							target="_blank"
							rel="noopener noreferrer"
						>
							<SiDiscord className="h-5 w-5 mr-2" />
						</a>
						<div className="border-l border-dashed border-black dark:border-white pl-4">
							<span className="flex text-sm font-mono">
								<div className="hidden md:block">{currentTime.lg}</div>
								<div className="md:hidden">{currentTime.sm}</div>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
