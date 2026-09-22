import { getTranslations, setRequestLocale } from "next-intl/server";
import { UpdatesBrowser } from "@/components/UpdatesBrowser";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function UpdatesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Updates");

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="mt-2 text-[var(--muted)]">{t("subtitle")}</p>
      </div>
      <UpdatesBrowser />
    </section>
  );
}
