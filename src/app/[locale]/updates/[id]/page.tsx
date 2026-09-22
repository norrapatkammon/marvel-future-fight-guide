import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { UpdateDetailView } from "@/components/UpdateDetailView";
import { getUpdate, getUpdatesSorted } from "@/data/updates";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export function generateStaticParams() {
  return getUpdatesSorted().map((update) => ({ id: update.id }));
}

export default async function UpdateDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  if (!getUpdate(id)) notFound();

  return <UpdateDetailView updateId={id} />;
}
