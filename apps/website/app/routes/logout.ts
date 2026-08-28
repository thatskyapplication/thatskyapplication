import { redirect } from "react-router";
import { getRequestSession } from "~/middleware/session";
import { destroySession } from "~/session.server";
import { LOGGED_OUT_SEARCH_PARAMETER, resolveReturnTo } from "~/utility/functions.server";
import type { Route } from "./+types/logout.js";

async function logOut({ context, url }: Route.LoaderArgs) {
	const session = getRequestSession(context);
	const returnTo = resolveReturnTo(url.searchParams.get("returnTo"), url.origin);
	const destination = new URL(returnTo, url.origin);
	destination.searchParams.set(LOGGED_OUT_SEARCH_PARAMETER, "");

	return redirect(`${destination.pathname}${destination.search}`, {
		headers: { "Set-Cookie": await destroySession(session) },
	});
}

export const action = logOut;

export const loader = logOut;
