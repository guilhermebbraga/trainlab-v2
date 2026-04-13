import WorkoutClientContent from "./WorkoutClientContent";


interface WorkoutProps {
  params: Promise<{ id: string }>;
}

export default async function Workout({ params }: WorkoutProps) {
  const { id } = await params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workouts/${id}`)
  const workout = await response.json()

  return <WorkoutClientContent workout={workout}/>
}
