import { RouterContextProvider } from "react-router";
import { createHonoServer } from "react-router-hono-server/node";
import { CDN_URL } from "~/config.server";
import { cdnURLContext } from "~/utility/router-context";
import pino from "./pino";

export default createHonoServer({
	getLoadContext() {
		const context = new RouterContextProvider();
		context.set(cdnURLContext, CDN_URL);
		return context;
	},
	configure(server) {
		server.use("*", async (c, next) => {
			const start = Date.now();
			await next();
			const duration = Date.now() - start;

			pino.info(
				{
					method: c.req.method,
					url: c.req.url,
					timeZone: c.req.header("cf-timezone"),
					status: c.res.status,
					ok: c.res.ok,
					duration,
				},
				`${c.req.method} ${c.req.path} ${c.res.status} (${duration} ms)`,
			);
		});
	},
	defaultLogger: false,
});
