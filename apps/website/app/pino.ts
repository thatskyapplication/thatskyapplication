import pino from "pino";

export default pino({
	serializers: {
		error: pino.stdSerializers.err,
		request: pino.stdSerializers.req,
		response: pino.stdSerializers.res,
	},
});
