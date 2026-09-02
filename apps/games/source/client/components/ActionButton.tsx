import { clsx } from "clsx";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const ACTION_BASE_CLASS =
	"inline-flex min-w-0 items-center justify-center gap-2 rounded-xl border font-medium backdrop-blur-sm transition duration-200 disabled:cursor-not-allowed disabled:opacity-50" as const;

const ACTION_SIZE_CLASS_NAMES = {
	large: "px-5 py-3 text-base short:py-2 short:text-sm tiny:py-1.5",
	medium: "px-4 py-2 text-sm short:py-1.5 tiny:text-xs",
	icon: "px-3 py-3 short:py-2 tiny:py-1.5",
} as const;

const ACTION_VARIANT_CLASS_NAMES = {
	option:
		"border-white/15 bg-white/8 text-white not-disabled:hover:border-white/35 not-disabled:hover:bg-white/14 not-disabled:hover:shadow-[0_0_24px_-6px_rgba(180,205,255,0.55)]",
	primary:
		"border-candle/40 bg-candle/15 text-candle not-disabled:hover:border-candle/70 not-disabled:hover:bg-candle/25 not-disabled:hover:shadow-[0_0_28px_-6px_rgba(244,217,160,0.6)]",
	quiet: "border-transparent bg-transparent text-white/55 not-disabled:hover:text-white/85",
	danger:
		"border-red-400/30 bg-red-400/10 text-red-200 not-disabled:hover:border-red-400/50 not-disabled:hover:bg-red-400/20",
} as const;

type ActionVariant = keyof typeof ACTION_VARIANT_CLASS_NAMES;
type ActionSize = keyof typeof ACTION_SIZE_CLASS_NAMES;

interface ActionSharedProps {
	className?: string;
	size?: ActionSize;
	variant: ActionVariant;
}

function actionClassName(variant: ActionVariant, size: ActionSize, className?: string) {
	return clsx(
		ACTION_BASE_CLASS,
		ACTION_SIZE_CLASS_NAMES[size],
		ACTION_VARIANT_CLASS_NAMES[variant],
		className,
	);
}

export function ActionButton({
	className,
	size = "medium",
	variant,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement> & ActionSharedProps) {
	return <button className={actionClassName(variant, size, className)} type="button" {...props} />;
}

export function ActionAnchor({
	children,
	className,
	size = "medium",
	variant,
	...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & ActionSharedProps) {
	return (
		<a className={actionClassName(variant, size, className)} {...props}>
			{children}
		</a>
	);
}
