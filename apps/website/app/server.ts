import { secureHeaders } from "hono/secure-headers";
import { createHonoServer } from "react-router-hono-server/node";
import { PRODUCTION } from "./config.server";
import pino from "./pino";

export default createHonoServer({
	configure(server) {
		server.use(
			"*",
			secureHeaders({
				permissionsPolicy: { browsingTopics: [], camera: [], geolocation: [], microphone: [] },
				strictTransportSecurity: PRODUCTION ? "max-age=31536000; includeSubDomains" : false,
			}),
		);

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
