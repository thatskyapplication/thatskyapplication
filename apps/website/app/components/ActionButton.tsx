import { clsx } from "clsx";
import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { Link } from "react-router";

const ACTION_BUTTON_CLASS_NAME =
	"inline-flex min-w-0 cursor-pointer items-center justify-center rounded-sm border px-4 py-2 text-sm font-medium shadow-md transition-colors duration-300 hover:shadow-lg disabled:cursor-not-allowed disabled:shadow-md" as const;

const ACTION_BUTTON_VARIANT_CLASS_NAMES = {
	neutral:
		"border-gray-200 bg-gray-100 hover:bg-gray-100/50 dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-900/50",
	primary:
		"border-gray-300 bg-green-600 text-white hover:bg-green-700 disabled:bg-green-600/60 disabled:text-white/80 dark:border-gray-600",
	secondary:
		"border-gray-300 bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-200/70 disabled:text-gray-900/70 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:disabled:bg-gray-700/70 dark:disabled:text-gray-100/70",
	success: "border-green-600 bg-green-500 hover:bg-green-600",
} as const;

type ActionButtonVariant = keyof typeof ACTION_BUTTON_VARIANT_CLASS_NAMES;

interface ActionButtonSharedProps {
	className?: string;
	variant: ActionButtonVariant;
}

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ActionButtonSharedProps;

type ActionLinkProps = ComponentProps<typeof Link> & ActionButtonSharedProps;

function actionButtonClassName(variant: ActionButtonVariant, className?: string) {
	return clsx(ACTION_BUTTON_CLASS_NAME, ACTION_BUTTON_VARIANT_CLASS_NAMES[variant], className);
}

export function ActionButton({ className, variant, ...props }: ActionButtonProps) {
	return <button className={actionButtonClassName(variant, className)} type="button" {...props} />;
}

export function ActionLink({ className, variant, ...props }: ActionLinkProps) {
	return <Link className={actionButtonClassName(variant, className)} {...props} />;
}
