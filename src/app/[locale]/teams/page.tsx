import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCharacter, tText } from "@/data/characters";
import { modeLabels, teams } from "@/data/teams";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TeamsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Teams");

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="mt-2 text-[var(--muted)]">{t("subtitle")}</p>
      </div>

      {teams.length === 0 ? (
        <p className="text-[var(--muted)]">{t("empty")}</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {teams.map((team) => (
            <li key={team.id}>
              <Link
                href={`/teams/${team.id}`}
                className="block h-full rounded-lg border border-[var(--line)] bg-[var(--panel)] p-5 transition hover:border-[var(--accent)]"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                  {tText(modeLabels[team.mode], locale)}
                </p>
                <h2 className="mt-2 text-xl font-semibold">
                  {tText(team.name, locale)}
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {tText(team.why, locale)}
                </p>
                <p className="mt-4 text-sm">
                  {team.characterIds
                    .map((id) => {
                      const character = getCharacter(id);
                      return character ? tText(character.name, locale) : id;
                    })
                    .join(" · ")}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
