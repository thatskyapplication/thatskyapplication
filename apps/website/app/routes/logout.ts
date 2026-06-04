import { type ActionFunctionArgs, type LoaderFunctionArgs, redirect } from "react-router";
import { commitSession, getSession } from "~/session.server";

function getLogoutReturnTo(url: URL) {
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

export const action = async ({ request, url }: ActionFunctionArgs) => {
	const session = await getSession(request.headers.get("Cookie"));
	const returnTo = getLogoutReturnTo(url);
	clearAuthentication(session);
	session.flash("just_logged_out", true);

	return redirect(returnTo, {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
};

export const loader = async ({ request, url }: LoaderFunctionArgs) => {
	const session = await getSession(request.headers.get("Cookie"));
	const returnTo = getLogoutReturnTo(url);
	clearAuthentication(session);
	session.flash("just_logged_out", true);

	return redirect(returnTo, {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
};
