"use client";

import { useState, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  getCharacter,
  tText as charText,
} from "@/data/characters";
import {
  formatRelativeDate,
  formatUpdateDate,
  getUpdate,
  getUpdateCounts,
  getUpdateSections,
  roleColors,
  sectionMeta,
  typeColors,
  type GameUpdate,
  type UpdateEntry,
  type UpdateMediaTab,
  type UpdateSectionKey,
} from "@/data/updates";

function IconUsers() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M16 11a3 3 0 1 0-2.8-4M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4 19a4 4 0 0 1 8 0M12 19a4 4 0 0 1 8 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconShirt() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 4 7 7 3 9l2 11h14l2-11-4-2-2-3-2 1.5L9 4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconUp() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 19V5M6 11l6-6 6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconNews() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 5h11a2 2 0 0 1 2 2v12H7a2 2 0 0 1-2-2V5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M8 9h7M8 13h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconDoc() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 3h7l4 4v14H7V3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M14 3v4h4M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function sectionIcon(key: UpdateSectionKey) {
  if (key === "characters") return <IconUsers />;
  if (key === "uniforms") return <IconShirt />;
  if (key === "transcended") return <IconSpark />;
  return <IconUp />;
}

function Avatar({
  name,
  role,
  type,
}: {
  name: string;
  role: keyof typeof roleColors;
  type: keyof typeof typeColors;
}) {
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ring-2 ring-[#2a3550]"
      style={{
        background: `linear-gradient(145deg, ${roleColors[role]}, ${typeColors[type]})`,
      }}
    >
      {initials}
    </div>
  );
}

function AttrDots({
  role,
  type,
}: {
  role: keyof typeof roleColors;
  type: keyof typeof typeColors;
}) {
  return (
    <div className="mt-1.5 flex items-center gap-1.5">
      <span
        className="h-4 w-4 rounded-full"
        style={{ backgroundColor: roleColors[role] }}
        title={role}
      />
      <span
        className="h-4 w-4 rounded-full"
        style={{ backgroundColor: typeColors[type] }}
        title={type}
      />
      <span className="h-4 w-4 rounded-full bg-[#64748b]" />
      <span className="h-4 w-4 rounded-full bg-[#8b5cf6]" />
    </div>
  );
}

function EntryCard({ entry, locale }: { entry: UpdateEntry; locale: string }) {
  const character = getCharacter(entry.characterId);
  if (!character) return null;

  const name = charText(character.name, locale);

  return (
    <Link
      href={`/characters/${character.id}`}
      className="flex items-center gap-3 rounded-xl border border-[#243049] bg-[#151c2c] p-3 transition hover:border-[#c026d3]/60 hover:bg-[#1a2336]"
    >
      <Avatar name={name} role={character.role} type={character.type} />
      <div className="min-w-0">
        <p className="truncate text-sm font-bold uppercase tracking-wide text-white">
          {name}
        </p>
        {entry.subtitle && (
          <p className="truncate text-xs text-[#94a3b8]">
            {locale === "th" ? entry.subtitle.th : entry.subtitle.en}
          </p>
        )}
        <AttrDots role={character.role} type={character.type} />
      </div>
    </Link>
  );
}

