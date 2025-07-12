import pino from "pino";
import { BETTER_STACK_ENDPOINT_URL, BETTER_STACK_TOKEN } from "./utility/configuration.js";

const options: Parameters<(typeof pino)["default"]>[0] = {};

if (BETTER_STACK_TOKEN && BETTER_STACK_ENDPOINT_URL) {
	options.transport = {
		target: "@logtail/pino",
		options: {
			sourceToken: BETTER_STACK_TOKEN,
			options: { endpoint: BETTER_STACK_ENDPOINT_URL },
		},
	};
}

export default pino.default(options);
