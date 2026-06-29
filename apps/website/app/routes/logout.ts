import { redirect } from "react-router";
import { commitSession, getSession } from "~/session.server";
import { resolveReturnTo } from "~/utility/functions.server";
import type { Route } from "./+types/logout.js";

function clearAuthentication(session: Awaited<ReturnType<typeof getSession>>) {
	session.unset("discord_user");
	session.unset("token_exchange");
	session.unset("crowdin_authorised");
	session.unset("crowdin_user");
	session.unset("discord_crowdin_auth_error");
}

export const action = async ({ request, url }: Route.ActionArgs) => {
	const session = await getSession(request.headers.get("Cookie"));
	const returnTo = resolveReturnTo(url.searchParams.get("returnTo"), url.origin);
	clearAuthentication(session);
	session.flash("just_logged_out", true);

	return redirect(returnTo, {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
};

export const loader = async ({ request, url }: Route.LoaderArgs) => {
	const session = await getSession(request.headers.get("Cookie"));
	const returnTo = resolveReturnTo(url.searchParams.get("returnTo"), url.origin);
	clearAuthentication(session);
	session.flash("just_logged_out", true);

	return redirect(returnTo, {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
};
