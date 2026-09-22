export type ToolIconName = "password" | "calculator";

export interface ToolDefinition {
  slug: string;
  name: string;
  description: string;
  href: string;
  icon: ToolIconName;
  accent: string;
  status: "available" | "coming-soon";
}

export const tools: ToolDefinition[] = [
  {
    slug: "password-generator",
    name: "سازنده رمز عبور",
    description:
      "رمزهای تصادفی و قدرتمند بسازید و طول و گروه‌های کاراکتری را دقیقاً مطابق نیازتان تنظیم کنید.",
    href: "/tools/password-generator",
    icon: "password",
    accent: "امن",
    status: "available"
  },
  {
    slug: "calculator",
    name: "ماشین حساب",
    description:
      "یک ماشین حساب تمیز و سریع برای محاسبات روزمره با پشتیبانی کامل از صفحه‌کلید.",
    href: "/tools/calculator",
    icon: "calculator",
    accent: "سریع",
    status: "available"
  }
];

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}
