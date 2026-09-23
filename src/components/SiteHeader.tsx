"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function SiteHeader() {
  const t = useTranslations("Nav");
  const home = useTranslations("Home");

  const links = [
    { href: "/characters", label: t("characters") },
    { href: "/updates", label: t("updates") },
    { href: "/ctps", label: t("ctps") },
    { href: "/teams", label: t("teams") },
    { href: "/guides", label: t("guides") },
  ] as const;

  return (
    <header className="border-b border-[var(--line)] bg-[var(--panel)]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
          {home("brand")}
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--muted)] transition hover:text-[var(--foreground)]"
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
