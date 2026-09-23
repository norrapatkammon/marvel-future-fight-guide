"use client";

import Image from "next/image";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  ctps,
  focusLabels,
  formatStatLine,
  getCtp,
  getCtpImage,
  tText,
  tierLabels,
  type Ctp,
  type CtpTier,
  type StatLine,
} from "@/data/ctps";

const tiers: CtpTier[] = ["regular", "mighty", "brilliant"];

function isCtpTier(value: string | null): value is CtpTier {
  return value === "regular" || value === "mighty" || value === "brilliant";
}

function getCtpIdFromPath(pathname: string) {
  const match = pathname.match(/^\/ctps\/([^/]+)$/);
  return match?.[1] && getCtp(match[1]) ? match[1] : undefined;
}

function hrefForCtp(id: string, tier: CtpTier) {
  return tier === "regular" ? `/ctps/${id}` : `/ctps/${id}?tier=${tier}`;
}

function StatLines({ lines, locale }: { lines: StatLine[]; locale: string }) {
  return (
    <ul className="space-y-1.5 text-sm leading-relaxed text-[#cbd5e1]">
      {lines.map((line, index) => {
        const formatted = formatStatLine(line, locale);
        const parts = tText(line.text, locale).split(/(\{\d+\})/g);
        return (
          <li key={`${formatted.text}-${index}`}>
            {parts.map((part, partIndex) => {
              const match = part.match(/^\{(\d+)\}$/);
              if (match) {
                return (
                  <strong key={partIndex} className="font-bold text-white">
                    {line.values[Number(match[1])]}
                  </strong>
                );
              }
              return <span key={partIndex}>{part}</span>;
            })}
          </li>
        );
      })}
    </ul>
  );
}

