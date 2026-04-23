"use server";

import { WorkoutData } from "@/src/interfaces/Workout";
import WorkoutService, { PostWorkout } from "../services/WorkoutService";
import { revalidatePath } from "next/cache";

export async function getWorkoutsAction() {
  const workoutService = new WorkoutService();

  const workouts: WorkoutData[] = await workoutService.getWorkouts();
  return workouts;
}

export async function getWorkoutWithExercisesAction(id: string) {
  const workoutService = new WorkoutService();

  const workouts: WorkoutData = await workoutService.getWorkoutWithExercises(id);
  return workouts;
}

export async function createWorkoutAction(data: PostWorkout) {
  const workoutService = new WorkoutService();

  try {
    await workoutService.postWorkout(data);
    revalidatePath("/treinos");

    return { success: true };
  } catch (error) {
    console.error("Erro na Server Action: ", error);
    return { success: false, error: "Falha ao criar o treino no servidor." };
  }
}

export async function editWorkoutAction(data: PostWorkout, id: string) {
  const workoutService = new WorkoutService();

  try {
    await workoutService.putWorkout(data, id);
    revalidatePath("/treinos");

    return { success: true };
  } catch (error) {
    console.error("Erro na Server Action: ", error);
    return { success: false, error: "Falha ao criar o treino no servidor." };
  }
}

export async function deleteWorkoutAction(id: string) {
  const workoutService = new WorkoutService();

  try {
    await workoutService.deleteWorkout(id);
    revalidatePath("/treinos");

    return { success: true };
  } catch (error) {
    console.error("Erro na Server Action: ", error);
    return { success: false, error: "Falha ao deletar o treino no servidor." };
  }
}
