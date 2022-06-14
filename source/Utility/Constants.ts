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

const enum Expression {
  // Friend expressions
  Carry = "Carry",
  // Regular expressions
  Karate = "Katate",
  Leap = "Leap",
  CrabWalk = "Crab walk",
  Dismiss = "Dismiss",
  Greeting = "Greeting",
  Yoga = "Yoga"
}

const enum Stance {
  Sassy = "Sassy"
}

export const travellingSpirits = {
  sassyDrifter: {
    name: "Sassy Drifter",
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b5/Gratitude_Isle_Sassy.png/revision/latest?cb=20220317115709",
    season: {
      name: Season.Gratitude,
      emoji: Emoji.Gratitude
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Sassy_Drifter",
    expression: null,
    stance: Stance.Sassy
  },
  stretchingGuru: {
    name: "Stretching Guru",
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/73/Gratitude_Prairie.png/revision/latest?cb=20220317115709",
    season: {
      name: Season.Gratitude,
      emoji: Emoji.Gratitude
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Stretching_Guru",
    expression: Expression.Yoga,
    stance: null
  },
  provokingPerformer: {
    name: "Provoking Performer",
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/5/5b/Traveling_gratitude_forest.png/revision/latest?cb=20220317115709",
    season: {
      name: Season.Gratitude,
      emoji: Emoji.Gratitude
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Provoking_Performer",
    expression: Expression.Karate,
    stance: null
  },
  leapingDancer: {
    name: "Leaping Dancer",
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/7d/SoG_valley_TS.PNG/revision/latest?cb=20220317115709",
    season: {
      name: Season.Gratitude,
      emoji: Emoji.Gratitude
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Leaping_Dancer",
    expression: Expression.Leap,
    stance: null
  },
  salutingProtector: {
    name: "Saluting Protector",
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/62/Traveling_Spirit_Price_Chart_-_Spirit_53.webp/revision/latest?cb=20220317115709",
    season: {
      name: Season.Gratitude,
      emoji: Emoji.Gratitude
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Saluting_Protector",
    expression: Expression.Dismiss,
    stance: null
  },
  greetingShaman: {
    name: "Greeting Shaman",
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/6/68/Gratitude-vault.png/revision/latest?cb=20220317115709",
    season: {
      name: Season.Gratitude,
      emoji: Emoji.Gratitude
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Greeting_Shaman",
    expression: Expression.Greeting,
    stance: null
  },
  piggybackLightseeker: {
    name: "Piggyback Lightseeker",
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/d/d6/Traveling_lightseekers_isle.png/revision/latest?cb=20220317115709",
    season: {
      name: Season.Lightseekers,
      emoji: Emoji.LightSeekers
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Piggyback_Lightseeker",
    expression: Expression.Carry,
    stance: null
  },
  crabWalker: {
    name: "Crab Walker",
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/f/fd/SoE_crab_walk_TS_info.PNG/revision/latest?cb=20220317115709",
    season: {
      name: Season.Enchantment,
      emoji: Emoji.Enchantment
    },
    url: "https://sky-children-of-the-light.fandom.com/wiki/Crab_Walker",
    expression: Expression.CrabWalk,
    stance: null
  }
} as const;
