import type { Buffer } from "node:buffer";
import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { Emoji, Realm } from "../Utility/Constants.js";

function resolveSeasonEmoji(season: Season): Emoji {
  switch (season) {
    case Season.Gratitude:
      return Emoji.Gratitude;
    case Season.Lightseekers:
      return Emoji.Lightseekers;
    case Season.Belonging:
      return Emoji.Belonging;
    case Season.Rhythm:
      return Emoji.Rhythm;
    case Season.Enchantment:
      return Emoji.Enchantment;
    case Season.Sanctuary:
      return Emoji.Sanctuary;
    case Season.Prophecy:
      return Emoji.Prophecy;
    case Season.Dreams:
      return Emoji.Dreams;
    case Season.Assembly:
      return Emoji.Assembly;
    case Season.LittlePrince:
      return Emoji.LittlePrince;
    case Season.Flight:
      return Emoji.Flight;
    case Season.Abyss:
      return Emoji.Abyss;
    case Season.Performance:
      return Emoji.Performance;
  }
}

type SpiritName = "Sassy Drifter" | "Stretching Guru" | "Provoking Performer" | "Leaping Dancer" | "Saluting Protector" | "Greeting Shaman" | "Piggyback Lightseeker" | "Doublefive Light Catcher" | "Laidback Pioneer" | "Twirling Champion" | "Crab Whisperer" | "Shushing Light Scholar" | "Boogie Kid" | "Confetti Cousin" | "Hairtousle Teen" | "Sparkler Parent" | "Pleaful Parent" | "Wise Grandparent" | "Troupe Greeter" | "Festival Spin Dancer" | "Admiring Actor" | "Troupe Juggler" | "Respectful Pianist" | "Thoughtful Director" | "Nodding Muralist" | "Indifferent Alchemist" | "Crab Walker" | "Scarecrow Farmer" | "Snoozing Carpenter" | "Playfighting Herbalist" | "Jelly Whisperer" | "Timid Bookworm" | "Rallying Thrillseeker" | "Hiking Grouch" | "Grateful Shell Collector" | "Chill Sunbather" | "Prophet of Water" | "Prophet of Earth" | "Prophet of Air" | "Prophet of Fire" | "Spinning Mentor" | "Dancing Performer" | "Peeking Postman" | "Bearhug Hermit" | "Baffled Botanist" | "Scolding Student" | "Scaredy Cadet" | "Marching Adventurer" | "Chuckling Scout" | "Daydream Forester" | "Beckoning Ruler" | "Gloating Narcissist" | "Stretching Lamplighter" | "Slouching Soldier" | "Sneezing Geographer" | "Star Collector" | "Lively Navigator" | "Light Whisperer" | "Tinkering Chimesmith" | "Talented Builder" | "Anxious Angler" | "Ceasing Commodore" | "Bumbling Boatswain" | "Cackling Cannoneer" | "Frantic Stagehand" | "Forgetful Storyteller" | "Mellow Musician" | "Modest Dancer";

const enum Season {
  Gratitude = "Gratitude",
  Lightseekers = "Lightseekers",
  Belonging = "Belonging",
  Rhythm = "Rhythm",
  Enchantment = "Enchantment",
  Sanctuary = "Sanctuary",
  Prophecy = "Prophecy",
  Dreams = "Dreams",
  Assembly = "Assembly",
  LittlePrince = "Little Prince",
  Flight = "Flight",
  Abyss = "Abyss",
  Performance = "Performance"
}

const enum Call {
  Crab = "Crab",
  Jellyfish = "Jellyfish",
  BabyManta = "Baby manta"
}

