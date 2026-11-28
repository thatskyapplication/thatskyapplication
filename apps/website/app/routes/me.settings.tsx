import { OAuth2Scopes } from "@discordjs/core/http-only";
import { clsx } from "clsx";
import { stringifySetCookie } from "cookie";
import { useTranslation } from "react-i18next";
import { data, Form, redirect, useNavigation } from "react-router";
import { ActionButton } from "~/components/ActionButton";
import { SitePage } from "~/components/PageLayout";
import { SaveConfirmation, SaveStatus, useSaveConfirmation } from "~/components/SaveStatus.js";
import { PRODUCTION } from "~/config.server";
import { selectableOptionLabelClass, useIsSaving } from "~/hooks/use-is-saving.js";
import { getLocale } from "~/middleware/i18next.js";
import { getRequestSession } from "~/middleware/session.js";
import {
	deleteEmailNotifications,
	fetchEmailNotifications,
	saveEmailNotifications,
} from "~/utility/email-notifications.server.js";
import {
	redirectToDiscordAuthorisation,
	requireDiscordAuthentication,
} from "~/utility/functions.server.js";
import {
	HOUR_CYCLE_AUTOMATIC,
	HOUR_CYCLE_COOKIE_MAX_AGE,
	HOUR_CYCLE_COOKIE_NAME,
	HOUR_CYCLE_TWELVE,
	HOUR_CYCLE_TWENTY_FOUR,
	isHourCycleValue,
} from "~/utility/hour-cycle";
import {
	FORM_ERROR_BANNER_CLASS,
	NOTE_CLASS,
	PAGE_TITLE_CLASS,
	SELECTABLE_OPTION_CARD_CLASS,
	SECTION_HEADING_CLASS,
} from "~/utility/styles.js";
import { getTimePreferences } from "~/utility/time.server";
import type { Route } from "./+types/me.settings.js";

const TIME_FORMAT_FIELD_NAME = "time-format" as const;
const EMAIL_NOTIFICATIONS_INTENT = "email-notifications" as const;
const EMAIL_NOTIFICATION_TYPE_FIELD_NAME = "email-notification-type" as const;

const TIME_FORMAT_CHOICES = [
	{ key: "automatic", value: HOUR_CYCLE_AUTOMATIC, hour12: undefined },
	{ key: "twelve", value: HOUR_CYCLE_TWELVE, hour12: true },
	{ key: "twenty-four", value: HOUR_CYCLE_TWENTY_FOUR, hour12: false },
] as const;

const EMAIL_NOTIFICATION_CHOICES = [
	{ key: "travelling-spirit", subscription: "travellingSpirit" },
	{ key: "returning-spirits", subscription: "returningSpirits" },
] as const;

const SECTION_CLASS =
	"rounded-xl border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-gray-900" as const;

export const loader = async ({ request, context, url }: Route.LoaderArgs) => {
	const { discordUser } = requireDiscordAuthentication({ context, request, url });
	const session = getRequestSession(context);

	return {
		initialTimestamp: Date.now(),
		...getTimePreferences(request, context),
		savedAt: session.get("settings_saved_at") ?? null,
		emailNotifications: await fetchEmailNotifications(discordUser.id),
		emailNotificationsSavedAt: session.get("email_notifications_saved_at") ?? null,
		emailNotificationsUnverified: session.get("email_notifications_unverified") ?? false,
	};
};

export const action = async ({ request, context, url }: Route.ActionArgs) => {
	const { discordUser } = requireDiscordAuthentication({ context, request, url });
	const formData = await request.formData();
	const session = getRequestSession(context);

	if (formData.get("intent") === EMAIL_NOTIFICATIONS_INTENT) {
		const emailNotificationTypes = formData.getAll(EMAIL_NOTIFICATION_TYPE_FIELD_NAME);
		const travellingSpirit = emailNotificationTypes.includes("travelling-spirit");
		const returningSpirits = emailNotificationTypes.includes("returning-spirits");

		if (!travellingSpirit && !returningSpirits) {
			await deleteEmailNotifications(discordUser.id);
			session.flash("email_notifications_saved_at", new Date().toISOString());
			return redirect(url.pathname);
		}

		const locale = getLocale(context);
		const emailNotifications = await fetchEmailNotifications(discordUser.id);

		if (!emailNotifications) {
			session.flash("email_notifications_pending", { locale, travellingSpirit, returningSpirits });

			return redirectToDiscordAuthorisation({
				session,
				returnTo: url.pathname,
				scopes: [OAuth2Scopes.Identify, OAuth2Scopes.Email],
			});
		}

		await saveEmailNotifications({
			userId: discordUser.id,
			email: emailNotifications.email,
			locale,
			travellingSpirit,
			returningSpirits,
		});

		session.flash("email_notifications_saved_at", new Date().toISOString());
		return redirect(url.pathname);
	}

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
	session.flash("settings_saved_at", new Date().toISOString());

	return redirect(url.pathname, { headers: { "Set-Cookie": setCookie } });
};

