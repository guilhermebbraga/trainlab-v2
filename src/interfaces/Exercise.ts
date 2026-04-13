export interface Exercise {
  id?: string;
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
