import { clsx } from "clsx";
import { Check, Pencil, X } from "lucide-react";
import { useRef, useState } from "react";
import { useFetcher } from "react-router";
import type { action } from "~/routes/admin.support-server-invites.js";
import { PASSWORD_MANAGER_IGNORE_ATTRIBUTES } from "~/utility/password-manager.js";
import { textFieldClass } from "~/utility/styles.js";

const ICON_BUTTON_CLASS =
	"rounded-md p-1 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100" as const;

export function InviteName({ code, name }: { code: string; name: string }) {
	const fetcher = useFetcher<typeof action>();
	const [editing, setEditing] = useState(false);
	const [value, setValue] = useState(name);
	const inputRef = useRef<HTMLInputElement>(null);
	const isSaving = fetcher.state !== "idle";
	const result = fetcher.data?.intent === "name" ? fetcher.data : null;
	const error = result?.ok === false ? result.error : null;
	const errorId = `invite-name-error-${code}`;

	let announcement = "";

	if (isSaving) {
		announcement = `Saving ${code}.`;
	} else if (error) {
		announcement = error;
	} else if (result?.ok) {
		announcement = `Saved ${code}.`;
	}

	if (!editing) {
		return (
			<div className="flex min-w-0 items-center gap-1">
				<span className="truncate font-medium text-gray-900 dark:text-gray-100">
					{name || <span className="text-gray-500 dark:text-gray-400">Unnamed</span>}
				</span>
				<button
					aria-label={`Edit the name for ${code}.`}
					className={ICON_BUTTON_CLASS}
					onClick={() => {
						setValue(name);
						setEditing(true);
						requestAnimationFrame(() => inputRef.current?.select());
					}}
					type="button"
				>
					<Pencil className="h-3.5 w-3.5" />
				</button>
				<span className="sr-only" role="status">
					{announcement}
				</span>
			</div>
		);
	}

	return (
		<fetcher.Form
			className="flex min-w-0 flex-col gap-1"
			method="post"
			onSubmit={() => setEditing(false)}
		>
			<input name="intent" type="hidden" value="name" />
			<input name="code" type="hidden" value={code} />
			<div className="flex items-center gap-1">
				<input
					aria-describedby={error ? errorId : undefined}
					aria-invalid={error ? true : undefined}
					aria-label={`Name for ${code}.`}
					className={clsx(textFieldClass(Boolean(error), "small"), "font-medium")}
					name="name"
					onChange={(event) => setValue(event.currentTarget.value)}
					onKeyDown={(event) => {
						if (event.key === "Escape") {
							setEditing(false);
						}
					}}
					ref={inputRef}
					type="text"
					value={value}
					{...PASSWORD_MANAGER_IGNORE_ATTRIBUTES}
				/>
				<button
					aria-label={`Save the name for ${code}.`}
					className={ICON_BUTTON_CLASS}
					disabled={isSaving}
					type="submit"
				>
					<Check className="h-4 w-4" />
				</button>
				<button
					aria-label={`Stop editing the name for ${code}.`}
					className={ICON_BUTTON_CLASS}
					onClick={() => setEditing(false)}
					type="button"
				>
					<X className="h-4 w-4" />
				</button>
			</div>
			{error && (
				<p className="text-xs text-red-600 dark:text-red-400" id={errorId}>
					{error}
				</p>
			)}
			<span className="sr-only" role="status">
				{announcement}
			</span>
		</fetcher.Form>
	);
}
