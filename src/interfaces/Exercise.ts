export interface Exercise {
  id?: number;
  name: string;
  muscleGroup:
    | "BACK"
    | "LEGS"
    | "SHOULDERS"
    | "BICEPS"
    | "TRICEPS"
    | "ABS"
    | "GLUTES";
  sets: number;
  repetitions: number;
}
