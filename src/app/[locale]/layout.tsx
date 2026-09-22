import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Noto_Sans_Thai, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { routing } from "@/i18n/routing";

const display = Noto_Sans_Thai({
  variable: "--font-display",
  subsets: ["thai", "latin"],
  weight: ["400", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${display.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full antialiased">
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-full flex-col">
            <SiteHeader />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
