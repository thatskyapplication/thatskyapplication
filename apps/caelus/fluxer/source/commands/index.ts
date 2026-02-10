import type { GatewayMessageCreateDispatchData } from "@discordjs/core";
import shardEruption from "./shard-eruption.js";

export interface Command {
	names: readonly [string, ...string[]];
	execute(data: GatewayMessageCreateDispatchData): Promise<void>;
}

export const COMMANDS = [shardEruption] as const;
