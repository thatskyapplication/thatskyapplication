import { redirect } from "react-router";
import { getRequestSession } from "~/middleware/session";
import { clearAuthentication } from "~/session.server";
import { resolveReturnTo } from "~/utility/functions.server";
import type { Route } from "./+types/logout.js";

function logOut({ context, url }: Route.LoaderArgs) {
	const session = getRequestSession(context);
	const returnTo = resolveReturnTo(url.searchParams.get("returnTo"), url.origin);
	clearAuthentication(session);
	session.flash("just_logged_out", true);
	return redirect(returnTo);
}

export const action = logOut;

export const loader = logOut;
