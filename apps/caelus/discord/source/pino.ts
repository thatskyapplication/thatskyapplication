import pino from "pino";

export default pino({ serializers: { error: pino.stdSerializers.err } });
