import "./i18next.js";
import { createServer, getServerPort } from "@devvit/web/server";
import express, { type ErrorRequestHandler } from "express";
import { postMenuDailyGuides } from "./routes/menu/daily-guides.js";
import { postMenuMegathreadFriendCodes } from "./routes/menu/friend-codes.js";
import { postSchedulerDailyGuides } from "./routes/scheduler/daily-guides.js";
import { postSchedulerMegathreadFriendCodes } from "./routes/scheduler/megathread-friend-codes.js";
import { postSettingsDiscordWebhookCommentsURL } from "./routes/settings/discord-webhook-comments-url.js";
import { postSettingsDiscordWebhookPostLinkFlairsURL } from "./routes/settings/discord-webhook-post-link-flairs-url.js";
import { postSettingsMegathreadFriendCodesPostFlairId } from "./routes/settings/megathread-friend-codes-post-flair-id.js";
import { postSettingsMegathreadFriendCodesText } from "./routes/settings/megathread-friend-codes-text.js";
import { postSettingsMegathreadFriendCodesTitle } from "./routes/settings/megathread-friend-codes-title.js";
import { postTriggersCommentDelete } from "./routes/triggers/comment-delete.js";
import { postTriggersCommentSubmit } from "./routes/triggers/comment-submit.js";
import { postTriggersCommentUpdate } from "./routes/triggers/comment-update.js";
import { postTriggersPostFlairUpdate } from "./routes/triggers/post-flair-update.js";
import { postTriggersPostSubmit } from "./routes/triggers/post-submit.js";

const app = express().use(express.json());
const router = express.Router();
router.post("/internal/menu/daily-guides", postMenuDailyGuides);
router.post("/internal/menu/megathread-friend-codes", postMenuMegathreadFriendCodes);
router.post("/internal/scheduler/daily-guides", postSchedulerDailyGuides);
router.post("/internal/scheduler/megathread-friend-codes", postSchedulerMegathreadFriendCodes);

router.post(
	"/internal/settings/discord-webhook-comments-url",
	postSettingsDiscordWebhookCommentsURL,
);

router.post(
	"/internal/settings/discord-webhook-post-link-flairs-url",
	postSettingsDiscordWebhookPostLinkFlairsURL,
);

router.post(
	"/internal/settings/megathread-friend-codes-post-flair-id",
	postSettingsMegathreadFriendCodesPostFlairId,
);

router.post(
	"/internal/settings/megathread-friend-codes-text",
	postSettingsMegathreadFriendCodesText,
);

router.post(
	"/internal/settings/megathread-friend-codes-title",
	postSettingsMegathreadFriendCodesTitle,
);

router.post("/internal/triggers/on-comment-delete", postTriggersCommentDelete);
router.post("/internal/triggers/on-comment-submit", postTriggersCommentSubmit);
router.post("/internal/triggers/on-comment-update", postTriggersCommentUpdate);
router.post("/internal/triggers/on-post-flair-update", postTriggersPostFlairUpdate);
router.post("/internal/triggers/on-post-submit", postTriggersPostSubmit);
app.use(router);

const errorRequestHandler: ErrorRequestHandler = (error, _req, res, _next) => {
	console.error(error);

	res.status("status" in error ? (error.status as number) : 500).json({
		message: error.message,
	});
};

app.use(errorRequestHandler);
const server = createServer(app);
server.on("error", (error) => console.error(error));
server.listen(getServerPort());