const enum Expression {
  // Friend expressions
  DoubleFive = "Double-Five",
  HairTousle = "Hair tousle",
  Carry = "Carry",
  PlayFight = "Play fight",
  Bearhug = "Bearhug",
  Handshake = "Handshake",
  DuetDance = "Duet dance",
  // Regular expressions
  Point = "Point",
  Welcome = "Welcome",
  Nod = "Nod",
  Scold = "Scold",
  BlowKiss = "Blow kiss",
  Grateful = "Grateful",
  BellyScratch = "Belly scratch",
  Chuckle = "Chuckle",
  Karate = "Karate",
  Shrug = "Shrug",
  Grouchy = "Grouchy",
  Peek = "Peek",
  Eww = "Eww",
  Facepalm = "Faceplam",
  Leap = "Leap",
  Twirl = "Twirl",
  Confetti = "Confetti",
  Boogie = "Boogie",
  Dance = "Dance",
  Juggle = "Juggle",
  CrabWalk = "Crab walk",
  Rally = "Rally",
  SpinTrick = "Spin trick",
  ShowDance = "Show dance",
  Respect = "Respect",
  Dismiss = "Dismiss",
  Greeting = "Greeting",
  DontGo = "Don't go!",
  Scare = "Scare",
  DustOff = "Dust off",
  ChestPound = "Chest pound",
  March = "March",
  Yoga = "Yoga",
  Shush = "Shush",
  Sparkler = "Sparkler",
  Thinking = "Thinking",
  Doze = "Doze",
  Balance = "Balance",
  DeepBreath = "DeepBreath",
  Bubbles = "Bubbles",
  Beckon = "Beckon",
  Gloat = "Gloat",
  Stretch = "Stretch",
  Slouch = "Slouch",
  Sneeze = "Sneeze",
  HandRub = "Hand rub",
  Voilà = "Voilà",
  Navigate = "Navigate",
  CalmDown = "Calm down",
  EvilLaugh = "Evil laugh",
  Ouch = "Ouch",
  Anxious = "Anxious",
  Headbob = "Headbob",
  Awww = "Awww"
}

const enum Stance {
  Sassy = "Sassy",
  Laidback = "Laidback",
  Wise = "Wise",
  Timid = "Timid",
  Tinker = "Tinker"
}

interface SpiritOffer {
  candles: number;
  hearts: number;
  ascendedCandles: number;
}

interface SpiritDataBase {
  name: SpiritName;
  realm: Realm;
  offer?: SpiritOffer;
  keywords?: string[];
}

interface SpiritDataBaseWithExpression extends SpiritDataBase {
  expression: Expression;
}

interface SpiritDataBaseWithStance extends SpiritDataBase {
  stance: Stance;
}

interface SpiritDataBaseWithCall extends SpiritDataBase {
  call: Call;
}

type SpiritData = SpiritDataBaseWithExpression | SpiritDataBaseWithStance | SpiritDataBaseWithCall;
type SeasonalSpiritData = SpiritData & { season: Season };

interface SpiritSeason {
  name: Season;
  emoji: Emoji;
}

class Spirit {
  readonly name: SpiritData["name"];
  readonly realm: SpiritData["realm"];
  readonly offer: Exclude<SpiritData["offer"], undefined> | null;
  readonly keywords: NonNullable<SpiritData["keywords"]>;
  readonly attachment: Buffer | null;
  readonly url: string;
  readonly expression: SpiritDataBaseWithExpression["expression"] | null;
  readonly stance: SpiritDataBaseWithStance["stance"] | null;
  readonly call: SpiritDataBaseWithCall["call"] | null;

  constructor(spirit: SpiritData) {
    const underscoredName = spirit.name.replaceAll(" ", "_");
    this.name = spirit.name;
    this.realm = spirit.realm;
    this.offer = spirit.offer ?? null;
    this.keywords = spirit.keywords ?? [];

    try {
      this.attachment = readFileSync(new URL(`../../Images/${underscoredName}.webp`, import.meta.url));
    } catch {
      this.attachment = null;
    }

    this.url = `https://sky-children-of-the-light.fandom.com/wiki/${underscoredName}`;
    this.expression = "expression" in spirit ? spirit.expression : null;
    this.stance = "stance" in spirit ? spirit.stance : null;
    this.call = "call" in spirit ? spirit.call : null;
  }

