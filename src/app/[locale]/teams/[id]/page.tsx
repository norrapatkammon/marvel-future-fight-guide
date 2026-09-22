import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCharacter, tText } from "@/data/characters";
import { getTeam, modeLabels, teams } from "@/data/teams";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export function generateStaticParams() {
  return teams.map((team) => ({ id: team.id }));
}

export default async function TeamDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const team = getTeam(id);
  if (!team) notFound();

  const t = await getTranslations("Teams");

  return (
    <article className="space-y-8">
      <Link href="/teams" className="text-sm text-[var(--accent)] hover:underline">
        ← {t("back")}
      </Link>

      <header className="space-y-3 rounded-xl border border-[var(--line)] bg-[var(--panel)] p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
          {t("mode")}: {tText(modeLabels[team.mode], locale)}
        </p>
        <h1 className="text-3xl font-bold">{tText(team.name, locale)}</h1>
      </header>

      <section>
        <h2 className="mb-3 text-xl font-semibold">{t("why")}</h2>
        <p className="rounded-md border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-[var(--muted)]">
          {tText(team.why, locale)}
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">{t("members")}</h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {team.characterIds.map((characterId) => {
            const character = getCharacter(characterId);
            if (!character) return null;
            return (
              <li key={characterId}>
                <Link
                  href={`/characters/${character.id}`}
                  className="block rounded-md border border-[var(--line)] bg-[var(--panel)] px-4 py-3 transition hover:border-[var(--accent)]"
                >
                  {tText(character.name, locale)}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </article>
  );
}
