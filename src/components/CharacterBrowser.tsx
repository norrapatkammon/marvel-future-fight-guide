"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  characters,
  roleLabels,
  tText,
  typeLabels,
  type CharacterRole,
  type CharacterTier,
  type CharacterType,
} from "@/data/characters";

const roles: CharacterRole[] = ["blast", "combat", "speed", "universal"];
const types: CharacterType[] = ["hero", "villain", "antihero"];
const tiers: CharacterTier[] = ["S", "A", "B", "C"];

type SortKey = "name" | "tier";

const tierRank: Record<CharacterTier, number> = { S: 0, A: 1, B: 2, C: 3 };

export function CharacterBrowser() {
  const t = useTranslations("Characters");
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<CharacterRole | "all">("all");
  const [type, setType] = useState<CharacterType | "all">("all");
  const [tier, setTier] = useState<CharacterTier | "all">("all");
  const [sort, setSort] = useState<SortKey>("name");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = characters.filter((character) => {
      const name = tText(character.name, locale).toLowerCase();
      const matchesQuery = !q || name.includes(q) || character.id.includes(q);
      const matchesRole = role === "all" || character.role === role;
      const matchesType = type === "all" || character.type === type;
      const matchesTier = tier === "all" || character.tier === tier;
      return matchesQuery && matchesRole && matchesType && matchesTier;
    });

    return list.sort((a, b) => {
      if (sort === "tier") {
        const byTier = tierRank[a.tier] - tierRank[b.tier];
        if (byTier !== 0) return byTier;
      }
      return tText(a.name, locale).localeCompare(tText(b.name, locale), locale);
    });
  }, [locale, query, role, sort, tier, type]);

  const hasFilters =
    query.trim() !== "" || role !== "all" || type !== "all" || tier !== "all";

  function clearFilters() {
    setQuery("");
    setRole("all");
    setType("all");
    setTier("all");
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("search")}
          className="rounded-md border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm outline-none ring-[var(--accent)] focus:ring-2 lg:col-span-2"
        />
        <select
          value={role}
          onChange={(event) => setRole(event.target.value as CharacterRole | "all")}
          className="rounded-md border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm"
        >
          <option value="all">{t("allRoles")}</option>
          {roles.map((item) => (
            <option key={item} value={item}>
              {tText(roleLabels[item], locale)}
            </option>
          ))}
        </select>
        <select
          value={type}
          onChange={(event) => setType(event.target.value as CharacterType | "all")}
          className="rounded-md border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm"
        >
          <option value="all">{t("allTypes")}</option>
          {types.map((item) => (
            <option key={item} value={item}>
              {tText(typeLabels[item], locale)}
            </option>
          ))}
        </select>
        <select
          value={tier}
          onChange={(event) => setTier(event.target.value as CharacterTier | "all")}
          className="rounded-md border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm"
        >
          <option value="all">{t("allTiers")}</option>
          {tiers.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[var(--muted)]">
          {t("showing", { count: filtered.length, total: characters.length })}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="rounded-md border border-[var(--line)] bg-[var(--panel)] px-3 py-1.5 text-sm"
          >
            <option value="name">{t("sortName")}</option>
            <option value="tier">{t("sortTier")}</option>
          </select>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-md border border-[var(--line)] px-3 py-1.5 text-sm text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--foreground)]"
            >
              {t("clearFilters")}
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-[var(--muted)]">{t("empty")}</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((character) => (
            <li key={character.id}>
              <Link
                href={`/characters/${character.id}`}
                className="flex h-full flex-col rounded-lg border border-[var(--line)] bg-[var(--panel)] p-4 transition hover:border-[var(--accent)]"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h2 className="text-base font-semibold leading-snug">
                    {tText(character.name, locale)}
                  </h2>
                  <span className="shrink-0 rounded bg-[var(--accent-soft)] px-2 py-0.5 text-xs font-semibold text-[var(--accent)]">
                    {character.tier}
                  </span>
                </div>
                <p className="mb-3 line-clamp-2 flex-1 text-sm text-[var(--muted)]">
                  {tText(character.summary, locale)}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded border border-[var(--line)] px-2 py-0.5 text-[11px]">
                    {tText(roleLabels[character.role], locale)}
                  </span>
                  <span className="rounded border border-[var(--line)] px-2 py-0.5 text-[11px]">
                    {tText(typeLabels[character.type], locale)}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
