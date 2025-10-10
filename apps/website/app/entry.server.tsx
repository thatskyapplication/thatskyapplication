import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import {
	createSentryHandleError,
	getMetaTagTransformer,
	wrapSentryHandleRequest,
} from "@sentry/react-router";
import { isbot } from "isbot";
import type { RenderToPipeableStreamOptions } from "react-dom/server";
import { renderToPipeableStream } from "react-dom/server";
import { I18nextProvider } from "react-i18next";
import type { EntryContext, RouterContextProvider } from "react-router";
import { ServerRouter } from "react-router";
import { getInstance } from "./middleware/i18next";

export const streamTimeout = 5_000;

export default wrapSentryHandleRequest(
	(
		request: Request,
		responseStatusCode: number,
		responseHeaders: Headers,
		entryContext: EntryContext,
		routerContext: RouterContextProvider,
	) => {
		return new Promise((resolve, reject) => {
			let shellRendered = false;
			const userAgent = request.headers.get("user-agent");

			const readyOption: keyof RenderToPipeableStreamOptions =
				(userAgent && isbot(userAgent)) || entryContext.isSpaMode ? "onAllReady" : "onShellReady";

			const { pipe, abort } = renderToPipeableStream(
				<I18nextProvider i18n={getInstance(routerContext)}>
					<ServerRouter context={entryContext} url={request.url} />
				</I18nextProvider>,
				{
					[readyOption]() {
						shellRendered = true;
						const body = new PassThrough();
						const stream = createReadableStreamFromReadable(body);

						responseHeaders.set("Content-Type", "text/html");

						resolve(
							new Response(stream, {
								headers: responseHeaders,
								status: responseStatusCode,
							}),
						);

						pipe(getMetaTagTransformer(body));
					},
					onShellError(error: unknown) {
						reject(error);
					},
					onError(error: unknown) {
						// biome-ignore lint/style/noParameterAssign: This is the default code.
						responseStatusCode = 500;

						if (shellRendered) {
							console.error(error);
						}
					},
				},
			);

			setTimeout(abort, streamTimeout + 1000);
		});
	},
);

export const handleError = createSentryHandleError({
	logErrors: false,
});
