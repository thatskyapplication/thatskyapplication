import pino from "pino";
import { BETTER_STACK_TOKEN, PRODUCTION } from "./utility/configuration.js";

const options: Parameters<(typeof pino)["default"]>[0] = {};

if (PRODUCTION) {
	options.transport = {
		target: "@logtail/pino",
		options: { sourceToken: BETTER_STACK_TOKEN },
	};
}

export default pino.default(options);
