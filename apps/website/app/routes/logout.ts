import { type ActionFunction, type LoaderFunction, redirect } from "@remix-run/node";
import { destroySession, getSession } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));
	const url = new URL(request.url);
	const returnTo = url.searchParams.get("returnTo") || "/";

	return redirect(returnTo, {
		headers: {
			"Set-Cookie": await destroySession(session),
		},
	});
};

export const loader: LoaderFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));
	const url = new URL(request.url);
	const returnTo = url.searchParams.get("returnTo") || "/";

	return redirect(returnTo, {
		headers: {
			"Set-Cookie": await destroySession(session),
		},
	});
};
