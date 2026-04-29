"use server";

import { revalidatePath } from "next/cache";
import ExerciseService from "../services/ExerciseService";
import { ExerciseInput } from "@/src/lib/validations/exercise.validations";

export async function getExerciseByIdAction(
  workoutId: string,
  exerciseId: string,
) {
  const exerciseService = new ExerciseService();

  try {
    const exercise = await exerciseService.getExerciseById(
      workoutId,
      exerciseId,
    );

    console.log(exercise);

    return exercise;
  } catch (error) {
    console.error("Erro na Server Action: ", error);
    return { success: false, error: "Falha ao obter exercício no servidor." };
  }
}

export async function createExerciseAction(
  workoutId: string,
  data: ExerciseInput,
) {
  const exerciseService = new ExerciseService();

  try {
    await exerciseService.postExercise(workoutId, data);
    revalidatePath(`/treinos/${workoutId}`);

    return { success: true };
  } catch (error) {
    console.error("Erro na Server Action: ", error);
    return { success: false, error: "Falha ao criar o exercício no servidor." };
  }
}

export async function updateExerciseAction(
  workoutId: string,
  id: string,
  data: ExerciseInput,
) {
  const exerciseService = new ExerciseService();

  try {
    await exerciseService.putExercise(workoutId, id, data);
    revalidatePath(`/treinos/${id}`);

    return { success: true };
  } catch (error) {
    console.error("Erro na Server Action: ", error);
    return { success: false, error: "Falha ao criar o exercício no servidor." };
  }
}

export async function deleteExerciseAction(workoutId: string, id: string) {
  const exerciseService = new ExerciseService();

  try {
    await exerciseService.deleteExercise(workoutId, id);

    return { success: true };
  } catch (error) {
    console.error("Erro na Server Action: ", error);
    return { success: false, error: "Falha ao criar o exercício no servidor." };
  }
}