function DetailCard({
  ctp,
  tier,
  onTierChange,
}: {
  ctp: Ctp;
  tier: CtpTier;
  onTierChange: (tier: CtpTier) => void;
}) {
  const locale = useLocale();
  const t = useTranslations("Ctps");
  const tierData = ctp.tiers[tier];

  return (
    <article className="overflow-hidden rounded-2xl border border-[#243049] bg-[#121826]">
      <div className="flex flex-col gap-4 border-b border-[#243049] p-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-2.5 py-1 text-xs font-semibold text-white"
              style={{ backgroundColor: ctp.accent }}
            >
              {tText(focusLabels[ctp.focus], locale)}
            </span>
          </div>
          <h2 className="text-2xl font-black uppercase italic tracking-tight text-white sm:text-3xl">
            {tText(ctp.name, locale)}
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-[#94a3b8]">
            {tText(ctp.description, locale)}
          </p>
          <p className="max-w-3xl text-sm leading-relaxed text-[#94a3b8]">
            <strong className="text-white">{t("reforged")}: </strong>
            {tText(ctp.reforgedNote, locale)}
          </p>
        </div>
        <div className="mx-auto flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-[#0a101c] sm:mx-0">
          <Image
            src={getCtpImage(ctp.id)}
            alt={tText(ctp.name, locale)}
            width={96}
            height={96}
            className="h-24 w-24 object-contain"
            priority
          />
        </div>
      </div>

      <div className="space-y-6 p-5">
        <div className="flex flex-wrap gap-2">
          {tiers.map((item) => {
            const active = item === tier;
            return (
              <button
                key={item}
                type="button"
                onClick={() => onTierChange(item)}
                className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? item === "mighty"
                      ? "border-orange-400 bg-orange-500/20 text-orange-300"
                      : item === "brilliant"
                        ? "border-[#c026d3] bg-[#c026d3] text-white"
                        : "border-[#c026d3] bg-[#c026d3] text-white"
                    : "border-[#243049] text-[#94a3b8] hover:text-white"
                }`}
              >
                {tText(tierLabels[item], locale)}
              </button>
            );
          })}
        </div>

        <section>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
            {t("statsMax")}
          </h3>
          <StatLines lines={tierData.stats} locale={locale} />
        </section>

        <section>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
            {t("reforgeStats")}
          </h3>
          {!tierData.reforge ? (
            <p className="text-sm italic text-[#64748b]">{t("reforgeHint")}</p>
          ) : (
            <div className="space-y-4 text-sm">
              <div>
                <p className="mb-1 font-semibold text-[#86efac]">
                  {t("special")}
                  {tierData.reforge.specialName
                    ? `: ${tText(tierData.reforge.specialName, locale)}`
                    : ""}
                </p>
                <StatLines lines={tierData.reforge.specialLines} locale={locale} />
              </div>
              <div>
                <p className="mb-1 font-semibold text-[#93c5fd]">{t("generic")}</p>
                <StatLines lines={tierData.reforge.genericLines} locale={locale} />
              </div>
            </div>
          )}
        </section>

        <section>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
            {t("acquisition")}
          </h3>
          <ul className="space-y-1 text-sm text-[#94a3b8]">
            {tierData.acquisition.map((item) => (
              <li key={item.en}>{tText(item, locale)}</li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}

function CtpExplorerInner({ initialId }: { initialId?: string }) {
  const t = useTranslations("Ctps");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathId = getCtpIdFromPath(pathname);
  const tierFromUrl = searchParams.get("tier");

  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(
    pathId ?? initialId ?? ctps[0]?.id ?? "",
  );
  const [tier, setTier] = useState<CtpTier>(
    isCtpTier(tierFromUrl) ? tierFromUrl : "regular",
  );

  // Keep selection when locale changes (URL remounts the page).
  useEffect(() => {
    if (pathId) {
      setSelectedId(pathId);
    }
  }, [pathId]);

  useEffect(() => {
    setTier(isCtpTier(tierFromUrl) ? tierFromUrl : "regular");
  }, [tierFromUrl]);

  // On bare /ctps, put the current pick in the URL so language switch keeps it.
  useEffect(() => {
    if (pathname !== "/ctps") return;
    const id = selectedId || ctps[0]?.id;
    if (id) router.replace(hrefForCtp(id, tier));
    // Only when the path is the list page — not when selectedId changes on a detail URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ctps;
    return ctps.filter((ctp) => {
      const name = tText(ctp.name, locale).toLowerCase();
      const description = tText(ctp.description, locale).toLowerCase();
      const acquisition = Object.values(ctp.tiers)
        .flatMap((tierData) =>
          tierData.acquisition.map((item) => tText(item, locale)),
        )
        .join(" ")
        .toLowerCase();
      return (
        name.includes(q) ||
        description.includes(q) ||
        acquisition.includes(q) ||
        ctp.id.includes(q)
      );
    });
  }, [locale, query]);

  useEffect(() => {
    if (!filtered.some((ctp) => ctp.id === selectedId) && filtered[0]) {
      const nextId = filtered[0].id;
      setSelectedId(nextId);
      setTier("regular");
      router.replace(hrefForCtp(nextId, "regular"));
    }
  }, [filtered, selectedId, router]);

  function selectCtp(id: string) {
    setSelectedId(id);
    setTier("regular");
    router.replace(hrefForCtp(id, "regular"));
  }

  function selectTier(nextTier: CtpTier) {
    setTier(nextTier);
    const id = selectedId || pathId || ctps[0]?.id;
    if (id) router.replace(hrefForCtp(id, nextTier));
  }

  const selected = filtered.find((ctp) => ctp.id === selectedId) ?? filtered[0];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#243049] bg-[#151c2c] text-[#e879f9]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M3 8l4 3 5-7 5 7 4-3v11H3V8z" />
              </svg>
            </span>
            <h1 className="text-3xl font-black italic tracking-tight text-white">
              {t("title")}
            </h1>
          </div>
          <p className="text-sm text-[#94a3b8]">{t("subtitle")}</p>
        </div>
        <p className="text-sm font-semibold text-[#94a3b8]">
          {t("showing", { count: filtered.length, total: ctps.length })}
        </p>
      </div>

      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t("searchFull")}
        className="w-full rounded-xl border border-[#243049] bg-[#121826] px-4 py-3 text-sm text-white outline-none ring-[#c026d3] placeholder:text-[#64748b] focus:ring-2"
      />

      {filtered.length === 0 ? (
        <p className="text-[#94a3b8]">{t("empty")}</p>
      ) : (
        <>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filtered.map((ctp) => {
              const active = ctp.id === selected?.id;
              return (
                <button
                  key={ctp.id}
                  type="button"
                  onClick={() => selectCtp(ctp.id)}
                  className={`shrink-0 rounded-xl border p-2 transition ${
                    active
                      ? "border-[#c026d3] bg-[#2a1840] shadow-[0_0_0_1px_#c026d3]"
                      : "border-[#243049] bg-[#121826] hover:border-[#475569]"
                  }`}
                  title={tText(ctp.name, locale)}
                >
                  <Image
                    src={getCtpImage(ctp.id)}
                    alt={tText(ctp.name, locale)}
                    width={56}
                    height={56}
                    className="h-14 w-14 object-contain"
                  />
                </button>
              );
            })}
          </div>

          {selected && (
            <DetailCard ctp={selected} tier={tier} onTierChange={selectTier} />
          )}
        </>
      )}
    </div>
  );
}

export function CtpExplorer({ initialId }: { initialId?: string }) {
  return (
    <Suspense fallback={null}>
      <CtpExplorerInner initialId={initialId} />
    </Suspense>
  );
}
