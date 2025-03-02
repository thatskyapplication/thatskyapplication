import {
	Cosmetic,
	RealmName,
	SpiritCall,
	SpiritId,
	StandardSpirit,
} from "@thatskyapplication/utility";

const call = SpiritCall.Bird;

export default new StandardSpirit({
	id: SpiritId.BirdWhisperer,
	call,
	realm: RealmName.DaylightPrairie,
	offer: {
		current: [
			{ name: `${call} call`, cosmetic: Cosmetic.CallBird },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.BirdWhispererMusicSheet,
				cost: { hearts: 1 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BirdWhispererBlessing1,
				cost: { candles: 1 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.BirdWhispererHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.BirdWhispererWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.BirdWhispererBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.BirdWhispererHair,
				cost: { hearts: 5 },
			},
		],
	},
});
