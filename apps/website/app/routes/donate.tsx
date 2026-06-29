import { SiDiscord, SiDiscordHex, SiGithub, SiGithubHex } from "@icons-pack/react-simple-icons";
import { GITHUB_SPONSORS_URL, WEBSITE_URL } from "@thatskyapplication/utility";
import { clsx } from "clsx";
import { ExternalLinkIcon, Heart } from "lucide-react";
import { SitePage } from "~/components/PageLayout";
import { cdnAssetURL, getCDNURLFromMatches } from "~/utility/cdn.js";
import { APPLICATION_NAME, DISCORD_DONATION_URL } from "~/utility/constants";
import type { Route } from "./+types/donate.js";

interface DonationMethod {
	alignClassName: string;
	brandColour: string;
	buttonClassName?: string;
	description: string;
	href: `https://${string}`;
	icon: React.ReactNode;
	name: string;
}

const DONATION_METHODS: readonly DonationMethod[] = [
	{
		alignClassName: "sm:mr-auto",
		brandColour: SiDiscordHex,
		description: "Donate through the Caelus store on Discord.",
		href: DISCORD_DONATION_URL,
		icon: <SiDiscord className="h-6 w-6" />,
		name: "Discord",
	},
	{
		alignClassName: "sm:ml-auto",
		brandColour: SiGithubHex,
		buttonClassName: "dark:ring-1 dark:ring-[#30363D]",
		description: "Support thatskyapplication via GitHub Sponsors.",
		href: GITHUB_SPONSORS_URL,
		icon: <SiGithub className="h-6 w-6" />,
		name: "GitHub",
	},
];

const DONATE_TITLE = "Donate" as const;
const DONATE_DESCRIPTION =
	"Keep thatskyapplication afloat! Donate to keep things running smoothly. 🩵" as const;

export const meta: Route.MetaFunction = ({ location, matches }) => {
	const cdnURL = getCDNURLFromMatches(matches);
	const url = String(new URL(location.pathname, WEBSITE_URL));

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{
			name: "keywords",
			content: `Sky, Children of the Light, ${APPLICATION_NAME}, Discord Bot, Discord Application, Sky schedule, Sky timers, Sky events, Donate`,
		},
		{ title: DONATE_TITLE },
		{ name: "description", content: DONATE_DESCRIPTION },
		{ name: "theme-color", content: "#A5B5F1" },
		{ property: "og:title", content: DONATE_TITLE },
		{ property: "og:description", content: DONATE_DESCRIPTION },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{ property: "og:image", content: cdnAssetURL(cdnURL, "avatar_icons/caelus.webp") },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: DONATE_TITLE },
		{ name: "twitter:description", content: DONATE_DESCRIPTION },
		{ rel: "canonical", href: url },
	];
};

export default function Donate() {
	return (
		<SitePage>
			<div className="container mx-auto max-w-3xl">
				<h1>Donate</h1>
				<p className="text-sm text-gray-800 dark:text-gray-200">
					Thank you for your interest! If we've helped you in one way or another, please help us
					maintain everything you see in front of you.{" "}
					<Heart aria-hidden="true" className="inline h-4 w-4 fill-pink-300 text-pink-300" />
				</p>
				<hr />

				<section className="mt-6">
					<div className="space-y-4">
						{DONATION_METHODS.map((method) => (
							<a
								className={clsx(
									method.alignClassName,
									method.buttonClassName,
									"group flex w-full items-center justify-between gap-4 rounded-lg p-5 text-white shadow-lg shadow-gray-900/20 transition duration-200 hover:-translate-y-0.5 hover:brightness-90 focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300 dark:shadow-black/30 sm:w-3/4",
								)}
								href={method.href}
								key={method.name}
								rel="noopener noreferrer"
								style={{ backgroundColor: method.brandColour }}
								target="_blank"
							>
								<div className="flex min-w-0 items-center gap-3">
									<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/20">
										{method.icon}
									</span>
									<div className="min-w-0">
										<h2 className="m-0 text-lg font-semibold text-white">{method.name}</h2>
										<p className="m-0 text-sm text-white/85">{method.description}</p>
									</div>
								</div>
								<span className="shrink-0 rounded-full bg-white/20 p-2 transition duration-200 group-hover:bg-white/30">
									<ExternalLinkIcon className="h-4 w-4" />
								</span>
							</a>
						))}
					</div>
				</section>
			</div>
		</SitePage>
	);
}
