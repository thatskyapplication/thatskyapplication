import type { Snowflake } from "@discordjs/core/http-only";
import { clsx } from "clsx";
import { Check, Copy, SquareArrowOutUpRight, TriangleAlert } from "lucide-react";
import { Link } from "react-router";
import { useCopyToClipboard } from "~/hooks/use-copy-to-clipboard.js";

export interface FriendshipActionUser {
	iconURL: string;
	id: Snowflake;
	name: string | null;
	skyProfile: boolean;
}

const USER_CHIP_CLASS =
	"inline-flex max-w-full cursor-pointer items-center gap-1.5 rounded-full border border-gray-300 bg-white py-0.5 pr-2 pl-0.5 text-xs text-gray-700 no-underline transition-colors hover:border-blue-500 hover:text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-gray-100" as const;

const CHIP_ICON_CLASS = "h-3 w-3 shrink-0 text-gray-500 dark:text-gray-400" as const;

function UserChipLabel({ user }: { user: FriendshipActionUser }) {
	return (
		<>
			<img
				alt=""
				className="h-5 w-5 shrink-0 rounded-full"
				height={20}
				loading="lazy"
				src={user.iconURL}
				width={20}
			/>
			<span className={clsx("truncate", user.name === null && "font-mono")}>
				{user.name ?? user.id}
			</span>
		</>
	);
}

export function FriendshipActionUserChip({ user }: { user: FriendshipActionUser }) {
	const { copy, status } = useCopyToClipboard();
	const label = user.name ?? user.id;

	if (user.skyProfile) {
		return (
			<Link
				aria-label={`View the Sky Profile of ${label}.`}
				className={USER_CHIP_CLASS}
				to={`/sky-profiles/${user.id}`}
			>
				<UserChipLabel user={user} />
				<SquareArrowOutUpRight aria-hidden="true" className={CHIP_ICON_CLASS} />
			</Link>
		);
	}

	return (
		<>
			<button
				aria-label={`Copy the user id for ${label}.`}
				className={USER_CHIP_CLASS}
				onClick={() => copy(user.id)}
				type="button"
			>
				<UserChipLabel user={user} />
				{status === "copied" ? (
					<Check
						aria-hidden="true"
						className="h-3 w-3 shrink-0 text-green-600 dark:text-green-400"
					/>
				) : status === "error" ? (
					<TriangleAlert
						aria-hidden="true"
						className="h-3 w-3 shrink-0 text-red-600 dark:text-red-400"
					/>
				) : (
					<Copy aria-hidden="true" className={CHIP_ICON_CLASS} />
				)}
			</button>
			<span className="sr-only" role="status">
				{status === "error"
					? `Could not copy the user id for ${label}.`
					: status === "copied"
						? `Copied the user id for ${label}.`
						: ""}
			</span>
		</>
	);
}
