"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  formatRelativeDate,
  formatUpdateDate,
  getUpdateCounts,
  getUpdatesSorted,
  type GameUpdate,
  type UpdateSectionKey,
} from "@/data/updates";

function CountBadges({ update, locale }: { update: GameUpdate; locale: string }) {
  const counts = getUpdateCounts(update);
  const keys: UpdateSectionKey[] = [
    "characters",
    "uniforms",
    "tier3",
    "tier4",
    "transcended",
  ];
  const labels: Record<UpdateSectionKey, { th: string; en: string }> = {
    characters: { th: "ตัวละคร", en: "Characters" },
    uniforms: { th: "ยูนิฟอร์ม", en: "Uniforms" },
    tier3: { th: "Tier-3", en: "Tier-3" },
    tier4: { th: "Tier-4", en: "Tier-4" },
    transcended: { th: "Transcended", en: "Transcended" },
  };

  return (
    <div className="flex flex-wrap gap-2">
      {keys
        .filter((key) => counts[key] > 0)
        .map((key) => (
          <span
            key={key}
            className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]"
          >
            {counts[key]} {locale === "th" ? labels[key].th : labels[key].en}
          </span>
        ))}
    </div>
  );
}

export function UpdatesBrowser() {
  const t = useTranslations("Updates");
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("all");

  const years = Array.from(
    new Set(getUpdatesSorted().map((item) => item.date.slice(0, 4))),
  ).sort((a, b) => b.localeCompare(a));

  const filtered = getUpdatesSorted().filter((update) => {
    const q = query.trim().toLowerCase();
    const title = (locale === "th" ? update.title.th : update.title.en).toLowerCase();
    const matchesQuery =
      !q || title.includes(q) || update.version.toLowerCase().includes(q);
    const matchesYear = year === "all" || update.date.startsWith(year);
    return matchesQuery && matchesYear;
  });

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("search")}
          className="rounded-lg border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm outline-none ring-[var(--accent)] placeholder:text-[var(--muted)] focus:ring-2 sm:col-span-2"
        />
        <select
          value={year}
          onChange={(event) => setYear(event.target.value)}
          className="rounded-lg border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm"
        >
          <option value="all">{t("allYears")}</option>
          {years.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-[var(--muted)]">
        {t("showing", { count: filtered.length })}
      </p>

      {filtered.length === 0 ? (
        <p className="text-[var(--muted)]">{t("empty")}</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((update) => (
            <li key={update.id}>
              <Link
                href={`/updates/${update.id}`}
                className="block overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)] transition hover:border-[var(--accent)]/50"
              >
                <div
                  className="relative h-28"
                  style={{ background: update.bannerGradient }}
                >
                  <span className="absolute left-3 top-3 rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-xs font-bold text-white">
                    v{update.version}
                  </span>
                </div>
                <div className="space-y-3 p-4">
                  <h2 className="text-xl font-black uppercase italic">
                    {locale === "th" ? update.title.th : update.title.en}
                  </h2>
                  <CountBadges update={update} locale={locale} />
                  <p className="text-sm text-[var(--muted)]">
                    {formatUpdateDate(update.date, locale)} ·{" "}
                    {formatRelativeDate(update.date, locale)}
                  </p>
                  <p className="text-sm">
                    {locale === "th" ? update.summary.th : update.summary.en}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
