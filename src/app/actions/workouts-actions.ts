"use server"

import WorkoutService, { PostWorkout } from "../services/WorkoutService";
import { revalidatePath } from "next/cache";

export async function createWorkoutAction(data: PostWorkout){
    const workoutService = new WorkoutService()

    try {
        await workoutService.postWorkout(data)
        revalidatePath('/treinos')

        return { success: true }
    } catch (error) {
        console.error('Erro na Server Action: ', error)
        return { success: false, error: 'Falha ao criar o treino no servidor.' }
    }
}

export async function deleteWorkoutAction(id: string){
    const workoutService = new WorkoutService()

    try {
        await workoutService.deleteWorkout(id)
        revalidatePath('/treinos')

        return { success: true }
    } catch (error) {
        console.error('Erro na Server Action: ', error)
        return { success: false, error: 'Falha ao deletar o treino no servidor.' }
    }
}