  isSeasonalSpirit(): this is SeasonalSpirit {
    return "season" in this;
  }
}

class SeasonalSpirit extends Spirit {
  readonly season: SpiritSeason;

  constructor(spirit: SeasonalSpiritData) {
    super(spirit);
    this.season = { name: spirit.season, emoji: resolveSeasonEmoji(spirit.season) };
  }
}

export default [
  new SeasonalSpirit({ name: "Sassy Drifter", season: Season.Gratitude, stance: Stance.Sassy, realm: Realm.IslesOfDawn, offer: { candles: 87, hearts: 0, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Stretching Guru", season: Season.Gratitude, expression: Expression.Yoga, realm: Realm.DaylightPrairie, offer: { candles: 104, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Provoking Performer", season: Season.Gratitude, expression: Expression.Karate, realm: Realm.HiddenForest, offer: { candles: 104, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Leaping Dancer", season: Season.Gratitude, expression: Expression.Leap, realm: Realm.ValleyOfTriumph, offer: { candles: 107, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Saluting Protector", season: Season.Gratitude, expression: Expression.Dismiss, realm: Realm.GoldenWasteland, offer: { candles: 145, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Greeting Shaman", season: Season.Gratitude, expression: Expression.Greeting, realm: Realm.VaultOfKnowledge, offer: { candles: 112, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Piggyback Lightseeker", season: Season.Lightseekers, expression: Expression.Carry, realm: Realm.IslesOfDawn, offer: { candles: 123, hearts: 8, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Doublefive Light Catcher", season: Season.Lightseekers, expression: Expression.DoubleFive, realm: Realm.DaylightPrairie, offer: { candles: 126, hearts: 7, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Laidback Pioneer", season: Season.Lightseekers, stance: Stance.Laidback, realm: Realm.HiddenForest, offer: { candles: 151, hearts: 0, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Twirling Champion", season: Season.Lightseekers, expression: Expression.Twirl, realm: Realm.ValleyOfTriumph, offer: { candles: 131, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Crab Whisperer", season: Season.Lightseekers, call: Call.Crab, realm: Realm.GoldenWasteland, offer: { candles: 190, hearts: 0, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Shushing Light Scholar", season: Season.Lightseekers, expression: Expression.Shush, realm: Realm.VaultOfKnowledge, offer: { candles: 96, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Boogie Kid", season: Season.Belonging, expression: Expression.Boogie, realm: Realm.IslesOfDawn, offer: { candles: 103, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Confetti Cousin", season: Season.Belonging, expression: Expression.Confetti, realm: Realm.DaylightPrairie, offer: { candles: 115, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Hairtousle Teen", season: Season.Belonging, expression: Expression.HairTousle, realm: Realm.HiddenForest, offer: { candles: 148, hearts: 9, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Sparkler Parent", season: Season.Belonging, expression: Expression.Sparkler, realm: Realm.ValleyOfTriumph, offer: { candles: 116, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Pleaful Parent", season: Season.Belonging, expression: Expression.DontGo, realm: Realm.GoldenWasteland, offer: { candles: 195, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Wise Grandparent", season: Season.Belonging, stance: Stance.Wise, realm: Realm.VaultOfKnowledge, offer: { candles: 156, hearts: 0, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Troupe Greeter", season: Season.Rhythm, expression: Expression.Welcome, realm: Realm.IslesOfDawn, offer: { candles: 146, hearts: 13, ascendedCandles: 12 } }),
  new SeasonalSpirit({ name: "Festival Spin Dancer", season: Season.Rhythm, expression: Expression.Dance, realm: Realm.DaylightPrairie, offer: { candles: 157, hearts: 19, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Admiring Actor", season: Season.Rhythm, expression: Expression.BlowKiss, realm: Realm.HiddenForest, offer: { candles: 135, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Troupe Juggler", season: Season.Rhythm, expression: Expression.Juggle, realm: Realm.ValleyOfTriumph, offer: { candles: 205, hearts: 27, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Respectful Pianist", season: Season.Rhythm, expression: Expression.Respect, realm: Realm.GoldenWasteland, offer: { candles: 162, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Thoughtful Director", season: Season.Rhythm, expression: Expression.Thinking, realm: Realm.VaultOfKnowledge, offer: { candles: 195, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Nodding Muralist", season: Season.Enchantment, expression: Expression.Nod, realm: Realm.GoldenWasteland, offer: { candles: 77, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Indifferent Alchemist", season: Season.Enchantment, expression: Expression.Shrug, realm: Realm.GoldenWasteland, offer: { candles: 167, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Crab Walker", season: Season.Enchantment, expression: Expression.CrabWalk, realm: Realm.GoldenWasteland, offer: { candles: 115, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Scarecrow Farmer", season: Season.Enchantment, expression: Expression.Scare, realm: Realm.GoldenWasteland, offer: { candles: 89, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Snoozing Carpenter", season: Season.Enchantment, expression: Expression.Doze, realm: Realm.GoldenWasteland, offer: { candles: 112, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Playfighting Herbalist", season: Season.Enchantment, expression: Expression.PlayFight, realm: Realm.GoldenWasteland, offer: { candles: 195, hearts: 10, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Jelly Whisperer", season: Season.Sanctuary, call: Call.Jellyfish, realm: Realm.DaylightPrairie, offer: { candles: 135, hearts: 15, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Timid Bookworm", season: Season.Sanctuary, stance: Stance.Timid, realm: Realm.DaylightPrairie, offer: { candles: 140, hearts: 0, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Rallying Thrillseeker", season: Season.Sanctuary, expression: Expression.Rally, realm: Realm.DaylightPrairie, offer: { candles: 125, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Hiking Grouch", season: Season.Sanctuary, expression: Expression.Grouchy, realm: Realm.DaylightPrairie, offer: { candles: 139, hearts: 29, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Grateful Shell Collector", season: Season.Sanctuary, expression: Expression.Grateful, realm: Realm.DaylightPrairie, offer: { candles: 162, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Chill Sunbather", season: Season.Sanctuary, expression: Expression.BellyScratch, realm: Realm.DaylightPrairie, offer: { candles: 197, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Prophet of Water", season: Season.Prophecy, expression: Expression.DeepBreath, realm: Realm.IslesOfDawn, offer: { candles: 187, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Prophet of Earth", season: Season.Prophecy, expression: Expression.DustOff, realm: Realm.IslesOfDawn, offer: { candles: 211, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Prophet of Air", season: Season.Prophecy, expression: Expression.Balance, realm: Realm.IslesOfDawn, offer: { candles: 201, hearts: 12, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Prophet of Fire", season: Season.Prophecy, expression: Expression.ChestPound, realm: Realm.IslesOfDawn, offer: { candles: 202, hearts: 26, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Spinning Mentor", season: Season.Dreams, expression: Expression.SpinTrick, realm: Realm.ValleyOfTriumph, offer: { candles: 169, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Dancing Performer", season: Season.Dreams, expression: Expression.ShowDance, realm: Realm.ValleyOfTriumph }),
  new SeasonalSpirit({ name: "Peeking Postman", season: Season.Dreams, expression: Expression.Peek, realm: Realm.ValleyOfTriumph, offer: { candles: 217, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Bearhug Hermit", season: Season.Dreams, expression: Expression.Bearhug, realm: Realm.ValleyOfTriumph, keywords: ["yeti"] }),
  new SeasonalSpirit({ name: "Baffled Botanist", season: Season.Assembly, expression: Expression.Facepalm, realm: Realm.HiddenForest }),
  new SeasonalSpirit({ name: "Scolding Student", season: Season.Assembly, expression: Expression.Scold, realm: Realm.HiddenForest }),
  new SeasonalSpirit({ name: "Scaredy Cadet", season: Season.Assembly, expression: Expression.Eww, realm: Realm.HiddenForest }),
  new SeasonalSpirit({ name: "Marching Adventurer", season: Season.Assembly, expression: Expression.March, realm: Realm.HiddenForest }),
  new SeasonalSpirit({ name: "Chuckling Scout", season: Season.Assembly, expression: Expression.Chuckle, realm: Realm.HiddenForest }),
  new SeasonalSpirit({ name: "Daydream Forester", season: Season.Assembly, expression: Expression.Bubbles, realm: Realm.HiddenForest, offer: { candles: 112, hearts: 13, ascendedCandles: 2 } }),
  new SeasonalSpirit({ name: "Beckoning Ruler", season: Season.LittlePrince, expression: Expression.Beckon, realm: Realm.VaultOfKnowledge }),
  new SeasonalSpirit({ name: "Gloating Narcissist", season: Season.LittlePrince, expression: Expression.Gloat, realm: Realm.VaultOfKnowledge }),
  new SeasonalSpirit({ name: "Stretching Lamplighter", season: Season.LittlePrince, expression: Expression.Stretch, realm: Realm.VaultOfKnowledge }),
  new SeasonalSpirit({ name: "Slouching Soldier", season: Season.LittlePrince, expression: Expression.Slouch, realm: Realm.VaultOfKnowledge }),
  new SeasonalSpirit({ name: "Sneezing Geographer", season: Season.LittlePrince, expression: Expression.Sneeze, realm: Realm.VaultOfKnowledge }),
  new SeasonalSpirit({ name: "Star Collector", season: Season.LittlePrince, expression: Expression.HandRub, realm: Realm.VaultOfKnowledge }),
  new SeasonalSpirit({ name: "Lively Navigator", season: Season.Flight, expression: Expression.Navigate, realm: Realm.HiddenForest }),
  new SeasonalSpirit({ name: "Light Whisperer", season: Season.Flight, call: Call.BabyManta, realm: Realm.HiddenForest }),
  new SeasonalSpirit({ name: "Tinkering Chimesmith", season: Season.Flight, stance: Stance.Tinker, realm: Realm.HiddenForest }),
  new SeasonalSpirit({ name: "Talented Builder", season: Season.Flight, expression: Expression.Voilà, realm: Realm.HiddenForest }),
  new SeasonalSpirit({ name: "Anxious Angler", season: Season.Abyss, expression: Expression.Anxious, realm: Realm.GoldenWasteland }),
  new SeasonalSpirit({ name: "Ceasing Commodore", season: Season.Abyss, expression: Expression.CalmDown, realm: Realm.GoldenWasteland }),
  new SeasonalSpirit({ name: "Bumbling Boatswain", season: Season.Abyss, expression: Expression.Ouch, realm: Realm.GoldenWasteland }),
  new SeasonalSpirit({ name: "Cackling Cannoneer", season: Season.Abyss, expression: Expression.EvilLaugh, realm: Realm.GoldenWasteland }),
  new SeasonalSpirit({ name: "Frantic Stagehand", season: Season.Performance, expression: Expression.Handshake, realm: Realm.ValleyOfTriumph }),
  new SeasonalSpirit({ name: "Forgetful Storyteller", season: Season.Performance, expression: Expression.Awww, realm: Realm.ValleyOfTriumph }),
  new SeasonalSpirit({ name: "Mellow Musician", season: Season.Performance, expression: Expression.Headbob, realm: Realm.ValleyOfTriumph }),
  new SeasonalSpirit({ name: "Modest Dancer", season: Season.Performance, expression: Expression.DuetDance, realm: Realm.ValleyOfTriumph })
] as const;
