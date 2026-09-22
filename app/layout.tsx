import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

import "./globals.css";

const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('xelements-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = stored ? stored === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', dark);
  } catch (_) {}
})();`;

export const metadata: Metadata = {
  title: {
    default: "xelements — ابزارهای کوچک، امکانات بزرگ",
    template: "%s | xelements"
  },
  description: "مجموعه‌ای مدرن و سریع از ابزارهای کاربردی برای انجام کارهای روزمره.",
  applicationName: "xelements",
  keywords: ["ابزار آنلاین", "ماشین حساب", "سازنده رمز عبور", "ابزار کاربردی", "utility tools", "xelements"],
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png"
  },
  openGraph: {
    title: "xelements — ابزارهای کوچک، امکانات بزرگ",
    description: "مجموعه‌ای مدرن و سریع از ابزارهای کاربردی برای انجام کارهای روزمره.",
    type: "website",
    siteName: "xelements",
    locale: "fa_IR"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="relative min-h-screen overflow-x-clip bg-zinc-50 text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-zinc-50">
          <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[540px] overflow-hidden">
            <div className="absolute left-1/2 top-[-260px] h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-brand-400/20 blur-3xl dark:bg-brand-500/10" />
            <div className="absolute right-[-120px] top-16 h-72 w-72 rounded-full bg-violet-400/10 blur-3xl dark:bg-violet-500/10" />
          </div>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
