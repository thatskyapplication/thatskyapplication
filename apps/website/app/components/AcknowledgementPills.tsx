import {
	SiBluesky,
	SiBlueskyHex,
	SiCrowdin,
	SiCrowdinHex,
	SiDiscord,
	SiDiscordHex,
	SiInstagram,
	SiInstagramHex,
	SiMintlify,
	SiMintlifyHex,
	SiX,
	SiXHex,
} from "@icons-pack/react-simple-icons";
import { clsx } from "clsx";
import type { ComponentType } from "react";

interface AcknowledgementPillBrand {
	colour: string;
	foregroundColour?: string;
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

const AcknowledgementPillPlatformToBrand = {
	bluesky: {
		colour: SiBlueskyHex,
		Icon: SiBluesky,
		label: "Bluesky",
	},
	crowdin: {
		colour: SiCrowdinHex,
		Icon: SiCrowdin,
		label: "Crowdin",
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
	mintlify: {
		colour: SiMintlifyHex,
		foregroundColour: "#000000",
		Icon: SiMintlify,
		label: "Mintlify",
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
} as const satisfies Readonly<Record<string, AcknowledgementPillBrand>>;

type AcknowledgementPillPlatform = keyof typeof AcknowledgementPillPlatformToBrand;

interface AcknowledgementPill {
	href: string;
	label: string;
	platform: AcknowledgementPillPlatform;
}

export function AcknowledgementPills({ pills }: { pills: readonly AcknowledgementPill[] }) {
	return (
		<div className="mt-2 flex flex-wrap gap-2">
			{pills.map(({ href, label, platform }) => {
				const brand = AcknowledgementPillPlatformToBrand[platform];
				const { colour, Icon, label: platformLabel } = brand;

				return (
					<a
						aria-label={label === platformLabel ? label : `${label} on ${platformLabel}`}
						className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2"
						href={href}
						key={href}
						rel="noopener noreferrer"
						style={{
							backgroundColor: colour,
							color: "foregroundColour" in brand ? brand.foregroundColour : undefined,
							outlineColor: colour,
						}}
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
