import Service from "./Service";

export interface PostExercise {
  name: string;
  muscleGroup: string;
  sets: number;
  repetitions: number;
  workoutId: string;
}

export default class ExerciseService extends Service {
  async postExercise(data: PostExercise) {
    const response = await this.axiosInstance.post("/exercises", { ...data });

    return response.data;
  }

  async deleteExercise(id: string) {
    const response = await this.axiosInstance.delete(`/exercises/${id}`);

    return response.data;
  }
}
