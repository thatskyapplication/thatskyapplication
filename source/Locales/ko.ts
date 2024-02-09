import { SeasonName } from "../Structures/Season.js";
import { Realm } from "../Utility/Constants.js";

export default {
	general: {
		realms: {
			[Realm.IslesOfDawn]: "여명의 섬",
			[Realm.DaylightPrairie]: "햇빛 초원",
			[Realm.HiddenForest]: "비밀의 숲",
			[Realm.ValleyOfTriumph]: "승리의 계곡",
			[Realm.GoldenWasteland]: "황금 황무지",
			[Realm.VaultOfKnowledge]: "지식의 도서관",
			[Realm.EyeOfEden]: "에덴의 눈",
		},
		seasons: {
			[SeasonName.Gratitude]: "감사의 시즌",
			[SeasonName.Lightseekers]: "빛 추적자의 시즌",
			[SeasonName.Belonging]: "친밀의 시즌",
			[SeasonName.Rhythm]: "리듬의 시즌",
			[SeasonName.Enchantment]: "마법의 시즌",
			[SeasonName.Sanctuary]: "낙원의 시즌",
			[SeasonName.Prophecy]: "예언의 시즌",
			[SeasonName.Dreams]: "꿈의 시즌",
			[SeasonName.Assembly]: "협력의 시즌",
			[SeasonName.LittlePrince]: "어린 왕자의 시즌",
			[SeasonName.Flight]: "비행의 시즌",
			[SeasonName.Abyss]: "심해의 시즌",
			[SeasonName.Performance]: "공연의 시즌",
			[SeasonName.Shattering]: "파편의 시즌",
			[SeasonName.Aurora]: "AURORA의 시즌",
			[SeasonName.Remembrance]: "기억의 시즌",
			[SeasonName.Passage]: "성장의 시즌",
			[SeasonName.Moments]: "순간의 시즌",
			[SeasonName.Revival]: "재생의 시즌",
			[SeasonName.NineColoredDeer]: "아홉 빛깔 사슴의 시즌",
		},
	},
} as const;
