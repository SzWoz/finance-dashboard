import { apiGet } from "@/lib/api";
import React, { createContext, useEffect, useReducer } from "react";

export interface Transaction {
  _id?: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category?: string;
  date: string;
}

interface Budget {
  _id?: string;
  month: number;
  year: number;
  total: number;
  categories: { name: string; limit: number }[];
}

type State = {
  transactions: Transaction[];
  budgets: Budget[];
};

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
      return { ...state, budgets: [...state.budgets, action.payload] };
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
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    const persisted = localStorage.getItem("finance-state");
    return persisted ? JSON.parse(persisted) : init;
  });

  useEffect(() => {
    localStorage.setItem("finance-state", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    apiGet("/api/transactions")
      .then((r) => r.json())
      .then((data) => dispatch({ type: "SET_TRANSACTIONS", payload: data }));
    apiGet("/api/budgets")
      .then((r) => r.json())
      .then((data) => dispatch({ type: "SET_BUDGETS", payload: data }));
  }, []);

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
};
