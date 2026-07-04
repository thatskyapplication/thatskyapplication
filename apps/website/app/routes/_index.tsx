import { SiCrowdin, SiDiscord, SiGithub } from "@icons-pack/react-simple-icons";
import { CROWDIN_URL } from "@thatskyapplication/utility";
import { clsx } from "clsx";
import {
	AlarmClock,
	BookOpenCheck,
	Bot,
	CheckSquare,
	Clock,
	HandHeart,
	Users,
	Zap,
} from "lucide-react";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
	APPLICATION_NAME,
	INVITE_APPLICATION_URL,
	INVITE_SUPPORT_SERVER_URL,
	THATSKYLINK_URL,
} from "~/utility/constants";

const HUB = { x: 50, y: 46 } as const;

const NODE_POSITIONS = {
	caelus: { x: 33, y: 31 },
	catalogue: { x: 67, y: 31 },
	checklist: { x: 17, y: 16 },
	dailyGuides: { x: 34, y: 61 },
	schedule: { x: 83, y: 16 },
	shardEruption: { x: 18, y: 80 },
	skyProfile: { x: 70, y: 66 },
} as const;

const PLACEHOLDER_RINGS = [
	{ x: 83, y: 60 },
	{ x: 92, y: 52 },
] as const;

const DECOR_STARS = [
	{ x: 58, y: 9, size: 15 },
	{ x: 10, y: 42, size: 12 },
	{ x: 89, y: 34, size: 11 },
	{ x: 62, y: 86, size: 13 },
] as const;

const hubEdge = (point: { x: number; y: number }, radius = 11) => {
	const dx = point.x - HUB.x;
	const dy = point.y - HUB.y;
	const length = Math.sqrt(dx * dx + dy * dy);
	return { x: HUB.x + (dx / length) * radius, y: HUB.y + (dy / length) * radius };
};

const CONSTELLATION_SEGMENTS: {
	from: { x: number; y: number };
	to: { x: number; y: number };
	faint?: boolean;
}[] = [
	{ from: NODE_POSITIONS.checklist, to: NODE_POSITIONS.caelus },
	{ from: NODE_POSITIONS.caelus, to: hubEdge(NODE_POSITIONS.caelus) },
	{ from: NODE_POSITIONS.schedule, to: NODE_POSITIONS.catalogue },
	{ from: NODE_POSITIONS.catalogue, to: hubEdge(NODE_POSITIONS.catalogue) },
	{ from: NODE_POSITIONS.shardEruption, to: NODE_POSITIONS.dailyGuides },
	{ from: NODE_POSITIONS.dailyGuides, to: hubEdge(NODE_POSITIONS.dailyGuides) },
	{ from: NODE_POSITIONS.skyProfile, to: hubEdge(NODE_POSITIONS.skyProfile) },
	{ from: NODE_POSITIONS.skyProfile, to: PLACEHOLDER_RINGS[0], faint: true },
	{ from: PLACEHOLDER_RINGS[0], to: PLACEHOLDER_RINGS[1], faint: true },
];

const LINE_LAYERS = [
	{ width: 8, color: "rgba(140,144,205,0.06)" },
	{ width: 4, color: "rgba(170,176,232,0.1)" },
	{ width: 1.3, color: "rgba(206,212,248,0.55)" },
] as const;

const FAINT_LAYERS = [{ width: 1, color: "rgba(190,198,240,0.3)" }] as const;

const CONSTELLATION_STROKES: {
	color: string;
	id: string;
	width: number;
	x1: number;
	x2: number;
	y1: number;
	y2: number;
}[] = [];

for (const [segmentIndex, segment] of CONSTELLATION_SEGMENTS.entries()) {
	const layers = segment.faint ? FAINT_LAYERS : LINE_LAYERS;

	for (const [layerIndex, layer] of layers.entries()) {
		CONSTELLATION_STROKES.push({
			color: layer.color,
			id: `line-${segmentIndex}-${layerIndex}`,
			width: layer.width,
			x1: segment.from.x,
			x2: segment.to.x,
			y1: segment.from.y,
			y2: segment.to.y,
		});
	}
}

