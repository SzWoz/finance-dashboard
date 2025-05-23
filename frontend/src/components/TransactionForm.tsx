import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FinanceContext, Transaction } from "../context/FinanceContext";

const schema = z.object({
  description: z.string().min(1),
  amount: z.number().positive(),
  type: z.enum(["income", "expense"]),
  category: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export const TransactionForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { type: "expense" },
  });
  const { dispatch } = useContext(FinanceContext);

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, date: new Date() }),
    });
    const transaction: Transaction = await res.json();
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 max-w-sm">
      <input
        {...register("description")}
        placeholder="Opis"
        className="input w-full"
      />
      <input
        type="number"
        {...register("amount", { valueAsNumber: true })}
        placeholder="Kwota"
        className="input w-full"
      />
      <select {...register("type")} className="select w-full">
        <option value="expense">Wydatek</option>
        <option value="income">Przychód</option>
      </select>
      <input
        {...register("category")}
        placeholder="Kategoria"
        className="input w-full"
      />
      <button type="submit" className="btn btn-primary w-full">
        Zapisz
      </button>
    </form>
  );
};
