import React, { useContext } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApi } from "@/lib/api";
import { FinanceContext } from "@/context/FinanceContext";
import { toast } from "sonner";

const schema = z.object({
  month: z.string().regex(/^\d{4}-\d{2}$/, "Format RRRR-MM"),
  amount: z.number().positive(),
});
type FormData = z.infer<typeof schema>;

export const BudgetForm: React.FC = () => {
  const { apiPost } = useApi();
  const { dispatch } = useContext(FinanceContext);
  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const res = await apiPost("/api/budgets", data);
    const budget = await res.json();
    dispatch({ type: "ADD_BUDGET", payload: budget });
    toast.success("Budżet zapisany");
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Ustaw budżet</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Budżet miesięczny</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="month"
            {...register("month", { valueAsDate: false })}
            placeholder="RRRR-MM"
          />
          <Input
            type="number"
            step="0.01"
            placeholder="Kwota"
            {...register("amount", { valueAsNumber: true })}
          />
          <Button type="submit" className="w-full">
            Zapisz
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
