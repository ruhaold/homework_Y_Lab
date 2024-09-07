import { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegisterForm.css";
import { queryClient } from "../../api/queryClient";
import { registerUser } from "../../api/User";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface IRegisterFormProps {}

const RegisterSchema = z.object({
  username: z
    .string()
    .min(5, "Минимальная длина имени пользователя - 5 символов"),
  email: z.string().email("Введите корректный email"),
  password: z.string().min(8, "Минимальная длина пароля - 8 символов"),
});

type RegisterForm = z.infer<typeof RegisterSchema>;

export const RegisterForm: FC<IRegisterFormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
  });

  const registerMutation = useMutation(
    {
      mutationFn: (data: {
        username: string;
        email: string;
        password: string;
      }) => registerUser(data.username, data.email, data.password),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["me"] });
      },
    },
    queryClient
  );

  return (
    <form
      className={"register-form"}
      onSubmit={handleSubmit(({ username, email, password }) => {
        registerMutation.mutate({ username, email, password });
      })}
    >
      <FormField label="Имя" errorMessage={errors.username?.message}>
        <input type="text" {...register("username")} />
      </FormField>
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input type="email" {...register("email")} />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input type="password" {...register("password")} />
      </FormField>

      {registerMutation.error && (
        <span className={"error-message"}>{registerMutation.error.message}</span>
      )}

      <Button type="submit" isLoading={registerMutation.isPending}>
        Зарегистрироваться
      </Button>
    </form>
  );
};
