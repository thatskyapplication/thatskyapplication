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
	Outfit1: { name: "outfit", id: "1181712845830901811" },
	Outfit2: { name: "outfit", id: "1181712849488330793" },
	Outfit3: { name: "outfit", id: "1181712852676001793" },
	Outfit4: { name: "outfit", id: "1181712855410671627" },
	Outfit5: { name: "outfit", id: "1181712859013586984" },
	Outfit6: { name: "outfit", id: "1181712862104789014" },
	Outfit7: { name: "outfit", id: "1181712865716092928" },
	Outfit8: { name: "outfit", id: "1181712869147017359" },
	Outfit9: { name: "outfit", id: "1181712872439566466" },
	Outfit10: { name: "outfit", id: "1181712875119714446" },
	Outfit11: { name: "outfit", id: "1181712878101872791" },
	Outfit12: { name: "outfit", id: "1181712881243402331" },
	Outfit13: { name: "outfit", id: "1181712884267503717" },
	Outfit14: { name: "outfit", id: "1181712887643910284" },
	Outfit15: { name: "outfit", id: "1181712890584125500" },
	Outfit16: { name: "outfit", id: "1181712893763395634" },
	Outfit17: { name: "outfit", id: "1181712896951079033" },
	Outfit18: { name: "outfit", id: "1181712900725944320" },
	Outfit19: { name: "outfit", id: "1181712903179616318" },
	Outfit20: { name: "outfit", id: "1181712906388262973" },
	Outfit21: { name: "outfit", id: "1181712909374586972" },
	Outfit22: { name: "outfit", id: "1181712912948138055" },
	Outfit23: { name: "outfit", id: "1181712916572029119" },
	Outfit24: { name: "outfit", id: "1181712919956828311" },
	Outfit25: { name: "outfit", id: "1181712923001884716" },
	Outfit26: { name: "outfit", id: "1181712926525104238" },
	Outfit27: { name: "outfit", id: "1181712929381429248" },
	Outfit28: { name: "outfit", id: "1181712932304863355" },
	Outfit29: { name: "outfit", id: "1181712935257653360" },
	Outfit30: { name: "outfit", id: "1181712938105585745" },
	Outfit31: { name: "outfit", id: "1181712941117095976" },
	Outfit32: { name: "outfit", id: "1181712944527060992" },
	Outfit33: { name: "outfit", id: "1181712947148501003" },
	Outfit34: { name: "outfit", id: "1181712950139039805" },
	Outfit35: { name: "outfit", id: "1181712953536421958" },
	Outfit36: { name: "outfit", id: "1181712956711510016" },
	Outfit37: { name: "outfit", id: "1181712959601377310" },
	Outfit38: { name: "outfit", id: "1181712962893914153" },
	Outfit39: { name: "outfit", id: "1181712965607637123" },
	Outfit40: { name: "outfit", id: "1181712968245850236" },
	Outfit41: { name: "outfit", id: "1181712971127337011" },
	Outfit42: { name: "outfit", id: "1181712973908168787" },
	Outfit43: { name: "outfit", id: "1181712977167138936" },
	Outfit44: { name: "outfit", id: "1181712980254150750" },
	Outfit45: { name: "outfit", id: "1181712983882203166" },
	Outfit46: { name: "outfit", id: "1181712986801447004" },
	Outfit47: { name: "outfit", id: "1181712990177874021" },
	Outfit48: { name: "outfit", id: "1181712994212790352" },
	Outfit49: { name: "outfit", id: "1181712996762923018" },
	Outfit50: { name: "outfit", id: "1181712999388565544" },
	Outfit51: { name: "outfit", id: "1181716521479847966" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type OutfitEmojis = (typeof OUTFIT_EMOJIS)[keyof typeof OUTFIT_EMOJIS];

/**
 * Emojis from the shoes server.
 */
export const SHOE_EMOJIS = {
	Shoe1: { name: "shoe", id: "1181741591799537774" },
	Shoe2: { name: "shoe", id: "1181741593175281755" },
	Shoe3: { name: "shoe", id: "1181741595519881236" },
	Shoe4: { name: "shoe", id: "1181741598187475055" },
	Shoe5: { name: "shoe", id: "1181741600855035964" },
	Shoe6: { name: "shoe", id: "1181741602935418943" },
	Shoe7: { name: "shoe", id: "1181741604889960549" },
	Shoe8: { name: "shoe", id: "1181741607570128966" },
	Shoe9: { name: "shoe", id: "1181741610074124319" },
	Shoe10: { name: "shoe", id: "1181741612766863472" },
	Shoe11: { name: "shoe", id: "1181741615564476437" },
	Shoe12: { name: "shoe", id: "1181741618454351993" },
} as const satisfies Readonly<Record<string, EmojiData>>;

export type ShoeEmojis = (typeof SHOE_EMOJIS)[keyof typeof SHOE_EMOJIS];

export type Emoji =
	| MiscellaneousEmojis
	| EmotesEmojis
	| StancesEmojis
	| CallsEmojis
	| FriendActionsEmojis
	| SeasonEmojis
	| OutfitEmojis
	| ShoeEmojis;

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
