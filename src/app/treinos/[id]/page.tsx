import { getWorkoutWithExercisesAction } from "../../actions/workouts-actions";
import WorkoutClientContent from "./WorkoutClientContent";


interface WorkoutProps {
  params: Promise<{ id: string }>;
}

export default async function Workout({ params }: WorkoutProps) {
  const { id } = await params;

  const workout = await getWorkoutWithExercisesAction(id)

  return <WorkoutClientContent workout={workout}/>
}
