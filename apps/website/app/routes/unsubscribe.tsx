import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { data, Form } from "react-router";
import { ActionButton, ActionLink } from "~/components/ActionButton";
import { CentredSitePage } from "~/components/PageLayout";
import { useIsSaving } from "~/hooks/use-is-saving.js";
import { unsubscribeFromEmailNotifications } from "~/utility/email-notifications.server.js";
import { PAGE_TITLE_CLASS } from "~/utility/styles.js";
import type { Route } from "./+types/unsubscribe.js";

const EMAIL_UNSUBSCRIBE_TOKEN_PATTERN =
	/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i;

function requireEmailUnsubscribeToken(url: URL) {
	const emailUnsubscribeToken = url.searchParams.get("token");

	if (!emailUnsubscribeToken || !EMAIL_UNSUBSCRIBE_TOKEN_PATTERN.test(emailUnsubscribeToken)) {
		throw data(null, { status: 404 });
	}

	return emailUnsubscribeToken;
}

export const loader = ({ url }: Route.LoaderArgs) => {
	requireEmailUnsubscribeToken(url);
	return null;
};

export const action = async ({ url }: Route.ActionArgs) => {
	await unsubscribeFromEmailNotifications(requireEmailUnsubscribeToken(url));
	return { unsubscribed: true };
};

export default function Unsubscribe({ actionData }: Route.ComponentProps) {
	const { t } = useTranslation();
	const isSaving = useIsSaving();

	return (
		<CentredSitePage>
			<div className="w-full max-w-md rounded-lg border border-gray-200 bg-gray-100 p-8 shadow-md dark:border-gray-700 dark:bg-gray-900">
				<h1 className={clsx(PAGE_TITLE_CLASS, "mb-6 text-center")}>
					{t("email.notifications", { ns: "features" })}
				</h1>
				{actionData?.unsubscribed ? (
					<div className="space-y-4">
						<p className="text-center text-sm text-gray-600 dark:text-gray-400">
							{t("email.unsubscribed", { ns: "features" })}
						</p>
						<ActionLink className="w-full" to="/me/settings" variant="secondary">
							{t("settings.name", { ns: "features" })}
						</ActionLink>
					</div>
				) : (
					<Form className="space-y-4" method="post">
						<p className="text-center text-sm text-gray-600 dark:text-gray-400">
							{t("email.unsubscribe-description", { ns: "features" })}
						</p>
						<ActionButton className="w-full" disabled={isSaving} type="submit" variant="primary">
							{t("email.unsubscribe", { ns: "features" })}
						</ActionButton>
					</Form>
				)}
			</div>
		</CentredSitePage>
	);
}
