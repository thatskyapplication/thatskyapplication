import pino from "pino";
import { BETTER_STACK_ENDPOINT_URL, BETTER_STACK_TOKEN, PRODUCTION } from "./utility/constants.js";

const options: Parameters<(typeof pino)["default"]>[0] = {};

if (PRODUCTION) {
	options.transport = {
		target: "@logtail/pino",
		options: {
			sourceToken: BETTER_STACK_TOKEN,
			options: { endpoint: BETTER_STACK_ENDPOINT_URL },
		},
	};
}

export default pino.default(options);
