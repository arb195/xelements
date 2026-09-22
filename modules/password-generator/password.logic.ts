export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export type StrengthLabel = "ضعیف" | "متوسط" | "خوب" | "قوی";

export interface PasswordStrength {
  label: StrengthLabel;
  score: 1 | 2 | 3 | 4;
  percent: number;
  entropyBits: number;
}

const SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?/"
} as const;

function randomIndex(max: number): number {
  if (max <= 0) return 0;

  const cryptoApi = globalThis.crypto;
  if (cryptoApi?.getRandomValues) {
    const uintRange = 0x100000000;
    const limit = uintRange - (uintRange % max);
    const values = new Uint32Array(1);

    do {
      cryptoApi.getRandomValues(values);
    } while (values[0] >= limit);

    return values[0] % max;
  }

  return Math.floor(Math.random() * max);
}

function pick(source: string): string {
  return source[randomIndex(source.length)];
}

function shuffle(chars: string[]): string[] {
  for (let index = chars.length - 1; index > 0; index -= 1) {
    const swapIndex = randomIndex(index + 1);
    [chars[index], chars[swapIndex]] = [chars[swapIndex], chars[index]];
  }

  return chars;
}

export function getEnabledSets(options: PasswordOptions): string[] {
  const sets: string[] = [];
  if (options.uppercase) sets.push(SETS.uppercase);
  if (options.lowercase) sets.push(SETS.lowercase);
  if (options.numbers) sets.push(SETS.numbers);
  if (options.symbols) sets.push(SETS.symbols);
  return sets;
}

export function generatePassword(options: PasswordOptions): string {
  const enabledSets = getEnabledSets(options);

  if (enabledSets.length === 0) {
    throw new Error("حداقل یک گروه کاراکتری باید فعال باشد.");
  }

  const length = Math.max(options.length, enabledSets.length);
  const pool = enabledSets.join("");
  const chars = enabledSets.map((set) => pick(set));

  while (chars.length < length) {
    chars.push(pick(pool));
  }

  return shuffle(chars).join("");
}

export function calculatePasswordStrength(password: string, options: PasswordOptions): PasswordStrength {
  const poolSize = getEnabledSets(options).reduce((sum, set) => sum + set.length, 0);
  const entropyBits = poolSize > 0 ? Math.round(password.length * Math.log2(poolSize)) : 0;

  let score: 1 | 2 | 3 | 4 = 1;
  if (entropyBits >= 55) score = 2;
  if (entropyBits >= 75) score = 3;
  if (entropyBits >= 100) score = 4;

  const labels: Record<1 | 2 | 3 | 4, StrengthLabel> = {
    1: "ضعیف",
    2: "متوسط",
    3: "خوب",
    4: "قوی"
  };

  return {
    label: labels[score],
    score,
    percent: score * 25,
    entropyBits
  };
}
