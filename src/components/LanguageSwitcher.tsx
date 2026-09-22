"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(nextLocale: Locale) {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className="flex items-center gap-1 rounded-md border border-[var(--line)] bg-[var(--panel)] p-1 text-sm">
      {routing.locales.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => switchLocale(item)}
          className={`rounded px-2.5 py-1 font-medium transition ${
            locale === item
              ? "bg-[var(--accent)] text-white"
              : "text-[var(--muted)] hover:text-[var(--foreground)]"
          }`}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
