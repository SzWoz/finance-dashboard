import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "sonner";
import { Link, useLocation, useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
type Form = z.infer<typeof schema>;

export const LoginForm: React.FC = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";
  const { register, handleSubmit } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Form) => {
    try {
      await login(data.email, data.password);
      navigate(from, { replace: true });
      toast.success("Zalogowano");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <Card className="min-w-[28rem] m-0">
      <CardHeader>
        <CardTitle>Logowanie</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Email" {...register("email")} />
          <Input
            type="password"
            placeholder="Hasło"
            {...register("password")}
          />
          <Button className="w-full" type="submit">
            Zaloguj
          </Button>
          <p className="mt-2 text-center text-sm">
            Nie masz konta?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Zarejestruj się
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
