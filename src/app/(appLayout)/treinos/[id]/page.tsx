import { WorkoutData } from "@/src/interfaces/Workout";
import { getWorkoutWithExercisesAction } from "../../../actions/workouts-actions";
import WorkoutClientContent from "./WorkoutClientContent";


interface WorkoutProps {
  params: Promise<{ id: string }>;
}

export default async function Workout({ params }: WorkoutProps) {
  const { id } = await params;

  const response = await getWorkoutWithExercisesAction(id)

  if(!response.success) {
    return <p>Ocorreu um erro</p>
  }
  
  const workout = response.data as WorkoutData

  return <WorkoutClientContent workout={workout}/>
}
