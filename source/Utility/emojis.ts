import {
	type ButtonInteraction,
	type ChatInputCommandInteraction,
	type InteractionReplyOptions,
	type InteractionUpdateOptions,
	type ModalSubmitInteraction,
	type Snowflake,
	type StringSelectMenuInteraction,
	type UserContextMenuCommandInteraction,
	CDN,
	PermissionFlagsBits,
} from "discord.js";

const cdn = new CDN();

export interface EmojiData {
	name: string;
	id: Snowflake;
	animated?: boolean;
}

/**
 * Emojis from the support server.
 */
export const MISCELLANEOUS_EMOJIS = {
	AscendedCandle: { name: "ascended_candle", id: "1074399464627912755" },
	WingedLight: { name: "winged_light", id: "1075042577776136313" },
	Yes: { name: "yes", id: "1111792276394475580", animated: true },
	No: { name: "no", id: "1111792367104708699", animated: true },
	PlatformIOS: { name: "platform_iOS", id: "1112935921197789304" },
	PlatformAndroid: { name: "platform_android", id: "1112936417182621727" },
	PlatformMac: { name: "platform_mac", id: "1112936431464235058" },
	PlatformSwitch: { name: "platform_switch", id: "1112936564004237392" },
	PlatformPlayStation: { name: "platform_playstation", id: "1112937466312278036" },
	SeasonalCandle: { name: "seasonal_candle", id: "1115305105642758145" },
	SeasonalHeart: { name: "seasonal_heart", id: "1115841397493346325" },
	Candle: { name: "candle", id: "1134669696822689882" },
	Heart: { name: "heart", id: "1134669722353401977" },
	PlatformSteam: { name: "platform_steam", id: "1134673226107191336" },
	Light: { name: "light", id: "1164342686950625300" },
	ShardRegular: { name: "shard_regular", id: "1164672237761200130" },
	ShardStrong: { name: "shard_strong", id: "1164672254911713382" },
	EventMischief: { name: "event_mischief", id: "1177665479612039270" },
	EventAviarysFireworkFestival: { name: "event_aviarys_firework_festival", id: "1177665489976176670" },
	EventFeast: { name: "event_feast", id: "1182501356980932698" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type MiscellaneousEmojis = (typeof MISCELLANEOUS_EMOJIS)[keyof typeof MISCELLANEOUS_EMOJIS];

/**
 * Emojis from the emotes servers.
 */
export const EMOTES_EMOJIS = {
	Sit: { name: "sit", id: "1177210235774054441" },
	Point: { name: "point", id: "1177213563111231581" },
	Come: { name: "come", id: "1177333067317268480" },
	NoThanks: { name: "no_thanks", id: "1177335909528645662" },
	Welcome: { name: "welcome", id: "1177336823673016340" },
	Nod: { name: "nod", id: "1177336825707233280" },
	Scold: { name: "scold", id: "1177336828886528081" },
	Butterfly: { name: "butterfly", id: "1177336831558299709" },
	Clap: { name: "clap", id: "1177338295626248263" },
	Wave: { name: "wave", id: "1177338299451449424" },
	Laugh: { name: "laugh", id: "1177338465797550181" },
	Yawn: { name: "yawn", id: "1177338497745559593" },
	WipeBrow: { name: "wipe_brow", id: "1177346837666078890" },
	Teamwork: { name: "teamwork", id: "1177346850861367468" },
	BlowKiss: { name: "blow_kiss", id: "1177346883996364820" },
	Grateful: { name: "grateful", id: "1177346919857651814" },
	BellyScratch: { name: "belly_scratch", id: "1177349505906135143" },
	Chuckle: { name: "chuckle", id: "1177349547475869739" },
	Shiver: { name: "shiver", id: "1177349585283326042" },
	HideAndSeek: { name: "hide_and_seek", id: "1177349740145410150" },
	Angry: { name: "angry", id: "1177351816581754880" },
	Shy: { name: "shy", id: "1177351841026162698" },
	Shocked: { name: "shocked", id: "1177351854267568199" },
	Apologise: { name: "apologise", id: "1177351868763078716" },
	Crying: { name: "crying", id: "1177353646585954466" },
	Kabuki: { name: "kabuki", id: "1177353667632967761" },
	Shrug: { name: "shrug", id: "1177353698645639350" },
	Grumpy: { name: "grumpy", id: "1177353727691198525" },
	Peek: { name: "peek", id: "1177357068437561406" },
	Eww: { name: "eww", id: "1177357102281396244" },
	Facepalm: { name: "facepalm", id: "1177357135965855894" },
	Handstand: { name: "handstand", id: "1177357165804126258" },
	Backflip: { name: "backflip", id: "1177358583877349406" },
	Bow: { name: "bow", id: "1177358599064911932" },
	Cheer: { name: "cheer", id: "1177358626277572728" },
	Leap: { name: "leap", id: "1177358638902423602" },
	TripleAxel: { name: "triple_axel", id: "1177359760924885062" },
	Confetti: { name: "confetti", id: "1177359788938629264" },
	BoogieDance: { name: "boogie_dance", id: "1177359804696637470" },
	SpinDance: { name: "spin_dance", id: "1177359844458643506" },
	Juggle: { name: "juggle", id: "1177366450349035550" },
	CrabWalk: { name: "crab_walk", id: "1177366467004600330" },
	RallyCheer: { name: "rally_cheer", id: "1177366497572683886" },
	SpinTrick: { name: "spin_trick", id: "1177366523149553774" },
	ShowDance: { name: "show_dance", id: "1177368467444342894" },
	Duck: { name: "duck", id: "1177368552093798470" },
	Faint: { name: "faint", id: "1177368589460852736" },
	Respect: { name: "respect", id: "1177368605285957763" },
	LookAround: { name: "look_around", id: "1177377419674534028" },
	Salute: { name: "salute", id: "1177377433175998615" },
	Acknowledge: { name: "acknowledge", id: "1177393399964373054" },
	KungFu: { name: "kung_fu", id: "1177393417987297290" },
	DontGo: { name: "dont_go", id: "1177394732373114891" },
	Boo: { name: "boo", id: "1177394745727782982" },
	DustOff: { name: "dust_off", id: "1177394792859181176" },
	ChestPound: { name: "chest_pound", id: "1177394820310909029" },
	Marching: { name: "marching", id: "1177399682859810827" },
	Telekinesis: { name: "telekinesis", id: "1177399705081233449" },
	Float: { name: "float", id: "1177399733690572861" },
	Pray: { name: "pray", id: "1177399746911010826" },
	Yoga: { name: "yoga", id: "1177400646694096916" },
	Shush: { name: "shush", id: "1177400660086489149" },
	Sparkler: { name: "sparkler", id: "1177400672585531582" },
	Thinking: { name: "thinking", id: "1177400683817877525" },
	Doze: { name: "doze", id: "1177401997436129280" },
	Balance: { name: "balance", id: "1177402041769922592" },
	DeepBreath: { name: "deep_breath", id: "1177402066784768121" },
	Bubbles: { name: "bubbles", id: "1177402129024024616" },
	Beckon: { name: "beckon", id: "1177403063116517466" },
	Gloat: { name: "gloat", id: "1177403110784761936" },
	Stretch: { name: "stretch", id: "1177403161321938954" },
	Slouch: { name: "slouch", id: "1177403214140801165" },
	Sneeze: { name: "sneeze", id: "1177403643381694474" },
	HandRub: { name: "hand_rub", id: "1177403696561266688" },
	Voilà: { name: "voila", id: "1177403758850871336" },
	Navigate: { name: "navigate", id: "1177403824206524477" },
	CalmDown: { name: "calm_down", id: "1177404573665730622" },
	EvilLaugh: { name: "evil_laugh", id: "1177404591013363765" },
	Ouch: { name: "ouch", id: "1177404615474565120" },
	Anxious: { name: "anxious", id: "1177404645354786917" },
	Headbob: { name: "headbob", id: "1177409163375149127" },
	Aww: { name: "aww", id: "1177409189535043705" },
	WavingLight: { name: "waving_light", id: "1177409211550928966" },
	RaiseTheRoof: { name: "raise_the_roof", id: "1177409241179492404" },
	Twirl: { name: "twirl", id: "1177410184298111067" },
	RhythmicClap: { name: "rhythmic_clap", id: "1177410214639702086" },
	Conduct: { name: "conduct", id: "1177410232629088336" },
	SilentClap: { name: "silent_clap", id: "1177410341043441755" },
	Skipping: { name: "skipping", id: "1177410805055098980" },
	Pleading: { name: "pleading", id: "1177410825909178419" },
	Tiptoeing: { name: "tiptoeing", id: "1177410846901682246" },
	Grieving: { name: "grieving", id: "1177410931593056287" },
	HackySack: { name: "hacky_sack", id: "1177411402256896021" },
	Somersault: { name: "somersault", id: "1177411430979477524" },
	Moping: { name: "moping", id: "1177411465020444692" },
	PullUp: { name: "pull_up", id: "1177411480199635005" },
	JollyDance: { name: "jolly_dance", id: "1177411979909009458" },
	BlindfoldBalancePose: { name: "blindfold_balance_pose", id: "1177412000444338186" },
	CureForMeDance: { name: "cure_for_me_dance", id: "1177412031654146168" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type EmotesEmojis = (typeof EMOTES_EMOJIS)[keyof typeof EMOTES_EMOJIS];

/**
 * Emojis from the stances server.
 */
export const STANCES_EMOJIS = {
	Base: { name: "base", id: "1177462825145356348" },
	Courageous: { name: "courageous", id: "1177462882099810434" },
	Confident: { name: "confident", id: "1177462894657548368" },
	Sneaky: { name: "sneaky", id: "1177462972310888530" },
	Proud: { name: "proud", id: "1177463016304934952" },
	Polite: { name: "polite", id: "1177463048387186750" },
	Sassy: { name: "sassy", id: "1177463083141189663" },
	Laidback: { name: "laidback", id: "1177463109003255818" },
	Wise: { name: "wise", id: "1177463130754908290" },
	Timid: { name: "timid", id: "1177463232068333600" },
	Tinker: { name: "tinker", id: "1177463284685873163" },
	Injured: { name: "injured", id: "1177463309293867069" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type StancesEmojis = (typeof STANCES_EMOJIS)[keyof typeof STANCES_EMOJIS];

/**
 * Emojis from the calls server.
 */
export const CALLS_EMOJIS = {
	Base: { name: "base", id: "1177471163040006185" },
	Bird: { name: "bird", id: "1177471216878096404" },
	Whale: { name: "whale", id: "1177471237321150584" },
	Manta: { name: "manta", id: "1177471263657185280" },
	CosmicManta: { name: "cosmic_manta", id: "1177471285631131668" },
	Crab: { name: "crab", id: "1177471325326016522" },
	Jellyfish: { name: "jellyfish", id: "1177471347455184896" },
	BabyManta: { name: "baby_manta", id: "1177471733779939348" },
	Nightbird: { name: "nightbird", id: "1177471757133807747" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type CallsEmojis = (typeof CALLS_EMOJIS)[keyof typeof CALLS_EMOJIS];

/**
 * Emojis from the friend actions server.
 */
export const FRIEND_ACTIONS_EMOJIS = {
	HoldHand: { name: "hold_hand", id: "1177437567105368124" },
	HighFive: { name: "high_five", id: "1177438862356795422" },
	Hug: { name: "hug", id: "1177438880887222272" },
	FistBump: { name: "fist_bump", id: "1177438905742659685" },
	DoubleFive: { name: "double_five", id: "1177438926605140039" },
	HairTousle: { name: "hair_tousle", id: "1177438961325592616" },
	Carry: { name: "carry", id: "1177438977725317190" },
	PlayFight: { name: "play_fight", id: "1177439040488869888" },
	Bearhug: { name: "bearhug", id: "1177439077360992347" },
	Handshake: { name: "handshake", id: "1177439544245751869" },
	DuetDance: { name: "duet_dance", id: "1177439576604803072" },
	SideHug: { name: "side_hug", id: "1177439594870997032" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type FriendActionsEmojis = (typeof FRIEND_ACTIONS_EMOJIS)[keyof typeof FRIEND_ACTIONS_EMOJIS];

/**
 * Emojis from the seasons servers.
 */
export const SEASON_EMOJIS = {
	Gratitude: { name: "gratitude", id: "1181386027957489757" },
	GratitudeCandle: { name: "gratitude_candle", id: "1181386030281134181" },
	Lightseekers: { name: "lightseekers", id: "1181386032386674688" },
	LightseekersCandle: { name: "lightseekers_candle", id: "1181386034051809300" },
	Belonging: { name: "belonging", id: "1181386035826016266" },
	BelongingCandle: { name: "belonging_candle", id: "1181386037394681896" },
	BelongingHeart: { name: "belonging_heart", id: "1181386039437303838" },
	Rhythm: { name: "rhythm", id: "1181386041735782500" },
	RhythmCandle: { name: "rhythm_candle", id: "1181386043321225267" },
	RhythmHeart: { name: "rhythm_heart", id: "1181386044806013019" },
	Enchantment: { name: "enchantment", id: "1181386046794108969" },
	EnchantmentCandle: { name: "enchantment_candle", id: "1181386048320839690" },
	EnchantmentHeart: { name: "enchantment_heart", id: "1181386049956610138" },
	Sanctuary: { name: "sanctuary", id: "1181386051575619646" },
	SanctuaryCandle: { name: "sanctuary_candle", id: "1181386053882482721" },
	SanctuaryHeart: { name: "sanctuary_heart", id: "1181386055887360040" },
	Prophecy: { name: "prophecy", id: "1181386057363759105" },
	ProphecyCandle: { name: "prophecy_candle", id: "1181386058710130749" },
	ProphecyHeart: { name: "prophecy_heart", id: "1181386060639506575" },
	Dreams: { name: "dreams", id: "1181386062560514160" },
	DreamsCandle: { name: "dreams_candle", id: "1181386064364044348" },
	DreamsHeart: { name: "dreams_heart", id: "1181386066012413993" },
	Assembly: { name: "assembly", id: "1181386067606245396" },
	AssemblyCandle: { name: "assembly_candle", id: "1181386069476909136" },
	AssemblyHeart: { name: "assembly_heart", id: "1181386071515344896" },
	LittlePrince: { name: "little_prince", id: "1181386073792856225" },
	LittlePrinceCandle: { name: "little_prince_candle", id: "1181386075550273566" },
	LittlePrinceHeart: { name: "little_prince_heart", id: "1181386077399957514" },
	Flight: { name: "flight", id: "1181386079429996645" },
	FlightCandle: { name: "flight_candle", id: "1181386081707491418" },
	FlightHeart: { name: "flight_heart", id: "1181386083527831702" },
	Abyss: { name: "abyss", id: "1181386084836462685" },
	AbyssCandle: { name: "abyss_candle", id: "1181386086799388703" },
	AbyssHeart: { name: "abyss_heart", id: "1181386088628097135" },
	Performance: { name: "performance", id: "1181386090540703775" },
	PerformanceCandle: { name: "performance_candle", id: "1181386092348452875" },
	PerformanceHeart: { name: "performance_heart", id: "1181386094470774865" },
	Shattering: { name: "shattering", id: "1181386096672780329" },
	ShatteringCandle: { name: "shattering_candle", id: "1181386098547638322" },
	ShatteringHeart: { name: "shattering_heart", id: "1181386100456050709" },
	Aurora: { name: "aurora", id: "1181386101802401904" },
	AuroraCandle: { name: "aurora_candle", id: "1181386103861825576" },
	AuroraHeart: { name: "aurora_heart", id: "1181386105682141185" },
	Remembrance: { name: "remembrance", id: "1181386107385036810" },
	RemembranceCandle: { name: "remembrance_candle", id: "1181386108978860113" },
	RemembranceHeart: { name: "remembrance_heart", id: "1181386110648197241" },
	Passage: { name: "passage", id: "1181386112166539304" },
	PassageCandle: { name: "passage_candle", id: "1181386113764564992" },
	PassageHeart: { name: "passage_heart", id: "1181386115387772958" },
	Moments: { name: "moments", id: "1181386117078069298" },
	MomentsCandle: { name: "moments_candle", id: "1181387129339772989" },
	MomentsHeart: { name: "moments_heart", id: "1181387131998965822" },
	Revival: { name: "revival", id: "1181387134008049854" },
	RevivalCandle: { name: "revival_candle", id: "1181387135476043839" },
	RevivalHeart: { name: "revival_heart", id: "1181387137879380048" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type SeasonEmojis = (typeof SEASON_EMOJIS)[keyof typeof SEASON_EMOJIS];

/**
 * Emojis from the outfits servers.
 */
export const OUTFIT_EMOJIS = {
	/**
	 * Base.
	 */
	Outfit01: { name: "outfit", id: "1181712845830901811" },

	/**
	 * Pointing Candlemaker.
	 */
	Outfit02: { name: "outfit", id: "1181712849488330793" },

	/**
	 * Ushering Stargazer.
	 */
	Outfit03: { name: "outfit", id: "1181712852676001793" },

	/**
	 * Butterfly Charmer.
	 */
	Outfit04: { name: "outfit", id: "1181712855410671627" },

	/**
	 * Shivering Trailblazer.
	 *
	 */
	Outfit05: { name: "outfit", id: "1181712859013586984" },

	/**
	 * Hide'n'Seek Pioneer.
	 */
	Outfit06: { name: "outfit", id: "1181712862104789014" },

	/**
	 * Confident Sightseer.
	 */
	Outfit07: { name: "outfit", id: "1181712865716092928" },

	/**
	 * Polite Scholar.
	 */
	Outfit08: { name: "outfit", id: "1181712869147017359" },

	/**
	 * Memory Whisperer.
	 */
	Outfit09: { name: "outfit", id: "1181712872439566466" },

	/**
	 * Boogie Kid.
	 */
	Outfit10: { name: "outfit", id: "1181712875119714446" },

	/**
	 * Troupe Greeter.
	 */
	Outfit11: { name: "outfit", id: "1181712878101872791" },
	/**
	 * Troupe Juggler.
	 */
	Outfit12: { name: "outfit", id: "1181712881243402331" },
	/**
	 * Festival Spin Dancer.
	 */
	Outfit13: { name: "outfit", id: "1181712884267503717" },
	/**
	 * Admiring Actor.
	 */
	Outfit14: { name: "outfit", id: "1181712887643910284" },
	/**
	 * Jellyfish Whisperer.
	 */
	Outfit15: { name: "outfit", id: "1181712890584125500" },
	/**
	 * Rallying Thrillseeker.
	 */
	Outfit16: { name: "outfit", id: "1181712893763395634" },
	/**
	 * Prophet of Fire.
	 */
	Outfit17: { name: "outfit", id: "1181712896951079033" },
	/**
	 * Peeking Postman.
	 */
	Outfit18: { name: "outfit", id: "1181712900725944320" },
	/**
	 * Bearhug Yeti.
	 */
	Outfit19: { name: "outfit", id: "1181712903179616318" },
	/**
	 * Chuckling Scout.
	 */
	Outfit20: { name: "outfit", id: "1181712906388262973" },
	/**
	 * Gloating Narcissist.
	 */
	Outfit21: { name: "outfit", id: "1181712909374586972" },
	/**
	 * The Rose (non-ultimate).
	 */
	Outfit22: { name: "outfit", id: "1181712912948138055" },
	/**
	 * The Rose (ultimate).
	 */
	Outfit23: { name: "outfit", id: "1181712916572029119" },
	/**
	 * Flight Guide.
	 */
	Outfit24: { name: "outfit", id: "1181712919956828311" },
	/**
	 * Talented Builder.
	 */
	Outfit25: { name: "outfit", id: "1181712923001884716" },
	/**
	 * Tinkering Chimesmith.
	 */
	Outfit26: { name: "outfit", id: "1181712926525104238" },
	/**
	 * Light Whisperer.
	 */
	Outfit27: { name: "outfit", id: "1181712929381429248" },
	/**
	 * Mischief Witch Jumper.
	 */
	Outfit28: { name: "outfit", id: "1181712932304863355" },
	/**
	 * Anxious Angler.
	 */
	Outfit29: { name: "outfit", id: "1181712935257653360" },
	/**
	 * Modest Dancer.
	 */
	Outfit30: { name: "outfit", id: "1181712938105585745" },
	/**
	 * Frantic Stagehand
	 */
	Outfit31: { name: "outfit", id: "1181712941117095976" },
	/**
	 * Forgetful Storyteller.
	 */
	Outfit32: { name: "outfit", id: "1181712944527060992" },
	/**
	 * Days of Colour 2022.
	 */
	Outfit33: { name: "outfit", id: "1181712947148501003" },
	/**
	 * Ancient Light (Manta).
	 */
	Outfit34: { name: "outfit", id: "1181712950139039805" },
	/**
	 * Mindful Miner.
	 */
	Outfit35: { name: "outfit", id: "1181712953536421958" },
	/**
	 * AURORA Guide (ultimate).
	 */
	Outfit36: { name: "outfit", id: "1181712956711510016" },
	/**
	 * AURORA Guide (non-ultimate).
	 */
	Outfit37: { name: "outfit", id: "1181712959601377310" },
	/**
	 * Cure for Me.
	 */
	Outfit38: { name: "outfit", id: "1181712962893914153" },
	/**
	 * Pleading Child.
	 */
	Outfit39: { name: "outfit", id: "1181712965607637123" },
	/**
	 * Wounded Warrior.
	 */
	Outfit40: { name: "outfit", id: "1181712968245850236" },
	/**
	 * Tiptoeing Tea-Brewer.
	 */
	Outfit41: { name: "outfit", id: "1181712971127337011" },
	/**
	 * Days of Fortune Muralist's Smock.
	 */
	Outfit42: { name: "outfit", id: "1181712973908168787" },
	/**
	 * Bloom Gardening Tunic.
	 */
	Outfit43: { name: "outfit", id: "1181712977167138936" },
	/**
	 * Melancholy Mope.
	 */
	Outfit44: { name: "outfit", id: "1181712980254150750" },
	/**
	 * Oddball Outcast.
	 */
	Outfit45: { name: "outfit", id: "1181712983882203166" },
	/**
	 * Dark Rainbow Tunic.
	 */
	Outfit46: { name: "outfit", id: "1181712986801447004" },
	/**
	 * Ascetic Monk.
	 */
	Outfit47: { name: "outfit", id: "1181712990177874021" },
	/**
	 * Nightbird Whisperer.
	 */
	Outfit48: { name: "outfit", id: "1181712994212790352" },
	/**
	 * Style Wide-Leg Jeans.
	 */
	Outfit49: { name: "outfit", id: "1181712996762923018" },
	/**
	 * Memory of a Lost Village.
	 */
	Outfit50: { name: "outfit", id: "1181712999388565544" },
	/**
	 * Mischief Goth Garment.
	 */
	Outfit51: { name: "outfit", id: "1181716521479847966" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type OutfitEmojis = (typeof OUTFIT_EMOJIS)[keyof typeof OUTFIT_EMOJIS];

/**
 * Emojis from the shoes server.
 */
export const SHOE_EMOJIS = {
	/**
	 * Chuckling Scout.
	 */
	Shoe01: { name: "shoe", id: "1181741591799537774" },
	/**
	 * Days of Mischief 2021.
	 */
	Shoe02: { name: "shoe", id: "1181741593175281755" },
	/**
	 * Pleading Child.
	 */
	Shoe03: { name: "shoe", id: "1181741595519881236" },
	/**
	 * Nightbird Whisperer.
	 */
	Shoe04: { name: "shoe", id: "1181741598187475055" },
	/**
	 * Musical Voyage Sneakers.
	 */
	Shoe05: { name: "shoe", id: "1181741600855035964" },
	/**
	 * Sunlight Chunky Sandals.
	 */
	Shoe06: { name: "shoe", id: "1181741602935418943" },
	/**
	 * Style Silk Ballet Slippers.
	 */
	Shoe07: { name: "shoe", id: "1181741604889960549" },
	/**
	 * Style Bunny Slippers.
	 */
	Shoe08: { name: "shoe", id: "1181741607570128966" },
	/**
	 * Vestige of a Deserted Oasis.
	 */
	Shoe09: { name: "shoe", id: "1181741610074124319" },
	/**
	 * Echo of an Abandoned Refuge.
	 */
	Shoe10: { name: "shoe", id: "1181741612766863472" },
	/**
	 * Remnant of a Forgotten Haven.
	 */
	Shoe11: { name: "shoe", id: "1181741615564476437" },
	/**
	 * Mischief Goth Boots.
	 */
	Shoe12: { name: "shoe", id: "1181741618454351993" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type ShoeEmojis = (typeof SHOE_EMOJIS)[keyof typeof SHOE_EMOJIS];

/**
 * Emojis from the masks servers.
 */
export const MASK_EMOJIS = {
	/**
	 * Base.
	 */
	Mask01: { name: "mask", id: "1182637780489211935" },
	/**
	 * Waving Bellmaker.
	 */
	Mask02: { name: "mask", id: "1182637781944639510" },
	/**
	 * Hide'n'Seek Pioneer.
	 */
	Mask03: { name: "mask", id: "1182637783815307347" },
	/**
	 * Proud Victor.
	 */
	Mask04: { name: "mask", id: "1182637786147336284" },
	/**
	 * Fainting Warrior.
	 */
	Mask05: { name: "mask", id: "1182637788357726209" },
	/**
	 * Provoking Performer.
	 */
	Mask06: { name: "mask", id: "1182637790194847855" },
	/**
	 * Leaping Dancer.
	 */
	Mask07: { name: "mask", id: "1182637792078086184" },
	/**
	 * Saluting Protector.
	 */
	Mask08: { name: "mask", id: "1182637794246529085" },
	/**
	 * Greeting Shaman.
	 */
	Mask09: { name: "mask", id: "1182637796431777853" },
	/**
	 * Gratitude Guide (ultimate).
	 */
	Mask10: { name: "mask", id: "1182637798386319380" },
	/**
	 * Sassy Drifter.
	 */
	Mask11: { name: "mask", id: "1182637799975944232" },
	/**
	 * Piggyback Lightseeker.
	 */
	Mask12: { name: "mask", id: "1182637801905324043" },
	/**
	 * Doublefive Light Catcher.
	 */
	Mask13: { name: "mask", id: "1182637803876651059" },
	/**
	 * Laidback Pioneer.
	 */
	Mask14: { name: "mask", id: "1182637805847973938" },
	/**
	 * Twirling Champion.
	 */
	Mask15: { name: "mask", id: "1182637807525695609" },
	/**
	 * Crab Whisperer.
	 */
	Mask16: { name: "mask", id: "1182637809526374441" },
	/**
	 * Shushing Light Scholar.
	 */
	Mask17: { name: "mask", id: "1182637811459969075" },
	/**
	 * Boogie Kid.
	 */
	Mask18: { name: "mask", id: "1182637814005891193" },
	/**
	 * Wise Grandparent.
	 */
	Mask19: { name: "mask", id: "1182637816577003570" },
	/**
	 * Pleaful Parent.
	 */
	Mask20: { name: "mask", id: "1182637817923375145" },
	/**
	 * Sparkler Parent.
	 */
	Mask21: { name: "mask", id: "1182637820091830353" },
	/**
	 * Rhythm Guide (ultimate).
	 */
	Mask22: { name: "mask", id: "1182637821933142017" },
	/**
	 * Troupe Greeter.
	 */
	Mask23: { name: "mask", id: "1182637823807987712" },
	/**
	 * Admiring Actor.
	 */
	Mask24: { name: "mask", id: "1182637825754140752" },
	/**
	 * Thoughtful Director.
	 */
	Mask25: { name: "mask", id: "1182637827603841034" },
	/**
	 * Respectful Pianist.
	 */
	Mask26: { name: "mask", id: "1182637829428367490" },
	/**
	 * Nodding Muralist.
	 */
	Mask27: { name: "mask", id: "1182637831273857055" },
	/**
	 * Playfighting Herbalist.
	 */
	Mask28: { name: "mask", id: "1182637832620216332" },
	/**
	 * Indifferent Alchemist.
	 */
	Mask29: { name: "mask", id: "1182637834780299354" },
	/**
	 * Scarecrow Farmer.
	 */
	Mask30: { name: "mask", id: "1182637836684501012" },
	/**
	 * Hiking Grouch.
	 */
	Mask31: { name: "mask", id: "1182637840388075550" },
	/**
	 * Prophet of Water.
	 */
	Mask32: { name: "mask", id: "1182637842489430106" },
	/**
	 * Prophet of Earth.
	 */
	Mask33: { name: "mask", id: "1182637844079054931" },
	/**
	 * Prophet of Air.
	 */
	Mask34: { name: "mask", id: "1182637846377549904" },
	/**
	 * Prophet of Fire.
	 */
	Mask35: { name: "mask", id: "1182637869144211467" },
	/**
	 * Prophecy Guide (ultimate).
	 */
	Mask36: { name: "mask", id: "1182637870889062441" },
	/**
	 * Peeking Postman.
	 */
	Mask37: { name: "mask", id: "1182637873057501265" },
	/**
	 * Dancing Performer.
	 */
	Mask38: { name: "mask", id: "1182637875888668723" },
	/**
	 * Spinning Mentor.
	 */
	Mask39: { name: "mask", id: "1182637878208122880" },
	/**
	 * Dreams Guide (ultimate).
	 */
	Mask40: { name: "mask", id: "1182637880917631046" },
	/**
	 * Fortune Blushing Mask.
	 */
	Mask41: { name: "mask", id: "1182637882943479818" },
	/**
	 * Days of Fortune 2021 Bull Mask.
	 */
	Mask42: { name: "mask", id: "1182637885321658449" },
	/**
	 * Days of Love 2021.
	 */
	Mask43: { name: "mask", id: "1182637887804669963" },
	/**
	 * Assembly Guide (ultimate).
	 */
	Mask44: { name: "mask", id: "1182637889868271616" },
	/**
	 * Marching Adventurer.
	 */
	Mask45: { name: "mask", id: "1182637893139832892" },
	/**
	 * Chuckling Scout.
	 */
	Mask46: { name: "mask", id: "1182637894951784459" },
	/**
	 * Daydream Forester.
	 */
	Mask47: { name: "mask", id: "1182637896805658664" },
	/**
	 * Scolding Student.
	 */
	Mask48: { name: "mask", id: "1182637898827313243" },
	/**
	 * Baffled Botanist.
	 */
	Mask49: { name: "mask", id: "1182637900744097883" },
	/**
	 * Scaredy Cadet.
	 */
	Mask50: { name: "mask", id: "1182637903290052609" },
	/**
	 * Beckoning Ruler.
	 */
	Mask51: { name: "mask", id: "1182639022795927563" },
	/**
	 * Bumbling Boatswain.
	 */
	Mask52: { name: "mask", id: "1182639025983586314" },
	/**
	 * Ceasing Commodore.
	 */
	Mask53: { name: "mask", id: "1182639028558905415" },
	/**
	 * Cackling Cannoneer.
	 */
	Mask54: { name: "mask", id: "1182639032199557170" },
	/**
	 * Abyss Guide (ultimate).
	 */
	Mask55: { name: "mask", id: "1182639034607079569" },
	/**
	 * Abyss Guide (non-ultimate).
	 */
	Mask56: { name: "mask", id: "1182639038272901120" },
	/**
	 * Anxious Angler.
	 */
	Mask57: { name: "mask", id: "1182639041741602898" },
	/**
	 * Days of Fortune 2022.
	 */
	Mask58: { name: "mask", id: "1182639044920885318" },
	/**
	 * Performance Guide (ultimate).
	 */
	Mask59: { name: "mask", id: "1182639048586698785" },
	/**
	 * Modest Dancer.
	 */
	Mask60: { name: "mask", id: "1182639051921178684" },
	/**
	 * Frantic Stagehand.
	 */
	Mask61: { name: "mask", id: "1182639054660055100" },
	/**
	 * Performance Guide (non-ultimate).
	 */
	Mask62: { name: "mask", id: "1182639057436692560" },
	/**
	 * Forgetful Storyteller.
	 */
	Mask63: { name: "mask", id: "1182639060766949386" },
	/**
	 * Mellow Musician.
	 */
	Mask64: { name: "mask", id: "1182639065011585064" },
	/**
	 * Ancient Darkness (plant).
	 */
	Mask65: { name: "mask", id: "1182639068308316180" },
	/**
	 * Seed of Hope.
	 */
	Mask66: { name: "mask", id: "1182639071424675850" },
	/**
	 * Running Wayfarer.
	 */
	Mask67: { name: "mask", id: "1182639074075480204" },
	/**
	 * Warrior of Love.
	 */
	Mask68: { name: "mask", id: "1182639076948594728" },
	/**
	 * Mindful Miner.
	 */
	Mask69: { name: "mask", id: "1182639079796527114" },
	/**
	 * AURORA Guide (non-ultimate).
	 */
	Mask70: { name: "mask", id: "1182639083076468827" },
	/**
	 * Days of Mischief 2022.
	 */
	Mask71: { name: "mask", id: "1182639086008279051" },
	/**
	 * Journey Mask.
	 */
	Mask72: { name: "mask", id: "1182639089128833158" },
	/**
	 * Bereft Veteran.
	 */
	Mask73: { name: "mask", id: "1182639092534620191" },
	/**
	 * Wounded Warrior.
	 */
	Mask74: { name: "mask", id: "1182639095449649202" },
	/**
	 * Days of Fortune 2023.
	 */
	Mask75: { name: "mask", id: "1182639098108858408" },
	/**
	 * Passage Guide (ultimate).
	 */
	Mask76: { name: "mask", id: "1182639101166497843" },
	/**
	 * Passage Guide (non-ultimate 1).
	 */
	Mask77: { name: "mask", id: "1182639104836517929" },
	/**
	 * Passage Guide (non-ultimate 2).
	 */
	Mask78: { name: "mask", id: "1182639108166778920" },
	/**
	 * Passage Guide (non-ultimate 3).
	 */
	Mask79: { name: "mask", id: "1182639111060856942" },
	/**
	 * Passage Guide (non-ultimate 4).
	 */
	Mask80: { name: "mask", id: "1182639114168832020" },
	/**
	 * Reassuring Ranger.
	 */
	Mask81: { name: "mask", id: "1182639117310361620" },
	/**
	 * Ascetic Monk.
	 */
	Mask82: { name: "mask", id: "1182639120930066482" },
	/**
	 * Days of Style 2023.
	 */
	Mask83: { name: "mask", id: "1182639124042223646" },
	/**
	 * Mischief Crabula Mask.
	 */
	Mask84: { name: "mask", id: "1182639127242477648" },
	/**
	 * Sparrow Mask.
	 */
	Mask85: { name: "mask", id: "1182639130094620694" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type MaskEmojis = (typeof MASK_EMOJIS)[keyof typeof MASK_EMOJIS];

/**
 * Emojis from the face accessories server.
 */
export const FACE_ACCESSORY_EMOJIS = {
	/**
	 * Rejecting Voyager.
	 */
	FaceAccessory01: { name: "face_accessory", id: "1182821638966870177" },
	/**
	 * Exhausted Dock Worker.
	 */
	FaceAccessory02: { name: "face_accessory", id: "1182821641777074297" },
	/**
	 * Apologetic Lumberjack.
	 */
	FaceAccessory03: { name: "face_accessory", id: "1182821644989911051" },
	/**
	 * Backflipping Champion.
	 */
	FaceAccessory04: { name: "face_accessory", id: "1182821648550854696" },
	/**
	 * Bowing Medalist.
	 */
	FaceAccessory05: { name: "face_accessory", id: "1182821651654647869" },
	/**
	 * Lookout Scout.
	 */
	FaceAccessory06: { name: "face_accessory", id: "1182821654980726824" },
	/**
	 * Levitating Adept.
	 */
	FaceAccessory07: { name: "face_accessory", id: "1182821658600427592" },
	/**
	 * Hairtousle Teen.
	 */
	FaceAccessory08: { name: "face_accessory", id: "1182821662484332544" },
	/**
	 * Enchantment Guide (ultimate).
	 */
	FaceAccessory09: { name: "face_accessory", id: "1182821666250834010" },
	/**
	 * Chill Sunbather.
	 */
	FaceAccessory10: { name: "face_accessory", id: "1182821669446889535" },
	/**
	 * Days of Feast Horns.
	 */
	FaceAccessory11: { name: "face_accessory", id: "1182821673418883133" },
	/**
	 * Bearhug Hermit.
	 */
	FaceAccessory12: { name: "face_accessory", id: "1182821677176991786" },
	/**
	 * Days of Rainbow 2021.
	 */
	FaceAccessory13: { name: "face_accessory", id: "1182821682281451520" },
	/**
	 * Mischief Withered Antlers.
	 */
	FaceAccessory14: { name: "face_accessory", id: "1182821685913714761" },
	/**
	 * Abyss Guide (ultimate).
	 */
	FaceAccessory15: { name: "face_accessory", id: "1182821689281740851" },
	/**
	 * Rainbow Earring.
	 */
	FaceAccessory16: { name: "face_accessory", id: "1182821692872069211" },
	/**
	 * Rainbow Headphones.
	 */
	FaceAccessory17: { name: "face_accessory", id: "1182821695787114587" },
	/**
	 * Elder of the Isle.
	 */
	FaceAccessory18: { name: "face_accessory", id: "1182821698576339066" },
	/**
	 * Elder of the Prairie.
	 */
	FaceAccessory19: { name: "face_accessory", id: "1182821701411680267" },
	/**
	 * Elder of the Forest.
	 */
	FaceAccessory20: { name: "face_accessory", id: "1182821704444153866" },
	/**
	 * Tiara We Can Touch.
	 */
	FaceAccessory21: { name: "face_accessory", id: "1182821707636031508" },
	/**
	 * Days of Feast 2022.
	 */
	FaceAccessory22: { name: "face_accessory", id: "1182821710660128878" },
	/**
	 * Melancholy Mope.
	 */
	FaceAccessory23: { name: "face_accessory", id: "1182821714309160960" },
	/**
	 * Tumbling Troublemaker.
	 */
	FaceAccessory24: { name: "face_accessory", id: "1182821717433909299" },
	/**
	 * Nature Glasses.
	 */
	FaceAccessory25: { name: "face_accessory", id: "1182821720063741972" },
	/**
	 * Days of Colour 2023.
	 */
	FaceAccessory26: { name: "face_accessory", id: "1182821722668417055" },
	/**
	 * Reassuring Ranger.
	 */
	FaceAccessory27: { name: "face_accessory", id: "1182821725684121683" },
	/**
	 * Moments Guide (ultimate).
	 */
	FaceAccessory28: { name: "face_accessory", id: "1182821728603357287" },
	/**
	 * Jolly Geologist.
	 */
	FaceAccessory29: { name: "face_accessory", id: "1182821731413540914" },
	/**
	 * Days of Style 2023 1.
	 */
	FaceAccessory30: { name: "face_accessory", id: "1182821734563459093" },
	/**
	 * Style Flame Sunglasses.
	 */
	FaceAccessory31: { name: "face_accessory", id: "1182821737180700673" },
	/**
	 * Style Heart Sunglasses.
	 */
	FaceAccessory32: { name: "face_accessory", id: "1182821740200607846" },
	/**
	 * Aviary's Firework Festival.
	 */
	FaceAccessory33: { name: "face_accessory", id: "1182821742926889041" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type FaceAccessoryEmojis = (typeof FACE_ACCESSORY_EMOJIS)[keyof typeof FACE_ACCESSORY_EMOJIS];

/**
 * Emojis from the necklace server.
 */
export const NECKLACE_EMOJIS = {
	/**
	 * Gratitude Pendant.
	 */
	Necklace01: { name: "necklace", id: "1182861448691585044" },
	/**
	 * Lightseekers Pendant.
	 */
	Necklace02: { name: "necklace", id: "1182861496326295653" },
	/**
	 * Belonging Pendant.
	 */
	Necklace03: { name: "necklace", id: "1182861497496506413" },
	/**
	 * Rhythm Pendant.
	 */
	Necklace04: { name: "necklace", id: "1182861499438477362" },
	/**
	 * Enchantment Pendant.
	 */
	Necklace05: { name: "necklace", id: "1182861500638040096" },
	/**
	 * Sanctuary Pendant.
	 */
	Necklace06: { name: "necklace", id: "1182861502798119082" },
	/**
	 * Hiking Grouch.
	 */
	Necklace07: { name: "necklace", id: "1182861504178028605" },
	/**
	 * Prophecy Pendant.
	 */
	Necklace08: { name: "necklace", id: "1182861507009183861" },
	/**
	 * Days of Feast 2020.
	 */
	Necklace09: { name: "necklace", id: "1182861508896620617" },
	/**
	 * Dreams Pendant.
	 */
	Necklace10: { name: "necklace", id: "1182861511161557102" },
	/**
	 * Assembly Pendant.
	 */
	Necklace11: { name: "necklace", id: "1182861513137074298" },
	/**
	 * Ocean Necklace.
	 */
	Necklace12: { name: "necklace", id: "1182861515586551869" },
	/**
	 * Little Prince Pendant.
	 */
	Necklace13: { name: "necklace", id: "1182861517754990633" },
	/**
	 * Star Collector.
	 */
	Necklace14: { name: "necklace", id: "1182861519759888444" },
	/**
	 * Flight Pendant.
	 */
	Necklace15: { name: "necklace", id: "1182861521622155376" },
	/**
	 * Talented Builder.
	 */
	Necklace16: { name: "necklace", id: "1182861524772073473" },
	/**
	 * Days of Feast 2021
	 */
	Necklace17: { name: "necklace", id: "1182861526865031250" },
	/**
	 * Abyss Pendant.
	 */
	Necklace18: { name: "necklace", id: "1182861528786010114" },
	/**
	 * Performance Pendant.
	 */
	Necklace19: { name: "necklace", id: "1182861531348734002" },
	/**
	 * Days of Nature 2022.
	 */
	Necklace20: { name: "necklace", id: "1182861533064208484" },
	/**
	 * Shattering Pendant.
	 */
	Necklace21: { name: "necklace", id: "1182861534540611736" },
	/**
	 * Jelly Shoulder Buddy
	 */
	Necklace22: { name: "necklace", id: "1182861535622725673" },
	/**
	 * AURORA Pendant.
	 */
	Necklace23: { name: "necklace", id: "1182861538281918545" },
	/**
	 * Remembrance Pendant.
	 */
	Necklace24: { name: "necklace", id: "1182861540400054372" },
	/**
	 * Pleading Child.
	 */
	Necklace25: { name: "necklace", id: "1182861542182621324" },
	/**
	 * Remembrance Guide.
	 */
	Necklace26: { name: "necklace", id: "1182861544128790528" },
	/**
	 * Days of Love Classy Cravat.
	 */
	Necklace27: { name: "necklace", id: "1182861545697452062" },
	/**
	 * Passage Pendant.
	 */
	Necklace28: { name: "necklace", id: "1182861547844948029" },
	/**
	 * Oddball Outcast.
	 */
	Necklace29: { name: "necklace", id: "1182861549967253614" },
	/**
	 * Moments Pendant.
	 */
	Necklace30: { name: "necklace", id: "1182861554803290235" },
	/**
	 * Revival Pendant.
	 */
	Necklace31: { name: "necklace", id: "1182862051647959161" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type NecklaceEmojis = (typeof NECKLACE_EMOJIS)[keyof typeof NECKLACE_EMOJIS];

/**
 * Emojis from the hair servers.
 */
export const HAIR_EMOJIS = {
	/**
	 * Base 1.
	 */
	Hair01: { name: "hair", id: "1183623035337588887" },
	/**
	 * Pointing Candlemaker.
	 */
	Hair02: { name: "hair", id: "1183623039133425805" },
	/**
	 * Ushering Stargazer.
	 */
	Hair03: { name: "hair", id: "1183623042417578045" },
	/**
	 * Rejecting Voyager.
	 */
	Hair04: { name: "hair", id: "1183623045668163685" },
	/**
	 * Applauding Bellmaker.
	 */
	Hair05: { name: "hair", id: "1183623048629330071" },
	/**
	 * Waving Bellmaker.
	 */
	Hair06: { name: "hair", id: "1183623051892502568" },
	/**
	 * Slumbering Shipwright.
	 */
	Hair07: { name: "hair", id: "1183623055101132811" },
	/**
	 * Laughing Light Catcher.
	 */
	Hair08: { name: "hair", id: "1183623058985058314" },
	/**
	 * Bird Whisperer.
	 */
	Hair09: { name: "hair", id: "1183623062671855706" },
	/**
	 * Shivering Trailblazer.
	 */
	Hair10: { name: "hair", id: "1183623066648059994" },
	/**
	 * Blushing Prospector.
	 */
	Hair11: { name: "hair", id: "1183623071094030386" },
	/**
	 * Hide'n'Seek Pioneer.
	 */
	Hair12: { name: "hair", id: "1183623075263172608" },
	/**
	 * Pouty Porter.
	 */
	Hair13: { name: "hair", id: "1183623078287253574" },
	/**
	 * Dismayed Hunter.
	 */
	Hair14: { name: "hair", id: "1183623081353281536" },
	/**
	 * Apologetic Lumberjack.
	 */
	Hair15: { name: "hair", id: "1183623084310282290" },
	/**
	 * Tearful Light Miner.
	 */
	Hair16: { name: "hair", id: "1183623087393095791" },
	/**
	 * Confident Sightseer.
	 */
	Hair17: { name: "hair", id: "1183623090589155379" },
	/**
	 * Backflipping Champion.
	 */
	Hair18: { name: "hair", id: "1183623093965570069" },
	/**
	 * Cheerful Spectator.
	 */
	Hair19: { name: "hair", id: "1183623096830267412" },
	/**
	 * Bowing Medalist.
	 */
	Hair20: { name: "hair", id: "1183623100387033108" },
	/**
	 * Frightened Refugee.
	 */
	Hair21: { name: "hair", id: "1183623103360806963" },
	/**
	 * Fainting Warrior.
	 */
	Hair22: { name: "hair", id: "1183623106145828905" },
	/**
	 * Courageous Soldier.
	 */
	Hair23: { name: "hair", id: "1183623109404794930" },
	/**
	 * Stealthy Survivor.
	 */
	Hair24: { name: "hair", id: "1183623112886079521" },
	/**
	 * Saluting Captain.
	 */
	Hair25: { name: "hair", id: "1183623115754963024" },
	/**
	 * Praying Acolyte.
	 */
	Hair26: { name: "hair", id: "1183623119068483618" },
	/**
	 * Levitating Adept.
	 */
	Hair27: { name: "hair", id: "1183623122562326559" },
	/**
	 * Polite Scholar.
	 */
	Hair28: { name: "hair", id: "1183623125724839977" },
	/**
	 * Meditating Monastic.
	 */
	Hair29: { name: "hair", id: "1183623129445175376" },
	/**
	 * Elder of the Isle.
	 */
	Hair30: { name: "hair", id: "1183623132217614377" },
	/**
	 * Elder of the Prairie.
	 */
	Hair31: { name: "hair", id: "1183623135665328180" },
	/**
	 * Elder of the Forest.
	 */
	Hair32: { name: "hair", id: "1183623139003998208" },
	/**
	 * Elder of the Valley 1.
	 */
	Hair33: { name: "hair", id: "1183623141784817765" },
	/**
	 * Elder of the Valley 2.
	 */
	Hair34: { name: "hair", id: "1183623145190596610" },
	/**
	 * Elder of the Wasteland.
	 */
	Hair35: { name: "hair", id: "1183623148172742746" },
	/**
	 * Elder of the Vault.
	 */
	Hair36: { name: "hair", id: "1183623151305895966" },
	/**
	 * Sassy Drifter.
	 */
	Hair37: { name: "hair", id: "1183623154640375879" },
	/**
	 * Provoking Performer.
	 */
	Hair38: { name: "hair", id: "1183623158943715408" },
	/**
	 * Stretching Guru.
	 */
	Hair39: { name: "hair", id: "1183623162710216755" },
	/**
	 * Crab Whisperer.
	 */
	Hair40: { name: "hair", id: "1183623166082437241" },
	/**
	 * Twirling Champion.
	 */
	Hair41: { name: "hair", id: "1183623171354665050" },
	/**
	 * Piggyback Lightseeker.
	 */
	Hair42: { name: "hair", id: "1183623175012102144" },
	/**
	 * Laidback Pioneer.
	 */
	Hair43: { name: "hair", id: "1183623178090721280" },
	/**
	 * Doublefive Light Catcher.
	 */
	Hair44: { name: "hair", id: "1183623181446168626" },
	/**
	 * Hungry Pumpkin Hat.
	 */
	Hair45: { name: "hair", id: "1183623184696750101" },
	/**
	 * Confetti Cousin.
	 */
	Hair46: { name: "hair", id: "1183623188756840538" },
	/**
	 * Sparkler Parent.
	 */
	Hair47: { name: "hair", id: "1183623192175194143" },
	/**
	 * Days of Feast 2019.
	 */
	Hair48: { name: "hair", id: "1183623196528877608" },
	/**
	 * Festival Spin Dancer.
	 */
	Hair49: { name: "hair", id: "1183623199909494825" },
	/**
	 * Troupe Juggler.
	 */
	Hair50: { name: "hair", id: "1183623202488987682" },
	/**
	 * Respectful Pianist.
	 */
	Hair51: { name: "hair", id: "1183626759237804073" },
	/**
	 * Rhythm Guide (ultimate).
	 */
	Hair52: { name: "hair", id: "1183626763276914719" },
	/**
	 * Nodding Muralist.
	 */
	Hair53: { name: "hair", id: "1183626767156658216" },
	/**
	 * Scarecrow Farmer.
	 */
	Hair54: { name: "hair", id: "1183626770038140998" },
	/**
	 * Snoozing Carpenter.
	 */
	Hair55: { name: "hair", id: "1183626774689619978" },
	/**
	 * Crab Walker.
	 */
	Hair56: { name: "hair", id: "1183626780901396530" },
	/**
	 * Indifferent Alchemist.
	 */
	Hair57: { name: "hair", id: "1183626783703171095" },
	/**
	 * Playfighting Herbalist.
	 */
	Hair58: { name: "hair", id: "1183626786098135090" },
	/**
	 * Enchantment Ultimate.
	 */
	Hair59: { name: "hair", id: "1183626790439227473" },
	/**
	 * Jelly Whisperer.
	 */
	Hair60: { name: "hair", id: "1183626793874362562" },
	/**
	 * Timid Bookworm.
	 */
	Hair61: { name: "hair", id: "1183626798534250538" },
	/**
	 * Rallying Thrillseeker.
	 */
	Hair62: { name: "hair", id: "1183626802162315295" },
	/**
	 * Hiking Grouch.
	 */
	Hair63: { name: "hair", id: "1183626805949775882" },
	/**
	 * Grateful Shell Collector.
	 */
	Hair64: { name: "hair", id: "1183626809464594495" },
	/**
	 * Prophet of Water.
	 */
	Hair65: { name: "hair", id: "1183626813327560745" },
	/**
	 * Prophet of Earth.
	 */
	Hair66: { name: "hair", id: "1183626816213241876" },
	/**
	 * Prophet of Air.
	 */
	Hair67: { name: "hair", id: "1183626819119874110" },
	/**
	 * Prophet of Fire.
	 */
	Hair68: { name: "hair", id: "1183626822735376384" },
	/**
	 * Mischief Witch Hat.
	 */
	Hair69: { name: "hair", id: "1183626826032091167" },
	/**
	 * Bearhug Hermit.
	 */
	Hair70: { name: "hair", id: "1183626830264156222" },
	/**
	 * Dancing Performer.
	 */
	Hair71: { name: "hair", id: "1183626833976111114" },
	/**
	 * Spinning Mentor.
	 */
	Hair72: { name: "hair", id: "1183626837121835048" },
	/**
	 * Days of Fortune 2021 1.
	 */
	Hair73: { name: "hair", id: "1183626840137551922" },
	/**
	 * Days of Fortune Wool Hat.
	 */
	Hair74: { name: "hair", id: "1183626843874676808" },
	/**
	 * Days of Fortune 2021 2.
	 */
	Hair75: { name: "hair", id: "1183626847519527062" },
	/**
	 * Days of Bloom 2021.
	 */
	Hair76: { name: "hair", id: "1183626851579613204" },
	/**
	 * Assembly Guide (ultimate).
	 */
	Hair77: { name: "hair", id: "1183626855878762496" },
	/**
	 * Daydream Forester.
	 */
	Hair78: { name: "hair", id: "1183626860584763423" },
	/**
	 * Marching Adventurer.
	 */
	Hair79: { name: "hair", id: "1183626864523231304" },
	/**
	 * Baffled Botanist.
	 */
	Hair80: { name: "hair", id: "1183626868050628680" },
	/**
	 * Scolding Student.
	 */
	Hair81: { name: "hair", id: "1183626872437874688" },
	/**
	 * Scaredy Cadet.
	 */
	Hair82: { name: "hair", id: "1183626875805909082" },
	/**
	 * Rainbow Hat.
	 */
	Hair83: { name: "hair", id: "1183626878897115167" },
	/**
	 * Nintendo.
	 */
	Hair84: { name: "hair", id: "1183626882177044541" },
	/**
	 * Slouching Soldier.
	 */
	Hair85: { name: "hair", id: "1183626885972885534" },
	/**
	 * Gloating Narcissist.
	 */
	Hair86: { name: "hair", id: "1183626888724353125" },
	/**
	 * Stretching Lamplighter.
	 */
	Hair87: { name: "hair", id: "1183626890611806238" },
	/**
	 * Beckoning Ruler.
	 */
	Hair88: { name: "hair", id: "1183626894072094770" },
	/**
	 * Sneezing Geographer.
	 */
	Hair89: { name: "hair", id: "1183626897217814659" },
	/**
	 * The Rose (ultimate).
	 */
	Hair90: { name: "hair", id: "1183626899721818163" },
	/**
	 * Talented Builder.
	 */
	Hair91: { name: "hair", id: "1183626902695575653" },
	/**
	 * Tinkering Chimesmith.
	 */
	Hair92: { name: "hair", id: "1183626906571112489" },
	/**
	 * Light Whisperer.
	 */
	Hair93: { name: "hair", id: "1183626909658132550" },
	/**
	 * Lively Navigator.
	 */
	Hair94: { name: "hair", id: "1183626912589950989" },
	/**
	 * Days of Mischief 2021.
	 */
	Hair95: { name: "hair", id: "1183626915857301556" },
	/**
	 * Mischief Spider Hair.
	 */
	Hair96: { name: "hair", id: "1183626920517185547" },
	/**
	 * Days of Feast 2021.
	 */
	Hair97: { name: "hair", id: "1183626925063807056" },
	/**
	 * Cackling Cannoneer.
	 */
	Hair98: { name: "hair", id: "1183626928658325645" },
	/**
	 * Ceasing Commodore.
	 */
	Hair99: { name: "hair", id: "1183626931984404480" },
	/**
	 * Anxious Angler.
	 */
	Hair100: { name: "hair", id: "1183626935331459192" },
	/**
	 * Days of Fortune 2022 1.
	 */
	Hair101: { name: "hair", id: "1183627290123456514" },
	/**
	 * Kizuna AI.
	 */
	Hair102: { name: "hair", id: "1183627293424373811" },
	/**
	 * Performance Guide (ultimate).
	 */
	Hair103: { name: "hair", id: "1183627297706758254" },
	/**
	 * Modest Dancer.
	 */
	Hair104: { name: "hair", id: "1183627300663738418" },
	/**
	 * Frantic Stagehand.
	 */
	Hair105: { name: "hair", id: "1183627303247425537" },
	/**
	 * Forgetful Storyteller.
	 */
	Hair106: { name: "hair", id: "1183627306594488320" },
	/**
	 * Mellow Musician.
	 */
	Hair107: { name: "hair", id: "1183627310964953199" },
	/**
	 * Ancient Darkness (Dragon).
	 */
	Hair108: { name: "hair", id: "1183627314265853962" },
	/**
	 * Ancient Light (Manta).
	 */
	Hair109: { name: "hair", id: "1183627318246248478" },
	/**
	 * Ancient Light (Jellyfish).
	 */
	Hair110: { name: "hair", id: "1183627322096631909" },
	/**
	 * Seed of Hope.
	 */
	Hair111: { name: "hair", id: "1183627325187829881" },
	/**
	 * Running Wayfarer.
	 */
	Hair112: { name: "hair", id: "1183627329377939496" },
	/**
	 * Warrior of Love.
	 */
	Hair113: { name: "hair", id: "1183627333492555977" },
	/**
	 * Mindful Miner.
	 */
	Hair114: { name: "hair", id: "1183627336676016162" },
	/**
	 * Season of AURORA in-app purchase.
	 */
	Hair115: { name: "hair", id: "1183627340065030144" },
	/**
	 * AURORA Guide (ultimate).
	 */
	Hair116: { name: "hair", id: "1183627343466602570" },
	/**
	 * Days of Mischief 2022.
	 */
	Hair117: { name: "hair", id: "1183627346700415009" },
	/**
	 * PlayStation.
	 */
	Hair118: { name: "hair", id: "1183627350269771808" },
	/**
	 * Pleading Child.
	 */
	Hair119: { name: "hair", id: "1183627354329849886" },
	/**
	 * Bereft Veteran.
	 */
	Hair120: { name: "hair", id: "1183627358486417539" },
	/**
	 * Tiptoeing Tea-Brewer.
	 */
	Hair121: { name: "hair", id: "1183627362320011314" },
	/**
	 * Tumbling Troublemaker.
	 */
	Hair122: { name: "hair", id: "1183627365969051780" },
	/**
	 * Melancholy Mope.
	 */
	Hair123: { name: "hair", id: "1183627370033320037" },
	/**
	 * Overactive Overachiever.
	 */
	Hair124: { name: "hair", id: "1183627373049020446" },
	/**
	 * Oddball Outcast.
	 */
	Hair125: { name: "hair", id: "1183627376408658010" },
	/**
	 * Days of Music 2023.
	 */
	Hair126: { name: "hair", id: "1183627379512455209" },
	/**
	 * Nightbird Whisperer.
	 */
	Hair127: { name: "hair", id: "1183627383383785503" },
	/**
	 * Ascetic Monk.
	 */
	Hair128: { name: "hair", id: "1183627386307223623" },
	/**
	 * Jolly Geologist.
	 */
	Hair129: { name: "hair", id: "1183627390216323072" },
	/**
	 * Vestige of a Deserted Oasis.
	 */
	Hair130: { name: "hair", id: "1183627392657395722" },
	/**
	 * Memory of a Lost Village.
	 */
	Hair131: { name: "hair", id: "1183627395601813605" },
	/**
	 * Hopeful Steward (ultimate).
	 */
	Hair132: { name: "hair", id: "1183627399355703348" },
	/**
	 * Hopeful Steward (non-ultimate).
	 */
	Hair133: { name: "hair", id: "1183627402258157608" },
	/**
	 * Base 2.
	 */
	Hair134: { name: "hair", id: "1183627404988665926" },
	/**
	 * Base 3.
	 */
	Hair135: { name: "hair", id: "1183627407517818971" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type HairEmojis = (typeof HAIR_EMOJIS)[keyof typeof HAIR_EMOJIS];

export type Emoji =
	| MiscellaneousEmojis
	| EmotesEmojis
	| StancesEmojis
	| CallsEmojis
	| FriendActionsEmojis
	| SeasonEmojis
	| OutfitEmojis
	| ShoeEmojis
	| MaskEmojis
	| FaceAccessoryEmojis
	| NecklaceEmojis
	| HairEmojis;

export async function cannotUseCustomEmojis(
	interaction:
		| ButtonInteraction
		| ChatInputCommandInteraction
		| ModalSubmitInteraction
		| StringSelectMenuInteraction
		| UserContextMenuCommandInteraction,
	options?: InteractionReplyOptions | InteractionUpdateOptions,
) {
	if (!interaction.inGuild() || interaction.appPermissions.has(PermissionFlagsBits.UseExternalEmojis)) return false;

	const response = {
		content: "Missing the `Use External Emojis` permission. Someone needs to adjust the permissions!",
		ephemeral: true,
		...options,
	};

	if (interaction.isMessageComponent()) {
		// @ts-expect-error Too generic.
		await interaction.update(response);
	} else {
		// @ts-expect-error Too generic.
		await interaction.reply(response);
	}

	return true;
}

export function formatEmoji(emoji: Emoji) {
	return "animated" in emoji ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`;
}

export function formatEmojiURL(id: Snowflake) {
	return cdn.emoji(id);
}

export interface CurrencyEmojiOptions {
	emoji: Emoji;
	number: number;
	includeSpaceInEmoji?: boolean;
}

export function resolveCurrencyEmoji({ emoji, number, includeSpaceInEmoji = false }: CurrencyEmojiOptions) {
	return `${number}${includeSpaceInEmoji ? " " : ""}${formatEmoji(emoji)}`;
}
