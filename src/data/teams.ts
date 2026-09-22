import type { LocaleText } from "./characters";

export type GameMode =
  | "story"
  | "timeline"
  | "world-boss"
  | "alliance";

export type Team = {
  id: string;
  name: LocaleText;
  mode: GameMode;
  characterIds: string[];
  why: LocaleText;
};

export const modeLabels: Record<GameMode, LocaleText> = {
  story: { th: "สตอรี่", en: "Story" },
  timeline: { th: "ไทม์ไลน์แบทเทิล", en: "Timeline Battle" },
  "world-boss": { th: "เวิลด์บอส", en: "World Boss" },
  alliance: { th: "อัลลายแอนซ์", en: "Alliance" },
};

export const teams: Team[] = [
  {
    id: "starter-story",
    name: {
      th: "ทีมเริ่มต้นสำหรับ Story",
      en: "Starter Story Team",
    },
    mode: "story",
    characterIds: ["iron-man", "captain-america", "spider-man"],
    why: {
      th: "ครบทั้งดาเมจไกล แทงก์ และตัวเร็ว เคลียร์ด่านต้นเกมได้ลื่น",
      en: "Covers ranged damage, tanking, and mobility for early story stages.",
    },
  },
  {
    id: "timeline-control",
    name: {
      th: "ทีมควบคุม Timeline",
      en: "Timeline Control Team",
    },
    mode: "timeline",
    characterIds: ["doctor-strange", "loki", "luna-snow"],
    why: {
      th: "เน้นบัฟ ดีบัฟ และสกิลคุม ทำให้ชนะรอบสั้นได้ง่ายขึ้น",
      en: "Focuses on buffs, debuffs, and control for shorter Timeline rounds.",
    },
  },
  {
    id: "world-boss-burst",
    name: {
      th: "ทีมยิงบอส",
      en: "World Boss Burst Team",
    },
    mode: "world-boss",
    characterIds: ["captain-marvel", "scarlet-witch", "jean-grey"],
    why: {
      th: "เน้นดาเมจระเบิดจากบลาสต์แรงๆ เพื่อกดบอสในเวลาที่จำกัด",
      en: "High-burst blasters to pressure bosses under a timer.",
    },
  },
  {
    id: "alliance-xmen",
    name: {
      th: "ทีม X-Men Alliance",
      en: "X-Men Alliance Team",
    },
    mode: "alliance",
    characterIds: ["wolverine", "storm", "magneto"],
    why: {
      th: "สายมิวแทนต์ครบทั้งแทงก์ คุมกลุ่ม และดาเมจวงกว้าง",
      en: "Mutant core covering tanking, group control, and AoE damage.",
    },
  },
];

export function getTeam(id: string) {
  return teams.find((team) => team.id === id);
}

export function getTeamsForCharacter(characterId: string) {
  return teams.filter((team) => team.characterIds.includes(characterId));
}
