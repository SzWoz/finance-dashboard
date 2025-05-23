import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FinanceContext } from "@/context/FinanceContext";
import { useApi } from "@/lib/api";
import { toast } from "sonner";

const schema = z.object({
  month: z.number().min(1).max(12),
  year: z.number().gte(2020),
  total: z.number().positive(),
});
type Form = z.infer<typeof schema>;

export const BudgetForm: React.FC = () => {
  const { dispatch } = useContext(FinanceContext);
  const { apiPost } = useApi();
  const { register, handleSubmit, reset } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Form) => {
    const res = await apiPost("/api/budgets", {
      month: data.month - 1,
      year: data.year,
      total: data.total,
    });
    const budget = await res.json();
    dispatch({ type: "ADD_BUDGET", payload: budget });
    toast.success("Budżet zapisany");
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ustaw budżet</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="number"
            placeholder="Miesiąc (1-12)"
            {...register("month", { valueAsNumber: true })}
          />
          <Input
            type="number"
            placeholder="Rok"
            {...register("year", { valueAsNumber: true })}
          />
          <Input
            type="number"
            step="0.01"
            placeholder="Kwota"
            {...register("total", { valueAsNumber: true })}
          />
          <Button className="w-full">Zapisz</Button>
        </form>
      </CardContent>
    </Card>
  );
};
