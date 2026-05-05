import { ExerciseInput } from "@/src/lib/validations/exercise.validations";
import Service from "./Service";

export default class ExerciseService extends Service {
  
  async postExercise(workoutId: string, data: ExerciseInput) {
    const response = await this.axiosInstance.post(`/workouts/${workoutId}/exercises`, data);

    return response.data;
  }

  async getExerciseById(workoutId: string, exerciseId: string){
    const response = await this.axiosInstance(`/workouts/${workoutId}/exercises/${exerciseId}`)
    return response.data
  }

  async putExercise(workoutId: string, id: string, data: ExerciseInput) {
    const response = await this.axiosInstance.put(`/workouts/${workoutId}/exercises/${id}`, data);

    return response.data;
  }

  async deleteExercise(workoutId: string, id: string) {
    const response = await this.axiosInstance.delete(`/workouts/${workoutId}/exercises/${id}`);

    return response.data;
  }
}