const BACKGROUND_STARS = Array.from({ length: 56 }, (_, index) => {
	const noise = (factor: number) => {
		const value = Math.sin((index + 1) * factor) * 43758.5453;
		return value - Math.floor(value);
	};

	const round = (value: number) => Math.round(value * 100) / 100;

	return {
		left: round(noise(12.9898) * 100),
		top: round(noise(78.233) * 100),
		size: round(0.8 + noise(37.719) * 1.8),
		opacity: round(0.15 + noise(5.331) * 0.5),
	};
});

const SOCIAL_LINKS = [
	{
		Icon: SiDiscord,
		className: "bg-[#5865F2] hover:bg-[#4752C4]",
		href: INVITE_SUPPORT_SERVER_URL,
		label: "Join the Discord support server.",
	},
	{
		Icon: SiGithub,
		className: "bg-gray-800 hover:bg-gray-700",
		href: "https://github.com/thatskyapplication",
		label: "View the GitHub organisation.",
	},
	{
		Icon: SiCrowdin,
		className: "bg-[#2E3440] hover:bg-[#242933]",
		href: CROWDIN_URL,
		label: "Help translate on Crowdin.",
	},
] as const;

const FOOTER_LINKS = [
	{ label: "Invite Caelus", to: INVITE_APPLICATION_URL, external: true },
	{ label: "thatskylink", to: THATSKYLINK_URL, external: true },
	{ label: "Terms & privacy", to: "/caelus/terms-privacy", external: false },
	{ label: "Acknowledgements", to: "/acknowledgements", external: false },
] as const;

const FOOTER_LINK_CLASS =
	"underline-offset-2 transition hover:text-sky-100 hover:underline" as const;

