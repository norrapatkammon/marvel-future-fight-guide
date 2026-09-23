import { setRequestLocale } from "next-intl/server";
import { CtpExplorer } from "@/components/CtpBrowser";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CtpsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CtpExplorer />;
}
