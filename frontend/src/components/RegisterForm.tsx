import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const schema = z
  .object({
    email: z.string().email("Niepoprawny email"),
    password: z.string().min(6, "Min 6 znaków"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Hasła różnią się",
    path: ["confirm"],
  });
type Form = z.infer<typeof schema>;

export const RegisterForm: React.FC = () => {
  const { register: registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Form) => {
    try {
      await registerUser(data.email, data.password);
      toast.success("Rejestracja udana");
      navigate("/", { replace: true });
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <Card className="min-w-[28rem] max-w-[48rem] mx-auto">
      <CardHeader>
        <CardTitle>Rejestracja</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Email" {...register("email")} />
          <Input
            type="password"
            placeholder="Hasło"
            {...register("password")}
          />
          <Input
            type="password"
            placeholder="Powtórz hasło"
            {...register("confirm")}
          />

          {formState.errors.confirm && (
            <p className="text-sm text-destructive">
              {formState.errors.confirm.message}
            </p>
          )}

          <Button className="w-full" type="submit">
            Zarejestruj
          </Button>
          <p className="mt-2 text-center text-sm">
            Masz już konto?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Zaloguj się
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
