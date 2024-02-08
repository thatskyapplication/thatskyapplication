import { SEASON_NAME_VALUES } from "../Structures/Season.js";
import { SpiritName } from "../Structures/Spirits/Base.js";
import { MAP_VALUES, REALM_VALUES } from "../Utility/Constants.js";

export default {
	general: {
		"days-left": {
			season_zero: "The season ends today.",
			season_one: "{{count}} day left in the season.",
			season_other: "{{count}} days left in the season.",
		},
		realms: Object.fromEntries(REALM_VALUES.map((realm) => [realm, realm])),
		maps: Object.fromEntries(MAP_VALUES.map((map) => [map, map])),
		seasons: Object.fromEntries(SEASON_NAME_VALUES.map((season) => [season, season])),
		spiritNames: Object.fromEntries(Object.values(SpiritName).map((spiritName) => [spiritName, spiritName])),
	},
	commands: {
		calculate: {
			"command-name": "calculate",
			"command-description": "The command containing various calculators.",
			"seasonal-candles": {
				"command-name": "seasonal-candles",
				"command-description": "Calculates the number of days it would take to achieve a number of seasonal candles.",
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
				area: "area-{{area}}",
				"duplicate-areas": "Duplicate areas detected. Make sure to only provide unique areas!",
				"started-with": "Started with",
				"reborn-with": "Reborn with",
				unknown: "Unknown area detected. Please report this issue!",
				"winged-light-calculator": "Winged Light Calculator",
				"you-should-have": "You should have",
			},
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
	},
} as const;
