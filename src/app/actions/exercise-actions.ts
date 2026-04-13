"use server";

import { revalidatePath } from "next/cache";
import ExerciseService, { PostExercise } from "../services/ExerciseService";

export async function createExerciseAction(data: PostExercise) {
  const exerciseService = new ExerciseService();

  try {
    await exerciseService.postExercise(data);
    revalidatePath(`/treinos/${data.workoutId}`);

    return { success: true };
  } catch (error) {
    console.error("Erro na Server Action: ", error);
    return { success: false, error: "Falha ao criar o treino no servidor." };
  }
}
