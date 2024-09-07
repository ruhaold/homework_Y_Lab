import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { z } from "zod";
import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { login } from "../../api/User";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";

interface ILoginFormProps {}

const LoginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(8, "Минимальная длина пароля - 8 символов"),
});

type LoginForm = z.infer<typeof LoginSchema>;

export const LoginForm: FC<ILoginFormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  const loginMutation = useMutation(
    {
      mutationFn: (data: { email: string; password: string }) =>
        login(data.email, data.password),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["me"] });
      },
    },
    queryClient
  );

  return (
    <form
      className={"login-form"}
      onSubmit={handleSubmit(({ email, password }) => {
        loginMutation.mutate({ email, password });
      })}
    >
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input type="email" {...register("email")} />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input type="password" {...register("password")} />
      </FormField>

      {loginMutation.error && (
        <span className={"error-message"}>{loginMutation.error.message}</span>
      )}

      <Button type="submit" isLoading={loginMutation.isPending}>
        Войти
      </Button>
    </form>
  );
};
