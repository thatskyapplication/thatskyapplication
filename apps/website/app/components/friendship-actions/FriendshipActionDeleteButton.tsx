import { AlertDialog } from "@base-ui/react/alert-dialog";
import { clsx } from "clsx";
import { Trash2 } from "lucide-react";
import { useFetcher } from "react-router";
import type { FriendshipActionTypes } from "@thatskyapplication/utility";
import { ActionButton } from "~/components/ActionButton.js";
import type { action } from "~/routes/admin.friendship-actions.js";
import {
	DIALOGUE_BACKDROP_CLASS,
	DIALOGUE_POPUP_CLASS,
	DIALOGUE_TITLE_CLASS,
} from "~/utility/styles.js";

export function FriendshipActionDeleteButton({
	id,
	name,
	type,
}: {
	id: number;
	name: string;
	type: FriendshipActionTypes;
}) {
	const fetcher = useFetcher<typeof action>();
	const isDeleting = fetcher.state !== "idle";
	const result = fetcher.data?.intent === "delete" ? fetcher.data : null;
	const error = result?.ok === false ? result.error : null;

	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger
				aria-label={`Delete ${name}.`}
				className="inline-flex shrink-0 cursor-pointer items-center rounded-sm p-1 text-gray-600 transition-colors hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
			>
				<Trash2 className="h-3.5 w-3.5" />
			</AlertDialog.Trigger>
			<AlertDialog.Portal>
				<AlertDialog.Backdrop className={DIALOGUE_BACKDROP_CLASS} />
				<AlertDialog.Popup
					className={clsx(DIALOGUE_POPUP_CLASS, "w-[min(28rem,calc(100vw-2rem))] gap-3 p-5")}
				>
					<AlertDialog.Title className={DIALOGUE_TITLE_CLASS}>Delete {name}?</AlertDialog.Title>
					<AlertDialog.Description className="text-sm text-gray-600 dark:text-gray-400">
						Are you sure?
					</AlertDialog.Description>
					{error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
					<div className="mt-1 flex justify-end gap-2">
						<AlertDialog.Close render={<ActionButton variant="secondary" />}>
							Cancel
						</AlertDialog.Close>
						<fetcher.Form method="post">
							<input name="intent" type="hidden" value="delete" />
							<input name="id" type="hidden" value={id} />
							<input name="type" type="hidden" value={type} />
							<ActionButton
								aria-disabled={isDeleting}
								onClick={(event) => {
									if (isDeleting) {
										event.preventDefault();
									}
								}}
								type="submit"
								variant="danger"
							>
								{isDeleting ? "Deleting..." : "Confirm"}
							</ActionButton>
						</fetcher.Form>
					</div>
					<span aria-atomic="true" className="sr-only" role="status">
						{isDeleting ? `Deleting ${name}.` : (error ?? "")}
					</span>
				</AlertDialog.Popup>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
}
