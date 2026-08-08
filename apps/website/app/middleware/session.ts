import { createContext, type MiddlewareFunction, type RouterContextProvider } from "react-router";
import { commitSession, getSession, type Session } from "~/session.server.js";

const sessionContext = createContext<Session>();

export const sessionMiddleware: MiddlewareFunction<Response> = async (
	{ context, request },
	next,
) => {
	const session = await getSession(request.headers.get("Cookie"));
	context.set(sessionContext, session);
	const initialSessionData = JSON.stringify(session.data);
	const response = await next();

	if (JSON.stringify(session.data) !== initialSessionData) {
		response.headers.append("Set-Cookie", await commitSession(session));
	}

	return response;
};

export function getRequestSession(context: Readonly<RouterContextProvider>) {
	return context.get(sessionContext);
}
