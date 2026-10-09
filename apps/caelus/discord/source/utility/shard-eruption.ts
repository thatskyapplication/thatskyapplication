import { MISCELLANEOUS_EMOJIS } from "./emojis.js";

export const MAXIMUM_OPTION_NUMBER = 25 as const;

export function resolveShardEruptionEmoji(strong: boolean) {
	return strong ? MISCELLANEOUS_EMOJIS.ShardStrong : MISCELLANEOUS_EMOJIS.ShardRegular;
}
