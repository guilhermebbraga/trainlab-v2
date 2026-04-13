"use client";
import { Controller, useForm } from "react-hook-form";
import Button from "../../Button";
import Input from "../../Input";
import LabelWrapper from "../../LabelWrapper";
import Select from "../../Select";
import SliderInput from "../../SliderInput";
import { useTransition } from "react";
import {
  ExerciseInput,
  ExerciseSchema,
} from "@/src/lib/validations/exercise.validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import ExerciseService from "@/src/app/services/ExerciseService";
import { useRouter } from 'next/navigation'

interface ExerciseFormProps {
    workoutId: string
    closeModal: () => void;
}

export default function ExerciseForm({ workoutId, closeModal }: ExerciseFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const exerciseService = new ExerciseService()

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
        repetitions: 15
    }
  });

  const onSubmit = (data: ExerciseInput) => {
    startTransition(async () => {
      try {

        await exerciseService.postExercise({...data, workoutId})
        
        console.log(data)
        reset()
        toast.success("Criado com sucesso!");
        closeModal()
        router.refresh()
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
