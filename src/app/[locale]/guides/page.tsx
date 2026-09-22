import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

const guideKeys = ["basics", "gear", "uniforms", "modes"] as const;

export default async function GuidesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Guides");

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="mt-2 text-[var(--muted)]">{t("subtitle")}</p>
      </div>
      <ul className="grid gap-4 md:grid-cols-2">
        {guideKeys.map((key) => (
          <li
            key={key}
            className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-5"
          >
            <h2 className="text-xl font-semibold">{t(`items.${key}.title`)}</h2>
            <p className="mt-2 text-[var(--muted)]">{t(`items.${key}.body`)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
