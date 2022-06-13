export const repository = "Jiralite/Caelus" as const;
export const startupMessage = "Twirling in the air~" as const;
export const logChannelId = "982748638793064501" as const;

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

export const travellingSpirits = {
  sassyDrifter: {
    name: "Sassy Drifter",
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/b/b5/Gratitude_Isle_Sassy.png/revision/latest?cb=20220317115709",
    season: Season.Belonging,
    url: "https://sky-children-of-the-light.fandom.com/wiki/Sassy_Drifter"
  },
  stretchingGuru: {
    name: "Stretching Guru",
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/73/Gratitude_Prairie.png/revision/latest?cb=20220317115709",
    season: Season.Belonging,
    url: "https://sky-children-of-the-light.fandom.com/wiki/Stretching_Guru"
  },
  provokingPerformer: {
    name: "Provoking Performer",
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/5/5b/Traveling_gratitude_forest.png/revision/latest?cb=20220317115709",
    season: Season.Belonging,
    url: "https://sky-children-of-the-light.fandom.com/wiki/Provoking_Performer"
  },
  leapingDancer: {
    name: "Leaping Dancer",
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/7/7d/SoG_valley_TS.PNG/revision/latest?cb=20220317115709",
    season: Season.Belonging,
    url: "https://sky-children-of-the-light.fandom.com/wiki/Leaping_Dancer"
  },
  crabWalker: {
    name: "Crab Walker",
    image: "https://static.wikia.nocookie.net/sky-children-of-the-light/images/f/fd/SoE_crab_walk_TS_info.PNG/revision/latest?cb=20220317115709",
    season: Season.Enchantment,
    url: "https://sky-children-of-the-light.fandom.com/wiki/Crab_Walker"
  }
} as const;