export default function Settings({ loaderData }: Route.ComponentProps) {
	const {
		initialTimestamp,
		locale,
		timeZone,
		hour12,
		savedAt,
		emailNotifications,
		emailNotificationsSavedAt,
		emailNotificationsUnverified,
	} = loaderData;

	const { t } = useTranslation();
	const navigation = useNavigation();
	const isSaving = useIsSaving();

	const isSavingEmailNotifications =
		isSaving && navigation.formData?.get("intent") === EMAIL_NOTIFICATIONS_INTENT;

	const isSavingTimeFormat = isSaving && !isSavingEmailNotifications;
	const showSuccess = useSaveConfirmation(savedAt);
	const showEmailNotificationsSuccess = useSaveConfirmation(emailNotificationsSavedAt);
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
			<SaveStatus isSaving={isSaving} showSuccess={showSuccess || showEmailNotificationsSuccess} />
			<div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
				<h1 className={PAGE_TITLE_CLASS}>{t("settings.name", { ns: "features" })}</h1>

				<div className={SECTION_CLASS}>
					<Form method="post">
						<fieldset className="m-0 border-0 p-0">
							<legend className={clsx(SECTION_HEADING_CLASS, "mb-3 p-0")}>
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
								{isSavingTimeFormat ? t("saving", { ns: "general" }) : t("save", { ns: "general" })}
							</ActionButton>
							<SaveConfirmation isSaving={isSavingTimeFormat} showSuccess={showSuccess} />
						</fieldset>
					</Form>
				</div>

				<div className={SECTION_CLASS}>
					<Form method="post">
						<input name="intent" type="hidden" value={EMAIL_NOTIFICATIONS_INTENT} />
						<fieldset className="m-0 border-0 p-0">
							<legend className={clsx(SECTION_HEADING_CLASS, "mb-1 p-0")}>
								{t("email.notifications", { ns: "features" })}
							</legend>
							<p className={clsx(NOTE_CLASS, "mb-3")}>
								{emailNotifications
									? t("email.notifications-email", {
											ns: "features",
											email: emailNotifications.email,
										})
									: t("email.notifications-description", { ns: "features" })}
							</p>
							{emailNotificationsUnverified && (
								<div className={clsx(FORM_ERROR_BANNER_CLASS, "mb-3")}>
									{t("email.notifications-unverified", { ns: "features" })}
								</div>
							)}
							<div className="grid gap-2 sm:grid-cols-2">
								{EMAIL_NOTIFICATION_CHOICES.map((choice) => (
									<label
										className={optionLabelClass}
										htmlFor={`email-notification-type-${choice.key}`}
										key={choice.key}
									>
										<input
											className="peer sr-only"
											defaultChecked={emailNotifications?.[choice.subscription] ?? false}
											disabled={isSaving}
											id={`email-notification-type-${choice.key}`}
											name={EMAIL_NOTIFICATION_TYPE_FIELD_NAME}
											type="checkbox"
											value={choice.key}
										/>
										<div className={clsx(SELECTABLE_OPTION_CARD_CLASS, "px-3 py-2")}>
											<span className="text-sm leading-tight font-semibold text-gray-900 dark:text-gray-100">
												{t(choice.key, { ns: "general" })}
											</span>
										</div>
									</label>
								))}
							</div>
							<ActionButton className="mt-3" disabled={isSaving} type="submit" variant="primary">
								{isSavingEmailNotifications
									? t("saving", { ns: "general" })
									: t("save", { ns: "general" })}
							</ActionButton>
							<SaveConfirmation
								isSaving={isSavingEmailNotifications}
								showSuccess={showEmailNotificationsSuccess}
							/>
						</fieldset>
					</Form>
				</div>
			</div>
		</SitePage>
	);
}
