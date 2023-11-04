import { Map, REALM_VALUES, RealmToSpanishRealm } from "../Utility/Constants.js";

export default {
	general: {
		realms: Object.fromEntries(REALM_VALUES.map((realm) => [realm, RealmToSpanishRealm[realm]])),
		maps: {
			[Map.AncientMemory]: "Recuerdo Ancestral",
		},
	},
	commands: {
		calculate: {
			"winged-light": {
				"duplicate-areas": "Áreas duplicadas detectadas. ¡Asegúrate de dar una única área!",
				"started-with": "Empezó con",
				"reborn-with": "Renació con",
				unknown: "Área desconocida detectada. Por favor, ¡reporta este problema!",
				"you-should-have": "Deberías tener",
			},
		},
	},
} as const;