export default function Index() {
	const { t } = useTranslation();

	const nodes = [
		{
			...NODE_POSITIONS.caelus,
			key: "caelus",
			to: "/caelus",
			label: APPLICATION_NAME,
			description: "The Discord application at the heart of it all.",
			Icon: Bot,
		},
		{
			...NODE_POSITIONS.checklist,
			key: "checklist",
			to: "/me/checklist",
			label: t("checklist.title", { ns: "features" }),
			description: t("checklist.description-short", { ns: "features" }),
			Icon: CheckSquare,
		},
		{
			...NODE_POSITIONS.catalogue,
			key: "catalogue",
			to: "/me/catalogue",
			label: t("catalogue.main-title", { ns: "features" }),
			description: t("catalogue.description-short", { ns: "features" }),
			Icon: BookOpenCheck,
		},
		{
			...NODE_POSITIONS.schedule,
			key: "schedule",
			to: "/schedule",
			label: t("schedule.name", { ns: "features" }),
			description: t("schedule.description-short", { ns: "features" }),
			Icon: AlarmClock,
		},
		{
			...NODE_POSITIONS.dailyGuides,
			key: "dailyGuides",
			to: "/daily-guides",
			label: t("daily-guides.name", { ns: "features" }),
			description: t("daily-guides.description-short", { ns: "features" }),
			Icon: Clock,
		},
		{
			...NODE_POSITIONS.shardEruption,
			key: "shardEruption",
			to: "/shard-eruption",
			label: t("shard-eruption.name-plural", { ns: "features" }),
			description: t("shard-eruption.description-short", { ns: "features" }),
			Icon: Zap,
		},
		{
			...NODE_POSITIONS.skyProfile,
			key: "skyProfile",
			to: "/sky-profiles",
			label: t("sky-profile.name-plural", { ns: "features" }),
			description: t("sky-profile.description-short", { ns: "features" }),
			Icon: Users,
		},
	];

	return (
		<div className="relative h-svh w-full overflow-hidden bg-[#04060f] text-white">
			<div
				aria-hidden
				className="absolute inset-0"
				style={{
					background:
						"radial-gradient(125% 100% at 50% 118%, #17244f 0%, #0b1436 38%, #070c22 68%, #04060f 100%)",
				}}
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute top-[26%] left-[32%] h-[46vmin] w-[62vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
				style={{ background: "radial-gradient(circle, rgba(78,66,132,0.22) 0%, transparent 66%)" }}
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute top-[72%] left-[66%] h-[44vmin] w-[58vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
				style={{ background: "radial-gradient(circle, rgba(58,72,140,0.2) 0%, transparent 66%)" }}
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute bottom-[-10%] left-1/2 h-[28vmin] w-[86vmin] -translate-x-1/2 rounded-[50%] blur-3xl"
				style={{
					background:
						"radial-gradient(60% 100% at 50% 100%, rgba(150,180,235,0.22) 0%, transparent 72%)",
				}}
			/>

			<div aria-hidden className="pointer-events-none absolute inset-0">
				{BACKGROUND_STARS.map((star) => (
					<span
						className="absolute rounded-full bg-white"
						key={`${star.left}-${star.top}`}
						style={{
							left: `${star.left}%`,
							top: `${star.top}%`,
							width: `${star.size}px`,
							height: `${star.size}px`,
							opacity: star.opacity,
							boxShadow: `0 0 ${star.size * 2}px rgba(199,210,254,0.6)`,
						}}
					/>
				))}
				{DECOR_STARS.map((star) => (
					<span
						className="constellation-sparkle absolute -translate-x-1/2 -translate-y-1/2"
						key={`${star.x}-${star.y}`}
						style={{
							left: `${star.x}%`,
							top: `${star.y}%`,
							width: `${star.size}px`,
							height: `${star.size}px`,
							opacity: 0.55,
						}}
					/>
				))}
			</div>

			<div className="absolute inset-x-0 top-0 bottom-32 z-10">
				<svg
					aria-hidden
					className="pointer-events-none absolute inset-0 h-full w-full"
					preserveAspectRatio="none"
					viewBox="0 0 100 100"
				>
					<title>Constellation of thatskyapplication features.</title>
					<defs>
						{CONSTELLATION_STROKES.map((stroke) => (
							<linearGradient
								gradientUnits="userSpaceOnUse"
								id={stroke.id}
								key={stroke.id}
								x1={stroke.x1}
								x2={stroke.x2}
								y1={stroke.y1}
								y2={stroke.y2}
							>
								<stop offset="0%" stopColor={stroke.color} stopOpacity={0} />
								<stop offset="16%" stopColor={stroke.color} stopOpacity={1} />
								<stop offset="84%" stopColor={stroke.color} stopOpacity={1} />
								<stop offset="100%" stopColor={stroke.color} stopOpacity={0} />
							</linearGradient>
						))}
					</defs>
					{CONSTELLATION_STROKES.map((stroke) => (
						<line
							key={stroke.id}
							stroke={`url(#${stroke.id})`}
							strokeLinecap="round"
							strokeWidth={stroke.width}
							vectorEffect="non-scaling-stroke"
							x1={stroke.x1}
							x2={stroke.x2}
							y1={stroke.y1}
							y2={stroke.y2}
						/>
					))}
				</svg>

				<div
					aria-hidden
					className="pointer-events-none absolute top-[46%] left-1/2 h-[62vmin] w-[74vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
					style={{
						background:
							"radial-gradient(circle, rgba(165,181,241,0.3) 0%, rgba(118,138,228,0.12) 34%, transparent 68%)",
					}}
				/>

				{PLACEHOLDER_RINGS.map((ring) => (
					<span
						aria-hidden
						className="pointer-events-none absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-100/35"
						key={`${ring.x}-${ring.y}`}
						style={{
							left: `${ring.x}%`,
							top: `${ring.y}%`,
							boxShadow: "0 0 10px rgba(165,181,241,0.25)",
						}}
					/>
				))}

				<div className="pointer-events-none absolute inset-0">
					{nodes.map((node) => (
						<Link
							aria-label={`${node.label}. ${node.description}`}
							className="group pointer-events-auto absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full outline-none focus-visible:outline-2 focus-visible:outline-yellow-400 sm:h-14 sm:w-14"
							key={node.key}
							style={{ left: `${node.x}%`, top: `${node.y}%` }}
							to={node.to}
						>
							<span
								aria-hidden
								className="absolute inset-0 rounded-full blur-md transition duration-300 group-hover:blur-lg"
								style={{
									background: "radial-gradient(circle, rgba(165,181,241,0.32) 0%, transparent 68%)",
								}}
							/>
							<span
								aria-hidden
								className="absolute inset-[6%] scale-90 rounded-full border border-sky-100/70 opacity-0 shadow-[0_0_18px_rgba(165,181,241,0.5)] transition duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
							/>
							<node.Icon
								className="relative h-5 w-5 text-sky-100/90 drop-shadow-[0_0_8px_rgba(165,181,241,0.55)] transition duration-300 group-hover:text-white sm:h-6 sm:w-6"
								strokeWidth={1.5}
							/>
							<span className="pointer-events-none absolute top-full left-1/2 flex -translate-x-1/2 flex-col items-center pt-2">
								<span
									className="text-xs font-medium tracking-wide whitespace-nowrap text-sky-100/80 transition-colors duration-300 group-hover:text-white sm:text-sm"
									style={{ textShadow: "0 1px 10px rgba(0,0,0,0.9)" }}
								>
									{node.label}
								</span>
								<span
									className="mt-1 w-max max-w-60 text-center text-[0.7rem] leading-snug text-balance text-sky-200/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:text-xs"
									style={{ textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}
								>
									{node.description}
								</span>
							</span>
						</Link>
					))}
				</div>

				<div className="pointer-events-none absolute top-[46%] left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center px-4 text-center">
					<div
						aria-hidden
						className="absolute inset-[-65%] rounded-full blur-2xl"
						style={{
							background: "radial-gradient(circle, rgba(6,10,26,0.72) 0%, transparent 68%)",
						}}
					/>
					<span
						aria-hidden
						className="relative mb-2 text-lg text-sky-100/80"
						style={{ textShadow: "0 0 16px rgba(165,181,241,0.9)" }}
					>
						✦
					</span>
					<h1
						className="relative mb-0 text-[clamp(1.55rem,5.6vw,3.4rem)] font-light tracking-[0.09em] text-white [hyphens:none]"
						style={{ textShadow: "0 0 34px rgba(165,181,241,0.5), 0 2px 22px rgba(0,0,0,0.7)" }}
					>
						thatskyapplication
					</h1>
					<p className="relative mt-3 mb-0 max-w-md text-xs text-sky-100/70 sm:text-base">
						{t("website-description", { ns: "general" })}
					</p>
				</div>
			</div>

			<div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-3 px-4 pt-2 pb-6">
				<div className="flex items-center gap-3">
					{SOCIAL_LINKS.map((social) => (
						<a
							aria-label={social.label}
							className={clsx(
								"flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors",
								social.className,
							)}
							href={social.href}
							key={social.href}
							rel="noopener noreferrer"
							target="_blank"
						>
							<social.Icon className="h-4 w-4" />
						</a>
					))}
					<Link
						className="inline-flex items-center gap-2 rounded-lg border border-pink-300 bg-pink-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:border-pink-200 hover:bg-pink-600"
						to="/donate"
					>
						<HandHeart className="h-4 w-4 text-pink-100" />
						Donate
					</Link>
				</div>
				<div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.7rem] text-sky-200/60 sm:text-xs">
					{FOOTER_LINKS.map((link, index) => (
						<Fragment key={link.label}>
							{index > 0 && (
								<span aria-hidden className="text-sky-200/25">
									·
								</span>
							)}
							{link.external ? (
								<a
									className={FOOTER_LINK_CLASS}
									href={link.to}
									rel="noopener noreferrer"
									target="_blank"
								>
									{link.label}
								</a>
							) : (
								<Link className={FOOTER_LINK_CLASS} to={link.to}>
									{link.label}
								</Link>
							)}
						</Fragment>
					))}
				</div>
			</div>
		</div>
	);
}
