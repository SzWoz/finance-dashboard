import React, { createContext, useEffect, useReducer } from "react";
import { useApi } from "@/lib/api";

export interface Transaction {
  _id?: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category?: string;
  date: string;
}

export interface Budget {
  _id?: string;
  month: number;
  year: number;
  total: number;
}

type State = { transactions: Transaction[]; budgets: Budget[] };

type Action =
  | { type: "SET_TRANSACTIONS"; payload: Transaction[] }
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "SET_BUDGETS"; payload: Budget[] }
  | { type: "ADD_BUDGET"; payload: Budget };

const initialState: State = { transactions: [], budgets: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_TRANSACTIONS":
      return { ...state, transactions: action.payload };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case "SET_BUDGETS":
      return { ...state, budgets: action.payload };
    case "ADD_BUDGET":
      return { ...state, budgets: [action.payload, ...state.budgets] };
    default:
      return state;
  }
}

export const FinanceContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { apiGet } = useApi();

  useEffect(() => {
    (async () => {
      const t = await apiGet("/api/transactions").then((r) => r.json());
      dispatch({ type: "SET_TRANSACTIONS", payload: t });
      const b = await apiGet("/api/budgets").then((r) => r.json());
      dispatch({ type: "SET_BUDGETS", payload: b });
    })();
  }, []);

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
};
