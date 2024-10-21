import pQueue from "p-queue";
import { MAXIMUM_NOTIFICATION_CONCURRENCY_LIMIT } from "./Utility2/Constants.js";

export default new pQueue({ concurrency: MAXIMUM_NOTIFICATION_CONCURRENCY_LIMIT });
