import { Field } from "@base-ui/react/field";
import { Switch } from "@base-ui/react/switch";
import { clsx } from "clsx";
import { Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router";
import type { FriendshipActionTypes } from "@thatskyapplication/utility";
import { ExternalLink } from "~/components/ExternalLink.js";
import { FriendshipActionDeleteButton } from "~/components/friendship-actions/FriendshipActionDeleteButton.js";
import {
	type FriendshipActionUser,
	FriendshipActionUserChip,
} from "~/components/friendship-actions/FriendshipActionUserChip.js";
import { InfographicPreview } from "~/components/InfographicPreview.js";
import { Tooltip } from "~/components/Tooltip.js";
import type { action } from "~/routes/admin.friendship-actions.js";
import { FIELD_ERROR_CLASS, SKELETON_CLASS } from "~/utility/styles.js";

export interface FriendshipAction {
	assetURL: string;
	id: number;
	reference: string | null;
	skip: boolean;
	square: boolean;
	type: FriendshipActionTypes;
	typeLabel: string;
	users: readonly FriendshipActionUser[];
}

const SWITCH_CLASS =
	"relative flex h-6 w-10 shrink-0 cursor-pointer rounded-full border border-gray-500 bg-gray-300 p-0.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 data-checked:border-amber-700 data-checked:bg-amber-600 data-disabled:cursor-not-allowed data-disabled:opacity-60 dark:border-gray-400 dark:bg-gray-600 dark:data-checked:border-amber-400 dark:data-checked:bg-amber-600" as const;

const SWITCH_THUMB_CLASS =
	"aspect-square h-full rounded-full bg-white ring-1 ring-gray-700/70 transition-transform data-checked:translate-x-4" as const;

export function FriendshipActionCard({ friendshipAction }: { friendshipAction: FriendshipAction }) {
	const { assetURL, id, reference, skip, square, type, typeLabel, users } = friendshipAction;
	const fetcher = useFetcher<typeof action>();
	const assetRef = useRef<HTMLImageElement>(null);
	const [assetLoaded, setAssetLoaded] = useState(false);
	const [previewing, setPreviewing] = useState(false);
	const isSaving = fetcher.state !== "idle";
	const name = `${typeLabel} #${id}`;
	const optimisticSkip = fetcher.formData ? fetcher.formData.get("skip") === "true" : skip;
	const result = fetcher.data?.intent === "skip" ? fetcher.data : null;
	const error = result?.ok === false ? result.error : null;
	const errorId = `friendship-action-error-${type}-${id}`;
	const squareLabel = square ? "Square." : "Not square.";

	useEffect(() => {
		if (assetRef.current?.complete) {
			setAssetLoaded(true);
		}
	}, []);

	return (
		<div className="flex overflow-hidden rounded-lg border border-gray-200 bg-gray-100 shadow-md dark:border-gray-700 dark:bg-gray-900">
			<button
				aria-label={`Open the asset for ${name}.`}
				className={clsx(
					"flex w-28 shrink-0 cursor-pointer self-stretch overflow-hidden border-r border-gray-200 p-0 transition-shadow hover:ring-2 hover:ring-blue-500 hover:ring-inset focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset sm:w-32 dark:border-gray-700 dark:hover:ring-blue-400 dark:focus-visible:ring-blue-400",
					assetLoaded ? "bg-white dark:bg-gray-800" : SKELETON_CLASS,
				)}
				onClick={() => setPreviewing(true)}
				type="button"
			>
				<img
					alt=""
					className={clsx(
						"m-auto aspect-square w-full object-contain transition-opacity",
						optimisticSkip && "grayscale",
						assetLoaded ? (optimisticSkip ? "opacity-40" : "opacity-100") : "opacity-0",
					)}
					loading="lazy"
					onError={() => setAssetLoaded(true)}
					onLoad={() => setAssetLoaded(true)}
					ref={assetRef}
					src={assetURL}
				/>
			</button>

			<div className="flex min-w-0 grow flex-col gap-2 p-4">
				<div className="flex items-center justify-between gap-x-2">
					<span className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
						{name}
					</span>
					<div className="flex shrink-0 items-center gap-2">
						<Tooltip content={squareLabel}>
							<span
								aria-label={squareLabel}
								className={clsx(
									"inline-flex",
									square ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400",
								)}
								role="img"
							>
								<Square aria-hidden="true" className="h-3.5 w-3.5 fill-current" />
							</span>
						</Tooltip>
						<FriendshipActionDeleteButton id={id} name={name} type={type} />
					</div>
				</div>

				<div className="flex flex-wrap gap-1.5">
					{users.map((user) => (
						<FriendshipActionUserChip key={user.id} user={user} />
					))}
				</div>

				<div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-1">
					<div className="text-xs text-gray-600 dark:text-gray-400">
						{reference === null ? (
							<span>No reference.</span>
						) : (
							<ExternalLink
								className="regular-link inline-flex items-center gap-1 text-xs"
								href={reference}
								icon
								iconClassName="h-3 w-3"
							>
								Reference
							</ExternalLink>
						)}
					</div>

					<Field.Root className="flex items-center gap-2" disabled={isSaving}>
						<Switch.Root
							aria-describedby={error ? errorId : undefined}
							checked={optimisticSkip}
							className={SWITCH_CLASS}
							onCheckedChange={(nextSkip) =>
								void fetcher.submit(
									{ id: String(id), intent: "skip", skip: String(nextSkip), type: String(type) },
									{ method: "post" },
								)
							}
						>
							<Switch.Thumb className={SWITCH_THUMB_CLASS} />
						</Switch.Root>
						<Field.Label className="cursor-pointer text-sm text-gray-600 dark:text-gray-400">
							Skip
						</Field.Label>
					</Field.Root>
				</div>

				{error && (
					<p className={FIELD_ERROR_CLASS} id={errorId}>
						{error}
					</p>
				)}

				<span className="sr-only" role="status">
					{error ?? ""}
				</span>
			</div>

			{previewing && (
				<InfographicPreview
					acknowledgement={null}
					imageURL={assetURL}
					onClose={() => setPreviewing(false)}
					title={name}
				/>
			)}
		</div>
	);
}
