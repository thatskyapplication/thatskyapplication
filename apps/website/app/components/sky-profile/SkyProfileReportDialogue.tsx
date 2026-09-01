import { Dialog } from "@base-ui/react/dialog";
import { clsx } from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFetcher } from "react-router";
import {
	SKY_PROFILE_REPORT_MAXIMUM_LENGTH,
	SKY_PROFILE_REPORT_MINIMUM_LENGTH,
} from "@thatskyapplication/utility";
import { ActionButton } from "~/components/ActionButton.js";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import type { action } from "~/routes/sky-profiles.$userId.js";
import { MISCELLANEOUS_EMOJIS } from "~/utility/emojis.js";
import { PASSWORD_MANAGER_IGNORE_ATTRIBUTES } from "~/utility/password-manager.js";
import {
	characterCountClass,
	DIALOGUE_BACKDROP_CLASS,
	DIALOGUE_POPUP_CLASS,
	DIALOGUE_TITLE_CLASS,
	FIELD_ERROR_CLASS,
	FIELD_FOOTER_CLASS,
	SUCCESS_BANNER_CLASS,
	textFieldClass,
} from "~/utility/styles.js";

export function SkyProfileReportDialogue() {
	const { t } = useTranslation();
	const fetcher = useFetcher<typeof action>();
	const [reason, setReason] = useState("");
	const isSaving = fetcher.state !== "idle";
	const error = fetcher.data?.ok === false ? fetcher.data.error : null;
	const length = reason.trim().length;

	const outOfRange =
		length < SKY_PROFILE_REPORT_MINIMUM_LENGTH || length > SKY_PROFILE_REPORT_MAXIMUM_LENGTH;
	const reported = fetcher.data?.ok === true;

	return (
		<Dialog.Root
			onOpenChange={(open) => {
				if (!open) {
					setReason("");
					fetcher.reset();
				}
			}}
		>
			<Dialog.Trigger render={<ActionButton variant="neutral" />}>
				<EmojiIcon className="mr-2 h-6 w-6 shrink-0" emoji={MISCELLANEOUS_EMOJIS.Report} />
				<span className="truncate">{t("sky-profile.report", { ns: "features" })}</span>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Backdrop className={DIALOGUE_BACKDROP_CLASS} />
				<Dialog.Popup
					className={clsx(
						DIALOGUE_POPUP_CLASS,
						"max-h-[calc(100dvh-2rem)] w-[min(32rem,calc(100vw-2rem))] gap-3 overflow-y-auto p-5",
					)}
				>
					<Dialog.Title className={DIALOGUE_TITLE_CLASS}>
						{t("sky-profile.report-modal-title", { ns: "features" })}
					</Dialog.Title>
					<Dialog.Description className="text-sm text-gray-600 dark:text-gray-400">
						{t("sky-profile.report-description", { ns: "features" })}
					</Dialog.Description>

					{reported ? (
						<div className={SUCCESS_BANNER_CLASS}>
							{t("sky-profile.report-submission", { ns: "features" })}
						</div>
					) : (
						<fetcher.Form className="flex flex-col gap-3" method="post">
							<div className="flex flex-col gap-2">
								<label
									className="text-sm font-medium text-gray-900 dark:text-gray-100"
									htmlFor="reason"
								>
									{t("sky-profile.report-modal-label-reason-label", { ns: "features" })}
								</label>
								<p className="text-sm text-gray-600 dark:text-gray-400" id="reason-description">
									{t("sky-profile.report-modal-label-reason-description", { ns: "features" })}
								</p>
								<textarea
									aria-describedby={
										error ? "reason-description reason-error" : "reason-description"
									}
									aria-invalid={error ? true : undefined}
									className={textFieldClass(Boolean(error), "medium")}
									id="reason"
									minLength={SKY_PROFILE_REPORT_MINIMUM_LENGTH}
									name="reason"
									onChange={(event) => setReason(event.currentTarget.value)}
									readOnly={isSaving}
									required
									rows={5}
									value={reason}
									{...PASSWORD_MANAGER_IGNORE_ATTRIBUTES}
								/>
								<div className={FIELD_FOOTER_CLASS}>
									{error ? (
										<p className={FIELD_ERROR_CLASS} id="reason-error">
											{error}
										</p>
									) : (
										<span />
									)}
									<span className={characterCountClass(reason.length > 0 && outOfRange)}>
										{length}/{SKY_PROFILE_REPORT_MAXIMUM_LENGTH}
									</span>
								</div>
							</div>

							<div className="mt-1 flex justify-end gap-2">
								<Dialog.Close render={<ActionButton variant="secondary" />}>
									{t("close", { ns: "general" })}
								</Dialog.Close>
								<ActionButton
									aria-disabled={isSaving}
									onClick={(event) => {
										if (isSaving) {
											event.preventDefault();
										}
									}}
									type="submit"
									variant="danger"
								>
									{isSaving
										? t("sky-profile.report-submitting", { ns: "features" })
										: t("sky-profile.report", { ns: "features" })}
								</ActionButton>
							</div>
						</fetcher.Form>
					)}

					<span aria-atomic="true" className="sr-only" role="status">
						{isSaving
							? t("sky-profile.report-submitting", { ns: "features" })
							: reported
								? t("sky-profile.report-submission", { ns: "features" })
								: (error ?? "")}
					</span>
				</Dialog.Popup>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
