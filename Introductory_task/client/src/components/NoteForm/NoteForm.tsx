import { FormField } from "../FormField";
import { Button } from "../Button";
import "./NoteForm.css";
import { z } from "zod";
import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createNote } from "../../api/Note";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";

const NoteSchema = z.object({
  title: z.string().min(5, "Заголовок должен содержать не менее 5 символов"),
  text: z
    .string()
    .min(10, "Текст заметки должен содержать не менее 10 символов")
    .max(300, "Текст заметки должен содержать не более 300 символов"),
});

type NoteForm = z.infer<typeof NoteSchema>;

export const NoteForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteForm>({
    resolver: zodResolver(NoteSchema),
  });

  const noteMutation = useMutation(
    {
      mutationFn: (data: { title: string; text: string }) =>
        createNote(data.title, data.text),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
      },
    },
    queryClient
  );

  return (
    <form
      className={"note-form"}
      onSubmit={handleSubmit(({ title, text }) => {
        noteMutation.mutate({ title, text });
      })}
    >
      <FormField label="Заголовок" errorMessage={errors.title?.message}>
        <input type="text" {...register("title")} />
      </FormField>
      <FormField label="Текст" errorMessage={errors.text?.message}>
        <textarea {...register("text")} />
      </FormField>
      <Button type="submit" isLoading={noteMutation.isPending}>
        Сохранить
      </Button>
    </form>
  );
};
