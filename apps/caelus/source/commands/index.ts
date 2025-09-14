import about from "./chat-inputs/about.js";
import admin from "./chat-inputs/admin.js";
import calculate from "./chat-inputs/calculate.js";
import catalogue from "./chat-inputs/catalogue.js";
import checklist from "./chat-inputs/checklist.js";
import configure from "./chat-inputs/configure.js";
import dailyGuides from "./chat-inputs/daily-guides.js";
import data from "./chat-inputs/data.js";
import giveaway from "./chat-inputs/giveaway.js";
import guess from "./chat-inputs/guess.js";
import hair_tousle from "./chat-inputs/hair-tousle.js";
import heart from "./chat-inputs/heart.js";
import high_five from "./chat-inputs/high-five.js";
import hug from "./chat-inputs/hug.js";
import krill from "./chat-inputs/krill.js";
import play_fight from "./chat-inputs/play-fight.js";
import quest from "./chat-inputs/quest.js";
import schedule from "./chat-inputs/schedule.js";
import shard_eruption from "./chat-inputs/shard-eruption.js";
import shop from "./chat-inputs/shop.js";
import sky_profile_chat_input from "./chat-inputs/sky-profile.js";
import spirit from "./chat-inputs/spirits.js";
import gift_heart from "./user-context-menus/gift-heart.js";
import sky_profile_context_menu from "./user-context-menus/sky-profile.js";

export const CHAT_INPUT_COMMANDS = [
	about,
	admin,
	calculate,
	catalogue,
	checklist,
	configure,
	dailyGuides,
	data,
	hair_tousle,
	giveaway,
	guess,
	heart,
	high_five,
	hug,
	krill,
	play_fight,
	quest,
	schedule,
	shard_eruption,
	shop,
	sky_profile_chat_input,
	spirit,
] as const;

export const USER_CONTEXT_MENU_COMMANDS = [gift_heart, sky_profile_context_menu] as const;

export const AUTOCOMPLETE_COMMANDS = CHAT_INPUT_COMMANDS.filter(
	(command) => "autocomplete" in command,
);
