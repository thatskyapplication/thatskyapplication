import about from "./chat-inputs/about.js";
import admin from "./chat-inputs/admin.js";
import ai from "./chat-inputs/ai.js";
import bonk from "./chat-inputs/bonk.js";
import calculate from "./chat-inputs/calculate.js";
import catalogue from "./chat-inputs/catalogue.js";
import daily_guides from "./chat-inputs/daily-guides.js";
import data from "./chat-inputs/data.js";
import guess from "./chat-inputs/guess.js";
import heart from "./chat-inputs/heart.js";
import high_five from "./chat-inputs/high-five.js";
import hug from "./chat-inputs/hug.js";
import krill from "./chat-inputs/krill.js";
import notifications from "./chat-inputs/notifications.js";
// import play_fight from "./chat-inputs/play-fight.js";
// import schedule from "./chat-inputs/sachedule.js";
// import shard_eruption from "./chat-inputs/shard-eruption.js";
// import sky_profile_chat_input from "./chat-inputs/sky-profile.js";
// import spirit from "./chat-inputs/spirit.js";
import gift_heart from "./user-context-menus/gift-heart.js";
// import sky_profile_context_menu from "./user-context-menus/sky-profile.js";

export const CHAT_INPUT_COMMANDS = [
	about,
	admin,
	ai,
	bonk,
	calculate,
	catalogue,
	daily_guides,
	data,
	guess,
	heart,
	high_five,
	hug,
	krill,
	notifications,
	// play_fight,
	// schedule,
	// shard_eruption,
	// sky_profile_chat_input,
	// spirit,
] as const;

export const USER_CONTEXT_MENU_COMMANDS = [
	gift_heart,
	// sky_profile_context_menu
] as const;

export const AUTOCOMPLETE_COMMANDS = CHAT_INPUT_COMMANDS.filter(
	(command) => "autocomplete" in command,
);
