"use client";
import { useTransition } from "react";
import Button from "../../Button";
import Input from "../../Input";
import Radio from "../../Radio";
import Select from "../../Select";
import TextArea from "../../TextArea";
import { Controller, useForm } from "react-hook-form";
import {
  WorkoutInput,
  WorkoutSchema,
} from "@/src/lib/validations/workout.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import LabelWrapper from "../../LabelWrapper";

import WorkoutService from "@/src/app/services/WorkoutService";
import { useRouter } from "next/navigation";
import { createWorkoutAction } from "@/src/app/actions/workouts-actions";

interface WorkoutModalProps {
  closeModal: () => void;
}

export default function WorkoutForm({ closeModal }: WorkoutModalProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const workoutService = new WorkoutService();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<WorkoutInput>({
    resolver: zodResolver(WorkoutSchema),
    defaultValues: {
      level: "BEGINNER",
      type: "ENDURANCE",
    },
  });

  const onSubmit = (data: WorkoutInput) => {
    startTransition(async () => {
      try {
        await createWorkoutAction(data)

        reset();
        toast.success("Criado com sucesso!");
        closeModal()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Falha ao criar. Tente novamente");
        console.error("Falha ao capturar dados");
      }
    });
  };

  const workoutsTypes = [
    ["STRENGTH", "Força"],
    ["HYPERTROPHY", "Hipertrofia"],
    ["CARDIO", "Cardio"],
    ["FUNCTIONAL", "Funcional"],
    ["ENDURANCE", "Resistência"],
  ];
  const difficulties = [
    ["BEGINNER", "Iniciante"],
    ["INTERMEDIATE", "Intermediário"],
    ["ADVANCED", "Avançado"],
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      method="POST"
      className="flex flex-col gap-5"
    >
      <LabelWrapper elementId="name" name="Nome do treino">
        <Input
          {...register("name")}
          elementId="name"
          error={errors.name?.message}
          disabled={isPending}
          label="Treino"
          type="text"
          placeholder="ex. costas"
        />
      </LabelWrapper>

      <LabelWrapper elementId="description" name="Descrição">
        <TextArea
          {...register("description")}
          elementId="description"
          error={errors.description?.message}
          disabled={isPending}
          label="Descrição"
          placeholder="Descrição"
        />
      </LabelWrapper>

      <LabelWrapper elementId="type" name="Tipo do treino">
        <Select
          {...register("type")}
          elementId="type"
          error={errors.type?.message}
          disabled={isPending}
          label="Tipo do treino"
          optionsList={workoutsTypes}
        />
      </LabelWrapper>

      <LabelWrapper elementId="level" name="Intensidade">
        <Controller
          name="level"
          control={control}
          render={({ field }) => (
            <Radio
              elementId="level"
              selectedValue={field.value}
              onChange={field.onChange}
              disabled={isPending}
              radioTags={difficulties}
            />
          )}
        />
      </LabelWrapper>

      <Button
        type="submit"
        text={isPending ? "Salvando..." : "Salvar treino"}
        disabled={isPending}
      />
    </form>
  );
}
