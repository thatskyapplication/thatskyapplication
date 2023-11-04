import { MAP_VALUES, REALM_VALUES } from "../Utility/Constants.js";

export default {
	general: {
		realms: Object.fromEntries(REALM_VALUES.map((realm) => [realm, realm])),
		maps: Object.fromEntries(MAP_VALUES.map((map) => [map, map])),
	},
	commands: {
		calculate: {
			"winged-light": {
				"duplicate-areas": "Duplicate areas detected. Make sure to only provide unique areas!",
				"started-with": "Started with",
				"reborn-with": "Reborn with",
				unknown: "Unknown area detected. Please report this issue!",
				"you-should-have": "You should have",
			},
		},
	},
} as const;
