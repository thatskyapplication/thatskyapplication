const BACKDROP_CLASS = "fixed inset-0 -z-10 overflow-hidden bg-night" as const;
const GLOW_BASE_CLASS = "pointer-events-none absolute rounded-full blur-3xl" as const;

const SKY_GRADIENT =
	"radial-gradient(140% 78% at 50% 100%, #2e438a 0%, #1d2c5e 24%, #101a41 52%, #080e26 78%, #04060f 100%)" as const;

const GLOWS = [
	{
		className: "top-[26%] left-[32%] h-[46vmin] w-[62vmin] -translate-x-1/2 -translate-y-1/2",
		background: "radial-gradient(circle, rgba(122,102,206,0.42) 0%, transparent 70%)",
	},
	{
		className: "top-[72%] left-[66%] h-[44vmin] w-[58vmin] -translate-x-1/2 -translate-y-1/2",
		background: "radial-gradient(circle, rgba(86,118,224,0.38) 0%, transparent 70%)",
	},
	{
		className: "bottom-[-10%] left-1/2 h-[28vmin] w-[86vmin] -translate-x-1/2 rounded-[50%]",
		background: "radial-gradient(60% 100% at 50% 100%, rgba(168,196,245,0.32) 0%, transparent 74%)",
	},
] as const;

const STARS = [
	{ left: "12%", top: "16%", size: 3, delay: "0s" },
	{ left: "78%", top: "10%", size: 2, delay: "1.4s" },
	{ left: "34%", top: "78%", size: 2, delay: "2.1s" },
	{ left: "88%", top: "58%", size: 3, delay: "0.7s" },
	{ left: "22%", top: "42%", size: 2, delay: "3.2s" },
	{ left: "64%", top: "88%", size: 2, delay: "2.6s" },
	{ left: "52%", top: "6%", size: 2, delay: "1.1s" },
	{ left: "6%", top: "64%", size: 2, delay: "3.8s" },
	{ left: "92%", top: "30%", size: 2, delay: "2.9s" },
	{ left: "44%", top: "24%", size: 2, delay: "4.2s" },
	{ left: "70%", top: "44%", size: 2, delay: "1.8s" },
] as const;

export function SkyBackdrop() {
	return (
		<div aria-hidden className={BACKDROP_CLASS}>
			<div className="absolute inset-0" style={{ background: SKY_GRADIENT }} />
			{GLOWS.map((glow) => (
				<div
					className={`${GLOW_BASE_CLASS} ${glow.className}`}
					key={glow.background}
					style={{ background: glow.background }}
				/>
			))}
			{STARS.map((star) => (
				<span
					className="drifting absolute rounded-full bg-white"
					key={`${star.left}${star.top}`}
					style={{
						animationDelay: star.delay,
						boxShadow: `0 0 ${star.size * 3}px rgba(255,255,255,0.75)`,
						height: `${star.size}px`,
						left: star.left,
						top: star.top,
						width: `${star.size}px`,
					}}
				/>
			))}
		</div>
	);
}
