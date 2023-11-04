import { Map, REALM_VALUES, RealmToSpanishRealm } from "../Utility/Constants.js";

export default {
	general: {
		realms: Object.fromEntries(REALM_VALUES.map((realm) => [realm, RealmToSpanishRealm[realm]])),
		maps: { [Map.AncientMemory]: "Recuerdo Ancestral" },
	},
	commands: {
		calculate: {
			"seasonal-candles": {
				"goal-achieved": "¡Ya has alcanzado tu objetivo!",
			},
			"winged-light": {
				"command-name": "luz-alada",
				"command-description": "Calcula cuánta luz alada deberías tener.",
				"duplicate-areas": "Áreas duplicadas detectadas. ¡Asegúrate de dar una única área!",
				"started-with": "Empezaste con",
				"reborn-with": "Renaciste con",
				unknown: "Área desconocida detectada. Por favor, ¡reporta este problema!",
				"winged-light-calculator": "Calculadora de Luz Alada",
				"you-should-have": "Deberías tener",
			},
		},
	},
} as const;
