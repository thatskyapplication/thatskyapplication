import { type Snowflake, CDN } from "discord.js";

const cdn = new CDN();

interface EmojiData {
	name: string;
	id: Snowflake;
	animated?: boolean;
}

/**
 * Emojis from the miscellaneous server.
 */
export const MISCELLANEOUS_EMOJIS = {
	AscendedCandle: { name: "ascended_candle", id: "1193651853880213665" },
	WingedLight: { name: "winged_light", id: "1193651856103194674" },
	Yes: { name: "yes", id: "1193651858523312268", animated: true },
	No: { name: "no", id: "1193651860503007323", animated: true },
	PlatformIOS: { name: "platform_iOS", id: "1193651862113616004" },
	PlatformAndroid: { name: "platform_android", id: "1193651864684732476" },
	PlatformMac: { name: "platform_mac", id: "1193651866941259846" },
	PlatformSwitch: { name: "platform_switch", id: "1193651868778385548" },
	PlatformPlayStation: { name: "platform_playstation", id: "1193651870569336983" },
	SeasonalCandle: { name: "seasonal_candle", id: "1193651872196743181" },
	SeasonalHeart: { name: "seasonal_heart", id: "1193651874931429486" },
	Candle: { name: "candle", id: "1193651876881768488" },
	Heart: { name: "heart", id: "1193651878345592953" },
	PlatformSteam: { name: "platform_steam", id: "1193651881101230150" },
	Light: { name: "light", id: "1193651883622006867" },
	ShardRegular: { name: "shard_regular", id: "1193651885685616650" },
	ShardStrong: { name: "shard_strong", id: "1193651888042811452" },
	Blessing1: { name: "blessing", id: "1193670451990368346" },
	Blessing2: { name: "blessing", id: "1193670463117873272" },
	Blessing3: { name: "blessing", id: "1193678502705250475" },
	SpellColourTrail: { name: "spell_colour_trail", id: "1205286853947818055" },
	SpellSharedMemory: { name: "spell_shared_memory", id: "1193711402259587112" },
	SpellSharedSpace: { name: "spell_shared_space", id: "1193711413391265862" },
	WingBuff: { name: "wing_buff", id: "1193714656645230754" },
	Quest: { name: "quest", id: "1193730169291153438" },
	MusicSheet: { name: "music_sheet", id: "1193856769026424862" },
	EventCurrency: { name: "event_currency", id: "1241346485791096852" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type MiscellaneousEmojis = (typeof MISCELLANEOUS_EMOJIS)[keyof typeof MISCELLANEOUS_EMOJIS];

/**
 * Emojis from the emotes servers.
 */
export const EMOTE_EMOJIS = {
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
	Whistle: { name: "whistle", id: "1194237041525932033" },
	Flex: { name: "flex", id: "1195935196688678953" },
	FloatSpin: { name: "float_spin", id: "1195956496987594842" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type EmotesEmojis = (typeof EMOTE_EMOJIS)[keyof typeof EMOTE_EMOJIS];

/**
 * Emojis from the stances server.
 */
export const STANCE_EMOJIS = {
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

export type StancesEmojis = (typeof STANCE_EMOJIS)[keyof typeof STANCE_EMOJIS];

/**
 * Emojis from the calls server.
 */
export const CALL_EMOJIS = {
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

export type CallsEmojis = (typeof CALL_EMOJIS)[keyof typeof CALL_EMOJIS];

/**
 * Emojis from the friend actions server.
 */
export const FRIEND_ACTION_EMOJIS = {
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
	CradleCarry: { name: "cradle_carry", id: "1195942545063153785" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type FriendActionsEmojis = (typeof FRIEND_ACTION_EMOJIS)[keyof typeof FRIEND_ACTION_EMOJIS];

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
	NineColoredDeer: { name: "nine_colored_deer", id: "1194228859541930094" },
	NineColoredDeerCandle: { name: "nine_colored_deer_candle", id: "1194228980539215914" },
	NineColoredDeerHeart: { name: "nine_colored_deer_heart", id: "1194228991805108244" },
	Nesting: { name: "nesting", id: "1227500778155937824" },
	NestingCandle: { name: "nesting_candle", id: "1227500789862498368" },
	NestingHeart: { name: "nesting_heart", id: "1227500803036545065" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type SeasonEmojis = (typeof SEASON_EMOJIS)[keyof typeof SEASON_EMOJIS];

/**
 * Emojis from the events server.
 */
export const EVENT_EMOJIS = {
	Colour: { name: "colour", id: "1193659265852919848" },
	Music: { name: "music", id: "1193659510766714980" },
	SkyAnniversary: { name: "sky_anniversary", id: "1193659759476355095" },
	AURORAEncore: { name: "aurora_encore", id: "1194766197103796224" },
	Sunlight: { name: "sunlight", id: "1194766254016311358" },
	Style: { name: "style", id: "1194766491975962685" },
	Mischief: { name: "mischief", id: "1194766528831303721" },
	AviarysFireworkFestival: { name: "aviarys_firework_festival", id: "1194766620829175929" },
	Feast: { name: "feast", id: "1194766661299994624" },
	Fortune: { name: "fortune", id: "1195715431974064238" },
	Love: { name: "love", id: "1195715582306299955" },
	Bloom: { name: "bloom", id: "1211584587440848926" },
	SkyXCinnamorollPopUpCafe: { name: "sky_x_cinnamoroll_pop_up_cafe", id: "1233467708515942450" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type EventEmojis = (typeof EVENT_EMOJIS)[keyof typeof EVENT_EMOJIS];

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
	 * Days of Rainbow 2022.
	 */
	Outfit33: { name: "outfit", id: "1181712947148501003" },
	/**
	 * Ancient Light (manta).
	 */
	Outfit34: { name: "outfit", id: "1181712950139039805" },
	/**
	 * Mindful Miner.
	 */
	Outfit35: { name: "outfit", id: "1181712953536421958" },
	/**
	 * AURORA (ultimate).
	 */
	Outfit36: { name: "outfit", id: "1181712956711510016" },
	/**
	 * AURORA (non-ultimate).
	 */
	Outfit37: { name: "outfit", id: "1181712959601377310" },
	/**
	 * Cure for Me.
	 */
	Outfit38: { name: "outfit", id: "1181712962893914153" },
	/**
	 * Runaway Outfit.
	 */
	Outfit39: { name: "outfit", id: "1243127630287343647" },
	/**
	 * Pleading Child.
	 */
	Outfit40: { name: "outfit", id: "1181712965607637123" },
	/**
	 * Wounded Warrior.
	 */
	Outfit41: { name: "outfit", id: "1181712968245850236" },
	/**
	 * Tiptoeing Tea-Brewer.
	 */
	Outfit42: { name: "outfit", id: "1181712971127337011" },
	/**
	 * Days of Fortune Muralist's Smock.
	 */
	Outfit43: { name: "outfit", id: "1181712973908168787" },
	/**
	 * Bloom Gardening Tunic.
	 */
	Outfit44: { name: "outfit", id: "1181712977167138936" },
	/**
	 * Melancholy Mope.
	 */
	Outfit45: { name: "outfit", id: "1181712980254150750" },
	/**
	 * Oddball Outcast.
	 */
	Outfit46: { name: "outfit", id: "1181712983882203166" },
	/**
	 * Dark Rainbow Tunic.
	 */
	Outfit47: { name: "outfit", id: "1181712986801447004" },
	/**
	 * Ascetic Monk.
	 */
	Outfit48: { name: "outfit", id: "1181712990177874021" },
	/**
	 * Nightbird Whisperer.
	 */
	Outfit49: { name: "outfit", id: "1181712994212790352" },
	/**
	 * Style Wide-Leg Jeans.
	 */
	Outfit50: { name: "outfit", id: "1181712996762923018" },
	/**
	 * Memory of a Lost Village.
	 */
	Outfit51: { name: "outfit", id: "1243124993936588820" },
	/**
	 * Mischief Goth Garment.
	 */
	Outfit52: { name: "outfit", id: "1181716521479847966" },
	/**
	 * Spirit of Mural (ultimate).
	 */
	Outfit53: { name: "outfit", id: "1195925478763143208" },
	/**
	 * Herb Gatherer.
	 */
	Outfit54: { name: "outfit", id: "1195930123610882159" },
	/**
	 * Hunter.
	 */
	Outfit55: { name: "outfit", id: "1195937722234310666" },
	/**
	 * Princess.
	 */
	Outfit56: { name: "outfit", id: "1195958681376927804" },
	/**
	 * Days of Fortune Dragon Vestment.
	 */
	Outfit57: { name: "outfit", id: "1201595022949224469" },
	/**
	 * Nesting Guide (ultimate).
	 */
	Outfit58: { name: "outfit", id: "1229145924064907334" },
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
	/**
	 * Cozy Hermit Boots.
	 */
	Shoe13: { name: "shoe", id: "1201598024783233175" },
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
	 * Season of Gratitude ultimate.
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
	Mask57: { name: "mask", id: "1201602650324607056" },
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
	 * AURORA (non-ultimate).
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
	 * Sparrow Appreciation.
	 */
	Mask85: { name: "mask", id: "1182639130094620694" },
	/**
	 * Spirit of Mural (non-ultimate).
	 */
	Mask86: { name: "mask", id: "1195926154645864488" },
	/**
	 * Feudal Lord.
	 */
	Mask87: { name: "mask", id: "1195948322553339934" },
	/**
	 * Princess.
	 */
	Mask88: { name: "mask", id: "1195958052034199622" },
	/**
	 * Gift of the Nine-Colored Deer.
	 */
	Mask89: { name: "mask", id: "1196158869840339094" },
	/**
	 * Days of Fortune 2024.
	 */
	Mask90: { name: "mask", id: "1201599955748524113" },
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
	 * Rainbow braid.
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
	/**
	 * Gift of the Nine-Colored Deer.
	 */
	FaceAccessory34: { name: "face_accessory", id: "1196158435268497529" },
	/**
	 * Days of Fortune Dragn Bangles.
	 */
	FaceAccessory35: { name: "face_accessory", id: "1201600819468968027" },
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
	 * Days of Feast 2021.
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
	 * Ancient Darkness (dragon).
	 */
	Necklace22: { name: "necklace", id: "1193724954064203827" },
	/**
	 * Jelly Shoulder Buddy.
	 */
	Necklace23: { name: "necklace", id: "1193724957868433539" },
	/**
	 * AURORA Pendant.
	 */
	Necklace24: { name: "necklace", id: "1193724962289242153" },
	/**
	 * Remembrance Pendant.
	 */
	Necklace25: { name: "necklace", id: "1193724968152866886" },
	/**
	 * Pleading Child.
	 */
	Necklace26: { name: "necklace", id: "1193724972389126245" },
	/**
	 * Remembrance Guide.
	 */
	Necklace27: { name: "necklace", id: "1193724976822485133" },
	/**
	 * Days of Love Classy Cravat.
	 */
	Necklace28: { name: "necklace", id: "1193724979188076584" },
	/**
	 * Passage Pendant.
	 */
	Necklace29: { name: "necklace", id: "1193724982400917607" },
	/**
	 * Oddball Outcast.
	 */
	Necklace30: { name: "necklace", id: "1193724986632962099" },
	/**
	 * Moments Pendant.
	 */
	Necklace31: { name: "necklace", id: "1193724990399447141" },
	/**
	 * Revival Pendant.
	 */
	Necklace32: { name: "necklace", id: "1193725247157960794" },
	/**
	 * Nine-Colored Deer Pendant.
	 */
	Necklace33: { name: "necklace", id: "1195926793836834857" },
	/**
	 * Nesting Pendant.
	 */
	Necklace34: { name: "necklace", id: "1229145373876949073" },
	/**
	 * Cinnamoroll Pop-Up Cafe Bowtie.
	 */
	Necklace35: { name: "necklace", id: "1234054706914005052" },
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
	 * Nintendo Switch.
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
	 * Ancient Darkness (dragon).
	 */
	Hair108: { name: "hair", id: "1183627314265853962" },
	/**
	 * Ancient Light (manta).
	 */
	Hair109: { name: "hair", id: "1183627318246248478" },
	/**
	 * Ancient Light (jellyfish).
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
	 * AURORA (ultimate).
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
	/**
	 * Spirit of Mural (ultimate).
	 */
	Hair136: { name: "hair", id: "1195927512652456067" },
	/**
	 * Herb Gatherer.
	 */
	Hair137: { name: "hair", id: "1195931135205711942" },
	/**
	 * Hunter.
	 */
	Hair138: { name: "hair", id: "1195938006985609256" },
	/**
	 * Princess.
	 */
	Hair139: { name: "hair", id: "1195958349150294186" },
	/**
	 * Bloom Spiky Sprig Hair.
	 */
	Hair140: { name: "hair", id: "1220813384208093247" },
	/**
	 * Bloom Arum Petal Hair.
	 */
	Hair141: { name: "hair", id: "1220813410598523084" },
	/**
	 * Nesting Atrium.
	 */
	Hair142: { name: "hair", id: "1229197356189225000" },
	/**
	 * Cinnamoroll Pop-Up Cafe Combo.
	 */
	Hair143: { name: "hair", id: "1234055628058529814" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type HairEmojis = (typeof HAIR_EMOJIS)[keyof typeof HAIR_EMOJIS];

/**
 * Emojis from the hair accessory server.
 */
export const HAIR_ACCESSORY_EMOJIS = {
	/**
	 * Days of Healing.
	 */
	HairAccessory01: { name: "hair_accessory", id: "1186592068986998866" },
	/**
	 * Chill Sunbather.
	 */
	HairAccessory02: { name: "hair_accessory", id: "1186592073378435152" },
	/**
	 * First Sky Anniversary.
	 */
	HairAccessory03: { name: "hair_accessory", id: "1186592076985536642" },
	/**
	 * Days of Fortune Orange.
	 */
	HairAccessory04: { name: "hair_accessory", id: "1186592079699267584" },
	/**
	 * Days of Rainbow 2021.
	 */
	HairAccessory05: { name: "hair_accessory", id: "1186592082941444167" },
	/**
	 * Second Sky Anniversary.
	 */
	HairAccessory06: { name: "hair_accessory", id: "1186592086414331974" },
	/**
	 * Days of Summer 2021.
	 */
	HairAccessory07: { name: "hair_accessory", id: "1186592088981246063" },
	/**
	 * Days of Summer Shell Hair Pin.
	 */
	HairAccessory08: { name: "hair_accessory", id: "1186592138612441149" },
	/**
	 * Bunny Accessory.
	 */
	HairAccessory09: { name: "hair_accessory", id: "1186592091749490719" },
	/**
	 * Light Whisperer.
	 */
	HairAccessory10: { name: "hair_accessory", id: "1186592094337368104" },
	/**
	 * Tinkering Chimesmith.
	 */
	HairAccessory11: { name: "hair_accessory", id: "1186592096648445964" },
	/**
	 * Lively Navigator.
	 */
	HairAccessory12: { name: "hair_accessory", id: "1186592099991306250" },
	/**
	 * Flight Guide (ultimate).
	 */
	HairAccessory13: { name: "hair_accessory", id: "1186592102805680189" },
	/**
	 * Snowflake Hair Accessory.
	 */
	HairAccessory14: { name: "hair_accessory", id: "1186592105800421426" },
	/**
	 * Bumbling Boatswain.
	 */
	HairAccessory15: { name: "hair_accessory", id: "1186592108614791223" },
	/**
	 * Days of Fortune Fish Accessory.
	 */
	HairAccessory16: { name: "hair_accessory", id: "1186592111739535422" },
	/**
	 * Days of Love Flower Crown.
	 */
	HairAccessory17: { name: "hair_accessory", id: "1186592114688147547" },
	/**
	 * Kizuna AI.
	 */
	HairAccessory18: { name: "hair_accessory", id: "1186592118131662940" },
	/**
	 * Days of Nature 2022.
	 */
	HairAccessory19: { name: "hair_accessory", id: "1186592120908288031" },
	/**
	 * Harmony Hall Grand Opening.
	 */
	HairAccessory20: { name: "hair_accessory", id: "1186592123978522675" },
	/**
	 * Days of Rainbow 2022.
	 */
	HairAccessory21: { name: "hair_accessory", id: "1186592126725791764" },
	/**
	 * Ancient Darkness (plant).
	 */
	HairAccessory22: { name: "hair_accessory", id: "1186592129544360066" },
	/**
	 * Ancient Light (jellyfish).
	 */
	HairAccessory23: { name: "hair_accessory", id: "1186592132203544621" },
	/**
	 * Third Sky Anniversary.
	 */
	HairAccessory24: { name: "hair_accessory", id: "1186592135542231111" },
	/**
	 * Reassuring Ranger.
	 */
	HairAccessory25: { name: "hair_accessory", id: "1186592144924868638" },
	/**
	 * Nightbird Whisperer.
	 */
	HairAccessory26: { name: "hair_accessory", id: "1186592147441471549" },
	/**
	 * Moments Guide (ultimate).
	 */
	HairAccessory27: { name: "hair_accessory", id: "1186592150243250257" },
	/**
	 * Fourth Sky Anniversary.
	 */
	HairAccessory28: { name: "hair_accessory", id: "1186592153175072838" },
	/**
	 * Days of Style 2023.
	 */
	HairAccessory29: { name: "hair_accessory", id: "1186592155414839306" },
	/**
	 * Echo of an Abandoned Refuge.
	 */
	HairAccessory30: { name: "hair_accessory", id: "1186592157889482782" },
	/**
	 * Remnant of a Forgotten Haven.
	 */
	HairAccessory31: { name: "hair_accessory", id: "1186592160011784288" },
	/**
	 * Days of Mischief 2023.
	 */
	HairAccessory32: { name: "hair_accessory", id: "1186592162981347328" },
	/**
	 * Moth Appreciation.
	 */
	HairAccessory33: { name: "hair_accessory", id: "1186592165158203455" },
	/**
	 * Days of Feast 2023.
	 */
	HairAccessory34: { name: "hair_accessory", id: "1201604722994454688" },
	/**
	 * Spirit of Mural (non-ultimate).
	 */
	HairAccessory35: { name: "hair_accessory", id: "1201604734532997271" },
	/**
	 * Feudal Lord.
	 */
	HairAccessory36: { name: "hair_accessory", id: "1201604744725155860" },
	/**
	 * Love Heart Beret.
	 */
	HairAccessory37: { name: "hair_accessory", id: "1206353254292783125" },
	/**
	 * Nesting Nook.
	 */
	HairAccessory38: { name: "hair_accessory", id: "1229204549915508756" },
	/**
	 * Cinnamoroll Pop-Up Cafe Mini Companion.
	 */
	HairAccessory39: { name: "hair_accessory", id: "1234053050742607962" },
	/**
	 * Cinnamoroll Pop-Up Cafe Combo.
	 */
	HairAccessory40: { name: "hair_accessory", id: "1234053751304880178" },
	/**
	 * Cosy Teacup Headband.
	 */
	HairAccessory41: { name: "hair_accessory", id: "1234054082352910386" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type HairAccessoryEmojis = (typeof HAIR_ACCESSORY_EMOJIS)[keyof typeof HAIR_ACCESSORY_EMOJIS];

/**
 * Emojis from the cape servers.
 */
export const CAPE_EMOJIS = {
	/**
	 * Base.
	 */
	Cape01: { name: "cape", id: "1188421277082456124" },
	/**
	 * Beta.
	 */
	Cape02: { name: "cape", id: "1188421281280954409" },
	/**
	 * Starter Pack.
	 */
	Cape03: { name: "cape", id: "1188421285135528008" },
	/**
	 * Butterfly Charmer 1.
	 */
	Cape04: { name: "cape", id: "1188421289627619368" },
	/**
	 * Pouty Porter 1.
	 */
	Cape05: { name: "cape", id: "1188421291796070452" },
	/**
	 * Dismayed Hunter 1.
	 */
	Cape06: { name: "cape", id: "1188421295176699924" },
	/**
	 * Proud Victor 1.
	 */
	Cape07: { name: "cape", id: "1188421297714249749" },
	/**
	 * Handstanding Thrillseeker 1.
	 */
	Cape08: { name: "cape", id: "1188421300960636980" },
	/**
	 * Courageous Soldier 1.
	 */
	Cape09: { name: "cape", id: "1188421305175900201" },
	/**
	 * Stealthy Survivor 1.
	 */
	Cape10: { name: "cape", id: "1188421307881226240" },
	/**
	 * Praying Acolyte 1.
	 */
	Cape11: { name: "cape", id: "1188421310754340954" },
	/**
	 * Memory Whisperer 1.
	 */
	Cape12: { name: "cape", id: "1188421314311110667" },
	/**
	 * Saluting Protector.
	 */
	Cape13: { name: "cape", id: "1188421317830127687" },
	/**
	 * Stretching Guru.
	 */
	Cape14: { name: "cape", id: "1188421319579144266" },
	/**
	 * Founder's Pack.
	 */
	Cape15: { name: "cape", id: "1188421323421134858" },
	/**
	 * Crab Whisperer.
	 */
	Cape16: { name: "cape", id: "1188421326294233200" },
	/**
	 * Piggyback Lightseeker.
	 */
	Cape17: { name: "cape", id: "1188421329796472872" },
	/**
	 * Shushing Light Scholar.
	 */
	Cape18: { name: "cape", id: "1188421332669575220" },
	/**
	 * Spooky Bat Cape.
	 */
	Cape19: { name: "cape", id: "1188421335563645008" },
	/**
	 * Confetti Cousin.
	 */
	Cape20: { name: "cape", id: "1188421338155724851" },
	/**
	 * Pleaful Parent.
	 */
	Cape21: { name: "cape", id: "1188421340756185181" },
	/**
	 * Wise Grandparent.
	 */
	Cape22: { name: "cape", id: "1188421343377621042" },
	/**
	 * Troupe Juggler.
	 */
	Cape23: { name: "cape", id: "1188421344531071008" },
	/**
	 * Thoughtful Director.
	 */
	Cape24: { name: "cape", id: "1188421347366408283" },
	/**
	 * Crab Walker.
	 */
	Cape25: { name: "cape", id: "1188421350294036632" },
	/**
	 * Snoozing Carpenter.
	 */
	Cape26: { name: "cape", id: "1188421352982581320" },
	/**
	 * Indifferent Alchemist.
	 */
	Cape27: { name: "cape", id: "1188421355151040602" },
	/**
	 * Playfighting Herbalist.
	 */
	Cape28: { name: "cape", id: "1188421358149976135" },
	/**
	 * Earth Cape.
	 */
	Cape29: { name: "cape", id: "1188421360813342750" },
	/**
	 * Timid Bookworm.
	 */
	Cape30: { name: "cape", id: "1188421363652890695" },
	/**
	 * Sanctuary Guide (ultimate).
	 */
	Cape31: { name: "cape", id: "1188421366656020491" },
	/**
	 * Grateful Shell Collector.
	 */
	Cape32: { name: "cape", id: "1188421368816078889" },
	/**
	 * Chill Sunbather.
	 */
	Cape33: { name: "cape", id: "1188421372444147723" },
	/**
	 * Prophet of Air.
	 */
	Cape34: { name: "cape", id: "1188421375115931688" },
	/**
	 * Prophet of Water.
	 */
	Cape35: { name: "cape", id: "1188421378194550795" },
	/**
	 * Prophet of Earth.
	 */
	Cape36: { name: "cape", id: "1188421381189292032" },
	/**
	 * Mischief Web Cape.
	 */
	Cape37: { name: "cape", id: "1188421383894601769" },
	/**
	 * Butterfly Charmer 2.
	 */
	Cape38: { name: "cape", id: "1188421387426222170" },
	/**
	 * Pouty Porter 2.
	 */
	Cape39: { name: "cape", id: "1188421390857150554" },
	/**
	 * Proud Victor 2.
	 */
	Cape40: { name: "cape", id: "1188421394267131934" },
	/**
	 * Days of Feast 2020.
	 */
	Cape41: { name: "cape", id: "1188421397161197628" },
	/**
	 * Snowflake Cape.
	 */
	Cape42: { name: "cape", id: "1188421400113987664" },
	/**
	 * Peeking Postman.
	 */
	Cape43: { name: "cape", id: "1188421402953515148" },
	/**
	 * Dancing Performer.
	 */
	Cape44: { name: "cape", id: "1188421405218443285" },
	/**
	 * Spinning Mentor.
	 */
	Cape45: { name: "cape", id: "1188421408146079745" },
	/**
	 * Dreams Guide (ultimate).
	 */
	Cape46: { name: "cape", id: "1188421410532634654" },
	/**
	 * Courageous Soldier 2.
	 */
	Cape47: { name: "cape", id: "1188421414336872508" },
	/**
	 * Praying Acolyte 2.
	 */
	Cape48: { name: "cape", id: "1188421417872666645" },
	/**
	 * Days of Fortune 2021.
	 */
	Cape49: { name: "cape", id: "1188421421211324437" },
	/**
	 * Dismayed Hunter 2.
	 */
	Cape50: { name: "cape", id: "1188421426043158528" },
	/**
	 * Days of Bloom 2021.
	 */
	Cape51: { name: "cape", id: "1188422749908123678" },
	/**
	 * Assembly Guide (ultimate).
	 */
	Cape52: { name: "cape", id: "1188422752194019339" },
	/**
	 * Scolding Student.
	 */
	Cape53: { name: "cape", id: "1188422754781888563" },
	/**
	 * Ocean Cape.
	 */
	Cape54: { name: "cape", id: "1188422757835362326" },
	/**
	 * Handstanding Thrillseeker 2.
	 */
	Cape55: { name: "cape", id: "1188422761882849370" },
	/**
	 * Rainbow cape.
	 */
	Cape56: { name: "cape", id: "1188422764248444928" },
	/**
	 * Nintendo Switch (red).
	 */
	Cape57: { name: "cape", id: "1188422767209623563" },
	/**
	 * Nintendo Switch (blue).
	 */
	Cape58: { name: "cape", id: "1188422769642307685" },
	/**
	 * Star Collector.
	 */
	Cape59: { name: "cape", id: "1188422772217618542" },
	/**
	 * Slouching Soldier.
	 */
	Cape60: { name: "cape", id: "1188422774474162316" },
	/**
	 * Stretching Lamplighter.
	 */
	Cape61: { name: "cape", id: "1188422776881688646" },
	/**
	 * Sneezing Geographer.
	 */
	Cape62: { name: "cape", id: "1188422778764922992" },
	/**
	 * Little Prince Scarf Cape.
	 */
	Cape63: { name: "cape", id: "1188422781898076201" },
	/**
	 * Little Prince Asteroid Jacket.
	 */
	Cape64: { name: "cape", id: "1188422784725037077" },
	/**
	 * Light Whisperer.
	 */
	Cape65: { name: "cape", id: "1188422786801225768" },
	/**
	 * Lively Navigator.
	 */
	Cape66: { name: "cape", id: "1188422789514932307" },
	/**
	 * Days of Mischief 2021.
	 */
	Cape67: { name: "cape", id: "1188422791528206387" },
	/**
	 * Winter Ancestor Cape.
	 */
	Cape68: { name: "cape", id: "1188422794413871124" },
	/**
	 * Ceasing Commodore.
	 */
	Cape69: { name: "cape", id: "1188422796645253210" },
	/**
	 * Cackling Cannoneer.
	 */
	Cape70: { name: "cape", id: "1188422799732256809" },
	/**
	 * Anxious Angler.
	 */
	Cape71: { name: "cape", id: "1188422802148171776" },
	/**
	 * Bumbling Boatswain.
	 */
	Cape72: { name: "cape", id: "1188422804341788713" },
	/**
	 * Abyss Guide (ultimate).
	 */
	Cape73: { name: "cape", id: "1188422806610911263" },
	/**
	 * Days of Fortune 2022.
	 */
	Cape74: { name: "cape", id: "1188422809198788668" },
	/**
	 * Kizuna AI Cape.
	 */
	Cape75: { name: "cape", id: "1188422811451129887" },
	/**
	 * Purple Bloom Cape.
	 */
	Cape76: { name: "cape", id: "1188422814408126504" },
	/**
	 * Memory Whisperer 2.
	 */
	Cape77: { name: "cape", id: "1188422818354974730" },
	/**
	 * Performance Guide (ultimate).
	 */
	Cape78: { name: "cape", id: "1188422820678615041" },
	/**
	 * Forgetful Storyteller.
	 */
	Cape79: { name: "cape", id: "1188422824294101024" },
	/**
	 * Mellow Musician.
	 */
	Cape80: { name: "cape", id: "1188422827364331580" },
	/**
	 * Days of Nature 2022.
	 */
	Cape81: { name: "cape", id: "1188422829746696214" },
	/**
	 * Stealthy Survivor 2.
	 */
	Cape82: { name: "cape", id: "1188422833047609354" },
	/**
	 * Ancient Darkness (plant).
	 */
	Cape83: { name: "cape", id: "1188422835610341436" },
	/**
	 * The Void of Shattering (ultimate 1).
	 */
	Cape84: { name: "cape", id: "1188422838269521971" },
	/**
	 * Ancient Light (jellyfish).
	 */
	Cape85: { name: "cape", id: "1188422840542822431" },
	/**
	 * Ancient Light (manta).
	 */
	Cape86: { name: "cape", id: "1188422843327840318" },
	/**
	 * The Void of Shattering (ultimate 2).
	 */
	Cape87: { name: "cape", id: "1188422846167400499" },
	/**
	 * Seed of Hope.
	 */
	Cape88: { name: "cape", id: "1188422856640581674" },
	/**
	 * Running Wayfarer.
	 */
	Cape89: { name: "cape", id: "1188422858897117284" },
	/**
	 * Warrior of Love.
	 */
	Cape90: { name: "cape", id: "1188422861707288676" },
	/**
	 * Mindful Miner.
	 */
	Cape91: { name: "cape", id: "1188422863972212737" },
	/**
	 * AURORA (ultimate).
	 */
	Cape92: { name: "cape", id: "1188422867327651931" },
	/**
	 * Days of Mischief 2022.
	 */
	Cape93: { name: "cape", id: "1188422869655506954" },
	/**
	 * PlayStation.
	 */
	Cape94: { name: "cape", id: "1188422873094828155" },
	/**
	 * Giving In Cape.
	 */
	Cape95: { name: "cape", id: "1188422875972112444" },
	/**
	 * Wings of AURORA.
	 */
	Cape96: { name: "cape", id: "1188422878409003048" },
	/**
	 * Cozy Hermit Cape.
	 */
	Cape97: { name: "cape", id: "1188422881349222430" },
	/**
	 * Bereft Veteran.
	 */
	Cape98: { name: "cape", id: "1241913629159325707" },
	/**
	 * Wounded Warrior.
	 */
	Cape99: { name: "cape", id: "1241913638626001049" },
	/**
	 * Tiptoeing Tea-Brewer.
	 */
	Cape100: { name: "cape", id: "1241913648444608543" },
	/**
	 * Days of Bloom 2023.
	 */
	Cape101: { name: "cape", id: "1188423431461535805" },
	/**
	 * Tumbling Troublemaker.
	 */
	Cape102: { name: "cape", id: "1188423434619854918" },
	/**
	 * Overactive Overachiever.
	 */
	Cape103: { name: "cape", id: "1188423437220319263" },
	/**
	 * Passage Guide (ultimate).
	 */
	Cape104: { name: "cape", id: "1188423440122773608" },
	/**
	 * Days of Nature 2023.
	 */
	Cape105: { name: "cape", id: "1188423442324795507" },
	/**
	 * Days of Colour 2023.
	 */
	Cape106: { name: "cape", id: "1188423445059489843" },
	/**
	 * Reassuring Ranger.
	 */
	Cape107: { name: "cape", id: "1188423448091955210" },
	/**
	 * Sunlight Pink Beach Towel Cape.
	 */
	Cape108: { name: "cape", id: "1241911856881340446" },
	/**
	 * Sunlight Yellow Beach Towel Cape.
	 */
	Cape109: { name: "cape", id: "1241911906751615056" },
	/**
	 * Sunlight Blue Beach Towel Cape.
	 */
	Cape110: { name: "cape", id: "1241911919259156550" },
	/**
	 * Vestige of a Deserted Oasis.
	 */
	Cape111: { name: "cape", id: "1188423450231046185" },
	/**
	 * Echo of an Abandoned Refuge.
	 */
	Cape112: { name: "cape", id: "1188423453129314436" },
	/**
	 * Remnant of a Forgotten Haven.
	 */
	Cape113: { name: "cape", id: "1188423455239049278" },
	/**
	 * Memory of a Lost Village.
	 */
	Cape114: { name: "cape", id: "1188423458309296148" },
	/**
	 * Hopeful Steward (ultimate).
	 */
	Cape115: { name: "cape", id: "1188423460200927273" },
	/**
	 * Mischief Gossamer Cape.
	 */
	Cape116: { name: "cape", id: "1188423462713307147" },
	/**
	 * Mischief Crabula Cloak.
	 */
	Cape117: { name: "cape", id: "1188423465397653574" },
	/**
	 * Sparrow Appreciation.
	 */
	Cape118: { name: "cape", id: "1188423467889074269" },
	/**
	 * Moth Appreciation.
	 */
	Cape119: { name: "cape", id: "1188423470841872395" },
	/**
	 * Winter Quilted Cape.
	 */
	Cape120: { name: "cape", id: "1201606594232864840" },
	/**
	 * Spirit of Mural (ultimate).
	 */
	Cape121: { name: "cape", id: "1201606605360353350" },
	/**
	 * Hunter.
	 */
	Cape122: { name: "cape", id: "1201606614596194346" },
	/**
	 * Feudal Lord.
	 */
	Cape123: { name: "cape", id: "1201606624318591129" },
	/**
	 * Princess.
	 */
	Cape124: { name: "cape", id: "1201606633944514692" },
	/**
	 * Radiance of the Nine-Colored Deer.
	 */
	Cape125: { name: "cape", id: "1201606642614157412" },
	/**
	 * Days of Fortune Dragon Stole.
	 */
	Cape126: { name: "cape", id: "1201607350621048863" },
	/**
	 * Days of Love Meteor Mantle.
	 */
	Cape127: { name: "cape", id: "1206351312279703683" },
	/**
	 * Bloom Arum Petal Cape.
	 */
	Cape128: { name: "cape", id: "1220812166077354045" },
	/**
	 * Nesting Loft.
	 */
	Cape129: { name: "cape", id: "1229193708340121696" },
	/**
	 * Cinnamoroll Pop-Up Cafe Cloud Cape.
	 */
	Cape130: { name: "cape", id: "1234055162725662761" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type CapeEmojis = (typeof CAPE_EMOJIS)[keyof typeof CAPE_EMOJIS];

/**
 * Emojis from the held props server.
 */
export const HELD_PROPS_EMOJIS = {
	/**
	 * Laughing Light Catcher.
	 */
	HeldProp01: { name: "held_prop", id: "1190678766977040525" },
	/**
	 * Blushing Prospector.
	 */
	HeldProp02: { name: "held_prop", id: "1190678771917930667" },
	/**
	 * Cheerful Spectator.
	 */
	HeldProp03: { name: "held_prop", id: "1190678774283501668" },
	/**
	 * Frightened Refugee.
	 */
	HeldProp04: { name: "held_prop", id: "1190678778058383440" },
	/**
	 * Lookout Scout.
	 */
	HeldProp05: { name: "held_prop", id: "1190678780344279071" },
	/**
	 * Saluting Captain.
	 */
	HeldProp06: { name: "held_prop", id: "1190678783339024544" },
	/**
	 * Leaping Dancer.
	 */
	HeldProp07: { name: "held_prop", id: "1190678785834618950" },
	/**
	 * Greeting Shaman.
	 */
	HeldProp08: { name: "held_prop", id: "1190678788732887110" },
	/**
	 * Doublefive Light Catcher.
	 */
	HeldProp09: { name: "held_prop", id: "1190678791073321051" },
	/**
	 * Twirling Champion.
	 */
	HeldProp10: { name: "held_prop", id: "1190678793933820014" },
	/**
	 * Laidback Pioneer.
	 */
	HeldProp11: { name: "held_prop", id: "1190678796194553877" },
	/**
	 * Season of Lightseekers ultimate.
	 */
	HeldProp12: { name: "held_prop", id: "1190678799092826283" },
	/**
	 * Pleaful Parent.
	 */
	HeldProp13: { name: "held_prop", id: "1190678801978511381" },
	/**
	 * Hairtousle Teen.
	 */
	HeldProp14: { name: "held_prop", id: "1190678804541231205" },
	/**
	 * Respectful Pianist.
	 */
	HeldProp15: { name: "held_prop", id: "1190678807988928684" },
	/**
	 * Thoughtful Director.
	 */
	HeldProp16: { name: "held_prop", id: "1190678812451688539" },
	/**
	 * Sanctuary Guide.
	 */
	HeldProp17: { name: "held_prop", id: "1190678815576440923" },
	/**
	 * Days of Summer Lights 2020.
	 */
	HeldProp18: { name: "held_prop", id: "1190678818650861619" },
	/**
	 * Prophecy Guide.
	 */
	HeldProp19: { name: "held_prop", id: "1190678822945837157" },
	/**
	 * Dancing Performer.
	 */
	HeldProp20: { name: "held_prop", id: "1190678827152703528" },
	/**
	 * Assembly Guide.
	 */
	HeldProp21: { name: "held_prop", id: "1190678831284093008" },
	/**
	 * Nintendo Switch.
	 */
	HeldProp22: { name: "held_prop", id: "1190678833901338665" },
	/**
	 * Days of Summer Umbrella.
	 */
	HeldProp23: { name: "held_prop", id: "1190678836787019777" },
	/**
	 * Tinkering Chimesmith.
	 */
	HeldProp24: { name: "held_prop", id: "1190678840377344062" },
	/**
	 * Mellow Musician.
	 */
	HeldProp25: { name: "held_prop", id: "1190678843145584670" },
	/**
	 * Fledgling Harp.
	 */
	HeldProp26: { name: "held_prop", id: "1190678846157095043" },
	/**
	 * Rhythm Guitar.
	 */
	HeldProp27: { name: "held_prop", id: "1190678848954703903" },
	/**
	 * Triumph Handpan.
	 */
	HeldProp28: { name: "held_prop", id: "1190678852121395231" },
	/**
	 * Ancient Darkness (dragon).
	 */
	HeldProp29: { name: "held_prop", id: "1190678855694942218" },
	/**
	 * TGC Guitar.
	 */
	HeldProp30: { name: "held_prop", id: "1190678859075571752" },
	/**
	 * Voice of AURORA.
	 */
	HeldProp31: { name: "held_prop", id: "1190678862762344448" },
	/**
	 * Days of Fortune Enchanted Umbrella.
	 */
	HeldProp32: { name: "held_prop", id: "1190678866063273997" },
	/**
	 * Days of Love Serendipitous Sceptre.
	 */
	HeldProp33: { name: "held_prop", id: "1190678868886036541" },
	/**
	 * Overactive Overachiever.
	 */
	HeldProp34: { name: "held_prop", id: "1190678872732221651" },
	/**
	 * Triumph Violin.
	 */
	HeldProp35: { name: "held_prop", id: "1190678875299123200" },
	/**
	 * Triumph Saxophone.
	 */
	HeldProp36: { name: "held_prop", id: "1190678877362737172" },
	/**
	 * Moments Guide (ultimate).
	 */
	HeldProp37: { name: "held_prop", id: "1190678880755908610" },
	/**
	 * Moments Guide (non-ultimate).
	 */
	HeldProp38: { name: "held_prop", id: "1190678883767435304" },
	/**
	 * Aviary's Firework Festival.
	 */
	HeldProp39: { name: "held_prop", id: "1190678885877157941" },
	/**
	 * Days of Feast 2023.
	 */
	HeldProp40: { name: "held_prop", id: "1190678898522980505" },
	/**
	 * Days of Fortune 2024.
	 */
	HeldProp41: { name: "held_prop", id: "1201607955754270721" },
	/**
	 * Bloom Lilypad Umbrella.
	 */
	HeldProp42: { name: "held_prop", id: "1220814676884197456" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type HeldPropsEmojis = (typeof HELD_PROPS_EMOJIS)[keyof typeof HELD_PROPS_EMOJIS];

/**
 * Emojis from the placeable props servers.
 */
export const LARGE_PLACEABLE_PROPS_EMOJIS = {
	/**
	 * Meditating Monastic.
	 */
	LargePlaceableProp01: { name: "large_placeable_prop", id: "1193625843671515156" },
	/**
	 * Belonging Guide (ultimate).
	 */
	LargePlaceableProp02: { name: "large_placeable_prop", id: "1193625846347468900" },
	/**
	 * Days of Feast 2020.
	 */
	LargePlaceableProp03: { name: "large_placeable_prop", id: "1193625851191906435" },
	/**
	 * Pink Bloom Teaset.
	 */
	LargePlaceableProp04: { name: "large_placeable_prop", id: "1193625857378496677" },
	/**
	 * Assembly Guide (non-ultimate 1).
	 */
	LargePlaceableProp05: { name: "large_placeable_prop", id: "1193625861132398603" },
	/**
	 * Assembly Guide (non-ultimate 2).
	 */
	LargePlaceableProp06: { name: "large_placeable_prop", id: "1193625863443456084" },
	/**
	 * Scaredy Cadet.
	 */
	LargePlaceableProp07: { name: "large_placeable_prop", id: "1193625866610163763" },
	/**
	 * Marching Adventurer.
	 */
	LargePlaceableProp08: { name: "large_placeable_prop", id: "1193625877985112174" },
	/**
	 * Assembly Guide (non-ultimate 5).
	 */
	LargePlaceableProp09: { name: "large_placeable_prop", id: "1193625881848057997" },
	/**
	 * Baffled Botanist.
	 */
	LargePlaceableProp10: { name: "large_placeable_prop", id: "1193625885115424769" },
	/**
	 * Chuckling Scout.
	 */
	LargePlaceableProp11: { name: "large_placeable_prop", id: "1193625888034668625" },
	/**
	 * Star Collector.
	 */
	LargePlaceableProp12: { name: "large_placeable_prop", id: "1193625890345730099" },
	/**
	 * Days of Summer 2021.
	 */
	LargePlaceableProp13: { name: "large_placeable_prop", id: "1193625942501892227" },
	/**
	 * Chill Sunbather.
	 */
	LargePlaceableProp14: { name: "large_placeable_prop", id: "1193625901485797386" },
	/**
	 * Crab Whisperer.
	 */
	LargePlaceableProp15: { name: "large_placeable_prop", id: "1193625903608107189" },
	/**
	 * Troupe Juggler.
	 */
	LargePlaceableProp16: { name: "large_placeable_prop", id: "1193625905361330207" },
	/**
	 * Grateful Shell Collector.
	 */
	LargePlaceableProp17: { name: "large_placeable_prop", id: "1193625908511248504" },
	/**
	 * Festival Spin Dancer.
	 */
	LargePlaceableProp18: { name: "large_placeable_prop", id: "1193625910365138986" },
	/**
	 * Days of Mischief 2021 1.
	 */
	LargePlaceableProp19: { name: "large_placeable_prop", id: "1193625912676192346" },
	/**
	 * Playfighting Herbalist.
	 */
	LargePlaceableProp20: { name: "large_placeable_prop", id: "1193625918145581166" },
	/**
	 * Jelly Whisperer.
	 */
	LargePlaceableProp21: { name: "large_placeable_prop", id: "1193625923170349156" },
	/**
	 * Prophet of Fire 1.
	 */
	LargePlaceableProp22: { name: "large_placeable_prop", id: "1193625925875662959" },
	/**
	 * Purple Bloom Teaset.
	 */
	LargePlaceableProp23: { name: "large_placeable_prop", id: "1193625945291116644" },
	/**
	 * Performance Guide (non-ultmate).
	 */
	LargePlaceableProp24: { name: "large_placeable_prop", id: "1193625949481213982" },
	/**
	 * Days of Sunlight 2022.
	 */
	LargePlaceableProp25: { name: "large_placeable_prop", id: "1193625955730735205" },
	/**
	 * Third Sky Anniversary 2.
	 */
	LargePlaceableProp26: { name: "large_placeable_prop", id: "1193625961690845346" },
	/**
	 * Days of Feast 2022.
	 */
	LargePlaceableProp27: { name: "large_placeable_prop", id: "1193625985455771799" },
	/**
	 * Remembrance Guide (non-ultimate 2).
	 */
	LargePlaceableProp28: { name: "large_placeable_prop", id: "1193625992611250257" },
	/**
	 * Remembrance Guide (non-ultimate 3).
	 */
	LargePlaceableProp29: { name: "large_placeable_prop", id: "1229123375369158767" },
	/**
	 * Remembrance Guide (ultimate).
	 */
	LargePlaceableProp30: { name: "large_placeable_prop", id: "1229123814936412250" },
	/**
	 * Days of Love 2023.
	 */
	LargePlaceableProp31: { name: "large_placeable_prop", id: "1229124760064098484" },
	/**
	 * Bloom Picnic Basket.
	 */
	LargePlaceableProp32: { name: "large_placeable_prop", id: "1229125194694660118" },
	/**
	 * Fourth Sky Anniversary 2.
	 */
	LargePlaceableProp33: { name: "large_placeable_prop", id: "1229126722767552713" },
	/**
	 * Nesting Solarium 1.
	 */
	LargePlaceableProp34: { name: "large_placeable_prop", id: "1229168587608948779" },
	/**
	 * Nesting Solarium 2.
	 */
	LargePlaceableProp35: { name: "large_placeable_prop", id: "1229169699015622706" },
	/**
	 * Nesting Solarium 3.
	 */
	LargePlaceableProp36: { name: "large_placeable_prop", id: "1229170318472384613" },
	/**
	 * Nesting Loft 1.
	 */
	LargePlaceableProp37: { name: "large_placeable_prop", id: "1229192882879991910" },
	/**
	 * Nesting Loft 2.
	 */
	LargePlaceableProp38: { name: "large_placeable_prop", id: "1229193291103473845" },
	/**
	 * Nesting Atrium 1.
	 */
	LargePlaceableProp39: { name: "large_placeable_prop", id: "1229196932791144589" },
	/**
	 * Nesting Atrium 2.
	 */
	LargePlaceableProp40: { name: "large_placeable_prop", id: "1229197997359759390" },
	/**
	 * Nesting Nook.
	 */
	LargePlaceableProp41: { name: "large_placeable_prop", id: "1229203555047702538" },
	/**
	 * Season of Nesting quest 1.
	 */
	LargePlaceableProp42: { name: "large_placeable_prop", id: "1231718600532955227" },
	/**
	 * Stone single bench.
	 */
	LargePlaceableProp43: { name: "large_placeable_prop", id: "1231719423518183476" },
	/**
	 * Stone wood fired oven.
	 */
	LargePlaceableProp44: { name: "large_placeable_prop", id: "1231720430801518714" },
	/**
	 * Stone tall cube.
	 */
	LargePlaceableProp45: { name: "large_placeable_prop", id: "1231720954955169852" },
	/**
	 * Stone single bed.
	 */
	LargePlaceableProp46: { name: "large_placeable_prop", id: "1231721865681174630" },
	/**
	 * Stone chair.
	 */
	LargePlaceableProp47: { name: "large_placeable_prop", id: "1233438179969863820" },
	/**
	 * Stone small table.
	 */
	LargePlaceableProp48: { name: "large_placeable_prop", id: "1233439458582335550" },
	/**
	 * Stone tall shelf.
	 */
	LargePlaceableProp49: { name: "large_placeable_prop", id: "1233439470452343027" },
	/**
	 * Cosy Cafe Table.
	 */
	LargePlaceableProp50: { name: "large_placeable_prop", id: "1234112443832340566" },
	/**
	 * Stone bench.
	 */
	LargePlaceableProp51: { name: "large_placeable_prop", id: "1235000703278252032" },
	/**
	 * Stone desk.
	 */
	LargePlaceableProp52: { name: "large_placeable_prop", id: "1235000987656388639" },
	/**
	 * Stone armchair.
	 */
	LargePlaceableProp53: { name: "large_placeable_prop", id: "1236938829236011090" },
	/**
	 * Stone console table.
	 */
	LargePlaceableProp54: { name: "large_placeable_prop", id: "1236938860617928756" },
	/**
	 * Stone loveseat.
	 */
	LargePlaceableProp55: { name: "large_placeable_prop", id: "1241732766639325287" },
	/**
	 * Stone round dining table.
	 */
	LargePlaceableProp56: { name: "large_placeable_prop", id: "1241733069371867137" },
	/**
	 * Stone plant stand.
	 */
	LargePlaceableProp57: { name: "large_placeable_prop", id: "1241733256345292912" },
	/**
	 * Stone sofa corner.
	 */
	LargePlaceableProp58: { name: "large_placeable_prop", id: "1242014363519422589" },
	/**
	 * Stone sofa corner.
	 */
	LargePlaceableProp59: { name: "large_placeable_prop", id: "1242014631908737074" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type LargePlaceablePropsEmojis =
	(typeof LARGE_PLACEABLE_PROPS_EMOJIS)[keyof typeof LARGE_PLACEABLE_PROPS_EMOJIS];

export const SMALL_PLACEABLE_PROPS_EMOJIS = {
	/**
	 * Days of Love 2020.
	 */
	SmallPlaceableProp01: { name: "small_placeable_prop", id: "1229059962182041650" },
	/**
	 * Days of Love Seesaw.
	 */
	SmallPlaceableProp02: { name: "small_placeable_prop", id: "1229064354737950820" },
	/**
	 * Assembly Guide (non-ultimate 3).
	 */
	SmallPlaceableProp03: { name: "small_placeable_prop", id: "1229104130723811430" },
	/**
	 * Assembly Guide (non-ultimate 4).
	 */
	SmallPlaceableProp04: { name: "small_placeable_prop", id: "1229105312892715148" },
	/**
	 * The Rose.
	 */
	SmallPlaceableProp05: { name: "small_placeable_prop", id: "1229106807608185055" },
	/**
	 * Little Prince Fox.
	 */
	SmallPlaceableProp06: { name: "small_placeable_prop", id: "1229107119085584385" },
	/**
	 * Second Sky Anniversary.
	 */
	SmallPlaceableProp07: { name: "small_placeable_prop", id: "1229107999168139264" },
	/**
	 * Days of Mischief 2021 2.
	 */
	SmallPlaceableProp08: { name: "small_placeable_prop", id: "1229110422666219540" },
	/**
	 * Wise Grandparent.
	 */
	SmallPlaceableProp09: { name: "small_placeable_prop", id: "1229111178551230536" },
	/**
	 * Days of Feast 2021 1.
	 */
	SmallPlaceableProp10: { name: "small_placeable_prop", id: "1229112946001707089" },
	/**
	 * Days of Feast 2021 2.
	 */
	SmallPlaceableProp11: { name: "small_placeable_prop", id: "1229113621737504860" },
	/**
	 * Sparkler Parent.
	 */
	SmallPlaceableProp12: { name: "small_placeable_prop", id: "1229114153050837092" },
	/**
	 * Prophet of Earth.
	 */
	SmallPlaceableProp13: { name: "small_placeable_prop", id: "1229115242328359104" },
	/**
	 * Days of Love Gondola.
	 */
	SmallPlaceableProp14: { name: "small_placeable_prop", id: "1229115708101627935" },
	/**
	 * Prophet of Air.
	 */
	SmallPlaceableProp15: { name: "small_placeable_prop", id: "1229117006054162573" },
	/**
	 * Third Sky Anniversary 1.
	 */
	SmallPlaceableProp16: { name: "small_placeable_prop", id: "1229117830977425520" },
	/**
	 * Third Sky Anniversary 3.
	 */
	SmallPlaceableProp17: { name: "small_placeable_prop", id: "1229119915378741369" },
	/**
	 * Campfire Snack Kit.
	 */
	SmallPlaceableProp18: { name: "small_placeable_prop", id: "1229120222775087226" },
	/**
	 * Feline Familiar Prop.
	 */
	SmallPlaceableProp19: { name: "small_placeable_prop", id: "1229120793292832850" },
	/**
	 * Prophet of Water.
	 */
	SmallPlaceableProp20: { name: "small_placeable_prop", id: "1229121247452069909" },
	/**
	 * Tournament Skyball Set.
	 */
	SmallPlaceableProp21: { name: "small_placeable_prop", id: "1229121713837441155" },
	/**
	 * Remembrance Guide (non-ultimate 1).
	 */
	SmallPlaceableProp22: { name: "small_placeable_prop", id: "1229122368467894434" },
	/**
	 * Remembrance Guide (non-ultimate 4).
	 */
	SmallPlaceableProp23: { name: "small_placeable_prop", id: "1193627425913978980" },
	/**
	 * Remembrance Guide (non-ultimate 5).
	 */
	SmallPlaceableProp24: { name: "small_placeable_prop", id: "1193627429890170891" },
	/**
	 * Days of Bloom 2023.
	 */
	SmallPlaceableProp25: { name: "small_placeable_prop", id: "1193627438576578631" },
	/**
	 * Passage Guide (non-ultimate).
	 */
	SmallPlaceableProp26: { name: "small_placeable_prop", id: "1193627441969766521" },
	/**
	 * Nature Sonorous Seashell.
	 */
	SmallPlaceableProp27: { name: "small_placeable_prop", id: "1193627444398272573" },
	/**
	 * Jolly Geologist.
	 */
	SmallPlaceableProp28: { name: "small_placeable_prop", id: "1193627448466735174" },
	/**
	 * Fourth Sky Anniversary 1.
	 */
	SmallPlaceableProp29: { name: "small_placeable_prop", id: "1193627450710691840" },
	/**
	 * Anniversary Plush.
	 */
	SmallPlaceableProp30: { name: "small_placeable_prop", id: "1193627458075902113" },
	/**
	 * Prophet of Fire 2.
	 */
	SmallPlaceableProp31: { name: "small_placeable_prop", id: "1193627460726685887" },
	/**
	 * Sunlight Surfboard.
	 */
	SmallPlaceableProp32: { name: "small_placeable_prop", id: "1193627463683674252" },
	/**
	 * Days of Feast 2023.
	 */
	SmallPlaceableProp33: { name: "small_placeable_prop", id: "1193627466099597362" },
	/**
	 * Herb Gatherer.
	 */
	SmallPlaceableProp34: { name: "small_placeable_prop", id: "1195931438311297116" },
	/**
	 * Love Heart Plushie.
	 */
	SmallPlaceableProp35: { name: "small_placeable_prop", id: "1206357740969271346" },
	/**
	 * Companion Cube.
	 */
	SmallPlaceableProp36: { name: "small_placeable_prop", id: "1229130190471303168" },
	/**
	 * Nesting Guide (ultimate).
	 */
	SmallPlaceableProp37: { name: "small_placeable_prop", id: "1229166023085789327" },
	/**
	 * Nesting Solarium.
	 */
	SmallPlaceableProp38: { name: "small_placeable_prop", id: "1229167913760718898" },
	/**
	 * Nesting Loft.
	 */
	SmallPlaceableProp39: { name: "small_placeable_prop", id: "1229194292606795837" },
	/**
	 * Nesting Atrium.
	 */
	SmallPlaceableProp40: { name: "small_placeable_prop", id: "1229196348130197514" },
	/**
	 * Nesting Nook 1.
	 */
	SmallPlaceableProp41: { name: "small_placeable_prop", id: "1229203138376892416" },
	/**
	 * Nesting Nook 2.
	 */
	SmallPlaceableProp42: { name: "small_placeable_prop", id: "1229204140949766196" },
	/**
	 * Decor pillow one colour.
	 */
	SmallPlaceableProp43: { name: "small_placeable_prop", id: "1233436049074556939" },
	/**
	 * Cinnamoroll Pop-Up Cafe Plushie.
	 */
	SmallPlaceableProp44: { name: "small_placeable_prop", id: "1234057273685442580" },
	/**
	 * Decor pillow two colours.
	 */
	SmallPlaceableProp45: { name: "small_placeable_prop", id: "1235001418545365084" },
	/**
	 * Small solid rug.
	 */
	SmallPlaceableProp46: { name: "small_placeable_prop", id: "1235001431485055027" },
	/**
	 * Small stripes rug.
	 */
	SmallPlaceableProp47: { name: "small_placeable_prop", id: "1236939389314142309" },
	/**
	 * Decor folded cloth.
	 */
	SmallPlaceableProp48: { name: "small_placeable_prop", id: "1236939401905438810" },
	/**
	 * Small classic rug.
	 */
	SmallPlaceableProp49: { name: "small_placeable_prop", id: "1241733518590083162" },
	/**
	 * Stone wall sconce.
	 */
	SmallPlaceableProp50: { name: "small_placeable_prop", id: "1242014833411358802" },
	/**
	 * Small half circle rug.
	 */
	SmallPlaceableProp51: { name: "small_placeable_prop", id: "1242017469405859922" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type SmallPlaceablePropsEmojis =
	(typeof SMALL_PLACEABLE_PROPS_EMOJIS)[keyof typeof SMALL_PLACEABLE_PROPS_EMOJIS];

export type Emoji =
	| MiscellaneousEmojis
	| EmotesEmojis
	| StancesEmojis
	| CallsEmojis
	| FriendActionsEmojis
	| SeasonEmojis
	| EventEmojis
	| OutfitEmojis
	| ShoeEmojis
	| MaskEmojis
	| FaceAccessoryEmojis
	| NecklaceEmojis
	| HairEmojis
	| HairAccessoryEmojis
	| CapeEmojis
	| HeldPropsEmojis
	| LargePlaceablePropsEmojis
	| SmallPlaceablePropsEmojis;

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
