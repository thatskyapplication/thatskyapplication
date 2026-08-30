import { AlertDialog } from "@base-ui/react/alert-dialog";
import { clsx } from "clsx";
import { Trash2 } from "lucide-react";
import { useFetcher } from "react-router";
import { ActionButton } from "~/components/ActionButton.js";
import type { action } from "~/routes/admin.support-server-invites.js";
import {
	DIALOGUE_BACKDROP_CLASS,
	DIALOGUE_POPUP_CLASS,
	DIALOGUE_TITLE_CLASS,
} from "~/utility/styles.js";

export function DeleteExpiredInvite({
	code,
	createdAt,
	name,
}: {
	code: string;
	createdAt: number;
	name: string;
}) {
	const fetcher = useFetcher<typeof action>();
	const isDeleting = fetcher.state !== "idle";

	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger
				aria-label={`Delete ${name}.`}
				className="inline-flex cursor-pointer items-center rounded-sm p-1 text-gray-600 transition-colors hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
			>
				<Trash2 className="h-4 w-4" />
			</AlertDialog.Trigger>
			<AlertDialog.Portal>
				<AlertDialog.Backdrop className={DIALOGUE_BACKDROP_CLASS} />
				<AlertDialog.Popup
					className={clsx(DIALOGUE_POPUP_CLASS, "w-[min(28rem,calc(100vw-2rem))] gap-3 p-5")}
				>
					<AlertDialog.Title className={DIALOGUE_TITLE_CLASS}>Delete "{name}"?</AlertDialog.Title>
					<AlertDialog.Description className="my-0 text-sm text-gray-600 dark:text-gray-400">
						This may disrupt historical preservation.
					</AlertDialog.Description>
					<div className="mt-1 flex justify-end gap-2">
						<AlertDialog.Close render={<ActionButton variant="secondary" />}>
							Cancel
						</AlertDialog.Close>
						<fetcher.Form method="post">
							<input name="intent" type="hidden" value="delete" />
							<input name="code" type="hidden" value={code} />
							<input name="created_at" type="hidden" value={createdAt} />
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
						{isDeleting ? `Deleting ${name}.` : ""}
					</span>
				</AlertDialog.Popup>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
}
