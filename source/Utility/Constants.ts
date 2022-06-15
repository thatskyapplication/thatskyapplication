import { readFileSync } from "node:fs";
import { URL } from "node:url";

export const repository = "Jiralite/Caelus" as const;
export const startupMessage = "Twirling in the air~" as const;
export const logChannelId = "982748638793064501" as const;

const enum Emoji {
  Gratitude = "651170389115928587",
  LightSeekers = "651170389359198208",
  Belonging = "651170575955263559",
  Enchantment = "700863707785330789"
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
  Crab = "Crab"
}

const enum Expression {
  // Friend expressions
  DoubleFive = "Double-Five",
  HairTousle = "Hair tousle",
  Carry = "Carry",
  // Regular expressions
  Karate = "Katate",
  Leap = "Leap",
  Twirl = "Twirl",
  Confetti = "Confetti",
  Boogie = "Boogie",
  CrabWalk = "Crab walk",
  Dismiss = "Dismiss",
  Greeting = "Greeting",
  DontGo = "Don't go!",
  Yoga = "Yoga",
  Shush = "Shush",
  Sparkler = "Sparkler"
}

const enum Stance {
  Sassy = "Sassy",
  Laidback = "Laidback",
  Wise = "Wise"
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
  }
} as const;
