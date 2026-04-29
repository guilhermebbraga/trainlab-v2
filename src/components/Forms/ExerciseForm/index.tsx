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
import {
  createExerciseAction,
  getExerciseByIdAction,
  updateExerciseAction,
} from "@/src/app/actions/exercise-actions";
import { useParams } from "next/navigation";

interface ExerciseFormProps {
  closeModal: () => void;
  editing?: string | null;
}

export default function ExerciseForm({
  closeModal,
  editing,
}: ExerciseFormProps) {
  const params = useParams();
  const workoutId = params.id as string;
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

          const response = await getExerciseByIdAction(workoutId, editing)

          if(!response.success) throw new Error()
          
          const exercise = response.data
            
          reset(exercise);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          toast.error("Falha ao carregar dados do exercício");
          closeModal();
        }
      };

      getEditingExercise();
    }
  }, [closeModal, editing, isEditing, reset, workoutId]);

  const onSubmit = (data: ExerciseInput) => {
    startTransition(async () => {
      console.log(workoutId);
      try {
        if (isEditing) {
          await updateExerciseAction(workoutId, editing, data);

          reset();
          toast.success("Editado com sucesso!");
          closeModal();
        } else {
          await createExerciseAction(workoutId, data);

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
