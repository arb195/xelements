"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";

import { CheckIcon, CopyIcon, RefreshIcon } from "@/components/ui/Icons";
import {
  calculatePasswordStrength,
  generatePassword,
  type PasswordOptions
} from "@/modules/password-generator/password.logic";

const initialOptions: PasswordOptions = {
  length: 18,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true
};

type BooleanOption = Exclude<keyof PasswordOptions, "length">;

const optionLabels: Array<{ key: BooleanOption; label: string; description: string }> = [
  { key: "uppercase", label: "حروف بزرگ", description: "A–Z" },
  { key: "lowercase", label: "حروف کوچک", description: "a–z" },
  { key: "numbers", label: "اعداد", description: "0–9" },
  { key: "symbols", label: "کاراکترهای خاص", description: "! @ # $ …" }
];

export function PasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>(initialOptions);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const strength = useMemo(
    () => calculatePasswordStrength(password, options),
    [password, options]
  );

  function regenerate(nextOptions = options) {
    setPassword(generatePassword(nextOptions));
    setCopied(false);
  }

  useEffect(() => {
    setPassword(generatePassword(initialOptions));

    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  function updateLength(length: number) {
    const next = { ...options, length };
    setOptions(next);
    regenerate(next);
  }

  function toggleOption(key: BooleanOption) {
    const activeCount = optionLabels.filter((item) => options[item.key]).length;
    if (options[key] && activeCount === 1) return;

    const next = { ...options, [key]: !options[key] };
    setOptions(next);
    regenerate(next);
  }

  async function copyPassword() {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft dark:border-zinc-800 dark:bg-zinc-900/80 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-zinc-950 dark:text-white">تنظیمات رمز عبور</p>
            <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">طول رمز و گروه‌های کاراکتری را تنظیم کنید.</p>
          </div>
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
            فقط روی دستگاه شما
          </span>
        </div>

        <div className="mt-7">
          <div className="flex items-center justify-between">
            <label htmlFor="password-length" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              طول رمز
            </label>
            <output dir="ltr" className="min-w-10 rounded-lg bg-zinc-100 px-2.5 py-1 text-center text-sm font-semibold tabular-nums text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
              {options.length}
            </output>
          </div>
          <input
            id="password-length"
            type="range"
            min={8}
            max={64}
            step={1}
            value={options.length}
            onChange={(event: ChangeEvent<HTMLInputElement>) => updateLength(Number(event.target.value))}
            className="mt-4 h-2 w-full cursor-pointer accent-brand-600"
          />
          <div dir="ltr" className="mt-2 flex justify-between text-xs text-zinc-400">
            <span>8</span>
            <span>64</span>
          </div>
        </div>

        <div className="mt-7 space-y-2.5">
          {optionLabels.map((item) => {
            const checked = options[item.key];
            const activeCount = optionLabels.filter((option) => options[option.key]).length;
            const isLastActive = checked && activeCount === 1;

            return (
              <label
                key={item.key}
                className="flex cursor-pointer items-center justify-between rounded-2xl border border-zinc-200 px-4 py-3 transition hover:border-brand-300 hover:bg-brand-50/40 dark:border-zinc-800 dark:hover:border-brand-800 dark:hover:bg-brand-950/20"
              >
                <span>
                  <span className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">{item.label}</span>
                  <span dir="ltr" className="mt-0.5 block text-right text-xs text-zinc-400">{item.description}</span>
                </span>
                <span dir="ltr" className="relative inline-flex h-6 w-11 items-center">
                  <input
                    className="peer sr-only"
                    type="checkbox"
                    checked={checked}
                    disabled={isLastActive}
                    onChange={() => toggleOption(item.key)}
                    aria-label={`فعال یا غیرفعال کردن ${item.label}`}
                  />
                  <span className="absolute inset-0 rounded-full bg-zinc-200 transition peer-checked:bg-brand-600 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-400 peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:bg-zinc-700 dark:peer-focus-visible:ring-offset-zinc-900" />
                  <span className="relative ml-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5" />
                </span>
              </label>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-white shadow-[0_30px_90px_-42px_rgba(0,0,0,0.8)] sm:p-7">
        <div className="pointer-events-none absolute right-[-90px] top-[-90px] h-60 w-60 rounded-full bg-brand-500/15 blur-3xl" />
        <div className="relative">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white">رمز تولیدشده</p>
              <p className="mt-1 text-sm text-zinc-400">رمز مستقیماً در مرورگر شما تولید می‌شود.</p>
            </div>
            <button
              type="button"
              onClick={() => regenerate()}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 transition hover:border-brand-700 hover:text-brand-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              aria-label="ساخت رمز جدید"
            >
              <RefreshIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-7 rounded-2xl border border-zinc-800 bg-black/30 p-4 sm:p-5">
            <p
              dir={password ? "ltr" : "rtl"}
              className={`min-h-[72px] break-all font-mono text-lg leading-8 tracking-[0.04em] text-zinc-100 sm:text-xl ${password ? "text-left" : "text-right"}`}
            >
              {password || "در حال ساخت…"}
            </p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={copyPassword}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-brand-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
              >
                {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                {copied ? "کپی شد" : "کپی رمز"}
              </button>
            </div>
          </div>

          <div className="mt-7">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-zinc-500">قدرت تقریبی رمز</p>
                <p className="mt-1 text-lg font-semibold text-white">{strength.label}</p>
              </div>
              <p className="text-sm tabular-nums text-zinc-400">
                حدود <span dir="ltr">{strength.entropyBits}</span> بیت
              </p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-300 transition-[width] duration-300"
                style={{ width: `${strength.percent}%` }}
              />
            </div>
            <p className="mt-3 text-xs leading-6 text-zinc-500">
              این ارزیابی بر اساس طول رمز و اندازه مجموعه کاراکترهای انتخاب‌شده محاسبه می‌شود و تضمینی در برابر تمام مدل‌های حمله نیست.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
