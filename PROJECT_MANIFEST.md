# Project manifest

## پیکربندی
- `package.json`
- `next.config.ts`
- `tsconfig.json`
- `next-env.d.ts`
- `postcss.config.js`
- `tailwind.config.ts`
- `.gitignore`

## App Router
- `app/globals.css` — استایل پایه، RTL و پشته فونت فارسی
- `app/layout.tsx` — `lang="fa"`، `dir="rtl"` و متادیتای فارسی
- `app/page.tsx` — صفحه اصلی فارسی
- `app/icon.png`
- `app/apple-icon.png`
- `app/tools/password-generator/page.tsx` — صفحه فارسی سازنده رمز عبور
- `app/tools/calculator/page.tsx` — صفحه فارسی ماشین حساب

## کامپوننت‌های مشترک
- `components/brand/Logo.tsx`
- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`
- `components/ui/Icons.tsx`
- `components/ui/ThemeToggle.tsx`
- `components/ui/ToolCard.tsx`

## رجیستری ابزارها
- `lib/tools.ts`

## ماژول‌ها
- `modules/password-generator/PasswordGenerator.tsx`
- `modules/password-generator/password.logic.ts`
- `modules/calculator/Calculator.tsx`
- `modules/calculator/calculator.logic.ts`

## فایل‌های برند
- `public/brand/xelements-logo-source.png`
- `public/brand/xelements-logo.png`
- `public/brand/xelements-mark.png`

## مستندات
- `README.md`
- `PROJECT_MANIFEST.md`

## Yekan Bakh integration

- `app/globals.css` — self-hosted `@font-face` declarations and global Yekan Bakh stack.
- `public/fonts/README.md` — expected local font filenames and weights.
