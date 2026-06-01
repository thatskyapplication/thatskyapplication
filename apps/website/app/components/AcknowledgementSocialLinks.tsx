import {
	SiBluesky,
	SiBlueskyHex,
	SiDiscord,
	SiDiscordHex,
	SiInstagram,
	SiInstagramHex,
	SiX,
	SiXHex,
} from "@icons-pack/react-simple-icons";
import { clsx } from "clsx";
import type { ComponentType } from "react";

type AcknowledgementSocialLinkPlatform = "bluesky" | "discord" | "instagram" | "website" | "x";

interface AcknowledgementSocialLink {
	href: string;
	label: string;
	platform: AcknowledgementSocialLinkPlatform;
}

interface AcknowledgementSocialLinkBrand {
	colour: string;
	Icon: ComponentType<{ className?: string }>;
	label: string;
}

function WebsiteIcon({ className }: { className?: string }) {
	return (
		<span
			aria-hidden="true"
			className={clsx(
				className,
				"inline-flex items-center justify-center text-[0.8rem] leading-none",
			)}
		>
			🌐
		</span>
	);
}

const AcknowledgementSocialLinkPlatformToBrand = {
	bluesky: {
		colour: SiBlueskyHex,
		Icon: SiBluesky,
		label: "Bluesky",
	},
	discord: {
		colour: SiDiscordHex,
		Icon: SiDiscord,
		label: "Discord",
	},
	instagram: {
		colour: SiInstagramHex,
		Icon: SiInstagram,
		label: "Instagram",
	},
	website: {
		colour: "#475569",
		Icon: WebsiteIcon,
		label: "Website",
	},
	x: {
		colour: SiXHex,
		Icon: SiX,
		label: "X",
	},
} as const satisfies Readonly<
	Record<AcknowledgementSocialLinkPlatform, AcknowledgementSocialLinkBrand>
>;

export function AcknowledgementSocialLinks({
	links,
}: {
	links: readonly AcknowledgementSocialLink[];
}) {
	return (
		<div className="mt-2 flex flex-wrap gap-2">
			{links.map(({ href, label, platform }) => {
				const {
					colour,
					Icon,
					label: platformLabel,
				} = AcknowledgementSocialLinkPlatformToBrand[platform];

				return (
					<a
						aria-label={`${label} on ${platformLabel}`}
						className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2"
						href={href}
						key={href}
						rel="noopener noreferrer"
						style={{ backgroundColor: colour, outlineColor: colour }}
						target="_blank"
					>
						<Icon className="h-3.5 w-3.5" />
						{label}
					</a>
				);
			})}
		</div>
	);
}
