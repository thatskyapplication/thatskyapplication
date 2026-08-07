import { createServer, getServerPort } from "@devvit/web/server";
import express, { type ErrorRequestHandler } from "express";
import { postMenuMegathreadFriendCodes } from "./routes/menu/friend-codes.js";
import { postSchedulerMegathreadFriendCodes } from "./routes/scheduler/megathread-friend-codes.js";
import { postSettingsDiscordWebhookCommentsURL } from "./routes/settings/discord-webhook-comments-url.js";
import { postSettingsDiscordWebhookPostLinkFlairsURL } from "./routes/settings/discord-webhook-post-link-flairs-url.js";
import { postSettingsDiscordWebhookPostsURL } from "./routes/settings/discord-webhook-posts-url.js";
import { postSettingsDiscordWebhookUserLinkFlairsURL } from "./routes/settings/discord-webhook-user-link-flairs-url.js";
import { postSettingsMegathreadFriendCodesPostFlairId } from "./routes/settings/megathread-friend-codes-post-flair-id.js";
import { postSettingsMegathreadFriendCodesText } from "./routes/settings/megathread-friend-codes-text.js";
import { postSettingsMegathreadFriendCodesTitle } from "./routes/settings/megathread-friend-codes-title.js";
import { postTriggersCommentDelete } from "./routes/triggers/comment-delete.js";
import { postTriggersCommentSubmit } from "./routes/triggers/comment-submit.js";
import { postTriggersCommentUpdate } from "./routes/triggers/comment-update.js";
import { postTriggersPostCreate } from "./routes/triggers/post-create.js";
import { postTriggersPostDelete } from "./routes/triggers/post-delete.js";
import { postTriggersPostFlairUpdate } from "./routes/triggers/post-flair-update.js";
import { postTriggersPostSubmit } from "./routes/triggers/post-submit.js";
import { postTriggersPostUpdate } from "./routes/triggers/post-update.js";

const app = express().use(express.json());
app.post("/internal/menu/megathread-friend-codes", postMenuMegathreadFriendCodes);
app.post("/internal/scheduler/megathread-friend-codes", postSchedulerMegathreadFriendCodes);

app.post("/internal/settings/discord-webhook-comments-url", postSettingsDiscordWebhookCommentsURL);

app.post(
	"/internal/settings/discord-webhook-post-link-flairs-url",
	postSettingsDiscordWebhookPostLinkFlairsURL,
);

app.post("/internal/settings/discord-webhook-posts-url", postSettingsDiscordWebhookPostsURL);

app.post(
	"/internal/settings/discord-webhook-user-link-flairs-url",
	postSettingsDiscordWebhookUserLinkFlairsURL,
);

app.post(
	"/internal/settings/megathread-friend-codes-post-flair-id",
	postSettingsMegathreadFriendCodesPostFlairId,
);

app.post("/internal/settings/megathread-friend-codes-text", postSettingsMegathreadFriendCodesText);

app.post(
	"/internal/settings/megathread-friend-codes-title",
	postSettingsMegathreadFriendCodesTitle,
);

app.post("/internal/triggers/on-comment-delete", postTriggersCommentDelete);
app.post("/internal/triggers/on-comment-submit", postTriggersCommentSubmit);
app.post("/internal/triggers/on-comment-update", postTriggersCommentUpdate);
app.post("/internal/triggers/on-post-create", postTriggersPostCreate);
app.post("/internal/triggers/on-post-delete", postTriggersPostDelete);
app.post("/internal/triggers/on-post-flair-update", postTriggersPostFlairUpdate);
app.post("/internal/triggers/on-post-submit", postTriggersPostSubmit);
app.post("/internal/triggers/on-post-update", postTriggersPostUpdate);

const errorRequestHandler: ErrorRequestHandler = (error: unknown, _req, res, _next) => {
	console.error(error);

	let status = 500;
	let message = "Internal server error.";

	if (typeof error === "object" && error !== null) {
		if ("status" in error && typeof error.status === "number") {
			status = error.status;
		}

		if ("message" in error && typeof error.message === "string") {
			message = error.message;
		}
	}

	res.status(status).json({ message });
};

app.use(errorRequestHandler);
const server = createServer(app);
server.on("error", (error) => console.error(error));
server.listen(getServerPort());
