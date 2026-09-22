import type { CharacterRole, CharacterType, LocaleText } from "./characters";

export type UpdateEntry = {
  characterId: string;
  subtitle?: LocaleText;
};

export type BugleLink = {
  title: LocaleText;
  date: string;
  href: string;
};

export type UpdateMediaTab = "banners" | "appIcon" | "keyArt";

export type GameUpdate = {
  id: string;
  version: string;
  date: string;
  title: LocaleText;
  summary: LocaleText;
  /** CSS gradient used as banner placeholder */
  bannerGradient: string;
  relatedIds?: string[];
  characters?: UpdateEntry[];
  uniforms?: UpdateEntry[];
  tier3?: UpdateEntry[];
  tier4?: UpdateEntry[];
  transcended?: UpdateEntry[];
  bugle?: BugleLink[];
  media?: Partial<Record<UpdateMediaTab, string[]>>;
};

export type UpdateSectionKey =
  | "characters"
  | "uniforms"
  | "tier3"
  | "tier4"
  | "transcended";

export const sectionMeta: Record<
  UpdateSectionKey,
  { label: LocaleText; countLabel: LocaleText }
> = {
  characters: {
    label: { th: "ตัวละคร", en: "Characters" },
    countLabel: { th: "ตัวละคร", en: "Characters" },
  },
  uniforms: {
    label: { th: "ยูนิฟอร์ม", en: "Uniforms" },
    countLabel: { th: "ยูนิฟอร์ม", en: "Uniforms" },
  },
  tier3: {
    label: { th: "Tier-3", en: "Tier-3" },
    countLabel: { th: "Tier-3", en: "Tier-3" },
  },
  tier4: {
    label: { th: "Tier-4", en: "Tier-4" },
    countLabel: { th: "Tier-4", en: "Tier-4" },
  },
  transcended: {
    label: { th: "Transcended Potential", en: "Transcended Potential" },
    countLabel: { th: "Transcended", en: "Transcended Potential" },
  },
};

export const roleColors: Record<CharacterRole, string> = {
  blast: "#3b82f6",
  combat: "#ef4444",
  speed: "#eab308",
  universal: "#a855f7",
};

export const typeColors: Record<CharacterType, string> = {
  hero: "#22c55e",
  villain: "#f43f5e",
  antihero: "#f97316",
};

