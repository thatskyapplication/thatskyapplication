import {
	NOTIFICATION_EVENT_VALUES,
	REALM_NAME_VALUES,
	SKY_MAP_VALUES,
} from "../Utility/Constants.js";
import { EVENT_NAME_VALUES, SEASON_NAME_VALUES } from "../Utility/catalogue.js";
import { SpiritName } from "../Utility/spirits.js";

export default {
	general: {
		back: "Back",
		next: "Next",
		"days-left": {
			season_zero: "The season ends today.",
			season_one: "{{count}} day left in the season.",
			season_other: "{{count}} days left in the season.",
			event_zero: "{{name}} ends today.",
			event_one: "{{count}} day left in {{name}}.",
			event_other: "{{count}} days left in {{name}}.",
		},
		"event-currency": "Event Currency",
		realms: Object.fromEntries(REALM_NAME_VALUES.map((realmName) => [realmName, realmName])),
		maps: Object.fromEntries(SKY_MAP_VALUES.map((skyMap) => [skyMap, skyMap])),
		notificationEvent: Object.fromEntries(
			NOTIFICATION_EVENT_VALUES.map((notificationEvent) => [notificationEvent, notificationEvent]),
		),
		seasons: Object.fromEntries(SEASON_NAME_VALUES.map((season) => [season, season])),
		events: Object.fromEntries(EVENT_NAME_VALUES.map((eventName) => [eventName, eventName])),
		"shard-eruption": "Shard Eruption",
		"shard-eruption-none": "None",
		spiritNames: Object.fromEntries(
			Object.values(SpiritName).map((spiritName) => [spiritName, spiritName]),
		),
		timestamps: "Timestamps",
		view: "View",
	},
	commands: {
		about: {
			"command-name": "about",
			"command-description": "About me, the wondrous little Sky helper!",
		},
		ai: {
			"command-name": "ai",
			"command-description": "Configure the AI.",
		},
		bonk: {
			"command-name": "bonk",
			"command-description": "Bonk someone!",
			"command-option-user-name": "user",
			"command-option-user-description": "The individual to be bonked.",
		},
		calculate: {
			"command-name": "calculate",
			"command-description": "The command containing various calculators.",
			"ascended-candles": {
				"command-name": "ascended-candles",
				"command-description":
					"Calculates the number of days it would take to achieve a number of ascended candles.",
				"command-option-start-name": "start",
				"command-option-start-description": "The starting number of ascended candles.",
				"command-option-goal-name": "goal",
				"command-option-goal-description": "The desired number of ascended candles.",
				"command-option-eye-of-eden-name": "eye-of-eden",
				"command-option-eye-of-eden-description":
					"Whether to include the Eye of Eden in the calculation.",
				"command-option-shard-eruptions-name": "shard-eruptions",
				"command-option-shard-eruptions-description":
					"Whether to include shard eruptions in the calculation.",
			},
			"event-currency": {
				"command-name": "event-currency",
				"command-description":
					"Calculates the number of days it would take to achieve a number of event currency.",
				"command-option-start-name": "start",
				"command-option-start-description": "The starting number of event currency.",
				"command-option-goal-name": "goal",
				"command-option-goal-description": "The desired number of event currency.",
			},
			"seasonal-candles": {
				"command-name": "seasonal-candles",
				"command-description":
					"Calculates the number of days it would take to achieve a number of seasonal candles.",
				"command-option-start-name": "start",
				"command-option-start-description": "The starting number of seasonal candles.",
				"command-option-goal-name": "goal",
				"command-option-goal-description": "The desired number of seasonal candles.",
				"goal-achieved": "You have already achieved your goal!",
				start: "Start",
				goal: "Goal",
				required: "Required",
				result: "Result",
				day_one: "{{count}} day",
				day_other: "{{count}} days",
				"day-season-pass_one": "({{count}} day with a Season Pass).",
				"day-season-pass_other": "({{count}} days with a Season Pass).",
				"seasonal-candle-calculator": "Seasonal Candle Calculator",
				"season-calculations": "Season Calculations",
				"remain-in-the-season": "remain in the season.",
				"remain-in-the-season-with-a-season-pass": "remain in the season with a Season Pass.",
				notes: "Notes",
				"double-seasonal-light-calculation": "Double Seasonal Light event included in calculation.",
			},
			"winged-light": {
				"command-name": "winged-light",
				"command-description": "Calculates how much winged light one should possess.",
				"command-option-wing-buffs-name": "wing-buffs",
				"command-option-wing-buffs-description":
					"The number of wing buffs (total amount collected from ascended spirits).",
				"duplicate-areas": "Duplicate areas detected. Make sure to only provide unique areas!",
				"started-with": "Started with",
				"reborn-with": "Reborn with",
				total: "Total",
				unknown: "Unknown area detected. Please report this issue!",
				"wedge-next_other": "Next wedge: {{count}}",
				"wedge-total_other": "{{count}} wedges",
				"winged-light-calculator": "Winged Light Calculator",
			},
		},
		catalogue: {
			"command-name": "catalogue",
			"command-description": "Your very own Sky catalogue.",
		},
		"daily-guides": {
			"command-name": "daily-guides",
			"command-description": "The command to set up daily guides in the server.",
			setup: {
				"command-name": "setup",
				"command-description": "Sets up the daily guides in the server.",
				"command-option-channel-name": "channel",
				"command-option-channel-description": "The channel to send daily guides in.",
			},
			status: {
				"command-name": "status",
				"command-description": "Displays the status of daily guides in this server.",
			},
			unset: {
				"command-name": "unset",
				"command-description": "Unsets daily guides in the server.",
			}
		},
		hug: {
			"command-name": "hug",
			"command-description": "Hug someone!",
			user: "user",
			"user-description": "The individual to be hugged.",
			"hug-self": "Share the love! Hug someone other than yourself!",
			"not-in-server": "{{-user}} is not in this server to be hugged.",
			"not-around": "{{-user}} is not around for the hug!",
			bot: "{{-user}} is a bot. They're pretty emotionless. Immune to hugs, I'd say.",
			message: "{{-user}}, {{-invoker}} hugged you!",
		},
		notifications: {
			setup: {
				"no-everyone": "Woah there! Let's pick another role. Not sure we want to do that!",
			},
		},
		schedule: {
			"command-name": "schedule",
			"command-description": "Returns a schedule of events in Sky!",
			"every-15-minutes": "... every 15 minutes...",
			"travelling-spirit": "Travelling Spirit",
			"travelling-spirit-today": "Today!",
			"travelling-spirit-none": "None",
			"travelling-spirit-next-visit": "Next visit at",
			"first-of-month": "_On the first of every month_",
			"deer-0": "Appears",
			"deer-120": "Walks",
			"deer-600": "Mantas and jellyfish appear",
			"deer-720": "Flies around or stands up",
			"deer-1200": "Disappears",
			"deer-1800": "Repeats",
			"times-are-relative": "Times are relative to your time zone.",
			"schedule-today": "Schedule Today",
		},
	},
} as const;
