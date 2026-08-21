export type ISODate = `${number}-${number}-${number}`;
export type PatchNoteIdentifier = `p${string}`;
export type HTTPSURL = `https://${string}`;

export interface PatchNote {
	readonly aliases?: readonly PatchNoteIdentifier[];
	readonly date: ISODate;
	readonly identifier?: PatchNoteIdentifier;
	readonly url?: HTTPSURL;
}

export interface PublishedPatchNote extends PatchNote {
	readonly identifier: PatchNoteIdentifier;
	readonly url: HTTPSURL;
}

export const PATCH_NOTES: readonly PatchNote[] = [
	{
		date: "2020-01-22",
		identifier: "p080",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/601-patch-notes---january-22-2020---0-8-0-145484",
	},
	{
		date: "2020-01-30",
		identifier: "p081",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/607-hot-fix---january-30-2020---0-8-1-145776",
	},
	{
		date: "2020-02-10",
		identifier: "p082",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/608-patch-notes---february-10-2020---0-8-2-146150",
	},
	{
		date: "2020-02-13",
		identifier: "p083",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/616-hot-fix---february-13-2020---0-8-3-146282",
	},
	{
		date: "2020-03-09",
		identifier: "p084",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/626-patch-notes---march-9-2020---0-8-4-146956",
	},
	{
		date: "2020-03-27",
		identifier: "p085",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/634-hot-fix---march-27-2020---0-8-5-147664",
	},
	{
		date: "2020-04-06",
		identifier: "p090",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/640-patch-notes---april-6-2020---0-9-0-148324-1586220907",
	},
	{
		date: "2020-04-13",
		identifier: "p091",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/642-patch-notes---april-13-2020---0-9-1-148621-ios-148626-android",
	},
	{
		date: "2020-05-14",
		identifier: "p092",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/664-patch-notes---may-14-2020---0-9-2-149422",
	},
	{
		date: "2020-05-15",
		identifier: "p093",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/665-hot-fix---may-15-2020---0-9-3-149545",
	},
	{
		aliases: ["p094-1"],
		date: "2020-05-19",
		identifier: "p094",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/668-hot-fix---may-19-2020---0-9-4-149601",
	},
	{
		date: "2020-05-19",
		identifier: "p094-2",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/670-android-hot-fix---may-19-2020---0-9-4-149650",
	},
	{
		date: "2020-06-08",
		identifier: "p095",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/677-patch-notes---june-8-2020---0-9-5-150178",
	},
	{
		date: "2020-06-15",
		identifier: "p096",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/682-hot-fix---june-15-2020---0-9-6-150514",
	},
	{
		date: "2020-06-18",
		identifier: "p097",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/686-hot-fix---june-18-2020---0-9-7-150719",
	},
	{
		date: "2020-07-06",
		identifier: "p0100",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/692-patch-notes---july-6-2020---0-10-0-151406",
	},
	{
		date: "2020-07-10",
		identifier: "p0101",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/698-hot-fix---july-10-2020---0-10-1-151555",
	},
	{
		date: "2020-08-03",
		identifier: "p0102",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/701-patch-notes---august-3-2020---0-10-2-152154",
	},
	{
		date: "2020-08-18",
		identifier: "p0103",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/708-hot-fix---august-18-2020---0-10-3-152748",
	},
	{
		date: "2020-08-26",
		identifier: "p0104",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/709-hot-fix---august-26-2020---0-10-4-153215",
	},
	{
		date: "2020-09-07",
		identifier: "p0105",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/712-patch-notes---september-7-2020---0-10-5-153939",
	},
	{
		date: "2020-10-02",
		identifier: "p0110",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/718-patch-notes---october-2-2020---0-11-0-155436",
	},
	{
		date: "2020-10-09",
		identifier: "p0111",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/722-hot-fix---october-9-2020---0-11-1-155668",
	},
	{
		date: "2020-11-02",
		identifier: "p0112",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/729-patch-notes---november-2-2020---0-11-2-156351",
	},
	{
		date: "2020-11-24",
		identifier: "p0114",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/732-patch-notes---november-24-2020---0-11-4-157539",
	},
	{
		date: "2020-12-15",
		identifier: "p0120",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/745-patch-notes---december-15-2020---0-12-0-159154",
	},
	{
		date: "2020-12-21",
		identifier: "p0121",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/748-patch-notes---december-21-2020---0-12-1-159536",
	},
	{
		date: "2021-01-19",
		identifier: "p0122",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/756-hot-fix---january-19-2021---0-12-2-160278",
	},
	{
		date: "2021-02-06",
		identifier: "p0123",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/761-patch-notes---february-6-2021---0-12-3-161422",
	},
	{
		date: "2021-03-16",
		identifier: "p0130",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/771-patch-notes---march-16-2021---0-13-0-163755",
	},
	{
		date: "2021-04-01",
		identifier: "p0132",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/776-patch-notes---april-1-2021---0-13-2-164898",
	},
	{
		date: "2021-04-15",
		identifier: "p0133",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/784-patch-notes---april-15-2021---0-13-3-165938",
	},
	{
		date: "2021-05-27",
		identifier: "p0134",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/795-patch-notes---may-27-2021---0-13-4-169938",
	},
	{
		date: "2021-06-04",
		identifier: "p0135",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/799-hot-fix---june-4-2021---0-13-5-170905",
	},
	{
		date: "2021-06-29",
		identifier: "p0140",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/809-patch-notes---june-29-2021---0-14-0-171755",
	},
	{
		date: "2021-08-10",
		identifier: "p0145",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/828-patch-notes---august-10-2021---0-14-5-174224",
	},
	{
		date: "2021-09-28",
		identifier: "p0150",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/841-patch-notes---september-28-2021---0-15-0-176984-ios-switch-177511-android",
	},
	{
		date: "2021-10-07",
		identifier: "p0151",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/844-hotfix---october-7-2021---0-15-1-177948-ios-177980-android",
	},
	{
		date: "2021-11-18",
		identifier: "p0155",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/857-patch-notes---november-18-2021---0-15-5-179535-ios-179644-android-179482-switch-1637266164",
	},
	{
		date: "2022-01-13",
		identifier: "p0160",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/866-patch-notes---january-13-2022---0-16-0-182597",
	},
	{
		date: "2022-01-26",
		identifier: "p0161",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/872-hotfix---january-26-2022---0-16-1-183878-ios-android",
	},
	{
		aliases: ["p0165-1"],
		date: "2022-02-24",
		identifier: "p0165",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/879-patch-notes---february-24-2022---0-16-5-185312-ios-android-185258-switch",
	},
	{
		date: "2022-03-04",
		identifier: "p0165-2",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/885-hotfix--march-4-2022---0-16-5-186434-android",
	},
	{
		date: "2022-03-15",
		identifier: "p0165-3",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/886-hotfix--march-15-2022---0-16-5-187218-android",
	},
	{
		date: "2022-04-05",
		identifier: "p0170",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/890-patch-notes---april-5-2022---0-17-0-187527",
	},
	{
		aliases: ["p0171-1"],
		date: "2022-04-08",
		identifier: "p0171",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/893-hotfix---april-8-2022---0-17-1-188605-ios-android",
	},
	{
		date: "2022-04-10",
		identifier: "p0171-2",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/894-hotfix---april-10-2022---0-17-1-188605-huawei",
	},
	{
		date: "2022-04-15",
		identifier: "p0171-3",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/896-hotfix---april-15-2022---0-17-1-189403-android-huawei",
	},
	{
		aliases: ["p0175-1"],
		date: "2022-05-17",
		identifier: "p0175",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/904-patch-notes---may-17-2022---0-17-5-191024",
	},
	{
		date: "2022-05-19",
		identifier: "p0175-2",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/907-hotfix---may-19-2022---0-17-5-192395-android",
	},
	{
		date: "2022-05-27",
		identifier: "p0176",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/908-hotfix---may-27-2022---0-17-6-192876-ios",
	},
	{
		date: "2022-06-28",
		identifier: "p0180",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/909-patch-notes---june-28-2022---0-18-0-194258-ios-switch-194411-android-huawei",
	},
	{
		date: "2022-07-18",
		identifier: "p0181",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/926-hotfix---july-18-2022---0-18-1-196112-ios-android-huawei",
	},
	{
		date: "2022-08-17",
		identifier: "p0185",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/938-patch-notes---august-17-2022---0-18-5-198405-ios-199070-android-198186-huawei-197821-switch",
	},
	{
		aliases: ["p0186-1"],
		date: "2022-08-25",
		identifier: "p0186",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/940-hotfix---august-25-2022---0-18-6-199070",
	},
	{
		date: "2022-08-31",
		identifier: "p0186-2",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/941-hotfix---august-31-2022---0-18-6-android-199846",
	},
	{
		date: "2022-10-13",
		identifier: "p0190",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/952-patch-notes---october-13-2022---0-19-0-202986-android-huawei-ios-202613-switch",
	},
	{
		date: "2022-10-24",
		identifier: "p0191",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/957-hotfix---october-24-2022---0-19-1-204815-ios-android-huawei",
	},
	{
		date: "2022-11-28",
		identifier: "p0195",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/968-patch-notes---november-28-2022---0-19-5-206971-android-huawei-ios-206872-switch",
	},
	{
		date: "2022-12-06",
		identifier: "p0196",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1092-patch-notes---december-6-2022---0-19-6-207940-android-huawei-ios-207610-playstation-switch",
	},
	{
		date: "2023-01-10",
		identifier: "p0200",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1096-patch-notes---january-10-2023---0-20-0-209628-android-huawei-ios-209693-playstation-209642-switch",
	},
	{
		date: "2023-01-30",
		identifier: "p0201",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1098-hotfix---january-30-2023---0-20-1-210508-android-huawei-ios-playstation-switch",
	},
	{
		date: "2023-02-23",
		identifier: "p0205",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1106-patch-notes---february-23-2023---0-20-5-212649-android-huawei-ios-212499-playstation-212437-switch",
	},
	{
		aliases: ["p0206-1"],
		date: "2023-02-24",
		identifier: "p0206",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1108-hotfix---february-24-2023---0-20-6-212931-playstation",
	},
	{
		date: "2023-03-01",
		identifier: "p0206-2",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1110-hotfix---march-1-2023---0-20-6-212931-switch",
	},
	{
		date: "2023-04-13",
		identifier: "p0210",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1111-patch-notes---april-13-2023---0-21-0-215710",
	},
	{
		date: "2023-04-20",
		identifier: "p0211",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1113-hotfix---april-20-2023---0-21-1-217644",
	},
	{
		date: "2023-05-31",
		identifier: "p0215",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1117-patch-notes---may-31-2023---0-21-5-220352-android-huawei-ios-220790-playstation-220045-switch",
	},
	{
		date: "2023-06-26",
		identifier: "p0216",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1121-hotfix---june-26-2023---0-21-6-222658",
	},
	{
		date: "2023-07-13",
		identifier: "p0220",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1124-patch-notes---july-13-2023---0-22-0-224940-android-huawei-ios-224646-playstation-224799-switch",
	},
	{
		date: "2023-07-31",
		identifier: "p0221",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1130-hotfix---july-31-2023---0-22-1-226982-android-huawei-ios",
	},
	{
		date: "2023-08-17",
		identifier: "p0225",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1135-patch-notes---august-17-2023---0-22-5-228393-android-huawei-ios-playstation-228039-switch",
	},
	{
		aliases: ["p0226-1"],
		date: "2023-08-22",
		identifier: "p0226",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1137-hotfix---august-22-2023---0-22-6-229119-android-huawei-ios-ps4",
	},
	{
		date: "2023-08-24",
		identifier: "p0227",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1140-hotfix---august-24-2023---0-22-7-229342-android-huawei-ios-ps4",
	},
	{
		date: "2023-08-30",
		identifier: "p0226-2",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1142-hotfix---august-30-2023---0-22-6-229198-nintendo-switch",
	},
	{
		date: "2023-10-12",
		identifier: "p0230",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1239-patch-notes---october-12-2023---0-23-0-232737-android-ios-huawei-232287-ps4-switch",
	},
	{
		date: "2023-10-26",
		identifier: "p0231",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1254-hotfix---october-26-2023---0-23-1-234919-android-huawei-ios-playstation",
	},
	{
		date: "2023-11-09",
		identifier: "p0234",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1255-patch-notes---november-9-2023---0-23-4-235583-android-huawei-ios-playstation-switch",
	},
	{
		date: "2023-12-11",
		identifier: "p0235",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1259-patch-notes---december-11-2023---0-23-5-238437-android-huawei-ios-switch-238018-playstation",
	},
	{
		date: "2023-12-15",
		identifier: "p0236",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1260-hotfix---december-15-2023---0-23-6-240400-android-huawei-ios-playstation",
	},
	{
		date: "2024-01-11",
		identifier: "p0240",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1264-patch-notes---january-11-2024---0-24-0-240551-ios-playstation-switch-241911-android-huawei",
	},
	{
		date: "2024-01-18",
		identifier: "p0241",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1265-hotfix---january-18-2024---0-24-1-242930-android",
	},
	{
		date: "2024-01-30",
		identifier: "p0242",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1267-hotfix---january-30-2024---0-24-2-243292-android-huawei-ios-243309-playstation-switch",
	},
	{
		date: "2024-02-08",
		identifier: "p0243",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1269-hotfix---february-8-2024---0-24-3-246164-android",
	},
	{
		date: "2024-02-11",
		identifier: "p0244",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1276-hotfix---february-11-2024---0-24-4-246730-android",
	},
	{
		date: "2024-02-22",
		identifier: "p0245",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1278-patch-notes---february-22-2024---0-24-5-246913-android-huawei-ios-playstation-switch",
	},
	{
		date: "2024-03-07",
		identifier: "p0246",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1281-hotfix---march-7-2024---0-24-6-250008-android-huawei-ios-switch-250016-playstation",
	},
	{
		date: "2024-03-10",
		identifier: "p0247",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1282-hotfix---march-10-2024---0-24-7-251245-android",
	},
	{
		date: "2024-03-22",
		identifier: "p0248",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1286-hotfix---march-22-2024---0-24-8-253326-android-253000-huawei-ios-switch-253022-playstation",
	},
	{
		date: "2024-04-10",
		identifier: "p0250",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1308-patch-notes---april-10-2024---0-25-0-257483-android-huawei-256148-ios-playstation-257607-pc-255731-switch",
	},
	{
		aliases: ["p0251-1"],
		date: "2024-04-19",
		identifier: "p0251",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1315-hotfix---april-19-2024---0-25-1-259849-android-huawei",
	},
	{
		date: "2024-04-25",
		identifier: "p0251-2",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1316-hotfix---april-25-2024---0-25-1-259707-switch-0-25-2-260837-android-huawei-260455-ios-pc-playstation",
	},
	{
		date: "2024-05-23",
		identifier: "p0255",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1323-patch-notes---may-23-2024---0-25-5-264243-android-huawei-ios-pc-playstation-switch",
	},
	{
		date: "2024-06-05",
		identifier: "p0256",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1324-hotfix---june-5-2024---0-25-6-268169-android",
	},
	{
		date: "2024-07-02",
		identifier: "p0260",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1330-patch-notes---july-2-2024---0-26-0-272243-android-huawei-ios-playstation-steam-272595-switch",
	},
	{
		date: "2024-07-11",
		identifier: "p0261",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1335-hotfix---july-11-2024---0-26-1-275000-android-huawei-ios-playstation-steam-switch",
	},
	{
		date: "2024-08-01",
		identifier: "p0262",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1337-hotfix---august-1-2024---0-26-2-278048-pc-steam",
	},
	{
		date: "2024-08-08",
		identifier: "p0263",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1342-hotfix---august-8-2024---0-26-3-279033-android-huawei-ios-playstation-steam-switch",
	},
	{
		date: "2024-08-22",
		identifier: "p0265",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1343-patch-notes---august-22-2024---0-26-5-280889-android-huawei-ios-steam-switch-282398-playstation",
	},
	{
		date: "2024-09-12",
		identifier: "p0266",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1352-hotfix---september-12-2024---0-26-6-286339-android-huawei-ios-steam-switch-286644-playstation",
	},
	{
		date: "2024-10-10",
		identifier: "p0270",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1356-patch-notes---october-10-2024---0-27-0-294170-android-huawei-292054-ios-playstation-steam-switch",
	},
	{
		date: "2024-10-24",
		identifier: "p0271",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1358-hotfix---october-24-2024---0-27-1-296174-android-huawei-ios-playstation-steam-switch",
	},
	{
		date: "2024-11-21",
		identifier: "p0275",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1362-patch-notes---november-21-2024---0-27-5-302936-android-huawei-ios-playstation-304181-steam-303477-switch",
	},
	{
		date: "2024-12-05",
		identifier: "p0276",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1365-hotfix---december-5-2024---0-27-6-305399-android-huawei-ios-304953-playstation-steam-switch",
	},
	{
		date: "2024-12-16",
		identifier: "p0277",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1369-hotfix---december-16-2024---0-27-7-306949-android-huawei-ios-pc-playstation-304953-switch",
	},
	{
		date: "2025-01-16",
		identifier: "p0280",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1374-patch-notes---january-16-2025---0-28-0-308028-android-huawei-ios-playstation-steam-switch",
	},
	{
		date: "2025-01-30",
		identifier: "p0281",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1377-hotfix---january-30-2025---0-28-1-310103-android-huawei-ios-steam-switch-310141-playstation",
	},
	{
		date: "2025-02-27",
		identifier: "p0285",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1381-patch-notes---february-27-2025---0-28-5-313329-android-huawei-ios-playstation-steam-switch",
	},
	{
		date: "2025-03-11",
		identifier: "p0286",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1382-hotfix---march-11-2025---0-28-6-315083-android-huawei-ios-steam-switch-315380-playstation",
	},
	{
		date: "2025-04-17",
		identifier: "p0290",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1391-patch-notes---april-17-2025---0-29-0-319554-android-huawei-ios-playstation-steam-switch",
	},
	{
		date: "2025-05-01",
		identifier: "p0291",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1394-hotfix---may-1-2025---0-29-1-321453-android-huawei-ios-steam-switch-321479-playstation",
	},
	{
		date: "2025-05-07",
		identifier: "p0292",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1397-hotfix---may-7-2025---0-29-2-323010-ios",
	},
	{
		date: "2025-05-29",
		identifier: "p0295",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1398-patch-notes---may-29-2025---0-29-5-325756-android-huawei-ios-playstation-steam-switch",
	},
	{
		date: "2025-06-12",
		identifier: "p0296",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1400-hotfix---june-12-2025---0-29-6-327779-android-huawei-ios-playstation-steam-327549-switch",
	},
	{
		date: "2025-06-26",
		identifier: "p0297",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1401-hotfix---june-26-2025---0-29-7-331457-ios",
	},
	{
		date: "2025-07-18",
		identifier: "p0300",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1404-patch-notes---july-18-2025---0-30-0-334880-android-huawei-ios-steam-334880-playstation-333946-switch",
	},
	{
		date: "2025-07-31",
		identifier: "p0301",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1407-hotfix---july-31-2025---0-30-1-338040-android-huawei-ios-playstation-steam-336673-switch",
	},
	{
		date: "2025-08-28",
		identifier: "p0305",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1410-patch-notes---august-28-2025---0-30-5-342290-android-huawei-ios-341589-playstation-steam-341718-switch",
	},
	{
		date: "2025-09-05",
		identifier: "p0306",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1411-hotfix---september-5-2025---0-30-6-343782-android-huawei-ios-playstation-steam",
	},
	{
		date: "2025-09-11",
		identifier: "p0307",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1412-hotfix---september-11-2025--0-30-7-343918-android-huawei-ios-playstation-switch-344584-steam",
	},
	{
		date: "2025-09-16",
		identifier: "p0308",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1413-hotfix---september-16-2025---0-30-8-345504-android-huawei-ios-playstation-steam",
	},
	{
		date: "2025-10-07",
		identifier: "p0309",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1418-hotfix-october-7-2025---0-30-9-349947-steam-349982-ios-350383-playstation-350089-android-huawei",
	},
	{
		aliases: ["p0310"],
		date: "2025-10-16",
		identifier: "p31",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1420-update-31-0---october-16-2025",
	},
	{
		date: "2025-10-28",
		identifier: "p0311",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1421-hotfix-31-1---october-28-2025",
	},
	{
		aliases: ["p0312-1"],
		date: "2025-10-29",
		identifier: "p0312",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1422-hotfix-31-2---october-29-2025",
	},
	{
		date: "2025-11-04",
		identifier: "p0312-2",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1424-hotfix-31-2---november-4-2025-android",
	},
	{
		date: "2025-12-01",
		identifier: "p315",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1427-update-31-5---december-1-2025",
	},
	{
		date: "2025-12-11",
		identifier: "p316",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1428-hotfix-31-6---december-11-2025",
	},
	{
		date: "2026-01-06",
		identifier: "p320",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1430-update-32-0---january-6th-2026",
	},
	{
		date: "2026-01-13",
		identifier: "p321",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1434-hotfix-32-1---january-13-2026",
	},
	{
		date: "2026-01-29",
		identifier: "p322",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1435-hotfix-32-2---january-29-2026",
	},
	{
		date: "2026-02-26",
		identifier: "p325",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1437-update-32-5---february-26th-2026",
	},
	{
		date: "2026-03-10",
		identifier: "p326",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1441-hotfix-32-6---march-10-2026-android",
	},
	{
		date: "2026-03-24",
		identifier: "p327",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1442-hotfix-32-7---march-24-2026",
	},
	{
		date: "2026-03-25",
		identifier: "p328",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1443-hotfix-32-8---march-25-2026-android",
	},
	{
		date: "2026-04-04",
		identifier: "p329",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1445-hotfix-32-9---april-4-2026-android-ios-steam-playstation-huawei-1775332429",
	},
	{
		date: "2026-04-14",
		identifier: "p330",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1447-update-33-0---april-14th-2026",
	},
	{
		date: "2026-04-15",
		identifier: "p331",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1448-hotfix-33-1---april-15-2026-ios-steam",
	},
	{
		date: "2026-04-29",
		identifier: "p332",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1449-hotfix-33-2---april-29-2026",
	},
	{
		date: "2026-05-26",
		identifier: "p335",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1450-update-33-5---may-26th-2026",
	},
	{
		date: "2026-06-09",
		identifier: "p337",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1454-hotfix-33-7---june-9th-2026",
	},
	{
		date: "2026-06-30",
		identifier: "p338",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1455-hotfix-33-8---june-30-2026",
	},
	{
		date: "2026-07-14",
		identifier: "p340",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1457-update-34-0---july-14th-2026",
	},
	{
		date: "2026-07-18",
		identifier: "p341",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1459-hotfix-34-1---july-18-2026-ios-android-pc-playstation",
	},
	{
		date: "2026-07-28",
		identifier: "p342",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1461-hotfix-34-2---july-28-2026",
	},
	{
		date: "2026-08-06",
		identifier: "p343",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1462-hotfix-34-3---august-6-2026",
	},
	{
		date: "2026-08-10",
		identifier: "p344",
		url: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1467-hotfix-34-4---august-10-2026---playstation-ios",
	},
	{ date: "2026-08-25" },
];