export const updates: GameUpdate[] = [
  {
    id: "12-2",
    version: "12.2",
    date: "2026-09-02",
    title: { th: "ANNIHILATION", en: "ANNIHILATION" },
    summary: {
      th: "อัปเดต Annihilation พร้อมตัวละครใหม่ ยูนิฟอร์ม และ Tier advancements",
      en: "Annihilation update with new characters, uniforms, and tier advancements.",
    },
    bannerGradient:
      "linear-gradient(135deg, #1a0a2e 0%, #4a1a6b 35%, #7c2d9e 60%, #1e1b4b 100%)",
    relatedIds: ["12-2-5", "12-1"],
    characters: [
      { characterId: "thanos", subtitle: { th: "Annihilation", en: "Annihilation" } },
      { characterId: "ultron", subtitle: { th: "Annihilation", en: "Annihilation" } },
    ],
    uniforms: [
      {
        characterId: "scarlet-witch",
        subtitle: { th: "Princess Tsukimi", en: "Princess Tsukimi" },
      },
      {
        characterId: "magneto",
        subtitle: { th: "Annihilation Wave", en: "Annihilation Wave" },
      },
      {
        characterId: "captain-marvel",
        subtitle: { th: "Cosmic Strike", en: "Cosmic Strike" },
      },
      {
        characterId: "vision",
        subtitle: { th: "Synthezoid War", en: "Synthezoid War" },
      },
    ],
    tier3: [
      { characterId: "black-widow", subtitle: { th: "Tier-3", en: "Tier-3" } },
      { characterId: "hulk", subtitle: { th: "Tier-3", en: "Tier-3" } },
    ],
    tier4: [
      { characterId: "thanos", subtitle: { th: "Tier-4", en: "Tier-4" } },
      { characterId: "doctor-strange", subtitle: { th: "Tier-4", en: "Tier-4" } },
      { characterId: "jean-grey", subtitle: { th: "Tier-4", en: "Tier-4" } },
      { characterId: "storm", subtitle: { th: "Tier-4", en: "Tier-4" } },
      { characterId: "wolverine", subtitle: { th: "Tier-4", en: "Tier-4" } },
    ],
    bugle: [
      {
        title: { th: "12.2 Datamines", en: "12.2 Datamines" },
        date: "2026-08-28",
        href: "#",
      },
      {
        title: {
          th: "12.2 Update Details - Annihilation",
          en: "12.2 Update Details - Annihilation",
        },
        date: "2026-09-02",
        href: "#",
      },
    ],
    media: {
      banners: ["banner-a", "banner-b", "banner-c"],
      appIcon: ["icon-a"],
      keyArt: ["art-a", "art-b"],
    },
  },
  {
    id: "12-2-5",
    version: "12.2.5",
    date: "2026-09-20",
    title: { th: "2026 Welcome Autumn", en: "2026 Welcome Autumn" },
    summary: {
      th: "แพตช์ย่อยต้อนรับฤดูใบไม้ร่วง พร้อมยูนิฟอร์มและอีเวนต์",
      en: "Minor autumn patch with uniforms and seasonal events.",
    },
    bannerGradient:
      "linear-gradient(135deg, #1c1917 0%, #78350f 40%, #a16207 70%, #292524 100%)",
    relatedIds: ["12-2", "12-1"],
    uniforms: [
      {
        characterId: "spider-man",
        subtitle: { th: "Autumn Web", en: "Autumn Web" },
      },
      {
        characterId: "loki",
        subtitle: { th: "Harvest Trickster", en: "Harvest Trickster" },
      },
    ],
    tier4: [
      { characterId: "loki", subtitle: { th: "Tier-4", en: "Tier-4" } },
    ],
    bugle: [
      {
        title: { th: "12.2.5 Patch Notes", en: "12.2.5 Patch Notes" },
        date: "2026-09-20",
        href: "#",
      },
    ],
    media: {
      banners: ["banner-a", "banner-b"],
      appIcon: ["icon-a"],
      keyArt: ["art-a"],
    },
  },
  {
    id: "12-1",
    version: "12.1",
    date: "2026-07-27",
    title: {
      th: "MARVEL STUDIOS' SPIDER-MAN: BRAND NEW DAY",
      en: "MARVEL STUDIOS' SPIDER-MAN: BRAND NEW DAY",
    },
    summary: {
      th: "อัปเดตธีม Spider-Man: Brand New Day พร้อมยูนิฟอร์มและ Tier-4",
      en: "Spider-Man: Brand New Day update with uniforms and Tier-4 advancements.",
    },
    bannerGradient:
      "linear-gradient(135deg, #0c1a2e 0%, #1e3a5f 30%, #b91c1c 65%, #111827 100%)",
    relatedIds: ["12-1-5", "12-2"],
    uniforms: [
      {
        characterId: "spider-man",
        subtitle: { th: "Brand New Day", en: "Brand New Day" },
      },
      {
        characterId: "hulk",
        subtitle: { th: "Street Smash", en: "Street Smash" },
      },
      {
        characterId: "black-panther",
        subtitle: { th: "Night Stalker", en: "Night Stalker" },
      },
      {
        characterId: "iron-man",
        subtitle: { th: "NYC Armor", en: "NYC Armor" },
      },
      {
        characterId: "captain-america",
        subtitle: { th: "New Day Shield", en: "New Day Shield" },
      },
    ],
    transcended: [
      {
        characterId: "ultron",
        subtitle: { th: "Transcended Potential", en: "Transcended Potential" },
      },
      {
        characterId: "vision",
        subtitle: { th: "Transcended Potential", en: "Transcended Potential" },
      },
    ],
    tier4: [
      { characterId: "spider-man", subtitle: { th: "Tier-4", en: "Tier-4" } },
      { characterId: "black-widow", subtitle: { th: "Tier-4", en: "Tier-4" } },
      { characterId: "black-panther", subtitle: { th: "Tier-4", en: "Tier-4" } },
    ],
    bugle: [
      {
        title: { th: "12.1 Datamines", en: "12.1 Datamines" },
        date: "2026-07-20",
        href: "#",
      },
      {
        title: {
          th: "12.1 Update Details - Brand New Day",
          en: "12.1 Update Details - Brand New Day",
        },
        date: "2026-07-27",
        href: "#",
      },
      {
        title: { th: "12.1 Uniform Preview", en: "12.1 Uniform Preview" },
        date: "2026-07-25",
        href: "#",
      },
    ],
    media: {
      banners: ["banner-a", "banner-b", "banner-c"],
      appIcon: ["icon-a", "icon-b"],
      keyArt: ["art-a", "art-b", "art-c"],
    },
  },
  {
    id: "12-1-5",
    version: "12.1.5",
    date: "2026-08-10",
    title: { th: "Sinister", en: "Sinister" },
    summary: {
      th: "แพตช์ย่อย Sinister ต่อจาก Brand New Day",
      en: "Sinister follow-up patch after Brand New Day.",
    },
    bannerGradient:
      "linear-gradient(135deg, #14532d 0%, #166534 40%, #052e16 100%)",
    relatedIds: ["12-1", "12-2"],
    uniforms: [
      {
        characterId: "magneto",
        subtitle: { th: "Sinister Scheme", en: "Sinister Scheme" },
      },
    ],
    tier3: [
      { characterId: "loki", subtitle: { th: "Tier-3", en: "Tier-3" } },
      { characterId: "thor", subtitle: { th: "Tier-3", en: "Tier-3" } },
    ],
    bugle: [
      {
        title: { th: "12.1.5 Sinister Notes", en: "12.1.5 Sinister Notes" },
        date: "2026-08-10",
        href: "#",
      },
    ],
    media: {
      banners: ["banner-a"],
      appIcon: ["icon-a"],
      keyArt: ["art-a"],
    },
  },
  {
    id: "11-6-0",
    version: "11.6.0",
    date: "2026-01-21",
    title: { th: "Mighty Machines", en: "Mighty Machines" },
    summary: {
      th: "อัปเดตเครื่องจักร พร้อม Tier-4 และยูนิฟอร์มใหม่",
      en: "Mighty Machines update with Tier-4s and new uniforms.",
    },
    bannerGradient:
      "linear-gradient(135deg, #0f172a 0%, #334155 45%, #64748b 100%)",
    relatedIds: ["12-1"],
    characters: [],
    uniforms: [
      {
        characterId: "ultron",
        subtitle: { th: "Mighty Machines", en: "Mighty Machines" },
      },
      {
        characterId: "vision",
        subtitle: { th: "Mighty Machines", en: "Mighty Machines" },
      },
    ],
    tier4: [
      { characterId: "ultron", subtitle: { th: "Tier-4", en: "Tier-4" } },
      { characterId: "vision", subtitle: { th: "Tier-4", en: "Tier-4" } },
    ],
    bugle: [
      {
        title: { th: "11.6.0 Update Details", en: "11.6.0 Update Details" },
        date: "2026-01-21",
        href: "#",
      },
    ],
    media: {
      banners: ["banner-a", "banner-b"],
      appIcon: ["icon-a"],
      keyArt: ["art-a"],
    },
  },
];

