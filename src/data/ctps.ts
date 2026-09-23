import type { LocaleText } from "./characters";

export type CtpCategory = "offense" | "defense" | "support";
export type CtpFocus = "pve" | "pvp" | "hybrid";
export type CtpTier = "regular" | "mighty" | "brilliant";

export type StatLine = {
  /** Use {0}, {1} placeholders for bold values */
  text: LocaleText;
  values: string[];
};

export type ReforgeBlock = {
  specialName?: LocaleText;
  specialLines: StatLine[];
  genericLines: StatLine[];
  specialMaxValues: string[];
  genericMaxValues: string[];
};

export type CtpTierData = {
  stats: StatLine[];
  maxRollValues: string[];
  reforge?: ReforgeBlock;
  acquisition: LocaleText[];
};

export type Ctp = {
  id: string;
  name: LocaleText;
  category: CtpCategory;
  focus: CtpFocus;
  description: LocaleText;
  reforgedNote: LocaleText;
  accent: string;
  tiers: Record<CtpTier, CtpTierData>;
};

export function getCtpImage(id: string) {
  return `/ctps/ctp_${id}.png`;
}

export const categoryLabels: Record<CtpCategory, LocaleText> = {
  offense: { th: "โจมตี", en: "Offense" },
  defense: { th: "ป้องกัน", en: "Defense" },
  support: { th: "ซัพพอร์ต", en: "Support" },
};

export const focusLabels: Record<CtpFocus, LocaleText> = {
  pve: { th: "PvE", en: "PvE" },
  pvp: { th: "PvP", en: "PvP" },
  hybrid: { th: "ผสม", en: "Hybrid" },
};

export const tierLabels: Record<CtpTier, LocaleText> = {
  regular: { th: "ปรกติ", en: "Regular" },
  mighty: { th: "สุดแกร่ง", en: "Mighty" },
  brilliant: { th: "เปล่งประกาย", en: "Brilliant" },
};

const mightyAcquisition: LocaleText[] = [
  {
    th: "สามารถรับได้จากการหลอม C.T.P.",
    en: "C.T.P. Reforging Normal Success",
  },
];

const brilliantAcquisition: LocaleText[] = [
  {
    th: "สามารถรับได้จากการหลอม C.T.P.",
    en: "C.T.P. Reforging Super Success",
  },
];

const acqSpecialGearChest: LocaleText[] = [
  {
    th: "สามารถรับได้ที่ กล่องอุปกรณ์พิเศษ",
    en: "Available from Special Gear Chest",
  },
];

const acqBattleOfLegends: LocaleText[] = [
  {
    th: "สามารถรับเป็น รางวัลโบนัสได้ที่ แบทเทิลแห่งตำนาน",
    en: "Available as a Bonus Reward from Battle of the Legends",
  },
];

const acqBattleOfLegendsAlt: LocaleText[] = [
  {
    th: "สามารถรับเป็น รางวัลโบนัส ได้ที่ แบทเทิลแห่งตำนาน",
    en: "Available as a Bonus Reward from Battle of the Legends",
  },
];

const acqBoostPoint: LocaleText[] = [
  {
    th: "สามารถรับได้เป็น รางวัลเพิ่มเติม ของ บูสต์พ้อยท์",
    en: "Available as an additional reward from Boost Point",
  },
];

const acqHiddenTicket: LocaleText[] = [
  {
    th: "จะได้รับเมื่อใช้ ฮิดเด้นทิกเก็ตในภารกิจห้วงมิติ",
    en: "Obtained when using a Hidden Ticket in Dimensional Missions",
  },
];

const acqCollectorsRoom: LocaleText[] = [
  {
    th: "สามารถรับเป็นของรางวัลพิเศษได้ที่ห้องจัดแสดงของนักสะสม",
    en: "Available as a special reward from the Collector's Exhibition Room",
  },
];

function line(th: string, en: string, values: string[] = []): StatLine {
  return { text: { th, en }, values };
}

function makeTiers(args: {
  regularStats: StatLine[];
  regularMax: string[];
  brilliantStats: StatLine[];
  brilliantMax: string[];
  mightyReforge: ReforgeBlock;
  brilliantReforge: ReforgeBlock;
  regularAcquisition: LocaleText[];
}): Record<CtpTier, CtpTierData> {
  return {
    regular: {
      stats: args.regularStats,
      maxRollValues: args.regularMax,
      acquisition: args.regularAcquisition,
    },
    mighty: {
      stats: args.regularStats,
      maxRollValues: args.regularMax,
      reforge: args.mightyReforge,
      acquisition: mightyAcquisition,
    },
    brilliant: {
      stats: args.brilliantStats,
      maxRollValues: args.brilliantMax,
      reforge: args.brilliantReforge,
      acquisition: brilliantAcquisition,
    },
  };
}

