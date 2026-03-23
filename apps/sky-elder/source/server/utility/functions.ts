import type { T3 } from "@devvit/web/shared";

export function postIdWithoutPrefix(postId: T3) {
	return postId.replace("t3_", "");
}
