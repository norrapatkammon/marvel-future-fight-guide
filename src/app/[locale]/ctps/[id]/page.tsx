import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { CtpExplorer } from "@/components/CtpBrowser";
import { getCtp, ctps } from "@/data/ctps";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export function generateStaticParams() {
  return ctps.map((ctp) => ({ id: ctp.id }));
}

export default async function CtpDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  if (!getCtp(id)) notFound();

  return <CtpExplorer initialId={id} />;
}
