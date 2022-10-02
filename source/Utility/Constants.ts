import { Locale } from "discord.js";

export const REPOSITORY = "Jiralite/Caelus" as const;
export const STARTUP_MESSAGE = "Twirling in the air~" as const;
export const LOG_CHANNEL_ID = "994581628804403250" as const;
export const WIKI_URL = "https://sky-children-of-the-light.fandom.com/wiki/" as const;
export const MAXIMUM_WINGED_LIGHT = 206 as const;

export const Realm = {
  IslesOfDawn: 0,
  DaylightPrairie: 1,
  HiddenForest: 2,
  ValleyOfTriumph: 3,
  GoldenWasteland: 4,
  VaultOfKnowledge: 5,
  EyeOfEden: 6,
  AncientMemory: 7
} as const;

export const realmTranslations = {
  [Realm.IslesOfDawn]: {
    [Locale.EnglishGB]: "Isles of Dawn",
    [Locale.EnglishUS]: "Isles of Dawn",
    [Locale.SpanishES]: "Isla del Amanecer"
  },
  [Realm.DaylightPrairie]: {
    [Locale.EnglishGB]: "Daylight Prairie",
    [Locale.EnglishUS]: "Daylight Prairie",
    [Locale.SpanishES]: "Planicie de Luz de Día"
  },
  [Realm.HiddenForest]: {
    [Locale.EnglishGB]: "Hidden Forest",
    [Locale.EnglishUS]: "Hidden Forest",
    [Locale.SpanishES]: "Bosque Escondido"
  },
  [Realm.ValleyOfTriumph]: {
    [Locale.EnglishGB]: "Valley Of Triumph",
    [Locale.EnglishUS]: "Valley Of Triumph",
    [Locale.SpanishES]: "Valle del Triunfo"
  },
  [Realm.GoldenWasteland]: {
    [Locale.EnglishGB]: "Golden Wasteland",
    [Locale.EnglishUS]: "Golden Wasteland",
    [Locale.SpanishES]: "Páramo Dorado"
  },
  [Realm.VaultOfKnowledge]: {
    [Locale.EnglishGB]: "Vault of Knowledge",
    [Locale.EnglishUS]: "Vault of Knowledge",
    [Locale.SpanishES]: "Bóveda del Conocimiento"
  },
  [Realm.EyeOfEden]: {
    [Locale.EnglishGB]: "Eye of Eden",
    [Locale.EnglishUS]: "Eye of Eden",
    [Locale.SpanishES]: "Ojo de edén"
  },
  [Realm.AncientMemory]: {
    [Locale.EnglishGB]: "Ancient Memory",
    [Locale.EnglishUS]: "Ancient Memory",
    [Locale.SpanishES]: "Memoria antigua"
  }
} as const;

export type RealmValue = typeof Realm[keyof typeof Realm];

export const WingedLightCount = {
  IslesOfDawn: 9,
  DaylightPrairie: 21,
  HiddenForest: 19,
  ValleyOfTriumph: 17,
  GoldenWasteland: 18,
  VaultOfKnowledge: 11,
  EyeOfEden: 10,
  AncientMemory: 6,
  Orbit: 1
} as const;
