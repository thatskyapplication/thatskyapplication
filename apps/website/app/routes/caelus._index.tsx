import { type APIContainerComponent, ComponentType } from "@discordjs/core/http-only";
import { SiCrowdin, SiDiscord } from "@icons-pack/react-simple-icons";
import type { TFunction } from "i18next";
import { BookOpen, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { WEBSITE_URL } from "@thatskyapplication/utility";
import { SitePage } from "~/components/PageLayout";
import { getInstance, getLocale } from "~/middleware/i18next.js";
import {
	APPLICATION_BADGE_PATH,
	APPLICATION_COLOUR,
	APPLICATION_DESCRIPTION,
	APPLICATION_ICON_URL,
	APPLICATION_NAME,
	GUIDE_URL,
	INVITE_APPLICATION_URL,
	INVITE_SUPPORT_SERVER_URL,
} from "~/utility/constants";
import { linkButtonRows } from "~/utility/discord-component-embed.server.js";
import type { Route } from "./+types/caelus._index.js";

function caelusLinks(t: TFunction) {
	return [
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
			icon: <SiDiscord className="h-5 w-5 text-discord-button" />,
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
}

export const loader = ({ context, url }: Route.LoaderArgs) => {
	const discordComponentEmbed: APIContainerComponent = {
		type: ComponentType.Container,
		accent_color: APPLICATION_COLOUR,
		components: [
			{
				type: ComponentType.Section,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: `## [${APPLICATION_NAME}](${new URL(url.pathname, WEBSITE_URL).href})`,
					},
					{ type: ComponentType.TextDisplay, content: APPLICATION_DESCRIPTION },
				],
				accessory: { type: ComponentType.Thumbnail, media: { url: APPLICATION_ICON_URL } },
			},
			{ type: ComponentType.Separator },
			...linkButtonRows([
				{ label: "Add to server", to: INVITE_APPLICATION_URL },
				...caelusLinks(getInstance(context).getFixedT(getLocale(context))),
			]),
		],
	};

	return { discordComponentEmbed };
};

export default function CaelusIndex() {
	const { t } = useTranslation();
	const links = caelusLinks(t);

	return (
		<SitePage>
			<div className="container mx-auto max-w-3xl">
				<div className="mb-16 flex flex-col items-center text-center">
					<div
						aria-label={`${APPLICATION_NAME} icon.`}
						className="mb-6 h-24 w-24 rounded-full bg-cover bg-center shadow-lg"
						role="img"
						style={{ backgroundImage: `url(${APPLICATION_BADGE_PATH})` }}
					/>
					<h1 className="mb-3 text-4xl font-bold sm:text-5xl">{APPLICATION_NAME}</h1>
					<p className="my-4 max-w-md text-lg text-gray-500 dark:text-gray-400">
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
							Add to server
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
									<p className="font-semibold text-gray-900 dark:text-white">{link.label}</p>
									<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
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
									<p className="font-semibold text-gray-900 dark:text-white">{link.label}</p>
									<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
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
