import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <div className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          {t("brand")}
        </p>
        <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          {t("headline")}
        </h1>
        <p className="max-w-xl text-lg text-[var(--muted)]">{t("subhead")}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/characters"
            className="rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {t("ctaCharacters")}
          </Link>
          <Link
            href="/updates"
            className="rounded-md border border-[var(--line)] bg-[var(--panel)] px-4 py-2.5 text-sm font-semibold transition hover:border-[var(--accent)]"
          >
            {t("ctaUpdates")}
          </Link>
          <Link
            href="/teams"
            className="rounded-md border border-[var(--line)] bg-[var(--panel)] px-4 py-2.5 text-sm font-semibold transition hover:border-[var(--accent)]"
          >
            {t("ctaTeams")}
          </Link>
          <Link
            href="/guides"
            className="rounded-md border border-[var(--line)] bg-[var(--panel)] px-4 py-2.5 text-sm font-semibold transition hover:border-[var(--accent)]"
          >
            {t("ctaGuides")}
          </Link>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[linear-gradient(145deg,#2a1840,#121826)] p-8 text-white shadow-lg">
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[var(--accent)]/30 blur-2xl" />
        <p className="relative text-sm uppercase tracking-[0.18em] text-white/70">
          Marvel Future Fight
        </p>
        <p className="relative mt-4 text-3xl font-bold leading-snug">
          Characters · Updates · Teams
        </p>
        <p className="relative mt-4 text-sm text-white/75">
          TH / EN knowledge base
        </p>
      </div>
    </section>
  );
}