export const ctps: Ctp[] = [
  {
    id: "rage",
    name: { th: "C.T.P. แห่งความโกรธแค้น", en: "C.T.P. of Rage" },
    category: "offense",
    focus: "pve",
    accent: "#c026d3",
    description: {
      th: "CTP PvE คลาสสิก เพิ่มคริติคอลและหลบหลีก พร้อมบัฟดาเมจตามอัตราคริติคอล/หลบหลีก และเพิกเฉยลดดาเมจของบอส",
      en: "Classic PvE C.T.P. that boosts Critical Rate and Dodge, scales damage off those rates, and ignores boss damage decrease.",
    },
    reforgedNote: {
      th: "เอฟเฟกต์ ความโกรธ เพิ่มดาเมจ แต่คุ้ม reforge เมื่ออยากสแตกตัวใดตัวหนึ่งจริงๆ ไม่เช่นนั้น Rage ธรรมดา 2 ใบมักคุ้มกว่า Mighty 1 ใบ",
      en: "The Rage (Enraged) effect adds more damage, but is likely only worth Reforging if you really want to stack a particular character. Otherwise, two regular Rages provides more value than one Mighty.",
    },
    tiers: makeTiers({
      regularAcquisition: acqSpecialGearChest,
      regularStats: [
        line("เพิ่มอัตราคริติคอล +{0}%", "Critical Rate +{0}%", ["32"]),
        line("เพิ่มหลบหลีก +{0}%", "Dodge +{0}%", ["32"]),
        line(
          "โอกาสเกิด : โอกาส {0}% เมื่อโจมตีแบบคริติคอล",
          "Activation Rate: {0}% chance when dealing Critical Attack",
          ["20"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line(
          "ปริมาณความเสียหายทั่วไปเพิ่มขึ้น {0}% ต่ออัตราคริติคอล, อัตราหลบหลีก 1%",
          "Increases all Basic Damage by {0}% per 1% Critical Rate and Dodge Rate",
          ["0.9"],
        ),
        line(
          "โดยไม่เกี่ยวข้องกับอัตราคริติคอลแน่นอนหรืออัตราหลบหลีกแน่นอน({0} วิ)",
          "Regardless of Guaranteed Critical Rate or Guaranteed Dodge Rate ({0} sec.)",
          ["5"],
        ),
        line(
          "เพิกเฉยอัตราลดปริมาณความเสียหายของบอส เทียบเท่า {0}%({1} วิ)",
          "Ignores Boss Damage Reduction by {0}% ({1} sec.)",
          ["60", "5"],
        ),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["7"]),
      ],
      regularMax: ["32", "32", "20", "0.9", "60"],
      brilliantStats: [
        line("เพิ่มอัตราคริติคอล +{0}%", "Critical Rate +{0}%", ["36.8"]),
        line("เพิ่มหลบหลีก +{0}%", "Dodge +{0}%", ["36.8"]),
        line(
          "โอกาสเกิด : โอกาส {0}% เมื่อโจมตีแบบคริติคอล",
          "Activation Rate: {0}% chance when dealing Critical Attack",
          ["25"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line(
          "ปริมาณความเสียหายทั่วไปเพิ่มขึ้น {0}% ต่ออัตราคริติคอล, อัตราหลบหลีก 1%",
          "Increases all Basic Damage by {0}% per 1% Critical Rate and Dodge Rate",
          ["1.2"],
        ),
        line(
          "โดยไม่เกี่ยวข้องกับอัตราคริติคอลแน่นอนหรืออัตราหลบหลีกแน่นอน({0} วิ)",
          "Regardless of Guaranteed Critical Rate or Guaranteed Dodge Rate ({0} sec.)",
          ["5"],
        ),
        line(
          "เพิกเฉยอัตราลดปริมาณความเสียหายของบอส เทียบเท่า {0}%({1} วิ)",
          "Ignores Boss Damage Reduction by {0}% ({1} sec.)",
          ["67", "5"],
        ),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["7"]),
      ],
      brilliantMax: ["36.8", "36.8", "25", "1.2", "67"],
      mightyReforge: {
        specialName: { th: "ความโกรธ", en: "Enraged" },
        specialLines: [
          line(
            "(อัตราความเสียหายคริติคอลเพิ่มขึ้น {0}% โดยไม่สนค่าจำกัดสูงสุด เพิ่มขึ้นเพิ่มเติม {1}% ของจดจ่อ)({2} วิ)",
            "(Critical Damage Rate increased by {0}% ignoring the max limit, further increased by {1}% of Concentration)({2} sec.)",
            ["200", "40", "6"],
          ),
          line("ใช้ได้ภายใน {0} วิ", "Cooldown Time {0} seconds", ["10"]),
          line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        ],
        genericLines: [
          line(
            "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
            "Increases All Basic Attacks and Defenses by {0}%",
            ["20"],
          ),
        ],
        specialMaxValues: ["200", "40", "6", "10"],
        genericMaxValues: ["20"],
      },
      brilliantReforge: {
        specialName: { th: "ความโกรธ", en: "Enraged" },
        specialLines: [
          line(
            "(อัตราความเสียหายคริติคอลเพิ่มขึ้น {0}% โดยไม่สนค่าจำกัดสูงสุด เพิ่มขึ้นเพิ่มเติม {1}% ของจดจ่อ)({2} วิ)",
            "(Critical Damage Rate increased by {0}% ignoring the max limit, further increased by {1}% of Concentration)({2} sec.)",
            ["300", "60", "7"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["9"]),
          line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        ],
        genericLines: [
          line(
            "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
            "Increases All Basic Attacks and Defenses by {0}%",
            ["32"],
          ),
        ],
        specialMaxValues: ["300", "60", "7", "9"],
        genericMaxValues: ["32"],
      },
    }),
  },
  {
    id: "energy",
    name: { th: "C.T.P. แห่งความโกลาหล", en: "C.T.P. of Energy" },
    category: "offense",
    focus: "pve",
    accent: "#ef4444",
    description: {
      th: "CTP เน้นระเบิดดาเมจช่วงสั้น เพิ่มความเสียหายตีหลายครั้งและความเสียหาย 1 การโจมตี",
      en: "Burst-focused C.T.P. that boosts Chain Hit Damage and damage of 1 attack.",
    },
    reforgedNote: {
      th: "Reforge (เหนือกว่า) ช่วยเพิ่ม pierce ตามจดจ่อ แต่ควร reforge เมื่อตัวนั้นเป็นตัวหลักของโหมดสำคัญ",
      en: "Reforge (Strike) adds Concentration-scaling pierce, best reserved for a mode-defining main damage dealer.",
    },
    tiers: makeTiers({
      regularAcquisition: acqBattleOfLegends,
      regularStats: [
        line("ไม่สนใจการหลบหลีก {0}%", "Ignore Dodge {0}%", ["45"]),
        line("เพิ่มความเสียหายคริติคอล +{0}%", "Critical Damage +{0}%", ["45"]),
        line(
          "โอกาสเกิด : เมื่อโจมตี ด้วยอัตรา {0}%",
          "Activation Rate: {0}% chance when attacking",
          ["10"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line(
          "เมื่อโจมตี เพิ่มความเสียหายตีหลายครั้ง {0}%({1} วิ)",
          "Increases Chain Hit Damage by {0}% when attacking ({1} sec.)",
          ["30", "5"],
        ),
        line(
          "ความเสียหายทั่วไปของ 1 การโจมตี เพิ่มขึ้น {0}%({1} วิ)",
          "Increases all Basic Damage of 1 attack by {0}% ({1} sec.)",
          ["200", "5"],
        ),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["7"]),
      ],
      regularMax: ["45", "45", "10", "30", "200"],
      brilliantStats: [
        line("ไม่สนใจการหลบหลีก {0}%", "Ignore Dodge {0}%", ["51.75"]),
        line(
          "เพิ่มความเสียหายคริติคอล +{0}%",
          "Critical Damage +{0}%",
          ["51.75"],
        ),
        line(
          "โอกาสเกิด : เมื่อโจมตี ด้วยอัตรา {0}%",
          "Activation Rate: {0}% chance when attacking",
          ["15"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line(
          "เมื่อโจมตี เพิ่มความเสียหายตีหลายครั้ง {0}%({1} วิ)",
          "Increases Chain Hit Damage by {0}% when attacking ({1} sec.)",
          ["50", "5"],
        ),
        line(
          "ความเสียหายทั่วไปของ 1 การโจมตี เพิ่มขึ้น {0}%({1} วิ)",
          "Increases all Basic Damage of 1 attack by {0}% ({1} sec.)",
          ["240", "5"],
        ),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["7"]),
      ],
      brilliantMax: ["51.75", "51.75", "15", "50", "240"],
      mightyReforge: {
        specialName: { th: "เหนือกว่า", en: "Strike" },
        specialLines: [
          line(
            "(ความเสียหายเจาะทะลุเพิ่มเติมสูงขึ้น {0}%, สูงขึ้น {1}% ของจดจ่อ)({2} วิ)",
            "(Additional Pierce Damage increased by {0}%, further increased by {1}% of Concentration)({2} sec.)",
            ["6", "20", "5"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["10"]),
          line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        ],
        genericLines: [
          line(
            "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
            "Increases All Basic Attacks and Defenses by {0}%",
            ["20"],
          ),
        ],
        specialMaxValues: ["6", "20", "5", "10"],
        genericMaxValues: ["20"],
      },
      brilliantReforge: {
        specialName: { th: "เหนือกว่า", en: "Strike" },
        specialLines: [
          line(
            "(ความเสียหายเจาะทะลุเพิ่มเติมสูงขึ้น {0}%, สูงขึ้น {1}% ของจดจ่อ)({2} วิ)",
            "(Additional Pierce Damage increased by {0}%, further increased by {1}% of Concentration)({2} sec.)",
            ["10", "30", "6"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["9"]),
          line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        ],
        genericLines: [
          line(
            "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
            "Increases All Basic Attacks and Defenses by {0}%",
            ["32"],
          ),
        ],
        specialMaxValues: ["10", "30", "6", "9"],
        genericMaxValues: ["32"],
      },
    }),
  },
  {
    id: "judgement",
    name: { th: "C.T.P. แห่งการพิพากษา", en: "C.T.P. of Judgement" },
    category: "offense",
    focus: "pve",
    accent: "#a855f7",
    description: {
      th: "CTP สายธาตุ ลดพลังต้านทานศัตรูและเพิ่มอัตราความเสียหายโจมตีทั้งหมด",
      en: "Elemental C.T.P. that lowers enemy resistances and boosts all attack damage.",
    },
    reforgedNote: {
      th: "Reforge (เพิ่มประสิทธิภาพประเภท) คุ้มเมื่อตัวธาตุนั้นเป็นตัวหลักหลายโหมด",
      en: "Reforge (Type Effectiveness) is worth it when the elemental hero is a multi-mode main.",
    },
    tiers: makeTiers({
      regularAcquisition: acqSpecialGearChest,
      regularStats: [
        line(
          "พลังโจมตีทั่วไปทั้งหมดเพิ่มขึ้น +{0}%",
          "Increases All Basic Attack by +{0}%",
          ["32"],
        ),
        line(
          "เมื่อโจมตี เพิ่มความเสียหายตีหลายครั้ง {0}%",
          "Increases Chain Hit Damage by {0}% when attacking",
          ["20"],
        ),
        line(
          "โอกาสเกิด : เมื่อโจมตี ด้วยอัตรา {0}%",
          "Activation Rate: {0}% chance when attacking",
          ["10"],
        ),
        line("ใช้กับ : ศัตรู", "Applies to: Enemy"),
        line(
          "พลังต้านทานทั้งหมดลดลง -{0}% ({1} วิ)",
          "Decreases All Resistances by -{0}% ({1} sec.)",
          ["30", "5"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line(
          "อัตราความเสียหายโจมตีทั้งหมดเพิ่มขึ้น +{0}% ({1} วิ)",
          "Increases All Attack Damage by +{0}% ({1} sec.)",
          ["200", "5"],
        ),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["7"]),
      ],
      regularMax: ["32", "20", "10", "30", "200"],
      brilliantStats: [
        line(
          "พลังโจมตีทั่วไปทั้งหมดเพิ่มขึ้น +{0}%",
          "Increases All Basic Attack by +{0}%",
          ["36.8"],
        ),
        line(
          "เมื่อโจมตี เพิ่มความเสียหายตีหลายครั้ง {0}%",
          "Increases Chain Hit Damage by {0}% when attacking",
          ["23"],
        ),
        line(
          "โอกาสเกิด : เมื่อโจมตี ด้วยอัตรา {0}%",
          "Activation Rate: {0}% chance when attacking",
          ["15"],
        ),
        line("ใช้กับ : ศัตรู", "Applies to: Enemy"),
        line(
          "ลด -{0}% ของพลังต้านทานทั้งหมด (ซ้อนได้สูงสุดถึง -{0}%, เพิกเฉยเอฟเฟกต์ต้านทาน)({1} วิ)",
          "Decreases All Resistances by -{0}% (stacks up to -{0}%, ignores Resistance effects) ({1} sec.)",
          ["50", "5"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line(
          "อัตราความเสียหายโจมตีทั้งหมดเพิ่มขึ้น +{0}% ({1} วิ)",
          "Increases All Attack Damage by +{0}% ({1} sec.)",
          ["240", "5"],
        ),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["7"]),
      ],
      brilliantMax: ["36.8", "23", "15", "50", "240"],
      mightyReforge: {
        specialName: {
          th: "เพิ่มประสิทธิภาพประเภท",
          en: "Type Effectiveness",
        },
        specialLines: [
          line(
            "(ปริมาณความเสียหายสกิลประเภทสูงขึ้น {0}%, สูงขึ้นเพิ่มเติม {1}% ของจดจ่อ)({2} วิ)",
            "(Type Skill Damage increased by {0}%, further increased by {1}% of Concentration)({2} sec.)",
            ["40", "70", "5"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["10"]),
          line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        ],
        genericLines: [
          line(
            "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
            "Increases All Basic Attacks and Defenses by {0}%",
            ["20"],
          ),
        ],
        specialMaxValues: ["40", "70", "5", "10"],
        genericMaxValues: ["20"],
      },
      brilliantReforge: {
        specialName: {
          th: "เพิ่มประสิทธิภาพประเภท",
          en: "Type Effectiveness",
        },
        specialLines: [
          line(
            "(ปริมาณความเสียหายสกิลประเภทสูงขึ้น {0}%, สูงขึ้นเพิ่มเติม {1}% ของจดจ่อ)({2} วิ)",
            "(Type Skill Damage increased by {0}%, further increased by {1}% of Concentration)({2} sec.)",
            ["70", "100", "5"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["9"]),
          line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        ],
        genericLines: [
          line(
            "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
            "Increases All Basic Attacks and Defenses by {0}%",
            ["32"],
          ),
        ],
        specialMaxValues: ["70", "100", "5", "9"],
        genericMaxValues: ["32"],
      },
    }),
  },
  {
    id: "competition",
    name: { th: "C.T.P. แห่งการแข่งขัน", en: "C.T.P. of Competition" },
    category: "offense",
    focus: "pve",
    accent: "#f59e0b",
    description: {
      th: "CTP สายสัญชาตญาณ สำหรับตัว Tier-4 แข็งใน WBL+ / ABX-ABL เมื่อ Instinct สูง",
      en: "Instinct-scaling C.T.P. for Tier-4 heroes — strong in WBL+ / ABX-ABL with high Instinct.",
    },
    reforgedNote: {
      th: "Reforge (โดยเฉพาะ รุนแรง) ช่วยมาก แต่ใส่ได้ผลดีแม้ยังไม่ reforge ถ้าตัวเป็น T4",
      en: "Reforge (especially รุนแรง / Fury) helps a lot, but it is already strong unreforged on a real T4.",
    },
    tiers: makeTiers({
      regularAcquisition: acqSpecialGearChest,
      regularStats: [
        line(
          "อัตราคริติคอลและอัตราคริติคอลสัญชาตญาณเพิ่มขึ้น +{0}%",
          "Critical Rate and Instinct Critical Rate +{0}%",
          ["34"],
        ),
        line(
          "เพิ่มอัตราความเสียหายสัญชาตญาณคริติคอล {0}%",
          "Increases Instinct Critical Damage by {0}%",
          ["45"],
        ),
        line(
          "โอกาสเกิด : เมื่อโจมตี ด้วยอัตรา {0}%",
          "Activation Rate: {0}% chance when attacking",
          ["15"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line(
          "เพิกเฉยอัตราลดปริมาณความเสียหายของบอส เทียบเท่า {0}%({1} วิ)",
          "Ignores Boss Damage Reduction by {0}% ({1} sec.)",
          ["55", "6"],
        ),
        line(
          "ปริมาณความเสียหายทั้งหมดที่สร้างแก่ศัตรูประเภทบอส เพิ่มขึ้นเท่ากับ {0}% ของสัญชาตญาณทั้งหมด (เพิ่มสูงสุด {1}%)({2} วิ)",
          "Increases all damage dealt to Boss type by {0}% of total Instinct (max {1}%) ({2} sec.)",
          ["6", "140", "6"],
        ),
        line("ใช้ได้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["7"]),
      ],
      regularMax: ["34", "45", "15", "55", "6", "140"],
      brilliantStats: [
        line(
          "อัตราคริติคอลและอัตราคริติคอลสัญชาตญาณเพิ่มขึ้น +{0}%",
          "Critical Rate and Instinct Critical Rate +{0}%",
          ["39.1"],
        ),
        line(
          "เพิ่มอัตราความเสียหายสัญชาตญาณคริติคอล {0}%",
          "Increases Instinct Critical Damage by {0}%",
          ["51.75"],
        ),
        line(
          "โอกาสเกิด : เมื่อโจมตี ด้วยอัตรา {0}%",
          "Activation Rate: {0}% chance when attacking",
          ["20"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line(
          "เพิกเฉยอัตราลดปริมาณความเสียหายของบอส เทียบเท่า {0}%({1} วิ)",
          "Ignores Boss Damage Reduction by {0}% ({1} sec.)",
          ["65", "6"],
        ),
        line(
          "ปริมาณความเสียหายทั้งหมดที่สร้างแก่ศัตรูประเภทบอส เพิ่มขึ้นเท่ากับ {0}% ของสัญชาตญาณทั้งหมด (เพิ่มสูงสุด {1}%)({2} วิ)",
          "Increases all damage dealt to Boss type by {0}% of total Instinct (max {1}%) ({2} sec.)",
          ["8", "180", "6"],
        ),
        line("ใช้ได้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["7"]),
      ],
      brilliantMax: ["39.1", "51.75", "20", "65", "8", "180"],
      mightyReforge: {
        specialName: { th: "รุนแรง", en: "Fury" },
        specialLines: [
          line(
            "(ความเสียหายทั้งหมดเพิ่มขึ้น {0}%, สูงขึ้นเพิ่มเติมเท่ากับ {1}% ของจดจ่อ)({2} วิ)",
            "(All Damage increased by {0}%, further increased by {1}% of Concentration)({2} sec.)",
            ["60", "60", "6"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["10"]),
          line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        ],
        genericLines: [
          line(
            "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
            "Increases All Basic Attacks and Defenses by {0}%",
            ["20"],
          ),
        ],
        specialMaxValues: ["60", "60", "6", "10"],
        genericMaxValues: ["20"],
      },
      brilliantReforge: {
        specialName: { th: "รุนแรง", en: "Fury" },
        specialLines: [
          line(
            "(ความเสียหายทั้งหมดเพิ่มขึ้น {0}%, สูงขึ้นเพิ่มเติมเท่ากับ {1}% ของจดจ่อ)({2} วิ)",
            "(All Damage increased by {0}%, further increased by {1}% of Concentration)({2} sec.)",
            ["120", "90", "7"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["9"]),
          line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        ],
        genericLines: [
          line(
            "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
            "Increases All Basic Attacks and Defenses by {0}%",
            ["32"],
          ),
        ],
        specialMaxValues: ["120", "90", "7", "9"],
        genericMaxValues: ["32"],
      },
    }),
  },
  {
    id: "destruction",
    name: { th: "C.T.P. แห่งการทำลายล้าง", en: "C.T.P. of Destruction" },
    category: "offense",
    focus: "hybrid",
    accent: "#f97316",
    description: {
      th: "CTP เจาะเกราะ ป้องกันการ์ดเบรค พร้อมโอกาสเจาะทะลุซูเปอร์อาร์เมอร์/ที่กั้น และระเบิดดาเมจ 1 การโจมตี",
      en: "Armor-break C.T.P. with Guard Break Immunity, pierce chance, and a huge 1-attack damage burst.",
    },
    reforgedNote: {
      th: "Reforge (Slam) เพิ่มดาเมจต่อบอสตามจดจ่อ — คุ้มเมื่อตัวนั้นพึ่งสกิลหนักเป็นหลัก",
      en: "Reforge (Slam) boosts boss damage with Concentration scaling — worth it on heavy skill-window dealers.",
    },
    tiers: makeTiers({
      regularAcquisition: acqSpecialGearChest,
      regularStats: [
        line("เพิ่มความเสียหายคริติคอล +{0}%", "Critical Damage +{0}%", ["45"]),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line("ป้องกันการ์ดเบรค", "Guard Break Immunity"),
        line(
          "โอกาสเกิด : เมื่อโจมตี ด้วยอัตรา {0}%",
          "Activation Rate: {0}% chance when attacking",
          ["10"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line(
          "โอกาส {0}% เอฟเฟกต์เจาะทะลุ ซูเปอร์อาร์เมอร์, ที่กั้น, ต้านทานความเสียหายทั้งหมด, อมตะ({1} วิ)",
          "{0}% chance to pierce Super Armor, Barrier, All Damage Immunity, and Invincibility ({1} sec.)",
          ["30", "5"],
        ),
        line(
          "ความเสียหายทั่วไปของ 1 การโจมตี เพิ่มขึ้น {0}%({1} วิ)",
          "Increases all Basic Damage of 1 attack by {0}% ({1} sec.)",
          ["200", "5"],
        ),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["7"]),
      ],
      regularMax: ["45", "10", "30", "200"],
      brilliantStats: [
        line(
          "เพิ่มความเสียหายคริติคอล +{0}%",
          "Critical Damage +{0}%",
          ["51.75"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line("ป้องกันการ์ดเบรค", "Guard Break Immunity"),
        line(
          "โอกาสเกิด : เมื่อโจมตี ด้วยอัตรา {0}%",
          "Activation Rate: {0}% chance when attacking",
          ["15"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line(
          "โอกาส {0}% เอฟเฟกต์เจาะทะลุ ซูเปอร์อาร์เมอร์, ที่กั้น, ต้านทานความเสียหายทั้งหมด, อมตะ({1} วิ)",
          "{0}% chance to pierce Super Armor, Barrier, All Damage Immunity, and Invincibility ({1} sec.)",
          ["40", "5"],
        ),
        line(
          "ความเสียหายทั่วไปของ 1 การโจมตี เพิ่มขึ้น {0}%({1} วิ)",
          "Increases all Basic Damage of 1 attack by {0}% ({1} sec.)",
          ["240", "5"],
        ),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["7"]),
      ],
      brilliantMax: ["51.75", "15", "40", "240"],
      mightyReforge: {
        specialName: { th: "Slam", en: "Slam" },
        specialLines: [
          line(
            "(ปริมาณความเสียหายประเภทบอสสูงขึ้น {0}%, สูงขึ้นเพิ่มเติม {1}% ของจดจ่อ)({2} วิ)",
            "(Damage to Boss type increased by {0}%, further increased by {1}% of Concentration)({2} sec.)",
            ["120", "30", "5"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["10"]),
          line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        ],
        genericLines: [
          line(
            "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
            "Increases All Basic Attacks and Defenses by {0}%",
            ["20"],
          ),
        ],
        specialMaxValues: ["120", "30", "5", "10"],
        genericMaxValues: ["20"],
      },
      brilliantReforge: {
        specialName: { th: "Slam", en: "Slam" },
        specialLines: [
          line(
            "(ปริมาณความเสียหายประเภทบอสสูงขึ้น {0}%, สูงขึ้นเพิ่มเติม {1}% ของจดจ่อ)({2} วิ)",
            "(Damage to Boss type increased by {0}%, further increased by {1}% of Concentration)({2} sec.)",
            ["200", "50", "6"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["9"]),
          line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        ],
        genericLines: [
          line(
            "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
            "Increases All Basic Attacks and Defenses by {0}%",
            ["32"],
          ),
        ],
        specialMaxValues: ["200", "50", "6", "9"],
        genericMaxValues: ["32"],
      },
    }),
  },
  {
    id: "authority",
    name: { th: "C.T.P. แห่งอำนาจ", en: "C.T.P. of Authority" },
    category: "offense",
    focus: "pvp",
    accent: "#8b5cf6",
    description: {
      th: "CTP PvP เมื่อเลือดต่ำ ให้อมตะและเพิ่มพลังโจมตีตามความเสียหายจริงที่ได้รับ",
      en: "PvP C.T.P. that grants Invincibility at low HP and scales All Attack off true damage taken.",
    },
    reforgedNote: {
      th: "Reforge (เหล็กกล้า) มีค่าเมื่อตัวนั้นเป็นสไตรเกอร์หรือคอนโทรลหลักใน Timeline/PvP",
      en: "Reforge (Steel) is valuable when the hero is a primary Timeline/PvP striker or controller.",
    },
    tiers: makeTiers({
      regularAcquisition: acqSpecialGearChest,
      regularStats: [
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line("ป้องกันการ์ดเบรค", "Guard Break Immunity"),
        line("เพิ่มความเสียหายคริติคอล +{0}%", "Critical Damage +{0}%", ["45"]),
        line(
          "โอกาสเกิด : เมื่อมี HP น้อยกว่า {0}%",
          "Activation Rate: when HP is below {0}%",
          ["50"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line("อมตะ({0} วิ)", "Invincibility ({0} sec.)", ["5"]),
        line(
          "เพิ่มพลังโจมตีทั่วไปทั้งหมดเพิ่มขึ้น +{0}% ต่อ 1% ความเสียหายจริงที่ได้รับ({1} วิ)",
          "Increases All Basic Attack by +{0}% per 1% true damage taken ({1} sec.)",
          ["5", "7"],
        ),
        line(
          "สะสม ความเสียหายจริง ได้ถึง {0}% ของพลังชีวิตสูงสุด({1} วิ)",
          "Accumulates true damage up to {0}% of Max HP ({1} sec.)",
          ["10", "7"],
        ),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["10"]),
      ],
      regularMax: ["45", "50", "5", "5", "10"],
      brilliantStats: [
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line("ป้องกันการ์ดเบรค", "Guard Break Immunity"),
        line(
          "เพิ่มความเสียหายคริติคอล +{0}%",
          "Critical Damage +{0}%",
          ["51.75"],
        ),
        line(
          "โอกาสเกิด : เมื่อมี HP น้อยกว่า {0}%",
          "Activation Rate: when HP is below {0}%",
          ["50"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line("อมตะ({0} วิ)", "Invincibility ({0} sec.)", ["5"]),
        line(
          "เพิ่มพลังโจมตีทั่วไปทั้งหมดเพิ่มขึ้น +{0}% ต่อ 1% ความเสียหายจริงที่ได้รับ({1} วิ)",
          "Increases All Basic Attack by +{0}% per 1% true damage taken ({1} sec.)",
          ["8", "7"],
        ),
        line(
          "สะสม ความเสียหายจริง ได้ถึง {0}% ของพลังชีวิตสูงสุด({1} วิ)",
          "Accumulates true damage up to {0}% of Max HP ({1} sec.)",
          ["10", "7"],
        ),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["10"]),
      ],
      brilliantMax: ["51.75", "50", "5", "8", "10"],
      mightyReforge: {
        specialName: { th: "เหล็กกล้า", en: "Steel" },
        specialLines: [
          line(
            "(ปริมาณความเสียหายที่ได้รับลดลง {0}%, ลดลงเพิ่มเติม {1}% ของจดจ่อ)({2} วิ)",
            "(Damage received decreased by {0}%, further decreased by {1}% of Concentration)({2} sec.)",
            ["30", "20", "5"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["8"]),
          line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        ],
        genericLines: [
          line(
            "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
            "Increases All Basic Attacks and Defenses by {0}%",
            ["20"],
          ),
        ],
        specialMaxValues: ["30", "20", "5", "8"],
        genericMaxValues: ["20"],
      },
      brilliantReforge: {
        specialName: { th: "เหล็กกล้า", en: "Steel" },
        specialLines: [
          line(
            "(ปริมาณความเสียหายที่ได้รับลดลง {0}%, ลดลงเพิ่มเติม {1}% ของจดจ่อ)({2} วิ)",
            "(Damage received decreased by {0}%, further decreased by {1}% of Concentration)({2} sec.)",
            ["60", "40", "6"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["7"]),
          line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        ],
        genericLines: [
          line(
            "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
            "Increases All Basic Attacks and Defenses by {0}%",
            ["32"],
          ),
        ],
        specialMaxValues: ["60", "40", "6", "7"],
        genericMaxValues: ["32"],
      },
    }),
  },
  {
    id: "regeneration",
    name: { th: "C.T.P. แห่งการฟื้นฟู", en: "C.T.P. of Regeneration" },
    category: "defense",
    focus: "pvp",
    accent: "#22c55e",
    description: {
      th: "CTP อยู่รอด PvP เมื่อเลือดต่ำ ฟื้น HP สร้างโล่ และป้องกันสัญชาตญาณความเสียหาย",
      en: "PvP survival C.T.P. that heals, creates a shield, and resists pierce/removal at low HP.",
    },
    reforgedNote: {
      th: "Reforge (มองทะลุ) ช่วยเกราะ/ฮีลให้แข็งขึ้น คุ้มกับตัวที่ต้องรับสกิลเปิดไฟต์",
      en: "Reforge (Pierce) strengthens the heal/guard package — worth it on opening-skill tanks.",
    },
    tiers: makeTiers({
      regularAcquisition: acqSpecialGearChest,
      regularStats: [
        line("เพิ่ม MAX HP +{0}%", "Max HP +{0}%", ["34"]),
        line(
          "ป้องกันการ์ดเบรค, เพิ่มอัตราฟื้นฟู +{0}%",
          "Guard Break Immunity, Recovery Rate +{0}%",
          ["90"],
        ),
        line(
          "โอกาสเกิด : เมื่อมี HP น้อยกว่า {0}%",
          "Activation Rate: when HP is below {0}%",
          ["50"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line("ฟื้นฟู HP {0}% เพิ่มขึ้น", "Recovers {0}% HP", ["10"]),
        line("สร้างโล่ {0}% ของ HP", "Creates a shield of {0}% of HP", ["35"]),
        line(
          "สูงสุดที่เพิกเฉยเจาะทะลุและการลบออก (ป้องกันสัญชาตญาณความเสียหาย)({0} วิ)",
          "Ignores pierce and removal (Protects against Instinct Damage) ({0} sec.)",
          ["5"],
        ),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["10"]),
      ],
      regularMax: ["34", "90", "50", "10", "35"],
      brilliantStats: [
        line("เพิ่ม MAX HP +{0}%", "Max HP +{0}%", ["39.1"]),
        line(
          "ป้องกันการ์ดเบรค, เพิ่มอัตราฟื้นฟู +{0}%",
          "Guard Break Immunity, Recovery Rate +{0}%",
          ["103.5"],
        ),
        line(
          "โอกาสเกิด : เมื่อมี HP น้อยกว่า {0}%",
          "Activation Rate: when HP is below {0}%",
          ["50"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line("ฟื้นฟู HP {0}% เพิ่มขึ้น", "Recovers {0}% HP", ["15"]),
        line("สร้างโล่ {0}% ของ HP", "Creates a shield of {0}% of HP", ["40"]),
        line(
          "สูงสุดที่เพิกเฉยเจาะทะลุและการลบออก (ป้องกันสัญชาตญาณความเสียหาย)({0} วิ)",
          "Ignores pierce and removal (Protects against Instinct Damage) ({0} sec.)",
          ["6"],
        ),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["10"]),
      ],
      brilliantMax: ["39.1", "103.5", "50", "15", "40"],
      mightyReforge: {
        specialName: { th: "มองทะลุ", en: "Pierce" },
        specialLines: [
          line(
            "(อัตราความสำเร็จ {0}%)",
            "(Success Rate {0}%)",
            ["50"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["8"]),
          line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        ],
        genericLines: [
          line(
            "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
            "Increases All Basic Attacks and Defenses by {0}%",
            ["20"],
          ),
        ],
        specialMaxValues: ["50", "8"],
        genericMaxValues: ["20"],
      },
      brilliantReforge: {
        specialName: { th: "มองทะลุ", en: "Pierce" },
        specialLines: [
          line(
            "(อัตราความสำเร็จ {0}%)",
            "(Success Rate {0}%)",
            ["90"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["7"]),
          line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        ],
        genericLines: [
          line(
            "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
            "Increases All Basic Attacks and Defenses by {0}%",
            ["32"],
          ),
        ],
        specialMaxValues: ["90", "7"],
        genericMaxValues: ["32"],
      },
    }),
  },
  {
    id: "conquest",
    name: { th: "C.T.P. แห่งการพิชิต", en: "C.T.P. of Conquest" },
    category: "defense",
    focus: "pvp",
    accent: "#b45309",
    description: {
      th: "CTP อยู่รอด PvP แบบ Overcoming ฟื้น HP เพิ่ม Max HP และสร้างกำแพงป้องกันเมื่อเลือดต่ำ",
      en: "Overcoming-style PvP survival C.T.P. with heal, Max HP boost, and a damage-reduction barrier at low HP.",
    },
    reforgedNote: {
      th: "Reforge (ปะทะ) ช่วยในไฟต์ยาว คุ้มกับตัวเปิดเกมและ mid-fight tank",
      en: "Reforge (Clash) helps in longer fights — good on openers and mid-fight tanks.",
    },
    tiers: makeTiers({
      regularAcquisition: acqSpecialGearChest,
      regularStats: [
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line("ป้องกันการ์ดเบรค", "Guard Break Immunity"),
        line("เพิ่มอัตราฟื้นฟู +{0}%", "Recovery Rate +{0}%", ["90"]),
        line(
          "โอกาสเกิด : เมื่อมี HP น้อยกว่า {0}%",
          "Activation Rate: when HP is below {0}%",
          ["50"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line("ฟื้นฟู HP {0}% เพิ่มขึ้น", "Recovers {0}% HP", ["10"]),
        line(
          "พลังชีวิตสูงสุดเพิ่มขึ้น +{0}%({1} วิ)",
          "Max HP +{0}% ({1} sec.)",
          ["20", "6"],
        ),
        line("กำแพงป้องกัน", "Protecting Wall"),
        line(
          "(ลดความเสียหายที่ได้รับ {0}% อัตราลดความเสียหายทุกครั้งที่โดนโจมตีลดลง {1}%, อัตราลดความเสียหายต่ำสุด {2}%)({3} วิ)",
          "(Decreases damage received by {0}%. Damage reduction decreases by {1}% each hit, minimum {2}%) ({3} sec.)",
          ["80", "3", "60", "6"],
        ),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["11"]),
      ],
      regularMax: ["90", "50", "10", "20", "80"],
      brilliantStats: [
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line("ป้องกันการ์ดเบรค", "Guard Break Immunity"),
        line("เพิ่มอัตราฟื้นฟู +{0}%", "Recovery Rate +{0}%", ["110"]),
        line(
          "โอกาสเกิด : เมื่อมี HP น้อยกว่า {0}%",
          "Activation Rate: when HP is below {0}%",
          ["50"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line("ฟื้นฟู HP {0}% เพิ่มขึ้น", "Recovers {0}% HP", ["20"]),
        line(
          "พลังชีวิตสูงสุดเพิ่มขึ้น +{0}%({1} วิ)",
          "Max HP +{0}% ({1} sec.)",
          ["30", "6"],
        ),
        line("กำแพงป้องกัน", "Protecting Wall"),
        line(
          "(ลดความเสียหายที่ได้รับ {0}% อัตราลดความเสียหายทุกครั้งที่โดนโจมตีลดลง {1}%, อัตราลดความเสียหายต่ำสุด {2}%)({3} วิ)",
          "(Decreases damage received by {0}%. Damage reduction decreases by {1}% each hit, minimum {2}%) ({3} sec.)",
          ["100", "3", "80", "6"],
        ),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["11"]),
      ],
      brilliantMax: ["110", "50", "20", "30", "100"],
      mightyReforge: {
        specialName: { th: "ปะทะ", en: "Clash" },
        specialLines: [
          line(
            "(ปริมาณความเสียหายทั่วไปเพิ่มขึ้น {0}%, เพิ่มอีก {1}% ของจดจ่อเพิ่มเติม ตามจำนวนศัตรู (สูงสุด {2} คน))({3} วิ)",
            "(All Basic Damage increased by {0}%, further increased by {1}% of Concentration based on number of enemies (max {2})) ({3} sec.)",
            ["60", "50", "3", "5"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["8"]),
          line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        ],
        genericLines: [
          line(
            "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
            "Increases All Basic Attacks and Defenses by {0}%",
            ["20"],
          ),
        ],
        specialMaxValues: ["60", "50", "3", "5", "8"],
        genericMaxValues: ["20"],
      },
      brilliantReforge: {
        specialName: { th: "ปะทะ", en: "Clash" },
        specialLines: [
          line(
            "(ปริมาณความเสียหายทั่วไปเพิ่มขึ้น {0}%, เพิ่มอีก {1}% ของจดจ่อเพิ่มเติม ตามจำนวนศัตรู (สูงสุด {2} คน))({3} วิ)",
            "(All Basic Damage increased by {0}%, further increased by {1}% of Concentration based on number of enemies (max {2})) ({3} sec.)",
            ["90", "80", "3", "6"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["7"]),
          line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        ],
        genericLines: [
          line(
            "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
            "Increases All Basic Attacks and Defenses by {0}%",
            ["32"],
          ),
        ],
        specialMaxValues: ["90", "80", "3", "6", "7"],
        genericMaxValues: ["32"],
      },
    }),
  },
  {
    id: "insight",
    name: { th: "C.T.P. แห่งการมองทะลุ", en: "C.T.P. of Insight" },
    category: "support",
    focus: "hybrid",
    accent: "#06b6d4",
    description: {
      th: "CTP ซัพพอร์ตทีม เพิ่มดาเมจต่อซูเปอร์วายร้ายและฮีโร่ (ไม่ซ้อนกับใบอื่น)",
      en: "Team support C.T.P. that boosts damage vs Super Villains and Heroes (does not stack).",
    },
    reforgedNote: {
      th: "Reforge เพิ่มดาเมจบอสและลด pierce ให้ทั้งทีม — Insight ธรรมดาก็คุ้มใส่ซัพพอร์ตหลายโหมดแล้ว",
      en: "Reforge adds team boss damage and pierce reduction — regular Insight is already great on multi-mode supports.",
    },
    tiers: makeTiers({
      regularAcquisition: acqSpecialGearChest,
      regularStats: [
        line(
          "เอฟเฟกต์สมาชิกทีมทั้งหมดนั้น จะไม่สามารถใช้งานซ้อนกันได้",
          "All Team Members effects do not stack",
        ),
        line("เพิ่ม MAX HP +{0}%", "Max HP +{0}%", ["34"]),
        line(
          "พลังป้องกันทั่วไปทั้งหมดเพิ่มขึ้น +{0}%",
          "Increases All Basic Defenses by +{0}%",
          ["39"],
        ),
        line(
          "โอกาสเกิด : เมื่อโจมตี ด้วยอัตรา {0}%",
          "Activation Rate: {0}% chance when attacking",
          ["10"],
        ),
        line("ใช้กับ : สมาชิกทีมทั้งหมด", "Applies to: All Team Members"),
        line(
          "ความเสียหายทั่วไปที่มอบแก่ฝ่าย ซูเปอร์วายร้าย เพิ่มขึ้น {0}%({1} วิ)",
          "Increases all Basic Damage dealt to Super Villains by {0}% ({1} sec.)",
          ["20", "5"],
        ),
        line(
          "ความเสียหายทั่วไปที่มอบแก่ฝ่าย ฮีโร่ เพิ่มขึ้น {0}%({1} วิ)",
          "Increases all Basic Damage dealt to Heroes by {0}% ({1} sec.)",
          ["20", "5"],
        ),
        line(
          "เอฟเฟกต์สมาชิกทีมทั้งหมดนั้น จะไม่สามารถใช้งานซ้อนกันได้",
          "All Team Members effects do not stack",
        ),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["7"]),
      ],
      regularMax: ["34", "39", "10", "20", "20"],
      brilliantStats: [
        line(
          "เอฟเฟกต์สมาชิกทีมทั้งหมดนั้น จะไม่สามารถใช้งานซ้อนกันได้",
          "All Team Members effects do not stack",
        ),
        line("เพิ่ม MAX HP +{0}%", "Max HP +{0}%", ["39.1"]),
        line(
          "พลังป้องกันทั่วไปทั้งหมดเพิ่มขึ้น +{0}%",
          "Increases All Basic Defenses by +{0}%",
          ["44.85"],
        ),
        line(
          "โอกาสเกิด : เมื่อโจมตี ด้วยอัตรา {0}%",
          "Activation Rate: {0}% chance when attacking",
          ["15"],
        ),
        line("ใช้กับ : สมาชิกทีมทั้งหมด", "Applies to: All Team Members"),
        line(
          "ความเสียหายทั่วไปที่มอบแก่ฝ่าย ซูเปอร์วายร้าย เพิ่มขึ้น {0}%({1} วิ)",
          "Increases all Basic Damage dealt to Super Villains by {0}% ({1} sec.)",
          ["30", "5"],
        ),
        line(
          "ความเสียหายทั่วไปที่มอบแก่ฝ่าย ฮีโร่ เพิ่มขึ้น {0}%({1} วิ)",
          "Increases all Basic Damage dealt to Heroes by {0}% ({1} sec.)",
          ["30", "5"],
        ),
        line(
          "เอฟเฟกต์สมาชิกทีมทั้งหมดนั้น จะไม่สามารถใช้งานซ้อนกันได้",
          "All Team Members effects do not stack",
        ),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["7"]),
      ],
      brilliantMax: ["39.1", "44.85", "15", "30", "30"],
      mightyReforge: {
        specialLines: [
          line("ใช้กับ : สมาชิกทีมทั้งหมด", "Applies to: All Team Members"),
          line(
            "ความเสียหายทั่วไปที่มอบแก่ศัตรูประเภทบอส เพิ่มขึ้น {0}%",
            "Increases all Basic Damage dealt to Boss type by {0}%",
            ["15"],
          ),
          line(
            "เอฟเฟกต์สมาชิกทีมทั้งหมดนั้น จะไม่สามารถใช้งานซ้อนกันได้",
            "All Team Members effects do not stack",
          ),
          line("ใช้กับ : สมาชิกทีมทั้งหมด", "Applies to: All Team Members"),
          line(
            "ปริมาณความเสียหายเจาะทะลุเพิ่มเติมที่ได้รับลดลง {0}%",
            "Decreases additional Pierce Damage received by {0}%",
            ["20"],
          ),
          line(
            "เอฟเฟกต์สมาชิกทีมทั้งหมดนั้น จะไม่สามารถใช้งานซ้อนกันได้",
            "All Team Members effects do not stack",
          ),
        ],
        genericLines: [],
        specialMaxValues: ["15", "20"],
        genericMaxValues: [],
      },
      brilliantReforge: {
        specialLines: [
          line("ใช้กับ : สมาชิกทีมทั้งหมด", "Applies to: All Team Members"),
          line(
            "ความเสียหายทั่วไปที่มอบแก่ศัตรูประเภทบอส เพิ่มขึ้น {0}%",
            "Increases all Basic Damage dealt to Boss type by {0}%",
            ["25"],
          ),
          line(
            "เอฟเฟกต์สมาชิกทีมทั้งหมดนั้น จะไม่สามารถใช้งานซ้อนกันได้",
            "All Team Members effects do not stack",
          ),
          line("ใช้กับ : สมาชิกทีมทั้งหมด", "Applies to: All Team Members"),
          line(
            "ปริมาณความเสียหายเจาะทะลุเพิ่มเติมที่ได้รับลดลง {0}%",
            "Decreases additional Pierce Damage received by {0}%",
            ["30"],
          ),
          line(
            "เอฟเฟกต์สมาชิกทีมทั้งหมดนั้น จะไม่สามารถใช้งานซ้อนกันได้",
            "All Team Members effects do not stack",
          ),
        ],
        genericLines: [],
        specialMaxValues: ["25", "30"],
        genericMaxValues: [],
      },
    }),
  },
  {
    id: "liberation",
    name: { th: "C.T.P. แห่งเสรีภาพ", en: "C.T.P. of Liberation" },
    category: "support",
    focus: "hybrid",
    accent: "#ec4899",
    description: {
      th: "CTP ซัพพอร์ตทีม เพิ่มดาเมจต่อสัญชาตญาณทั้งหมด (ไม่ซ้อนกับใบอื่น)",
      en: "Team support C.T.P. that boosts damage vs all Instinct types (does not stack).",
    },
    reforgedNote: {
      th: "ใช้ได้ตั้งแต่ยังไม่ reforge แต่หลัง reforge จะช่วยซัพพอร์ต PvP/ทีมได้ชัดขึ้น",
      en: "Useful unreforged, but reforging makes the PvP/team support package much clearer.",
    },
    tiers: makeTiers({
      regularAcquisition: acqSpecialGearChest,
      regularStats: [
        line(
          "เอฟเฟกต์สมาชิกทีมทั้งหมดนั้น จะไม่สามารถใช้งานซ้อนกันได้",
          "All Team Members effects do not stack",
        ),
        line(
          "ป้องกันการ์ดเบรค, เพิ่มอัตราฟื้นฟู +{0}%",
          "Guard Break Immunity, Recovery Rate +{0}%",
          ["90"],
        ),
        line(
          "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
          "Increases All Basic Attacks and Defenses by +{0}%",
          ["28"],
        ),
        line(
          "โอกาสเกิด : เมื่อโจมตี ด้วยอัตรา {0}%",
          "Activation Rate: {0}% chance when attacking",
          ["10"],
        ),
        line("ใช้กับ : สมาชิกทีมทั้งหมด", "Applies to: All Team Members"),
        line(
          "ปริมาณความเสียหายทั้งหมดที่สร้างแก่สัญชาตญาณทั้งหมดเพิ่มขึ้น {0}%({1} วิ)",
          "Increases all damage dealt to all Instinct types by {0}% ({1} sec.)",
          ["20", "5"],
        ),
        line(
          "เอฟเฟกต์สมาชิกทีมทั้งหมดนั้น จะไม่สามารถใช้งานซ้อนกันได้",
          "All Team Members effects do not stack",
        ),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["7"]),
      ],
      regularMax: ["90", "28", "10", "20"],
      brilliantStats: [
        line(
          "เอฟเฟกต์สมาชิกทีมทั้งหมดนั้น จะไม่สามารถใช้งานซ้อนกันได้",
          "All Team Members effects do not stack",
        ),
        line(
          "ป้องกันการ์ดเบรค, เพิ่มอัตราฟื้นฟู +{0}%",
          "Guard Break Immunity, Recovery Rate +{0}%",
          ["103.5"],
        ),
        line(
          "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
          "Increases All Basic Attacks and Defenses by +{0}%",
          ["32.2"],
        ),
        line(
          "โอกาสเกิด : เมื่อโจมตี ด้วยอัตรา {0}%",
          "Activation Rate: {0}% chance when attacking",
          ["15"],
        ),
        line("ใช้กับ : สมาชิกทีมทั้งหมด", "Applies to: All Team Members"),
        line(
          "ปริมาณความเสียหายทั้งหมดที่สร้างแก่สัญชาตญาณทั้งหมดเพิ่มขึ้น {0}%({1} วิ)",
          "Increases all damage dealt to all Instinct types by {0}% ({1} sec.)",
          ["27", "5"],
        ),
        line(
          "เอฟเฟกต์สมาชิกทีมทั้งหมดนั้น จะไม่สามารถใช้งานซ้อนกันได้",
          "All Team Members effects do not stack",
        ),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["7"]),
      ],
      brilliantMax: ["103.5", "32.2", "15", "27"],
      mightyReforge: {
        specialLines: [
          line("ใช้กับ : สมาชิกทีมทั้งหมด", "Applies to: All Team Members"),
          line(
            "เพิ่ม MAX HP +{0}%",
            "Increases Max HP by +{0}%",
            ["15"],
          ),
          line(
            "เมื่อถูกโจมตี ลดความเสียหายตีหลายครั้ง {0}%",
            "When attacked, decreases Chain Hit Damage by {0}%",
            ["10"],
          ),
          line(
            "เอฟเฟกต์สมาชิกทีมทั้งหมดนั้น จะไม่สามารถใช้งานซ้อนกันได้",
            "All Team Members effects do not stack",
          ),
          line("ใช้กับ : สมาชิกทีมทั้งหมด", "Applies to: All Team Members"),
          line(
            "เพิ่มความเสียหายต่อเป้าหมายที่มีพลังชีวิตสูงสุดสูงกว่า {0}%",
            "Increases damage dealt to targets with higher Max HP by {0}%",
            ["20"],
          ),
          line(
            "เอฟเฟกต์สมาชิกทีมทั้งหมดนั้น จะไม่สามารถใช้งานซ้อนกันได้",
            "All Team Members effects do not stack",
          ),
        ],
        genericLines: [],
        specialMaxValues: ["15", "10", "20"],
        genericMaxValues: [],
      },
      brilliantReforge: {
        specialLines: [
          line("ใช้กับ : สมาชิกทีมทั้งหมด", "Applies to: All Team Members"),
          line(
            "เพิ่ม MAX HP +{0}%",
            "Increases Max HP by +{0}%",
            ["25"],
          ),
          line(
            "เมื่อถูกโจมตี ลดความเสียหายตีหลายครั้ง {0}%",
            "When attacked, decreases Chain Hit Damage by {0}%",
            ["20"],
          ),
          line(
            "เอฟเฟกต์สมาชิกทีมทั้งหมดนั้น จะไม่สามารถใช้งานซ้อนกันได้",
            "All Team Members effects do not stack",
          ),
          line("ใช้กับ : สมาชิกทีมทั้งหมด", "Applies to: All Team Members"),
          line(
            "เพิ่มความเสียหายต่อเป้าหมายที่มีพลังชีวิตสูงสุดสูงกว่า {0}%",
            "Increases damage dealt to targets with higher Max HP by {0}%",
            ["30"],
          ),
          line(
            "เอฟเฟกต์สมาชิกทีมทั้งหมดนั้น จะไม่สามารถใช้งานซ้อนกันได้",
            "All Team Members effects do not stack",
          ),
        ],
        genericLines: [],
        specialMaxValues: ["25", "20", "30"],
        genericMaxValues: [],
      },
    }),
  },
  {
    id: "refinement",
    name: { th: "C.T.P. สกัดบริสุทธิ์", en: "C.T.P. of Refinement" },
    category: "defense",
    focus: "pvp",
    accent: "#84cc16",
    description: {
      th: "CTP อยู่รอด เมื่อเลือดต่ำ ฟื้น HP และได้ที่กั้นหลายครั้ง",
      en: "Survival C.T.P. that heals and grants multi-hit Guard at low HP.",
    },
    reforgedNote: {
      th: "Reforge (พลังชีวิต) ช่วยเกราะอยู่รอด — เหมาะกับแทงก์และตัวเปิดไฟต์",
      en: "Reforge (Vitality) improves the survival shell — good on tanks and openers.",
    },
    tiers: makeTiers({
      regularAcquisition: acqBattleOfLegendsAlt,
      regularStats: [
        line("เพิ่ม MAX HP +{0}%", "Max HP +{0}%", ["34"]),
        line("เพิ่มอัตราฟื้นฟู +{0}%", "Recovery Rate +{0}%", ["90"]),
        line(
          "โอกาสเกิด : เมื่อมี HP น้อยกว่า {0}%",
          "Activation Rate: when HP is below {0}%",
          ["50"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line("ฟื้นฟู HP {0}% เพิ่มขึ้น", "Recovers {0}% HP", ["20"]),
        line("ที่กั้น ({0} ครั้ง)({1} วิ)", "Guard ({0} hits) ({1} sec.)", [
          "6",
          "6",
        ]),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["15"]),
      ],
      regularMax: ["34", "90", "50", "20", "6"],
      brilliantStats: [
        line("เพิ่ม MAX HP +{0}%", "Max HP +{0}%", ["39.1"]),
        line("เพิ่มอัตราฟื้นฟู +{0}%", "Recovery Rate +{0}%", ["103.5"]),
        line(
          "โอกาสเกิด : เมื่อมี HP น้อยกว่า {0}%",
          "Activation Rate: when HP is below {0}%",
          ["50"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line("ฟื้นฟู HP {0}% เพิ่มขึ้น", "Recovers {0}% HP", ["30"]),
        line("ที่กั้น ({0} ครั้ง)({1} วิ)", "Guard ({0} hits) ({1} sec.)", [
          "10",
          "7",
        ]),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["11"]),
      ],
      brilliantMax: ["39.1", "103.5", "50", "30", "10"],
      mightyReforge: {
        specialName: { th: "พลังชีวิต", en: "Vitality" },
        specialLines: [
          line(
            "(HP ฟื้นฟู {0}% ทุกวินาที เพิ่มขึ้นเพิ่มเติม {1}% ของจดจ่อ)({2} วิ)",
            "(HP Recovery {0}% every second, further increased by {1}% of Concentration)({2} sec.)",
            ["15", "35", "5"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["8"]),
          line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        ],
        genericLines: [
          line(
            "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
            "Increases All Basic Attacks and Defenses by {0}%",
            ["20"],
          ),
        ],
        specialMaxValues: ["15", "35", "5", "8"],
        genericMaxValues: ["20"],
      },
      brilliantReforge: {
        specialName: { th: "พลังชีวิต", en: "Vitality" },
        specialLines: [
          line(
            "(HP ฟื้นฟู {0}% ทุกวินาที เพิ่มขึ้นเพิ่มเติม {1}% ของจดจ่อ)({2} วิ)",
            "(HP Recovery {0}% every second, further increased by {1}% of Concentration)({2} sec.)",
            ["25", "50", "6"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["7"]),
          line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        ],
        genericLines: [
          line(
            "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
            "Increases All Basic Attacks and Defenses by {0}%",
            ["32"],
          ),
        ],
        specialMaxValues: ["25", "50", "6", "7"],
        genericMaxValues: ["32"],
      },
    }),
  },
  {
    id: "patience",
    name: { th: "C.T.P. แห่งการอดทน", en: "C.T.P. of Patience" },
    category: "defense",
    focus: "pvp",
    accent: "#64748b",
    description: {
      th: "CTP PvP เมื่อเลือดต่ำ สะท้อนการโจมตีทั้งหมดและอมตะ พร้อมลดดาเมจสะท้อนกลับ",
      en: "PvP C.T.P. that reflects all attacks and grants Invincibility at low HP, with reduced reflect damage taken.",
    },
    reforgedNote: {
      th: "Reforge (คุ้มครอง) ช่วยให้เกราะแน่นขึ้นใน PvP ที่สกิลเปิดไฟต์แรง",
      en: "Reforge (Protection) helps tank the strongest PvP opening skills.",
    },
    tiers: makeTiers({
      regularAcquisition: acqBoostPoint,
      regularStats: [
        line("เพิ่มหลบหลีก +{0}%", "Dodge +{0}%", ["32"]),
        line(
          "พลังโจมตีทั่วไปทั้งหมดเพิ่มขึ้น +{0}%",
          "Increases All Basic Attack by +{0}%",
          ["32"],
        ),
        line(
          "โอกาสเกิด : เมื่อมี HP น้อยกว่า {0}%",
          "Activation Rate: when HP is below {0}%",
          ["50"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line(
          "ปริมาณความเสียหาย ที่ได้รับจากเอฟเฟกต์สะท้อนกลับ ลดลง {0}%",
          "Damage taken from reflect effects decreased by {0}%",
          ["50"],
        ),
        line(
          "เอฟเฟกต์ที่ปรับใช้ : สะท้อนการโจมตีทั้งหมด ({0} วิ)",
          "Applied effect: Reflect all attacks ({0} sec.)",
          ["5"],
        ),
        line("อมตะ({0} วิ)", "Invincibility ({0} sec.)", ["5"]),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["10"]),
      ],
      regularMax: ["32", "32", "50", "50", "5"],
      brilliantStats: [
        line("เพิ่มหลบหลีก +{0}%", "Dodge +{0}%", ["36.8"]),
        line(
          "พลังโจมตีทั่วไปทั้งหมดเพิ่มขึ้น +{0}%",
          "Increases All Basic Attack by +{0}%",
          ["36.8"],
        ),
        line(
          "โอกาสเกิด : เมื่อมี HP น้อยกว่า {0}%",
          "Activation Rate: when HP is below {0}%",
          ["50"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line(
          "ปริมาณความเสียหาย ที่ได้รับจากเอฟเฟกต์สะท้อนกลับ ลดลง {0}%",
          "Damage taken from reflect effects decreased by {0}%",
          ["90"],
        ),
        line(
          "เอฟเฟกต์ที่ปรับใช้ : สะท้อนการโจมตีทั้งหมด ({0} วิ)",
          "Applied effect: Reflect all attacks ({0} sec.)",
          ["6"],
        ),
        line("อมตะ({0} วิ)", "Invincibility ({0} sec.)", ["6"]),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["10"]),
      ],
      brilliantMax: ["36.8", "36.8", "50", "90", "6"],
      mightyReforge: {
        specialName: { th: "คุ้มครอง", en: "Protection" },
        specialLines: [
          line(
            "ยกเลิกและสร้างที่กั้นที่เพิกเฉยเจาะทะลุ {0} ครั้ง ฟื้นฟู HP {1}% ของจดจ่อ ({2} วิ)",
            "Cancels and creates a Guard that ignores pierce {0} times. Recovers HP by {1}% of Concentration ({2} sec.)",
            ["6", "60", "5"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["8"]),
          line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        ],
        genericLines: [
          line(
            "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
            "Increases All Basic Attacks and Defenses by {0}%",
            ["20"],
          ),
        ],
        specialMaxValues: ["6", "60", "5", "8"],
        genericMaxValues: ["20"],
      },
      brilliantReforge: {
        specialName: { th: "คุ้มครอง", en: "Protection" },
        specialLines: [
          line(
            "ยกเลิกและสร้างที่กั้นที่เพิกเฉยเจาะทะลุ {0} ครั้ง ฟื้นฟู HP {1}% ของจดจ่อ ({2} วิ)",
            "Cancels and creates a Guard that ignores pierce {0} times. Recovers HP by {1}% of Concentration ({2} sec.)",
            ["10", "90", "6"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["8"]),
          line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        ],
        genericLines: [
          line(
            "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
            "Increases All Basic Attacks and Defenses by {0}%",
            ["32"],
          ),
        ],
        specialMaxValues: ["10", "90", "6", "8"],
        genericMaxValues: ["32"],
      },
    }),
  },
  {
    id: "greed",
    name: { th: "C.T.P. แห่งความโลภ", en: "C.T.P. of Greed" },
    category: "offense",
    focus: "pvp",
    accent: "#ca8a04",
    description: {
      th: "CTP PvP สลับบัฟดาเมจต่อประเภท ประจัญบาน/ทำลายล้าง กับ ความเร็ว/สากล",
      en: "PvP C.T.P. that alternates huge damage bonuses vs Combat/Blast and Speed/Universal types.",
    },
    reforgedNote: {
      th: "Reforge (Fierce Attack) ช่วยเจาะลดดาเมจศัตรูให้ตัว carry PvP",
      en: "Reforge (Fierce Attack) helps pierce enemy damage reduction for PvP carries.",
    },
    tiers: makeTiers({
      regularAcquisition: acqSpecialGearChest,
      regularStats: [
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line("ฟื้นฟู HP {0}% เพิ่มขึ้น", "Increases HP Recovery by {0}%", [
          "10",
        ]),
        line(
          "เพิ่มความเสียหายทั่วไปที่มอบให้ประเภท ประจัญบาน, ทำลายล้าง ขึ้น {0}%({1} วิ)",
          "Increases all Basic Damage dealt to Combat and Blast types by {0}% ({1} sec.)",
          ["150", "5"],
        ),
        line(
          "เพิ่มความเสียหายทั่วไปที่มอบให้ประเภท ความเร็ว, สากล ขึ้น {0}%({1} วิ)",
          "Increases all Basic Damage dealt to Speed and Universal types by {0}% ({1} sec.)",
          ["150", "5"],
        ),
        line(
          "เอฟเฟกต์เพิ่มปริมาณความเสียหายนั้นจะทำงานสลับกันไป",
          "The damage increase effects alternate",
        ),
        line(
          "เมื่อปลดเอฟเฟกต์ จะทำงานอีกครั้งในอีก {0} วินาที",
          "After the effect ends, it activates again after {0} seconds",
          ["12"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line("ป้องกันการ์ดเบรค", "Guard Break Immunity"),
        line("ไม่สนใจการหลบหลีก {0}%", "Ignore Dodge {0}%", ["45"]),
      ],
      regularMax: ["10", "150", "150", "12", "45"],
      brilliantStats: [
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line("ฟื้นฟู HP {0}% เพิ่มขึ้น", "Increases HP Recovery by {0}%", [
          "25",
        ]),
        line(
          "เพิ่มความเสียหายทั่วไปที่มอบให้ประเภท ประจัญบาน, ทำลายล้าง ขึ้น {0}%({1} วิ)",
          "Increases all Basic Damage dealt to Combat and Blast types by {0}% ({1} sec.)",
          ["220", "5.5"],
        ),
        line(
          "เพิ่มความเสียหายทั่วไปที่มอบให้ประเภท ความเร็ว, สากล ขึ้น {0}%({1} วิ)",
          "Increases all Basic Damage dealt to Speed and Universal types by {0}% ({1} sec.)",
          ["220", "5.5"],
        ),
        line(
          "เอฟเฟกต์เพิ่มปริมาณความเสียหายนั้นจะทำงานสลับกันไป",
          "The damage increase effects alternate",
        ),
        line(
          "เมื่อปลดเอฟเฟกต์ จะทำงานอีกครั้งในอีก {0} วินาที",
          "After the effect ends, it activates again after {0} seconds",
          ["12"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line("ป้องกันการ์ดเบรค", "Guard Break Immunity"),
        line("ไม่สนใจการหลบหลีก {0}%", "Ignore Dodge {0}%", ["51.75"]),
      ],
      brilliantMax: ["25", "220", "220", "12", "51.75"],
      mightyReforge: {
        specialName: { th: "Fierce Attack", en: "Fierce Attack" },
        specialLines: [
          line(
            "เพิกเฉยอัตราลดปริมาณความเสียหายของเป้าหมาย {0}%, เพิ่มขึ้นเพิ่มเติมเท่ากับ {1}% ของจดจ่อ ({2} วิ)",
            "Ignores target's Damage Decrease by {0}%, further increased by {1}% of Concentration ({2} sec.)",
            ["35", "25", "5"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["8"]),
          line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        ],
        genericLines: [
          line(
            "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
            "Increases All Basic Attacks and Defenses by {0}%",
            ["20"],
          ),
        ],
        specialMaxValues: ["35", "25", "5", "8"],
        genericMaxValues: ["20"],
      },
      brilliantReforge: {
        specialName: { th: "Fierce Attack", en: "Fierce Attack" },
        specialLines: [
          line(
            "เพิกเฉยอัตราลดปริมาณความเสียหายของเป้าหมาย {0}%, เพิ่มขึ้นเพิ่มเติมเท่ากับ {1}% ของจดจ่อ ({2} วิ)",
            "Ignores target's Damage Decrease by {0}%, further increased by {1}% of Concentration ({2} sec.)",
            ["70", "30", "6"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["7"]),
          line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        ],
        genericLines: [
          line(
            "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
            "Increases All Basic Attacks and Defenses by {0}%",
            ["32"],
          ),
        ],
        specialMaxValues: ["70", "30", "6", "7"],
        genericMaxValues: ["32"],
      },
    }),
  },
  {
    id: "transcendence",
    name: { th: "C.T.P. แห่งความเป็นเลิศ", en: "C.T.P. of Transcendence" },
    category: "offense",
    focus: "hybrid",
    accent: "#7c3aed",
    description: {
      th: "CTP เมื่อเลือดต่ำ สะท้อนการโจมตีทั้งหมดและอมตะ พร้อมลดดาเมจสะท้อนกลับ",
      en: "Low-HP C.T.P. that reflects all attacks and grants Invincibility, with reduced reflect damage taken.",
    },
    reforgedNote: {
      th: "Reforge ได้ทั้ง มองทะลุ และ เหนือกว่า — คุ้มกับตัวที่มี self-sustain หรือมักรบใกล้เลือดต่ำ",
      en: "Reforge grants both Pierce and Strike — worth it on self-sustaining heroes that often fight near low HP.",
    },
    tiers: makeTiers({
      regularAcquisition: acqHiddenTicket,
      regularStats: [
        line(
          "พลังโจมตีทั่วไปทั้งหมดเพิ่มขึ้น +{0}%",
          "Increases All Basic Attack by +{0}%",
          ["32"],
        ),
        line("ไม่สนใจการหลบหลีก {0}%", "Ignore Dodge {0}%", ["45"]),
        line(
          "โอกาสเกิด : เมื่อมี HP น้อยกว่า {0}%",
          "Activation Rate: when HP is below {0}%",
          ["50"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line(
          "ปริมาณความเสียหาย ที่ได้รับจากเอฟเฟกต์สะท้อนกลับ ลดลง {0}%",
          "Damage taken from reflect effects decreased by {0}%",
          ["50"],
        ),
        line(
          "เอฟเฟกต์ที่ปรับใช้ : สะท้อนการโจมตีทั้งหมด ({0} วิ)",
          "Applied effect: Reflect all attacks ({0} sec.)",
          ["5"],
        ),
        line("อมตะ({0} วิ)", "Invincibility ({0} sec.)", ["5"]),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["10"]),
      ],
      regularMax: ["32", "45", "50", "50", "5"],
      brilliantStats: [
        line(
          "พลังโจมตีทั่วไปทั้งหมดเพิ่มขึ้น +{0}%",
          "Increases All Basic Attack by +{0}%",
          ["36.8"],
        ),
        line("ไม่สนใจการหลบหลีก {0}%", "Ignore Dodge {0}%", ["51.75"]),
        line(
          "โอกาสเกิด : เมื่อมี HP น้อยกว่า {0}%",
          "Activation Rate: when HP is below {0}%",
          ["50"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line(
          "ปริมาณความเสียหาย ที่ได้รับจากเอฟเฟกต์สะท้อนกลับ ลดลง {0}%",
          "Damage taken from reflect effects decreased by {0}%",
          ["90"],
        ),
        line(
          "เอฟเฟกต์ที่ปรับใช้ : สะท้อนการโจมตีทั้งหมด ({0} วิ)",
          "Applied effect: Reflect all attacks ({0} sec.)",
          ["6"],
        ),
        line("อมตะ({0} วิ)", "Invincibility ({0} sec.)", ["6"]),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["10"]),
      ],
      brilliantMax: ["36.8", "51.75", "50", "90", "6"],
      mightyReforge: {
        specialLines: [
          line("มองทะลุ", "Pierce"),
          line("(อัตราความสำเร็จ {0}%)", "(Success Rate {0}%)", ["50"]),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["8"]),
          line("เหนือกว่า", "Strike"),
          line(
            "(ความเสียหายเจาะทะลุเพิ่มเติมสูงขึ้น {0}%, สูงขึ้น {1}% ของจดจ่อ)({2} วิ)",
            "(Additional Pierce Damage increased by {0}%, further increased by {1}% of Concentration)({2} sec.)",
            ["6", "20", "5"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["10"]),
        ],
        genericLines: [],
        specialMaxValues: ["50", "8", "6", "20", "5", "10"],
        genericMaxValues: [],
      },
      brilliantReforge: {
        specialLines: [
          line("มองทะลุ", "Pierce"),
          line("(อัตราความสำเร็จ {0}%)", "(Success Rate {0}%)", ["90"]),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["7"]),
          line("เหนือกว่า", "Strike"),
          line(
            "(ความเสียหายเจาะทะลุเพิ่มเติมสูงขึ้น {0}%, สูงขึ้น {1}% ของจดจ่อ)({2} วิ)",
            "(Additional Pierce Damage increased by {0}%, further increased by {1}% of Concentration)({2} sec.)",
            ["10", "30", "6"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["9"]),
        ],
        genericLines: [],
        specialMaxValues: ["90", "7", "10", "30", "6", "9"],
        genericMaxValues: [],
      },
    }),
  },
  {
    id: "veteran",
    name: { th: "C.T.P. แห่งการพลิกผัน", en: "C.T.P. of Veteran" },
    category: "support",
    focus: "hybrid",
    accent: "#0ea5e9",
    description: {
      th: "CTP อเนกประสงค์ เพิ่มความเสียหายตีหลายครั้ง ระเบิด 1 การโจมตี และโล่ป้องกันสัญชาตญาณความเสียหาย",
      en: "Flexible C.T.P. with Chain Hit Damage, a 1-attack burst, and a pierce-immune shield.",
    },
    reforgedNote: {
      th: "Reforge (คมดาบ) ใช้เป็นตัวเลือกชั่วคราวได้ดี และ reforge ก็ช่วยให้ใช้งานได้นานขึ้น",
      en: "Reforge (Blade) is a solid stopgap that becomes more permanent once reforged.",
    },
    tiers: makeTiers({
      regularAcquisition: acqCollectorsRoom,
      regularStats: [
        line(
          "ป้องกันการ์ดเบรค, เพิกเฉยหลบหลีก, เพิ่มความเสียหายคริติคอล +{0}%",
          "Guard Break Immunity, Ignore Dodge, Critical Damage +{0}%",
          ["32"],
        ),
        line(
          "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
          "Increases All Basic Attacks and Defenses by +{0}%",
          ["28"],
        ),
        line(
          "โอกาสเกิด : เมื่อโจมตี ด้วยอัตรา {0}%",
          "Activation Rate: {0}% chance when attacking",
          ["15"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line(
          "เมื่อโจมตี เพิ่มความเสียหายตีหลายครั้ง {0}%({1} วิ)",
          "Increases Chain Hit Damage by {0}% when attacking ({1} sec.)",
          ["40", "5"],
        ),
        line(
          "ความเสียหายทั่วไปของ 1 การโจมตี เพิ่มขึ้น {0}%({1} วิ)",
          "Increases all Basic Damage of 1 attack by {0}% ({1} sec.)",
          ["150", "5"],
        ),
        line("สร้างโล่ {0}% ของ HP", "Creates a shield of {0}% of HP", ["30"]),
        line(
          "สูงสุดที่เพิกเฉยเจาะทะลุและการลบออก (ป้องกันสัญชาตญาณความเสียหาย)({0} วิ)",
          "Ignores pierce and removal (Protects against Instinct Damage) ({0} sec.)",
          ["3"],
        ),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["7"]),
      ],
      regularMax: ["32", "28", "15", "40", "150", "30"],
      brilliantStats: [
        line(
          "ป้องกันการ์ดเบรค, เพิกเฉยหลบหลีก, เพิ่มความเสียหายคริติคอล +{0}%",
          "Guard Break Immunity, Ignore Dodge, Critical Damage +{0}%",
          ["36.8"],
        ),
        line(
          "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
          "Increases All Basic Attacks and Defenses by +{0}%",
          ["32.2"],
        ),
        line(
          "โอกาสเกิด : เมื่อโจมตี ด้วยอัตรา {0}%",
          "Activation Rate: {0}% chance when attacking",
          ["15"],
        ),
        line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        line(
          "เมื่อโจมตี เพิ่มความเสียหายตีหลายครั้ง {0}%({1} วิ)",
          "Increases Chain Hit Damage by {0}% when attacking ({1} sec.)",
          ["50", "5"],
        ),
        line(
          "ความเสียหายทั่วไปของ 1 การโจมตี เพิ่มขึ้น {0}%({1} วิ)",
          "Increases all Basic Damage of 1 attack by {0}% ({1} sec.)",
          ["200", "5"],
        ),
        line(
          "สร้างโล่ {0}% ของ HP ({1} วิ)",
          "Creates a shield of {0}% of HP ({1} sec.)",
          ["35", "5"],
        ),
        line(
          "สูงสุดที่เพิกเฉยเจาะทะลุและการลบออก (ป้องกันสัญชาตญาณความเสียหาย)({0} วิ)",
          "Ignores pierce and removal (Protects against Instinct Damage) ({0} sec.)",
          ["4"],
        ),
        line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["7"]),
      ],
      brilliantMax: ["36.8", "32.2", "15", "50", "200", "35"],
      mightyReforge: {
        specialName: { th: "คมดาบ", en: "Blade" },
        specialLines: [
          line(
            "(ปริมาณความเสียหายเพิ่มขึ้น {0}%, สูงขึ้นเพิ่มเติม {1}% ของจดจ่อ)({2} วิ)",
            "(Damage increased by {0}%, further increased by {1}% of Concentration)({2} sec.)",
            ["40", "50", "5"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["10"]),
          line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        ],
        genericLines: [
          line(
            "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
            "Increases All Basic Attacks and Defenses by {0}%",
            ["20"],
          ),
        ],
        specialMaxValues: ["40", "50", "5", "10"],
        genericMaxValues: ["20"],
      },
      brilliantReforge: {
        specialName: { th: "คมดาบ", en: "Blade" },
        specialLines: [
          line(
            "(ปริมาณความเสียหายเพิ่มขึ้น {0}%, สูงขึ้นเพิ่มเติม {1}% ของจดจ่อ)({2} วิ)",
            "(Damage increased by {0}%, further increased by {1}% of Concentration)({2} sec.)",
            ["70", "80", "5"],
          ),
          line("ใช้อีกภายใน {0} วิ", "Cooldown Time {0} seconds", ["9"]),
          line("ใช้กับ : ตัวเอง", "Applies to: Self"),
        ],
        genericLines: [
          line(
            "เพิ่มพลังโจมตี, พลังป้องกันทั่วไปทั้งหมด +{0}%",
            "Increases All Basic Attacks and Defenses by {0}%",
            ["32"],
          ),
        ],
        specialMaxValues: ["70", "80", "5", "9"],
        genericMaxValues: ["32"],
      },
    }),
  },
];

export function getCtp(id: string) {
  return ctps.find((ctp) => ctp.id === id);
}

export function tText(text: LocaleText, locale: string) {
  return locale === "th" ? text.th : text.en;
}

export function formatStatLine(stat: StatLine, locale: string) {
  let text = tText(stat.text, locale);
  stat.values.forEach((value, index) => {
    text = text.replace(`{${index}}`, value);
  });
  return { text, values: stat.values };
}
