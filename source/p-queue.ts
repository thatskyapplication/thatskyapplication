import pQueue from "p-queue";
import { MAXIMUM_NOTIFICATION_CONCURRENCY_LIMIT } from "./utility/constants-2.js";

export default new pQueue({ concurrency: MAXIMUM_NOTIFICATION_CONCURRENCY_LIMIT });