export function getUpdate(id: string) {
  return updates.find((update) => update.id === id);
}

export function getUpdatesSorted() {
  return [...updates].sort((a, b) => b.date.localeCompare(a.date));
}

export function formatUpdateDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "th" ? "th-TH" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function formatRelativeDate(date: string, locale: string) {
  const now = Date.now();
  const then = new Date(`${date}T00:00:00`).getTime();
  const diffDays = Math.round((then - now) / (1000 * 60 * 60 * 24));
  const rtf = new Intl.RelativeTimeFormat(locale === "th" ? "th" : "en", {
    numeric: "auto",
  });

  if (Math.abs(diffDays) < 7) return rtf.format(diffDays, "day");
  const weeks = Math.round(diffDays / 7);
  if (Math.abs(weeks) < 5) return rtf.format(weeks, "week");
  const months = Math.round(diffDays / 30);
  return rtf.format(months, "month");
}

export function getUpdateCounts(update: GameUpdate) {
  return {
    characters: update.characters?.length ?? 0,
    uniforms: update.uniforms?.length ?? 0,
    tier3: update.tier3?.length ?? 0,
    tier4: update.tier4?.length ?? 0,
    transcended: update.transcended?.length ?? 0,
  };
}

export function getUpdateSections(update: GameUpdate) {
  const keys: UpdateSectionKey[] = [
    "characters",
    "uniforms",
    "tier3",
    "tier4",
    "transcended",
  ];
  return keys
    .map((key) => ({
      key,
      items: update[key] ?? [],
      meta: sectionMeta[key],
    }))
    .filter((section) => section.items.length > 0);
}

export function tText(text: LocaleText, locale: string) {
  return locale === "th" ? text.th : text.en;
}