function Accordion({
  title,
  count,
  icon,
  defaultOpen = true,
  children,
}: {
  title: string;
  count: number;
  icon: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="overflow-hidden rounded-xl border border-[#243049] bg-[#121826]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
      >
        <span className="text-[#67e8f9]">{icon}</span>
        <span className="flex-1 text-sm font-bold uppercase tracking-wider text-white">
          {title}
        </span>
        <span className="text-sm text-[#94a3b8]">{count}</span>
        <span
          className={`text-[#94a3b8] transition ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>
      {open && <div className="border-t border-[#243049] p-3">{children}</div>}
    </section>
  );
}

function CountBadges({ update, locale }: { update: GameUpdate; locale: string }) {
  const counts = getUpdateCounts(update);
  const keys: UpdateSectionKey[] = [
    "characters",
    "uniforms",
    "tier3",
    "tier4",
    "transcended",
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {keys
        .filter((key) => counts[key] > 0)
        .map((key) => (
          <span
            key={key}
            className="rounded-full bg-[#2a1840] px-3 py-1 text-xs font-semibold text-[#e879f9]"
          >
            {counts[key]}{" "}
            {locale === "th"
              ? sectionMeta[key].countLabel.th
              : sectionMeta[key].countLabel.en}
          </span>
        ))}
    </div>
  );
}

function MediaGallery({ update }: { update: GameUpdate }) {
  const t = useTranslations("Updates");
  const [tab, setTab] = useState<UpdateMediaTab>("banners");
  const tabs: UpdateMediaTab[] = ["banners", "appIcon", "keyArt"];
  const items = update.media?.[tab] ?? [];

  return (
    <section className="overflow-hidden rounded-xl border border-[#243049] bg-[#121826]">
      <div className="flex border-b border-[#243049]">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`flex-1 px-3 py-3 text-sm font-semibold transition ${
              tab === item
                ? "bg-[#c026d3] text-white"
                : "text-[#94a3b8] hover:text-white"
            }`}
          >
            {t(`media.${item}`)}
          </button>
        ))}
      </div>
      <div className="flex gap-3 overflow-x-auto p-4">
        {items.length === 0 ? (
          <p className="text-sm text-[#94a3b8]">{t("noMedia")}</p>
        ) : (
          items.map((item, index) => (
            <div
              key={`${tab}-${item}-${index}`}
              className="relative h-28 w-48 shrink-0 overflow-hidden rounded-lg border border-[#243049]"
              style={{ background: update.bannerGradient }}
            >
              <span className="absolute left-2 top-2 rounded-full bg-[#c026d3] px-2 py-0.5 text-[10px] font-bold text-white">
                v{update.version}
              </span>
              <span className="absolute bottom-2 left-2 text-[10px] uppercase tracking-wide text-white/80">
                {item}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export function UpdateDetailView({ updateId }: { updateId: string }) {
  const locale = useLocale();
  const t = useTranslations("Updates");
  const update = getUpdate(updateId);

  if (!update) return null;

  const sections = getUpdateSections(update);
  const related = (update.relatedIds ?? [])
    .map((id) => getUpdate(id))
    .filter(Boolean) as GameUpdate[];
  const navItems = [update, ...related.filter((item) => item.id !== update.id)].slice(
    0,
    4,
  );

  return (
    <div className="-mx-4 -mt-8 space-y-5 bg-[#0b1220] px-4 py-6 text-white sm:-mx-0 sm:rounded-2xl sm:border sm:border-[#243049] sm:px-5">
      <Link
        href="/updates"
        className="inline-flex text-sm text-[#e879f9] hover:underline"
      >
        ← {t("back")}
      </Link>

      <div
        className="relative overflow-hidden rounded-2xl border border-[#243049]"
        style={{ background: update.bannerGradient }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.12),transparent_45%)]" />
        <div className="relative flex min-h-48 flex-col justify-between p-5 sm:min-h-56 sm:p-6">
          <span className="w-fit rounded-full bg-[#c026d3] px-3 py-1 text-xs font-bold text-white">
            v{update.version}
          </span>
          <div className="mt-10 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/80">
              Marvel Future Fight
            </p>
            <div className="mx-auto mt-2 h-px w-24 bg-white/40" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl font-black uppercase italic tracking-tight text-white sm:text-4xl">
          {locale === "th" ? update.title.th : update.title.en}
        </h1>
        <CountBadges update={update} locale={locale} />
        <div className="flex flex-wrap gap-4 text-sm text-[#94a3b8]">
          <span className="inline-flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            {formatUpdateDate(update.date, locale)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 8v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            {formatRelativeDate(update.date, locale)}
          </span>
        </div>
      </div>

      {navItems.length > 1 && (
        <div className="flex gap-2 overflow-x-auto rounded-xl border border-[#243049] bg-[#121826] p-2">
          {navItems.map((item) => {
            const active = item.id === update.id;
            return (
              <Link
                key={item.id}
                href={`/updates/${item.id}`}
                className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  active
                    ? "bg-[#2a1840] text-[#e879f9]"
                    : "text-[#94a3b8] hover:text-white"
                }`}
              >
                {item.version} ·{" "}
                {locale === "th" ? item.title.th : item.title.en}
              </Link>
            );
          })}
        </div>
      )}

      {sections.map((section) => (
        <Accordion
          key={section.key}
          title={
            locale === "th" ? section.meta.label.th : section.meta.label.en
          }
          count={section.items.length}
          icon={sectionIcon(section.key)}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {section.items.map((entry) => (
              <EntryCard
                key={`${section.key}-${entry.characterId}-${entry.subtitle?.en ?? ""}`}
                entry={entry}
                locale={locale}
              />
            ))}
          </div>
        </Accordion>
      ))}

      {update.bugle && update.bugle.length > 0 && (
        <Accordion
          title={t("bugle")}
          count={update.bugle.length}
          icon={<IconNews />}
        >
          <ul className="space-y-2">
            {update.bugle.map((item) => (
              <li key={item.title.en}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl border border-[#243049] bg-[#151c2c] px-4 py-3 transition hover:border-[#c026d3]/50"
                >
                  <span className="text-[#67e8f9]">
                    <IconDoc />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">
                      {locale === "th" ? item.title.th : item.title.en}
                    </p>
                    <p className="text-xs text-[#94a3b8]">
                      {formatUpdateDate(item.date, locale)}
                    </p>
                  </div>
                  <span className="text-[#94a3b8]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M14 5h5v5M19 5l-9 9M10 5H5v14h14v-5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Accordion>
      )}

      <MediaGallery update={update} />
    </div>
  );
}
