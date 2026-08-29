import process from "node:process";
import { bodyLimit } from "hono/body-limit";
import { secureHeaders } from "hono/secure-headers";
import { createHonoServer } from "react-router-hono-server/node";
import { MAXIMUM_ASSET_SIZE } from "@thatskyapplication/utility";
import { PRODUCTION } from "./config.server";
import database from "./database.server";
import pino from "./pino";

const MAXIMUM_REQUEST_BODY_SIZE = MAXIMUM_ASSET_SIZE * 2 + 2_000_000;

export default await createHonoServer({
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

		server.use(
			"*",
			bodyLimit({
				maxSize: MAXIMUM_REQUEST_BODY_SIZE,
				onError: (c) => c.text("Payload too large.", 413),
			}),
		);
	},
	onServe(httpServer) {
		let shuttingDown = false;

		async function shutdown(signal: NodeJS.Signals) {
			if (shuttingDown) {
				return;
			}

			shuttingDown = true;
			pino.info(`Received ${signal}. Draining in-flight requests.`);

			let exitCode = 0;

			try {
				await new Promise<void>((resolve) => {
					httpServer.close(() => resolve());

					if ("closeIdleConnections" in httpServer) {
						httpServer.closeIdleConnections();
					}
				});

				await database.destroy();
			} catch (error) {
				exitCode = 1;
				pino.error(error, "Error whilst shutting down.");
			} finally {
				process.exit(exitCode);
			}
		}

		process.once("SIGINT", () => {
			void shutdown("SIGINT");
		});

		process.once("SIGTERM", () => {
			void shutdown("SIGTERM");
		});
	},
	defaultLogger: false,
});
