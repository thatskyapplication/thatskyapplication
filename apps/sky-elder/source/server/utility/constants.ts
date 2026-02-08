// Settings.
export const SETTINGS_COMMENTS_WEBHOOK_URL = "DISCORD_WEBHOOK_COMMENTS_URL" as const;
export const SETTINGS_MEGATHREAD_FRIEND_CODES_TITLE_KEY = "MEGATHREAD_FRIEND_CODES_TITLE" as const;
export const SETTINGS_MEGATHREAD_FRIEND_CODES_TEXT_KEY = "MEGATHREAD_FRIEND_CODES_TEXT" as const;

export const SETTINGS_MEGATHREAD_FRIEND_CODES_POST_FLAIR_ID =
	"MEGATHREAD_FRIEND_CODES_POST_FLAIR_ID" as const;

export const SETTINGS_POST_LINK_FLAIRS_WEBHOOK_URL =
	"DISCORD_WEBHOOK_POST_LINK_FLAIRS_URL" as const;

export const SETTINGS_USER_LINK_FLAIRS_WEBHOOK_URL =
	"DISCORD_WEBHOOK_USER_LINK_FLAIRS_URL" as const;

// Redis.
export const REDIS_MEGATHREAD_FRIEND_CODES_KEY = "megathread-friend-codes";
export const REDIS_POST_FLAIRS_KEY = "post-flairs" as const;
export const REDIS_POST_FLAIRS_BY_POST_KEY = "post-flairs-by-post" as const;
export const REDIS_POST_FLAIRS_MESSAGE_ID_KEY = "post-flairs-message-id" as const;

// Miscellaneous.
export const COMMENT_SUBMIT_COLOUR = 0x4de063 as const;
export const COMMENT_DELETE_COLOUR = 0xdf0a0e as const;
export const COMMENT_UPDATE_COLOUR = 0xe7d881 as const;

export const DISCORD_WEBHOOK_URL_REGULAR_EXPRESSION =
	/^https:\/\/(canary\.|ptb\.)?discord\.com\/api\/webhooks\/(?:0|[1-9]\d{16,18})\/[\w-]+$/;
