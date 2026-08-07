import { SiCrowdin, SiDiscord } from "@icons-pack/react-simple-icons";
import { BookOpen, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { SitePage } from "~/components/PageLayout";
import { useCDNURL } from "~/hooks/use-cdn-url.js";
import { cdnAssetURL } from "~/utility/cdn.js";
import {
	APPLICATION_NAME,
	GUIDE_URL,
	INVITE_APPLICATION_URL,
	INVITE_SUPPORT_SERVER_URL,
} from "~/utility/constants";

export default function CaelusIndex() {
	const { t } = useTranslation();
	const cdnURL = useCDNURL();
	const links = [
		{
			to: GUIDE_URL,
			label: "Guide",
			description: "Learn how to use Caelus.",
			icon: <BookOpen className="h-5 w-5 text-green-600" />,
			external: true,
		},
		{
			to: INVITE_SUPPORT_SERVER_URL,
			label: t("support-server", { ns: "general" }),
			description: "Get help, report bugs, or just hang out.",
			icon: <SiDiscord className="h-5 w-5 text-[#5865F2]" />,
			external: true,
		},
		{
			to: "https://guide.thatskyapplication.com/translating",
			label: "Translations",
			description: "Help translate Caelus into your language.",
			icon: <SiCrowdin className="h-5 w-5 text-[#263238] dark:text-white" />,
			external: true,
		},
		{
			to: "/acknowledgements",
			label: "Acknowledgements",
			description: "The people that make Caelus possible.",
			icon: <Heart className="h-5 w-5 text-pink-600 dark:text-pink-400" />,
			external: false,
		},
	] as const;

	return (
		<SitePage>
			<div className="container mx-auto max-w-3xl">
				<div className="mb-16 flex flex-col items-center text-center">
					<div
						aria-label={`${APPLICATION_NAME} icon.`}
						className="mb-6 h-24 w-24 rounded-full bg-cover bg-center shadow-lg"
						role="img"
						style={{ backgroundImage: `url(${cdnAssetURL(cdnURL, "avatar_icons/caelus.webp")})` }}
					/>
					<h1 className="mb-3 text-4xl font-bold sm:text-5xl">{APPLICATION_NAME}</h1>
					<p className="max-w-md text-lg text-gray-500 dark:text-gray-400">
						The Discord application for Sky: Children of the Light.
					</p>
					<div className="mt-8 flex gap-3">
						<a
							className="inline-flex items-center gap-2 rounded-xl bg-discord-button px-6 py-3 font-semibold text-white no-underline transition-colors hover:bg-discord-button/80"
							href={INVITE_APPLICATION_URL}
							rel="noopener noreferrer"
							target="_blank"
						>
							<SiDiscord className="h-5 w-5" />
							Add to Server
						</a>
					</div>
				</div>

				<div className="grid gap-3 sm:grid-cols-2">
					{links.map((link) =>
						link.external ? (
							<a
								className="flex items-start gap-4 rounded-xl border-2 border-gray-200 bg-white p-5 no-underline transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
								href={link.to}
								key={link.label}
								rel="noopener noreferrer"
								target="_blank"
							>
								<div className="mt-0.5 text-gray-400 dark:text-gray-500">{link.icon}</div>
								<div>
									<p className="m-0 font-semibold text-gray-900 dark:text-white">{link.label}</p>
									<p className="m-0 mt-1 text-sm text-gray-500 dark:text-gray-400">
										{link.description}
									</p>
								</div>
							</a>
						) : (
							<Link
								className="flex items-start gap-4 rounded-xl border-2 border-gray-200 bg-white p-5 no-underline transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
								key={link.label}
								to={link.to}
							>
								<div className="mt-0.5 text-gray-400 dark:text-gray-500">{link.icon}</div>
								<div>
									<p className="m-0 font-semibold text-gray-900 dark:text-white">{link.label}</p>
									<p className="m-0 mt-1 text-sm text-gray-500 dark:text-gray-400">
										{link.description}
									</p>
								</div>
							</Link>
						),
					)}
				</div>
			</div>
		</SitePage>
	);
}
