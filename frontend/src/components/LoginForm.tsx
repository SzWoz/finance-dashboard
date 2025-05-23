import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email("Nieprawidłowy email"),
  password: z.string().min(6, "Min. 6 znaków"),
});
type FormData = z.infer<typeof schema>;

export const LoginForm: React.FC = () => {
  const { login } = useContext(AuthContext);
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const ok = await login(data.email, data.password);
    if (ok) toast.success("Zalogowano!");
    else toast.error("Błędny email lub hasło");
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle>Zaloguj się</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Email" {...register("email")} />
          <Input
            type="password"
            placeholder="Hasło"
            {...register("password")}
          />
          <Button type="submit" className="w-full">
            Zaloguj
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
