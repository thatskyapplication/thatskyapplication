import { clsx } from "clsx";
import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { Link } from "react-router";

const ACTION_BUTTON_CLASS_NAME =
	"inline-flex min-w-0 cursor-pointer items-center justify-center gap-2 rounded-sm border font-medium shadow-md transition-colors duration-300 hover:shadow-lg disabled:cursor-not-allowed disabled:shadow-md" as const;

const ACTION_BUTTON_SIZE_CLASS_NAMES = {
	large: "px-5 py-2.5 text-base",
	medium: "px-4 py-2 text-sm",
} as const;

const ACTION_BUTTON_VARIANT_CLASS_NAMES = {
	danger:
		"border-gray-300 bg-red-600 text-white hover:bg-red-700 disabled:bg-red-600/60 disabled:text-white/80 dark:border-gray-600",
	neutral:
		"border-gray-200 bg-gray-100 hover:bg-gray-100/50 dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-900/50",
	primary:
		"border-gray-300 bg-green-600 text-white hover:bg-green-700 disabled:bg-green-600/60 disabled:text-white/80 dark:border-gray-600",
	secondary:
		"border-gray-300 bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-200/70 disabled:text-gray-900/70 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:disabled:bg-gray-700/70 dark:disabled:text-gray-100/70",
	success: "border-green-600 bg-green-500 hover:bg-green-600",
} as const;

type ActionButtonVariant = keyof typeof ACTION_BUTTON_VARIANT_CLASS_NAMES;

type ActionButtonSize = keyof typeof ACTION_BUTTON_SIZE_CLASS_NAMES;

interface ActionButtonSharedProps {
	className?: string;
	size?: ActionButtonSize;
	variant: ActionButtonVariant;
}

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ActionButtonSharedProps;

type ActionLinkProps = ComponentProps<typeof Link> & ActionButtonSharedProps;

type ActionAnchorProps = ComponentProps<"a"> & ActionButtonSharedProps;

function actionButtonClassName(
	variant: ActionButtonVariant,
	size: ActionButtonSize,
	className?: string,
) {
	return clsx(
		ACTION_BUTTON_CLASS_NAME,
		ACTION_BUTTON_SIZE_CLASS_NAMES[size],
		ACTION_BUTTON_VARIANT_CLASS_NAMES[variant],
		className,
	);
}

export function ActionButton({ className, size = "medium", variant, ...props }: ActionButtonProps) {
	return (
		<button className={actionButtonClassName(variant, size, className)} type="button" {...props} />
	);
}

export function ActionAnchor({
	children,
	className,
	size = "medium",
	variant,
	...props
}: ActionAnchorProps) {
	return (
		<a className={actionButtonClassName(variant, size, className)} {...props}>
			{children}
		</a>
	);
}

export function ActionLink({ className, size = "medium", variant, ...props }: ActionLinkProps) {
	return <Link className={actionButtonClassName(variant, size, className)} {...props} />;
}
