import { readFileSync } from "node:fs";
import { URL } from "node:url";

export const repository = "Jiralite/Caelus" as const;
export const startupMessage = "Twirling in the air~" as const;
export const logChannelId = "982748638793064501" as const;

const enum Emoji {
  Gratitude = "651170389115928587",
  LightSeekers = "651170389359198208",
  Belonging = "651170575955263559",
  Rhythm = "670096804443848714",
  Enchantment = "700863707785330789",
  Sanctuary = "730940479197282355",
  Prophecy = "764257791664979980"
}

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
  TheLittlePrince = "The Little Prince",
  Flight = "Flight",
  Abyss = "Abyss",
  Performance = "Performance"
}

const enum Call {
  Crab = "Crab",
  Jellyfish = "Jellyfish"
}

const enum Expression {
  // Friend expressions
  DoubleFive = "Double-Five",
  HairTousle = "Hair tousle",
  Carry = "Carry",
  PlayFight = "Play fight",
  // Regular expressions
  Welcome = "Welcome",
  Nod = "Nod",
  BlowKiss = "Blow kiss",
  Grateful = "Grateful",
  BellyScratch = "Belly scratch",
  Karate = "Karate",
  Shrug = "Shrug",
  Grouchy = "Grouchy",
  Leap = "Leap",
  Twirl = "Twirl",
  Confetti = "Confetti",
  Boogie = "Boogie",
  Dance = "Dance",
  Juggle = "Juggle",
  CrabWalk = "Crab walk",
  Rally = "Rally",
  Respect = "Respect",
  Dismiss = "Dismiss",
  Greeting = "Greeting",
  DontGo = "Don't go!",
  Scare = "Scare",
  DustOff = "Dust off",
  Yoga = "Yoga",
  Shush = "Shush",
  Sparkler = "Sparkler",
  Thinking = "Thinking",
  Doze = "Doze",
  Balance = "Balance",
  DeepBreath = "DeepBreath"
}

const enum Stance {
  Sassy = "Sassy",
  Laidback = "Laidback",
  Wise = "Wise",
  Timid = "Timid"
}

