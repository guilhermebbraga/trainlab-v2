"use client";
import { useEffect, useTransition } from "react";
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
import {
  createWorkoutAction,
  editWorkoutAction,
  getWorkoutWithExercisesAction,
} from "@/src/app/actions/workouts-actions";
import { workoutGoalTranslations } from "@/src/constants/workouts";
import { levelGoalTranslations } from "@/src/constants/levels";

interface WorkoutModalProps {
  closeModal: () => void;
  editing?: string;
}

const workoutTypesOptions = Object.entries(workoutGoalTranslations).map(
  ([key, value]) => [key, value],
);

console.log(workoutTypesOptions);

const difficulties = Object.entries(levelGoalTranslations).map(
  ([key, value]) => [key, value],
);

export default function WorkoutForm({
  closeModal,
  editing,
}: WorkoutModalProps) {
  const [isPending, startTransition] = useTransition();
  const isEditing = !!editing;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<WorkoutInput>({
    resolver: zodResolver(WorkoutSchema),
    defaultValues: {
      description: "",
      level: "BEGINNER",
      name: "",
      type: "STRENGTH",
    },
  });

  useEffect(() => {
    if (isEditing) {
      const getEditingWorkout = async () => {
        try {
          const response = await getWorkoutWithExercisesAction(editing);

          if (!response.success) throw new Error();

          const workout = response.data as WorkoutInput;

          reset(workout);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          toast.error("Falha ao carregar dados do treino");
          closeModal();
        }
      };
      getEditingWorkout();
    }
  }, [closeModal, editing, isEditing, reset]);

  const onSubmit = (data: WorkoutInput) => {
    startTransition(async () => {
      try {
        if (isEditing) {
          await editWorkoutAction(data, editing);

          reset();
          toast.success("Editado com sucesso!");
          closeModal();
        } else {
          await createWorkoutAction(data);

          reset();
          toast.success("Criado com sucesso!");
          closeModal();
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Falha ao criar. Tente novamente");
        console.error("Falha ao capturar dados");
      }
    });
  };

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

      <LabelWrapper name="Tipo do treino" elementId="type">
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select
              name="type"
              optionsList={workoutTypesOptions}
              elementId="type"
              value={field.value}
              onChange={field.onChange}
              error={errors.type?.message}
            />
          )}
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
