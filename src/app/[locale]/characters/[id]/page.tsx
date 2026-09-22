import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  characters,
  getCharacter,
  roleLabels,
  tText,
  typeLabels,
} from "@/data/characters";
import { getTeamsForCharacter } from "@/data/teams";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export function generateStaticParams() {
  return characters.map((character) => ({ id: character.id }));
}

export default async function CharacterDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const character = getCharacter(id);
  if (!character) notFound();

  const t = await getTranslations("Characters");
  const common = await getTranslations("Common");
  const relatedTeams = getTeamsForCharacter(character.id);

  return (
    <article className="space-y-8">
      <Link href="/characters" className="text-sm text-[var(--accent)] hover:underline">
        ← {t("back")}
      </Link>

      <header className="space-y-3 rounded-xl border border-[var(--line)] bg-[var(--panel)] p-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold">{tText(character.name, locale)}</h1>
          <span className="rounded bg-[var(--accent-soft)] px-2 py-1 text-sm font-semibold text-[var(--accent)]">
            {character.tier}
          </span>
        </div>
        <p className="max-w-2xl text-[var(--muted)]">
          {tText(character.summary, locale)}
        </p>
        <dl className="flex flex-wrap gap-4 text-sm">
          <div>
            <dt className="text-[var(--muted)]">{common("role")}</dt>
            <dd className="font-medium">{tText(roleLabels[character.role], locale)}</dd>
          </div>
          <div>
            <dt className="text-[var(--muted)]">{common("type")}</dt>
            <dd className="font-medium">{tText(typeLabels[character.type], locale)}</dd>
          </div>
        </dl>
      </header>

      <section>
        <h2 className="mb-3 text-xl font-semibold">{t("skills")}</h2>
        <ul className="space-y-2">
          {character.skills.map((skill) => (
            <li
              key={skill.en}
              className="rounded-md border border-[var(--line)] bg-[var(--panel)] px-4 py-3"
            >
              {tText(skill, locale)}
            </li>
          ))}
        </ul>
      </section>

      {relatedTeams.length > 0 && (
        <section>
          <h2 className="mb-3 text-xl font-semibold">{t("recommendedTeams")}</h2>
          <ul className="space-y-2">
            {relatedTeams.map((team) => (
              <li key={team.id}>
                <Link
                  href={`/teams/${team.id}`}
                  className="block rounded-md border border-[var(--line)] bg-[var(--panel)] px-4 py-3 transition hover:border-[var(--accent)]"
                >
                  {tText(team.name, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
