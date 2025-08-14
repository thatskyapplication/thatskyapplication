import pino from "pino";
import { BETTER_STACK_TOKEN } from "./utility/configuration.js";

const options: Parameters<typeof pino>[0] = {
	errorKey: "error",
};

if (BETTER_STACK_TOKEN) {
	options.transport = {
		target: "@logtail/pino",
		options: { sourceToken: BETTER_STACK_TOKEN },
	};
}

export default pino(options);
