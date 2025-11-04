import { captureException } from "@sentry/node";
import pino from "../pino.js";

export function captureError(error: unknown, message?: string) {
	pino.error(error, message);
	captureException(error);
}
