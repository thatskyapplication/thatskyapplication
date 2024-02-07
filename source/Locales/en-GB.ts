import { SpiritName } from "../Structures/Spirits/Base.js";
import { MAP_VALUES, REALM_VALUES } from "../Utility/Constants.js";

export default {
	general: {
		realms: Object.fromEntries(REALM_VALUES.map((realm) => [realm, realm])),
		maps: Object.fromEntries(MAP_VALUES.map((map) => [map, map])),
		spiritNames: Object.fromEntries(Object.values(SpiritName).map((spiritName) => [spiritName, spiritName])),
	},
	commands: {
		calculate: {
			"command-name": "calculate",
			"command-description": "The command containing various calculators.",
			"seasonal-candles": {
				"goal-achieved": "You have already achieved your goal!",
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
