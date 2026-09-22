"use client";

import { useEffect, useReducer } from "react";

import { Delete } from "@/components/ui/Icons";
import {
  calculatorReducer,
  initialCalculatorState,
  type CalculatorAction,
  type Operator
} from "@/modules/calculator/calculator.logic";

const keyMap: Record<string, CalculatorAction | undefined> = {
  "+": { type: "operator", value: "+" },
  "-": { type: "operator", value: "-" },
  "*": { type: "operator", value: "*" },
  "/": { type: "operator", value: "/" },
  Enter: { type: "equals" },
  "=": { type: "equals" },
  Escape: { type: "clear" },
  Backspace: { type: "backspace" },
  ".": { type: "decimal" }
};

const operatorButtons: Array<{ value: Operator; label: string }> = [
  { value: "/", label: "÷" },
  { value: "*", label: "×" },
  { value: "-", label: "−" },
  { value: "+", label: "+" }
];

function buttonClass(kind: "number" | "utility" | "operator" | "equals" = "number") {
  const base =
    "h-14 rounded-2xl text-lg font-semibold transition active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 sm:h-16";

  if (kind === "operator") {
    return `${base} bg-zinc-800 text-brand-300 hover:bg-zinc-700`;
  }
  if (kind === "equals") {
    return `${base} bg-brand-500 text-zinc-950 hover:bg-brand-400`;
  }
  if (kind === "utility") {
    return `${base} bg-zinc-800/70 text-zinc-300 hover:bg-zinc-700`;
  }
  return `${base} bg-zinc-900 text-zinc-100 hover:bg-zinc-800`;
}

export function Calculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialCalculatorState);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (/^[0-9]$/.test(event.key)) {
        event.preventDefault();
        dispatch({ type: "digit", value: event.key });
        return;
      }

      const action = keyMap[event.key];
      if (action) {
        event.preventDefault();
        dispatch(action);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const op = (value: Operator) => dispatch({ type: "operator", value });
  const digit = (value: string) => dispatch({ type: "digit", value });

  return (
    <div className="mx-auto w-full max-w-md rounded-[2rem] border border-zinc-800 bg-zinc-950 p-4 shadow-[0_35px_100px_-45px_rgba(0,0,0,0.9)] sm:p-5">
      <div className="rounded-3xl border border-zinc-800 bg-black/30 p-5 text-right">
        <p
          dir={state.error || !state.expression ? "rtl" : "ltr"}
          className="h-6 overflow-hidden text-sm text-zinc-500"
        >
          {state.expression || "آماده"}
        </p>
        <output
          dir={state.error ? "rtl" : "ltr"}
          aria-live="polite"
          className={`mt-2 block min-h-[52px] overflow-hidden text-ellipsis whitespace-nowrap font-mono font-medium tracking-tight ${
            state.display.length > 12 ? "text-3xl" : "text-4xl sm:text-5xl"
          } ${state.error ? "text-rose-400" : "text-white"}`}
        >
          {state.display}
        </output>
      </div>

      <div dir="ltr" className="mt-4 grid grid-cols-4 gap-2.5 sm:gap-3">
        <button className={buttonClass("utility")} onClick={() => dispatch({ type: "clear" })} type="button" aria-label="پاک کردن همه">
          AC
        </button>
        <button
          className={buttonClass("utility")}
          onClick={() => dispatch({ type: "backspace" })}
          type="button"
          aria-label="حذف رقم آخر"
        >
          <Delete className="mx-auto h-5 w-5" />
        </button>
        <button className={buttonClass("utility")} onClick={() => dispatch({ type: "toggle-sign" })} type="button" aria-label="تغییر علامت عدد">
          ±
        </button>
        <button className={buttonClass("operator")} onClick={() => op(operatorButtons[0].value)} type="button" aria-label="تقسیم">
          {operatorButtons[0].label}
        </button>

        {["7", "8", "9"].map((value) => (
          <button key={value} className={buttonClass()} onClick={() => digit(value)} type="button">
            {value}
          </button>
        ))}
        <button className={buttonClass("operator")} onClick={() => op("*")} type="button" aria-label="ضرب">×</button>

        {["4", "5", "6"].map((value) => (
          <button key={value} className={buttonClass()} onClick={() => digit(value)} type="button">
            {value}
          </button>
        ))}
        <button className={buttonClass("operator")} onClick={() => op("-")} type="button" aria-label="تفریق">−</button>

        {["1", "2", "3"].map((value) => (
          <button key={value} className={buttonClass()} onClick={() => digit(value)} type="button">
            {value}
          </button>
        ))}
        <button className={buttonClass("operator")} onClick={() => op("+")} type="button" aria-label="جمع">+</button>

        <button className={`${buttonClass()} col-span-2`} onClick={() => digit("0")} type="button">0</button>
        <button className={buttonClass()} onClick={() => dispatch({ type: "decimal" })} type="button" aria-label="ممیز">.</button>
        <button className={buttonClass("equals")} onClick={() => dispatch({ type: "equals" })} type="button" aria-label="مساوی">=</button>
      </div>

      <p className="mt-4 text-center text-xs leading-6 text-zinc-600">
        ورودی صفحه‌کلید فعال است · <span dir="ltr">Esc</span> پاک می‌کند · <span dir="ltr">Enter</span> نتیجه را نمایش می‌دهد
      </p>
    </div>
  );
}
