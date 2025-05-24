import React, { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export const TransactionList: React.FC = () => {
  const { state } = useContext(FinanceContext);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Historia transakcji</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 h-full overflow-auto pr-2">
        {state.transactions.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Brak dodanych transakcji.
          </p>
        )}

        {state.transactions.map((t) => (
          <div key={t._id ?? t.date} className="flex justify-between">
            <div>
              <p>{t.description}</p>
              <small className="text-xs text-muted-foreground">
                {format(new Date(t.date), "dd.MM.yyyy")}
              </small>
            </div>

            <div className="flex items-center gap-2">
              {t.category && (
                <Badge variant="outline" className="hidden sm:inline">
                  {t.category}
                </Badge>
              )}

              <span
                className={
                  t.type === "expense"
                    ? "text-destructive font-medium flex items-center gap-1"
                    : "text-emerald-600 font-medium flex items-center gap-1"
                }
              >
                {t.type === "expense" ? (
                  <ArrowDownCircle className="h-4 w-4" />
                ) : (
                  <ArrowUpCircle className="h-4 w-4" />
                )}
                {t.type === "expense" ? "-" : "+"}
                {t.amount.toFixed(2)} zł
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
