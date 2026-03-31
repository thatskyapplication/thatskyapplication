import { type ActionFunction, type LoaderFunction, redirect } from "react-router";
import { commitSession, getSession } from "~/session.server";

function getLogoutReturnTo(request: Request) {
	const url = new URL(request.url);
	const rawReturnTo = url.searchParams.get("returnTo") || "/";
	const returnToURL = new URL(rawReturnTo, url.origin);

	if (returnToURL.origin !== url.origin) {
		return "/";
	}

	return `${returnToURL.pathname}${returnToURL.search}${returnToURL.hash}`;
}

function clearAuthentication(session: Awaited<ReturnType<typeof getSession>>) {
	session.unset("discord_user");
	session.unset("token_exchange");
	session.unset("crowdin_authorised");
	session.unset("crowdin_user");
	session.unset("discord_crowdin_auth_error");
}

export const action: ActionFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));
	const returnTo = getLogoutReturnTo(request);
	clearAuthentication(session);
	session.flash("just_logged_out", true);

	return redirect(returnTo, {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
};

export const loader: LoaderFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));
	const returnTo = getLogoutReturnTo(request);
	clearAuthentication(session);
	session.flash("just_logged_out", true);

	return redirect(returnTo, {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
};
