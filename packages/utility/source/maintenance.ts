import { skyDate } from "./dates.js";

export const MAINTENANCE_PERIODS = [
	// 2019 Limited Live transition to global launch. Announced as starting “as early as” 11:30 and
	// lasting “up to” eight hours.
	// https://discord.com/channels/575762611111592007/575768778789617674/600420311065821193
	{
		start: skyDate(2019, 7, 16, 11, 30),
		end: skyDate(2019, 7, 16, 19, 30),
	},
	// 2020.
	// https://discord.com/channels/575762611111592007/575768778789617674/694336917243691058
	// https://www.reddit.com/r/SkyGame/comments/fs3p4b/maintenance_notice_to_prepare_for_android_we_will/
	{
		start: skyDate(2020, 3, 31, 15),
		end: skyDate(2020, 3, 31, 15, 30),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/725869169744281613
	// https://thatgamecompany.helpshift.com/a/sky-children-of-the-light/?s=news-events&f=server-maintenance-june-26-15-30-pdt-utc-7
	{
		start: skyDate(2020, 6, 26, 15, 30),
		end: skyDate(2020, 6, 26, 16),
	},
	// 2021.
	// https://discord.com/channels/575762611111592007/575768778789617674/804134882636726282
	// https://discord.com/channels/575762611111592007/575768778789617674/804850565501812766
	{
		start: skyDate(2021, 1, 29, 15),
		end: skyDate(2021, 1, 29, 15, 30),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/809925670955253830
	// https://thatgamecompany.helpshift.com/a/sky-children-of-the-light/?s=news-events&f=server-maintenance-february-16-14-00-pst-utc-8
	{
		start: skyDate(2021, 2, 16, 14),
		end: skyDate(2021, 2, 16, 18),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/825102209506738226
	// https://www.reddit.com/r/SkyGame/comments/mdxpm6/tgc_will_be_performing_some_brief_scheduled/
	{
		start: skyDate(2021, 3, 26, 15),
		end: skyDate(2021, 3, 26, 15, 10),
	},
	// TGC's completion notice says the downtime was extended but does not give a revised end; this
	// retains the announced two-hour estimate.
	// https://discord.com/channels/575762611111592007/575768778789617674/855124322053783643
	// https://discord.com/channels/575762611111592007/575768778789617674/855268220139339786
	// https://www.reddit.com/r/SkyGame/comments/o253gk/tgc_will_be_performing_scheduled_maintenance/
	{
		start: skyDate(2021, 6, 17, 16),
		end: skyDate(2021, 6, 17, 18),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/857016578515402813
	// https://www.reddit.com/r/SkyGame/comments/o6glce/to_prep_for_skys_launch_on_nintendo_switch/
	{
		start: skyDate(2021, 6, 23, 15),
		end: skyDate(2021, 6, 23, 16),
	},
	// 2022.
	// TGC announced an extension but no revised end; this retains the announced 20:00 target.
	// https://discord.com/channels/575762611111592007/575768778789617674/946146167056646204
	// https://discord.com/channels/575762611111592007/575768778789617674/946619936833429524
	// https://discord.com/channels/575762611111592007/575768778789617674/946634454087114752
	// https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/879-patch-notes---february-24-2022---0-16-5-185312-ios-android-185258-switch/
	{
		start: skyDate(2022, 2, 24, 15),
		end: skyDate(2022, 2, 24, 20),
	},
	// TGC announced that maintenance was taking longer but no revised end; this retains the announced
	// 20:00 target.
	// https://discord.com/channels/575762611111592007/575768778789617674/958455932285763726
	// https://discord.com/channels/575762611111592007/575768778789617674/959282201650954251
	// https://discord.com/channels/575762611111592007/575768778789617674/959327547911454731
	{
		start: skyDate(2022, 3, 31, 15),
		end: skyDate(2022, 3, 31, 20),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/976128483229044776
	// https://www.reddit.com/r/SkyGame/comments/urcs6r/in_order_to_prepare_for_the_release_of_0175_skys/
	{
		start: skyDate(2022, 5, 17, 17, 30),
		end: skyDate(2022, 5, 17, 20, 30),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/1007718567749357568
	{
		start: skyDate(2022, 8, 16, 16),
		end: skyDate(2022, 8, 16, 18),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/1024829423813394574
	{
		start: skyDate(2022, 9, 29, 12, 30),
		end: skyDate(2022, 9, 29, 13, 30),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/1042632793953419274
	// https://www.reddit.com/r/SkyGame/comments/yy3pod/scheduled_maintenance_will_start_in_30_minutes_at/
	{
		start: skyDate(2022, 11, 17, 15),
		end: skyDate(2022, 11, 17, 18),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/1048380604879732766
	{
		start: skyDate(2022, 12, 5, 6),
		end: skyDate(2022, 12, 5, 8),
	},
	// 2023.
	// https://discord.com/channels/575762611111592007/575768778789617674/1072681340438335498
	// https://www.reddit.com/r/SkyGame/comments/10wj2v7/server_maintenance_scheduled_february_8th_2023/
	{
		start: skyDate(2023, 2, 8, 8, 30),
		end: skyDate(2023, 2, 8, 10),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/1126632338349109308
	// https://discord.com/channels/575762611111592007/575768778789617674/1129187640541970472
	{
		start: skyDate(2023, 7, 13, 10),
		end: skyDate(2023, 7, 13, 18),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/1143320538253643887
	{
		start: skyDate(2023, 8, 22, 13),
		end: skyDate(2023, 8, 22, 14),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/1179854601000845442
	{
		start: skyDate(2023, 12, 5, 15),
		end: skyDate(2023, 12, 5, 19),
	},
	// 2024.
	// https://discord.com/channels/575762611111592007/575768778789617674/1228372472030695444
	{
		start: skyDate(2024, 4, 12, 15),
		end: skyDate(2024, 4, 12, 16),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/1229925725369532517
	{
		start: skyDate(2024, 4, 17, 15),
		end: skyDate(2024, 4, 17, 16),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/1234687080408547438
	{
		start: skyDate(2024, 4, 30, 12),
		end: skyDate(2024, 4, 30, 15),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/1244365468853207062
	{
		start: skyDate(2024, 5, 28, 12),
		end: skyDate(2024, 5, 28, 13),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/1300628259335311444
	{
		start: skyDate(2024, 10, 29, 14),
		end: skyDate(2024, 10, 29, 15),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/1303141273514807406
	{
		start: skyDate(2024, 11, 6, 13),
		end: skyDate(2024, 11, 6, 14),
	},
	// 2025.
	// The first Discord announcement originally gave an 11:00 start and a three-hour estimate. It was
	// later edited to give an 18:00 end; the second Discord announcement extends it to midnight.
	// https://discord.com/channels/575762611111592007/575768778789617674/1333872468225429587
	// https://discord.com/channels/575762611111592007/575768778789617674/1333973073103425577
	// https://www.reddit.com/r/SkyGame/comments/1ic95u6/server_maintenance_notice/
	{
		start: skyDate(2025, 1, 28, 11),
		end: skyDate(2025, 1, 29),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/1341964954990805052
	{
		start: skyDate(2025, 2, 20, 19),
		end: skyDate(2025, 2, 20, 21),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/1341964954990805052
	{
		start: skyDate(2025, 2, 24, 19),
		end: skyDate(2025, 2, 24, 21),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/1344098303733665972
	{
		start: skyDate(2025, 2, 26, 19),
		end: skyDate(2025, 2, 26, 21),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/1348813504391544974
	// https://discord.com/channels/575762611111592007/575768778789617674/1349450010005344327
	{
		start: skyDate(2025, 3, 12, 11),
		end: skyDate(2025, 3, 12, 13),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/1350324069613961322
	// https://discord.com/channels/575762611111592007/575768778789617674/1351373413272391781
	{
		start: skyDate(2025, 3, 17, 19),
		end: skyDate(2025, 3, 17, 21),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/1354615714882785412
	{
		start: skyDate(2025, 3, 27, 11),
		end: skyDate(2025, 3, 27, 15),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/1361446981804757305
	{
		start: skyDate(2025, 4, 15, 12),
		end: skyDate(2025, 4, 15, 14),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/1389424348095578184
	{
		start: skyDate(2025, 7, 2, 11),
		end: skyDate(2025, 7, 2, 15),
	},
	// 2026.
	// https://discord.com/channels/575762611111592007/575768778789617674/1472025726244098163
	// https://steamcommunity.com/games/2325290/announcements/detail/603055190765994082
	{
		start: skyDate(2026, 2, 18, 11),
		end: skyDate(2026, 2, 18, 15),
	},
	// https://discord.com/channels/575762611111592007/575768778789617674/1490803314898505729
	// https://steamcommunity.com/games/2325290/announcements/detail/502854353360521345
	{
		start: skyDate(2026, 4, 8, 13),
		end: skyDate(2026, 4, 8, 14),
	},
] as const;
