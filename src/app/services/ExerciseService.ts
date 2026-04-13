import Service from "./Service";

export default class ExerciseService extends Service {
  async postExercise(data: {
    name: string;
    muscleGroup: string;
    sets: number;
    repetitions: number;
    workoutId: string;
  }) {
    const response = await this.axiosInstance.post("/exercises", { ...data });

    return response.data;
  }
}