export const travellingSpirits = {
  sassyDrifter: {
    name: "Sassy Drifter",
    attachment: readFileSync(new URL("../../Images/Sassy_Drifter.webp", import.meta.url)),
    season: {
      name: Season.Gratitude,
      emoji: Emoji.Gratitude
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Sassy_Drifter",
    expression: null,
    stance: Stance.Sassy,
    call: null
  },
  stretchingGuru: {
    name: "Stretching Guru",
    attachment: readFileSync(new URL("../../Images/Stretching_Guru.webp", import.meta.url)),
    season: {
      name: Season.Gratitude,
      emoji: Emoji.Gratitude
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Stretching_Guru",
    expression: Expression.Yoga,
    stance: null,
    call: null
  },
  provokingPerformer: {
    name: "Provoking Performer",
    attachment: readFileSync(new URL("../../Images/Provoking_Performer.webp", import.meta.url)),
    season: {
      name: Season.Gratitude,
      emoji: Emoji.Gratitude
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Provoking_Performer",
    expression: Expression.Karate,
    stance: null,
    call: null
  },
  leapingDancer: {
    name: "Leaping Dancer",
    attachment: readFileSync(new URL("../../Images/Leaping_Dancer.webp", import.meta.url)),
    season: {
      name: Season.Gratitude,
      emoji: Emoji.Gratitude
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Leaping_Dancer",
    expression: Expression.Leap,
    stance: null,
    call: null
  },
  salutingProtector: {
    name: "Saluting Protector",
    attachment: readFileSync(new URL("../../Images/Saluting_Protector.webp", import.meta.url)),
    season: {
      name: Season.Gratitude,
      emoji: Emoji.Gratitude
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Saluting_Protector",
    expression: Expression.Dismiss,
    stance: null,
    call: null
  },
  greetingShaman: {
    name: "Greeting Shaman",
    attachment: readFileSync(new URL("../../Images/Greeting_Shaman.webp", import.meta.url)),
    season: {
      name: Season.Gratitude,
      emoji: Emoji.Gratitude
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Greeting_Shaman",
    expression: Expression.Greeting,
    stance: null,
    call: null
  },
  piggybackLightseeker: {
    name: "Piggyback Lightseeker",
    attachment: readFileSync(new URL("../../Images/Piggyback_Lightseeker.webp", import.meta.url)),
    season: {
      name: Season.Lightseekers,
      emoji: Emoji.LightSeekers
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Piggyback_Lightseeker",
    expression: Expression.Carry,
    stance: null,
    call: null
  },
  doublefiveLightCatcher: {
    name: "Doublefive Light Catcher",
    attachment: readFileSync(new URL("../../Images/Doublefive_Light_Catcher.webp", import.meta.url)),
    season: {
      name: Season.Lightseekers,
      emoji: Emoji.LightSeekers
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Doublefive_Light_Catcher",
    expression: Expression.DoubleFive,
    stance: null,
    call: null
  },
  laidbackPioneer: {
    name: "Laidback Pioneer",
    attachment: readFileSync(new URL("../../Images/Laidback_Pioneer.webp", import.meta.url)),
    season: {
      name: Season.Lightseekers,
      emoji: Emoji.LightSeekers
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Laidback_Pioneer",
    expression: null,
    stance: Stance.Laidback,
    call: null
  },
  twirlingChampion: {
    name: "Twirling Champion",
    attachment: readFileSync(new URL("../../Images/Twirling_Champion.webp", import.meta.url)),
    season: {
      name: Season.Lightseekers,
      emoji: Emoji.LightSeekers
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Twirling_Champion",
    expression: Expression.Twirl,
    stance: null,
    call: null
  },
  crabWhisperer: {
    name: "Crab Whisperer",
    attachment: readFileSync(new URL("../../Images/Crab_Whisperer.webp", import.meta.url)),
    season: {
      name: Season.Lightseekers,
      emoji: Emoji.LightSeekers
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Crab_Whisperer",
    expression: null,
    stance: null,
    call: Call.Crab
  },
  shushingLightScholar: {
    name: "Shushing Light Scholar",
    attachment: readFileSync(new URL("../../Images/Shushing_Light_Scholar.webp", import.meta.url)),
    season: {
      name: Season.Lightseekers,
      emoji: Emoji.LightSeekers
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Shushing_Light_Scholar",
    expression: Expression.Shush,
    stance: null,
    call: null
  },
  boogieKid: {
    name: "Boogie Kid",
    attachment: readFileSync(new URL("../../Images/Boogie_Kid.webp", import.meta.url)),
    season: {
      name: Season.Belonging,
      emoji: Emoji.Belonging
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Boogie_Kid",
    expression: Expression.Boogie,
    stance: null,
    call: null
  },
  confettiCousin: {
    name: "Confetti Cousin",
    attachment: readFileSync(new URL("../../Images/Confetti_Cousin.webp", import.meta.url)),
    season: {
      name: Season.Belonging,
      emoji: Emoji.Belonging
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Confetti_Cousin",
    expression: Expression.Confetti,
    stance: null,
    call: null
  },
  hairtousleTeen: {
    name: "Hairtousle Teen",
    attachment: readFileSync(new URL("../../Images/Hairtousle_Teen.webp", import.meta.url)),
    season: {
      name: Season.Belonging,
      emoji: Emoji.Belonging
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Hairtousle_Teen",
    expression: Expression.HairTousle,
    stance: null,
    call: null
  },
  sparklerParent: {
    name: "Sparkler Parent",
    attachment: readFileSync(new URL("../../Images/Sparkler_Parent.webp", import.meta.url)),
    season: {
      name: Season.Belonging,
      emoji: Emoji.Belonging
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Sparkler_Parent",
    expression: Expression.Sparkler,
    stance: null,
    call: null
  },
  pleafulParent: {
    name: "Pleaful Parent",
    attachment: readFileSync(new URL("../../Images/Pleaful_Parent.webp", import.meta.url)),
    season: {
      name: Season.Belonging,
      emoji: Emoji.Belonging
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Pleaful_Parent",
    expression: Expression.DontGo,
    stance: null,
    call: null
  },
  wiseGrandparent: {
    name: "Wise Grandparent",
    attachment: readFileSync(new URL("../../Images/Wise_Grandparent.webp", import.meta.url)),
    season: {
      name: Season.Belonging,
      emoji: Emoji.Belonging
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Wise_Grandparent",
    expression: null,
    stance: Stance.Wise,
    call: null
  },
  troupeGreeter: {
    name: "Troupe Greeter",
    attachment: readFileSync(new URL("../../Images/Troupe_Greeter.webp", import.meta.url)),
    season: {
      name: Season.Rhythm,
      emoji: Emoji.Rhythm
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Troupe_Greeter",
    expression: Expression.Welcome,
    stance: null,
    call: null
  },
  festivalSpinDancer: {
    name: "Festival Spin Dancer",
    attachment: readFileSync(new URL("../../Images/Festival_Spin_Dancer.webp", import.meta.url)),
    season: {
      name: Season.Rhythm,
      emoji: Emoji.Rhythm
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Festival_Spin_Dancer",
    expression: Expression.Dance,
    stance: null,
    call: null
  },
  admiringActor: {
    name: "Admiring Actor",
    attachment: readFileSync(new URL("../../Images/Admiring_Actor.webp", import.meta.url)),
    season: {
      name: Season.Rhythm,
      emoji: Emoji.Rhythm
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Admiring_Actor",
    expression: Expression.BlowKiss,
    stance: null,
    call: null
  },
  troupeJuggler: {
    name: "Troupe Juggler",
    attachment: readFileSync(new URL("../../Images/Troupe_Juggler.webp", import.meta.url)),
    season: {
      name: Season.Rhythm,
      emoji: Emoji.Rhythm
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Troupe_Juggler",
    expression: Expression.Juggle,
    stance: null,
    call: null
  },
  respectfulPianist: {
    name: "Respectful Pianist",
    attachment: readFileSync(new URL("../../Images/Respectful_Pianist.webp", import.meta.url)),
    season: {
      name: Season.Rhythm,
      emoji: Emoji.Rhythm
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Respectful_Pianist",
    expression: Expression.Respect,
    stance: null,
    call: null
  },
  thoughtfulDirector: {
    name: "Thoughtful Director",
    attachment: readFileSync(new URL("../../Images/Thoughtful_Director.webp", import.meta.url)),
    season: {
      name: Season.Rhythm,
      emoji: Emoji.Rhythm
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Thoughtful_Director",
    expression: Expression.Thinking,
    stance: null,
    call: null
  },
  noddingMuralist: {
    name: "Nodding Muralist",
    attachment: readFileSync(new URL("../../Images/Nodding_Muralist.webp", import.meta.url)),
    season: {
      name: Season.Enchantment,
      emoji: Emoji.Enchantment
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Nodding_Muralist",
    expression: Expression.Nod,
    stance: null,
    call: null
  },
  indifferentAlchemist: {
    name: "Indifferent Alchemist",
    attachment: readFileSync(new URL("../../Images/Indifferent_Alchemist.webp", import.meta.url)),
    season: {
      name: Season.Enchantment,
      emoji: Emoji.Enchantment
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Indifferent_Alchemist",
    expression: Expression.Shrug,
    stance: null,
    call: null
  },
  crabWalker: {
    name: "Crab Walker",
    attachment: readFileSync(new URL("../../Images/Crab_Walker.webp", import.meta.url)),
    season: {
      name: Season.Enchantment,
      emoji: Emoji.Enchantment
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Crab_Walker",
    expression: Expression.CrabWalk,
    stance: null,
    call: null
  },
  scarecrowFarmer: {
    name: "Scarecrow Farmer",
    attachment: readFileSync(new URL("../../Images/Scarecrow_Farmer.webp", import.meta.url)),
    season: {
      name: Season.Enchantment,
      emoji: Emoji.Enchantment
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Scarecrow_Farmer",
    expression: Expression.Scare,
    stance: null,
    call: null
  },
  snoozingCarpenter: {
    name: "Snoozing Carpenter",
    attachment: readFileSync(new URL("../../Images/Snoozing_Carpenter.webp", import.meta.url)),
    season: {
      name: Season.Enchantment,
      emoji: Emoji.Enchantment
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Snoozing_Carpenter",
    expression: Expression.Doze,
    stance: null,
    call: null
  },
  playfightingHerbalist: {
    name: "Playfighting Herbalist",
    attachment: readFileSync(new URL("../../Images/Playfighting_Herbalist.webp", import.meta.url)),
    season: {
      name: Season.Enchantment,
      emoji: Emoji.Enchantment
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Playfighting_Herbalist",
    expression: Expression.PlayFight,
    stance: null,
    call: null
  },
  jellyWhisperer: {
    name: "Jelly Whisperer",
    attachment: readFileSync(new URL("../../Images/Jelly_Whisperer.webp", import.meta.url)),
    season: {
      name: Season.Sanctuary,
      emoji: Emoji.Sanctuary
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Jelly_Whisperer",
    expression: null,
    stance: null,
    call: Call.Jellyfish
  },
  timidBookworm: {
    name: "Timid Bookworm",
    attachment: readFileSync(new URL("../../Images/Timid_Bookworm.webp", import.meta.url)),
    season: {
      name: Season.Sanctuary,
      emoji: Emoji.Sanctuary
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Timid_Bookworm",
    expression: null,
    stance: Stance.Timid,
    call: null
  },
  rallyingThrillseeker: {
    name: "Rallying Thrillseeker",
    attachment: readFileSync(new URL("../../Images/Rallying_Thrillseeker.webp", import.meta.url)),
    season: {
      name: Season.Sanctuary,
      emoji: Emoji.Sanctuary
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Rallying_Thrillseeker",
    expression: Expression.Rally,
    stance: null,
    call: null
  },
  hikingGrouch: {
    name: "Hiking Grouch",
    attachment: readFileSync(new URL("../../Images/Hiking_Grouch.webp", import.meta.url)),
    season: {
      name: Season.Sanctuary,
      emoji: Emoji.Sanctuary
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Hiking_Grouch",
    expression: Expression.Grouchy,
    stance: null,
    call: null
  },
  gratefulShellCollector: {
    name: "Grateful Shell Collector",
    attachment: readFileSync(new URL("../../Images/Grateful_Shell_Collector.webp", import.meta.url)),
    season: {
      name: Season.Sanctuary,
      emoji: Emoji.Sanctuary
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Grateful_Shell_Collector",
    expression: Expression.Grateful,
    stance: null,
    call: null
  },
  chillSunbather: {
    name: "Chill Sunbather",
    attachment: readFileSync(new URL("../../Images/Chill_Sunbather.webp", import.meta.url)),
    season: {
      name: Season.Sanctuary,
      emoji: Emoji.Sanctuary
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Chill_Sunbather",
    expression: Expression.BellyScratch,
    stance: null,
    call: null
  },
  prophetOfWater: {
    name: "Prophet of Water",
    attachment: readFileSync(new URL("../../Images/Prophet_of_Water.webp", import.meta.url)),
    season: {
      name: Season.Prophecy,
      emoji: Emoji.Prophecy
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Prophet_of_Water",
    expression: Expression.DeepBreath,
    stance: null,
    call: null
  },
  prophetOfEarth: {
    name: "Prophet of Earth",
    attachment: readFileSync(new URL("../../Images/Prophet_of_Earth.webp", import.meta.url)),
    season: {
      name: Season.Prophecy,
      emoji: Emoji.Prophecy
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Prophet_of_Earth",
    expression: Expression.DustOff,
    stance: null,
    call: null
  },
  prophetOfAir: {
    name: "Prophet of Air",
    attachment: readFileSync(new URL("../../Images/Prophet_of_Air.webp", import.meta.url)),
    season: {
      name: Season.Prophecy,
      emoji: Emoji.Prophecy
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Prophet_of_Air",
    expression: Expression.Balance,
    stance: null,
    call: null
  }
} as const;
