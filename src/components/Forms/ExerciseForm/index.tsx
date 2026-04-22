"use client";
import { Controller, useForm } from "react-hook-form";
import Button from "../../Button";
import Input from "../../Input";
import LabelWrapper from "../../LabelWrapper";
import Select from "../../Select";
import SliderInput from "../../SliderInput";
import { useEffect, useTransition } from "react";
import {
  ExerciseInput,
  ExerciseSchema,
} from "@/src/lib/validations/exercise.validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createExerciseAction, updateExerciseAction } from "@/src/app/actions/exercise-actions";

interface ExerciseFormProps {
  workoutId: string;
  closeModal: () => void;
  editing?: string | null;
}

export default function ExerciseForm({
  workoutId,
  closeModal,
  editing,
}: ExerciseFormProps) {
  const [isPending, startTransition] = useTransition();
  const isEditing = !!editing;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ExerciseInput>({
    resolver: zodResolver(ExerciseSchema),
    defaultValues: {
      sets: 3,
      repetitions: 15,
    },
  });

  useEffect(() => {
    if (isEditing) {
      const getEditingExercise = async () => {
        try {
          console.log(editing);
          const response = await fetch(
            `http://192.168.15.54:9090/exercises/${editing}`,
          );

          if (!response) throw new Error();

          const exercise = (await response.json()) as ExerciseInput;
          reset(exercise);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          toast.error("Falha ao carregar dados do exercício");
          closeModal();
        }
      };

      getEditingExercise();
    }
  }, [closeModal, editing, isEditing, reset]);

  const onSubmit = (data: ExerciseInput) => {
    startTransition(async () => {
      try {
        if (isEditing) {
          await updateExerciseAction(editing, data);

          reset();
          toast.success("Editado com sucesso!");
          closeModal();
        } else {
          await createExerciseAction({ ...data, workoutId });

          reset();
          toast.success("Criado com sucesso!");
          closeModal();
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Falha ao criar");
      }
    });
  };

  const muscleGroups = [
    ["CHEST", "Peito"],
    ["BACK", "Costas"],
    ["LEGS", "Pernas"],
    ["SHOULDERS", "Ombros"],
    ["BICEPS", "Bíceps"],
    ["TRICEPS", "Tríceps"],
    ["ABS", "Abdômen"],
    ["GLUTES", "Glúteos"],
  ];

  return (
    <form
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
    >
      <LabelWrapper name="Nome" elementId="name">
        <Input
          {...register("name")}
          type="text"
          elementId="name"
          placeholder="Ex. Pull Over"
          error={errors.name?.message}
        />
      </LabelWrapper>

      <LabelWrapper name="Grupo Muscular" elementId="muscleGroup">
        <Select
          {...register("muscleGroup")}
          optionsList={muscleGroups}
          elementId="muscleGroup"
          error={errors.muscleGroup?.message}
        />
      </LabelWrapper>

      <LabelWrapper name="Séries" elementId="sets">
        <Controller
          name="sets"
          control={control}
          render={({ field }) => (
            <SliderInput
              value={field.value}
              onChange={field.onChange}
              elementId="sets"
              max={30}
              error={errors.sets?.message}
            />
          )}
        />
      </LabelWrapper>

      <LabelWrapper name="Séries" elementId="repetitions">
        <Controller
          name="repetitions"
          control={control}
          render={({ field }) => (
            <SliderInput
              value={field.value}
              onChange={field.onChange}
              elementId="repetitions"
              max={30}
              error={errors.repetitions?.message}
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
