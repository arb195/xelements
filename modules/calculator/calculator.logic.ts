export type Operator = "+" | "-" | "*" | "/";

export interface CalculatorState {
  display: string;
  accumulator: number | null;
  pendingOperator: Operator | null;
  waitingForOperand: boolean;
  expression: string;
  error: boolean;
}

export type CalculatorAction =
  | { type: "digit"; value: string }
  | { type: "decimal" }
  | { type: "operator"; value: Operator }
  | { type: "equals" }
  | { type: "clear" }
  | { type: "backspace" }
  | { type: "toggle-sign" };

export const initialCalculatorState: CalculatorState = {
  display: "0",
  accumulator: null,
  pendingOperator: null,
  waitingForOperand: false,
  expression: "",
  error: false
};

const operatorSymbols: Record<Operator, string> = {
  "+": "+",
  "-": "−",
  "*": "×",
  "/": "÷"
};

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "خطا";

  const rounded = Number.parseFloat(value.toPrecision(12));
  return rounded.toString();
}

function compute(left: number, right: number, operator: Operator): number | null {
  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return right === 0 ? null : left / right;
  }
}

function resetAfterError(action: CalculatorAction): CalculatorState | null {
  if (action.type === "clear") return initialCalculatorState;
  if (action.type === "digit") {
    return { ...initialCalculatorState, display: action.value };
  }
  if (action.type === "decimal") {
    return { ...initialCalculatorState, display: "0." };
  }
  return null;
}

export function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  if (state.error) {
    const reset = resetAfterError(action);
    return reset ?? state;
  }

  switch (action.type) {
    case "clear":
      return initialCalculatorState;

    case "digit": {
      if (state.waitingForOperand) {
        return {
          ...state,
          display: action.value,
          waitingForOperand: false,
          expression: state.pendingOperator ? state.expression : ""
        };
      }

      const nextDisplay = state.display === "0" ? action.value : `${state.display}${action.value}`;
      return { ...state, display: nextDisplay.slice(0, 18) };
    }

    case "decimal": {
      if (state.waitingForOperand) {
        return { ...state, display: "0.", waitingForOperand: false };
      }
      if (state.display.includes(".")) return state;
      return { ...state, display: `${state.display}.` };
    }

    case "toggle-sign": {
      if (state.display === "0") return state;
      return {
        ...state,
        display: state.display.startsWith("-") ? state.display.slice(1) : `-${state.display}`
      };
    }

    case "backspace": {
      if (state.waitingForOperand) return state;
      if (state.display.length <= 1 || (state.display.startsWith("-") && state.display.length === 2)) {
        return { ...state, display: "0" };
      }
      return { ...state, display: state.display.slice(0, -1) };
    }

    case "operator": {
      const input = Number(state.display);
      let accumulator = state.accumulator;
      let display = state.display;

      if (accumulator !== null && state.pendingOperator && !state.waitingForOperand) {
        const result = compute(accumulator, input, state.pendingOperator);
        if (result === null) {
          return {
            ...initialCalculatorState,
            display: "خطا",
            expression: "تقسیم بر صفر ممکن نیست",
            error: true
          };
        }
        accumulator = result;
        display = formatNumber(result);
      } else if (accumulator === null) {
        accumulator = input;
      }

      return {
        ...state,
        display,
        accumulator,
        pendingOperator: action.value,
        waitingForOperand: true,
        expression: `${display} ${operatorSymbols[action.value]}`
      };
    }

    case "equals": {
      if (state.pendingOperator === null || state.accumulator === null) return state;

      const right = Number(state.display);
      const result = compute(state.accumulator, right, state.pendingOperator);
      if (result === null) {
        return {
          ...initialCalculatorState,
          display: "خطا",
          expression: "تقسیم بر صفر ممکن نیست",
          error: true
        };
      }

      return {
        display: formatNumber(result),
        accumulator: null,
        pendingOperator: null,
        waitingForOperand: true,
        expression: `${formatNumber(state.accumulator)} ${operatorSymbols[state.pendingOperator]} ${formatNumber(right)} =`,
        error: false
      };
    }
  }
}
