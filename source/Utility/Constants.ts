export const repository = "Jiralite/Caelus" as const;
export const startupMessage = "Twirling in the air~" as const;
export const logChannelId = "982748638793064501" as const;

const enum Emoji {
  Gratitude = "651170389115928587",
  LightSeekers = "651170389359198208",
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
  Carry = "Carry",
  // Regular expressions
  Karate = "Katate",
  Leap = "Leap",
  Twirl = "Twirl",
  CrabWalk = "Crab walk",
  Dismiss = "Dismiss",
  Greeting = "Greeting",
  Yoga = "Yoga",
  Shush = "Shush"
}

const enum Stance {
  Sassy = "Sassy",
  Laidback = "Laidback"
}

export const travellingSpirits = {
  sassyDrifter: {
    name: "Sassy Drifter",
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b5/Gratitude_Isle_Sassy.png/revision/latest",
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
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/73/Gratitude_Prairie.png/revision/latest",
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
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/5/5b/Traveling_gratitude_forest.png/revision/latest",
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
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/7d/SoG_valley_TS.PNG/revision/latest",
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
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/62/Traveling_Spirit_Price_Chart_-_Spirit_53.webp/revision/latest",
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
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/68/Gratitude-vault.png/revision/latest",
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
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d6/Traveling_lightseekers_isle.png/revision/latest",
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
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/2e/Traveling_Lightseekers_Prairie.png/revision/latest",
    season: {
      name: Season.Lightseekers,
      emoji: Emoji.LightSeekers
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Piggyback_Lightseeker",
    expression: Expression.DoubleFive,
    stance: null,
    call: null
  },
  laidbackPioneer: {
    name: "Laidback Pioneer",
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/80/CA8E9927-7226-405C-83C7-FCFC8BA3066A.png/revision/latest",
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
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/97/SoL_Valley_TS_placeholder.PNG/revision/latest",
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
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/8/8e/Traveling_lightseekers_wasteland_map.png/revision/latest",
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
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/2/21/Vaultshush.png/revision/latest",
    season: {
      name: Season.Lightseekers,
      emoji: Emoji.LightSeekers
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Shushing_Light_Scholar",
    expression: Expression.Shush,
    stance: null,
    call: null
  },
  crabWalker: {
    name: "Crab Walker",
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/f/fd/SoE_crab_walk_TS_info.PNG/revision/latest",
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
