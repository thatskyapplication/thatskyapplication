import { SeasonName } from "../Structures/Season.js";
import { Realm } from "../Utility/Constants.js";

export default {
	general: {
		realms: {
			[Realm.IslesOfDawn]: "Đảo Bình Minh",
			[Realm.DaylightPrairie]: "Thảo Nguyên Ánh Sáng",
			[Realm.HiddenForest]: "Rừng Mưa",
			[Realm.ValleyOfTriumph]: "Thung Lũng Vinh Quang",
			[Realm.GoldenWasteland]: "Hoang Mạc Hoàng Kim",
			[Realm.VaultOfKnowledge]: "Kho Tri Thức",
			[Realm.EyeOfEden]: "Mắt Địa Đàng",
		},
		seasons: {
			[SeasonName.Gratitude]: "Mùa Tri Ân",
			[SeasonName.Lightseekers]: "Mùa Ánh Sáng",
			[SeasonName.Belonging]: "Mùa Sở Hữu",
			[SeasonName.Rhythm]: "Mùa Nhịp Điệu",
			[SeasonName.Enchantment]: "Mùa Phép Thuật",
			[SeasonName.Sanctuary]: "Mùa Thánh Đảo",
			[SeasonName.Prophecy]: "Mùa Tiên Tri",
			[SeasonName.Dreams]: "Mùa Giấc Mơ",
			[SeasonName.Assembly]: "Mùa Tụ Hội",
			[SeasonName.LittlePrince]: "Mùa Hoàng Tử Bé",
			[SeasonName.Flight]: "Mùa Bay Lượn",
			[SeasonName.Abyss]: "Mùa Vực Sâu",
			[SeasonName.Performance]: "Mùa Biểu Diễn",
			[SeasonName.Shattering]: "Mùa Tan Vỡ",
			[SeasonName.Aurora]: "Mùa AURORA",
			[SeasonName.Remembrance]: "Mùa Tưởng Nhớ",
			[SeasonName.Passage]: "Mùa Thử Thách",
			[SeasonName.Moments]: "Mùa Khoảnh Khắc",
			[SeasonName.Revival]: "Mùa Phục Hưng",
			[SeasonName.NineColoredDeer]: "Mùa Cửu Sắc Lộc",
		},
	},
} as const;
