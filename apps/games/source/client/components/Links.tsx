import { SiDiscord, SiGithub } from "@icons-pack/react-simple-icons";
import { Globe, UserRound } from "lucide-react";
import type { Links as LinkTargets, Strings } from "../api.js";
import { openLink } from "../link.js";

const GITHUB_LABEL = "GitHub" as const;
const ROW_CLASS = "tile:hidden flex flex-wrap items-center justify-center gap-x-3 gap-y-1" as const;
const LINK_CLASS =
	"short:text-[0.6875rem] flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-white/45 transition-colors hover:text-white/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40" as const;
const ICON_CLASS = "pointer-events-none shrink-0" as const;
const ICON_SIZE = 15 as const;

export function Links({ links, strings }: { links: LinkTargets; strings: Strings }) {
	const entries = [
		{
			icon: <Globe aria-hidden className={ICON_CLASS} size={ICON_SIZE} />,
			label: strings.website,
			url: links.website,
		},
		{
			icon: <UserRound aria-hidden className={ICON_CLASS} size={ICON_SIZE} />,
			label: strings.skyProfile,
			url: links.skyProfile,
		},
		{
			icon: <SiGithub aria-hidden className={ICON_CLASS} size={ICON_SIZE} />,
			label: GITHUB_LABEL,
			url: links.sourceCode,
		},
		{
			icon: <SiDiscord aria-hidden className={ICON_CLASS} size={ICON_SIZE} />,
			label: strings.supportServer,
			url: links.supportServer,
		},
	];

	return (
		<div className={ROW_CLASS}>
			{entries.map(({ icon, label, url }) => (
				<button
					className={LINK_CLASS}
					key={url}
					onClick={() => {
						void openLink(url);
					}}
					type="button"
				>
					{icon}
					{label}
				</button>
			))}
		</div>
	);
}
