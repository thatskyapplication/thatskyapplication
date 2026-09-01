import { clsx } from "clsx";
import { stringifySetCookie } from "cookie";
import { useTranslation } from "react-i18next";
import { data, Form, redirect } from "react-router";
import { ActionButton } from "~/components/ActionButton";
import { SitePage } from "~/components/PageLayout";
import { SaveConfirmation, SaveStatus, useSaveConfirmation } from "~/components/SaveStatus.js";
import { PRODUCTION } from "~/config.server";
import { selectableOptionLabelClass, useIsSaving } from "~/hooks/use-is-saving.js";
import { getRequestSession } from "~/middleware/session.js";
import { requireDiscordAuthentication } from "~/utility/functions.server.js";
import {
	HOUR_CYCLE_AUTOMATIC,
	HOUR_CYCLE_COOKIE_MAX_AGE,
	HOUR_CYCLE_COOKIE_NAME,
	HOUR_CYCLE_TWELVE,
	HOUR_CYCLE_TWENTY_FOUR,
	isHourCycleValue,
} from "~/utility/hour-cycle";
import { PAGE_TITLE_CLASS, SELECTABLE_OPTION_CARD_CLASS } from "~/utility/styles.js";
import { getTimePreferences } from "~/utility/time.server";
import type { Route } from "./+types/me.settings.js";

const TIME_FORMAT_FIELD_NAME = "time-format" as const;

const TIME_FORMAT_CHOICES = [
	{ key: "automatic", value: HOUR_CYCLE_AUTOMATIC, hour12: undefined },
	{ key: "twelve", value: HOUR_CYCLE_TWELVE, hour12: true },
	{ key: "twenty-four", value: HOUR_CYCLE_TWENTY_FOUR, hour12: false },
] as const;

const SECTION_CLASS =
	"rounded-xl border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-gray-900" as const;

export const loader = ({ request, context, url }: Route.LoaderArgs) => {
	requireDiscordAuthentication({ context, request, url });
	const savedAt = getRequestSession(context).get("settings_saved_at") ?? null;

	return {
		initialTimestamp: Date.now(),
		...getTimePreferences(request, context),
		savedAt,
	};
};

export const action = async ({ request, context, url }: Route.ActionArgs) => {
	requireDiscordAuthentication({ context, request, url });
	const formData = await request.formData();
	const value = formData.get(TIME_FORMAT_FIELD_NAME);

	if (value !== HOUR_CYCLE_AUTOMATIC && !isHourCycleValue(value)) {
		throw data(null, { status: 400 });
	}

	const setCookie = stringifySetCookie({
		name: HOUR_CYCLE_COOKIE_NAME,
		value: value === HOUR_CYCLE_AUTOMATIC ? "" : value,
		path: "/",
		maxAge: value === HOUR_CYCLE_AUTOMATIC ? 0 : HOUR_CYCLE_COOKIE_MAX_AGE,
		sameSite: "lax",
		secure: PRODUCTION,
	});
	getRequestSession(context).flash("settings_saved_at", new Date().toISOString());

	return redirect(url.pathname, { headers: { "Set-Cookie": setCookie } });
};

export default function Settings({ loaderData }: Route.ComponentProps) {
	const { initialTimestamp, locale, timeZone, hour12, savedAt } = loaderData;
	const { t } = useTranslation();
	const isSaving = useIsSaving();
	const showSuccess = useSaveConfirmation(savedAt);
	const optionLabelClass = selectableOptionLabelClass(isSaving);

	const selectedValue =
		TIME_FORMAT_CHOICES.find((choice) => choice.hour12 === hour12)?.value ?? HOUR_CYCLE_AUTOMATIC;

	const previewTime = (previewHour12: boolean | undefined) =>
		new Intl.DateTimeFormat(locale, {
			timeStyle: "short",
			timeZone,
			hour12: previewHour12,
		}).format(initialTimestamp);

	return (
		<SitePage>
			<SaveStatus isSaving={isSaving} showSuccess={showSuccess} />
			<div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
				<h1 className={PAGE_TITLE_CLASS}>{t("settings.name", { ns: "features" })}</h1>

				<div className={SECTION_CLASS}>
					<Form method="post">
						<fieldset className="m-0 border-0 p-0">
							<legend className="mb-3 p-0 text-lg font-medium text-gray-900 dark:text-gray-100">
								{t("settings.time-format", { ns: "features" })}
							</legend>
							<div className="grid gap-2 sm:grid-cols-3">
								{TIME_FORMAT_CHOICES.map((choice) => (
									<label
										className={optionLabelClass}
										htmlFor={`time-format-${choice.key}`}
										key={choice.key}
									>
										<input
											className="peer sr-only"
											defaultChecked={selectedValue === choice.value}
											disabled={isSaving}
											id={`time-format-${choice.key}`}
											name={TIME_FORMAT_FIELD_NAME}
											type="radio"
											value={choice.value}
										/>
										<div
											className={clsx(
												SELECTABLE_OPTION_CARD_CLASS,
												"flex flex-col gap-1 px-3 py-2",
											)}
										>
											<span className="text-sm leading-tight font-semibold text-gray-900 dark:text-gray-100">
												{t(`settings.time-format-${choice.key}`, { ns: "features" })}
											</span>
											<span className="font-mono text-[11px] font-medium text-gray-500 dark:text-gray-400">
												{previewTime(choice.hour12)}
											</span>
										</div>
									</label>
								))}
							</div>
							<ActionButton className="mt-3" disabled={isSaving} type="submit" variant="primary">
								{isSaving ? t("saving", { ns: "general" }) : t("save", { ns: "general" })}
							</ActionButton>
							<SaveConfirmation isSaving={isSaving} showSuccess={showSuccess} />
						</fieldset>
					</Form>
				</div>
			</div>
		</SitePage>
	);
}
