import "./i18next.js";
import { createServer, getServerPort } from "@devvit/web/server";
import express, { type ErrorRequestHandler } from "express";
import { postMenuDailyGuides } from "./routes/menu/daily-guides.js";
import { postSchedulerDailyGuides } from "./routes/scheduler/daily-guides.js";
import { postTriggersCommentCreate } from "./routes/triggers/comment-create.js";
import { postTriggersCommentDelete } from "./routes/triggers/comment-delete.js";
import { postTriggersPostFlairUpdate } from "./routes/triggers/post-flair-update.js";
import { postTriggersPostSubmit } from "./routes/triggers/post-submit.js";

const app = express().use(express.json());
const router = express.Router();
router.post("/internal/menu/daily-guides", postMenuDailyGuides);
router.post("/internal/scheduler/daily-guides", postSchedulerDailyGuides);
router.post("/internal/triggers/on-comment-create", postTriggersCommentCreate);
router.post("/internal/triggers/on-comment-delete", postTriggersCommentDelete);
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
