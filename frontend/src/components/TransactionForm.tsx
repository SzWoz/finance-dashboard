import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FinanceContext, type Transaction } from "../context/FinanceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useApi } from "@/lib/api";

const schema = z.object({
  description: z.string().min(1, "Wpisz opis"),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Kwota musi być liczbą"),
  type: z.enum(["income", "expense"]),
  category: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export const TransactionForm: React.FC = () => {
  const { register, handleSubmit, reset, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { type: "expense" },
  });
  const { dispatch } = useContext(FinanceContext);

  const { apiPost } = useApi();

  const onSubmit = async (data: FormData) => {
    const res = await apiPost("/api/transactions", {
      ...data,
      amount: Number(data.amount),
      date: new Date().toISOString(),
    });
    const transaction: Transaction = await res.json();
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
    toast.success(
      `${transaction.type === "expense" ? "Wydatek" : "Przychód"} dodany`
    );
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nowa transakcja</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4"
        >
          <Input placeholder="Opis" {...register("description")} />
          <Input
            type="number"
            step="0.01"
            placeholder="Kwota"
            {...register("amount")}
          />
          <Select
            defaultValue="expense"
            onValueChange={(val) =>
              setValue("type", val as "expense" | "income")
            }
          >
            <SelectTrigger className={cn("capitalize")}>
              <span className="truncate">
                {
                  { expense: "Wydatek", income: "Przychód" }[
                    (watch("type") ?? "expense") as "expense" | "income"
                  ]
                }
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="expense">Wydatek</SelectItem>
              <SelectItem value="income">Przychód</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Kategoria (opcjonalnie)"
            {...register("category")}
          />

          <Button type="submit" className="w-full">
            Zapisz
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
