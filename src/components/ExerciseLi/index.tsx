"use client";
import useLongPress from "@/src/hooks/useLongPress";
import { Exercise } from "@/src/interfaces/Exercise";
import { HTMLAttributes, useState } from "react";
import Chip from "../Chip";
import Button from "../Button";

interface ExerciseLiProps extends HTMLAttributes<HTMLLIElement> {
  exercise: Exercise;
  onClick?: () => void;
  pressing?: boolean;
}

export default function ExerciseLi({ exercise, onClick }: ExerciseLiProps) {
  const [open, setOpen] = useState(false);

  const onLongPress = () => {
    setOpen(!open);
  };

  const longPressEvents = useLongPress(onLongPress, 500);

  return (
    <li
      {...longPressEvents}
      onClick={onClick}
      className={`
            bg-background-dark p-5 rounded-2xl  cursor-pointer
            `}
    >
      <div className="flex justify-between mb-5 text-sm">
        <h4>{exercise.name}</h4>
        <Chip style="solid" text={exercise.muscleGroup.toLowerCase()} />
      </div>

      <div className="text-sm flex gap-5 text-text-muted">
        <p>
          {exercise.sets} séries - {exercise.repetitions} repetições
        </p>
      </div>
      {open && (
        <div className="mt-5 flex gap-5">
          <Button
            text="Remover"
            otherStyles="text-[12px] w-[50%]"
            // onClick={onDelete}
          />

          <Button
            text="Editar"
            otherStyles="text-[12px] flex-1"
            // onClick={() =>
            //   navigate(`/treinos/exercises/${exercise.id}/edit`)
            // }
          />
        </div>
      )}
    </li>
  );
}