export function isPublishedPatchNote(patchNote: PatchNote): patchNote is PublishedPatchNote {
	return patchNote.identifier !== undefined && patchNote.url !== undefined;
}

export function patchNoteVersion(identifier: PatchNoteIdentifier) {
	const match = /^p(\d+)(?:-\d+)?$/.exec(identifier);

	if (match === null) {
		return identifier.slice(1);
	}

	const digits = match[1]!;
	const numeric = Number(digits);

	if (digits.length <= 2) {
		return `${numeric}.0`;
	}

	return numeric >= 310
		? `${Math.trunc(numeric / 10)}.${numeric % 10}`
		: `0.${Math.trunc(numeric / 10)}.${numeric % 10}`;
}

const patchNoteRedirects = new Map<PatchNoteIdentifier, HTTPSURL>();

for (const patchNote of PATCH_NOTES) {
	if (!isPublishedPatchNote(patchNote)) {
		continue;
	}

	patchNoteRedirects.set(patchNote.identifier, patchNote.url);

	for (const alias of patchNote.aliases ?? []) {
		patchNoteRedirects.set(alias, patchNote.url);
	}
}

export const PATCH_NOTE_REDIRECTS: ReadonlyMap<PatchNoteIdentifier, HTTPSURL> = patchNoteRedirects;

const latestPatchNote = PATCH_NOTES.findLast(isPublishedPatchNote);

if (latestPatchNote === undefined) {
	throw new Error("At least one published patch note is required.");
}

export const LATEST_PATCH_NOTE = latestPatchNote;
